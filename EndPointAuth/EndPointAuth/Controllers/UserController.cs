using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using EndPointAuth.Context;
using Microsoft.EntityFrameworkCore;
using EndPointAuth.Models;
using EndPointAuth.Helpers;
using System.Text;
using System.Text.RegularExpressions;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authorization;
using System.Security.Cryptography;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using EndPointAuth.Models.Dto;

namespace EndPointAuth.Controllers
{
    [ApiController]
    [Route("api/[controller]")]

    public class UserController : Controller
    {
        public readonly AppDbContext _authContext;
        public UserController(AppDbContext appDbContext)
        {
            _authContext = appDbContext;
            
        }

        //login API
        [HttpPost("Authenticate")]
        public async Task<IActionResult> Authenticate([FromBody] User userObj) // [fromBody is because it take two feild username and passwword
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await _authContext.Users.FirstOrDefaultAsync(x => x.Username == userObj.Username );
            if(user == null)
            {
                return NotFound(new { Message = "User Not Found" });
            }

            //if the password is not verified return bad request
            if(!PasswordHasher.VerifyPassword(userObj.Password , user.Password)) 
            { 
                return BadRequest(new {Message = "Passwors is incorrect"});

            }

            user.Token = CreateJwt(user);
            var newAccessToken = user.Token;
            var newRefreshToken = CreateRefreshToken();
            user.RefreshToken = newRefreshToken; //as we want to save teh refreshtoken value into data base
            await _authContext.SaveChangesAsync();
            user.RefreshTokenExpiryTime = DateTime.Now.AddDays(5);
            return Ok( new TokenApiDtocs()
            {
                AccessToken = newAccessToken,
                RefreshToken = newRefreshToken,
            });
        }


        [HttpPost("Register")]
        public async Task<IActionResult> Register([FromBody] User userObj)
        {
            if(userObj == null)
            {
                return BadRequest();
            }
            //check username
            if(await CheckUserNameExistAsync(userObj.Username))
            {
                return BadRequest(new { Message = "Username Already Exists" });
            }
            //check email
            if (await CheckEmailExistAsync(userObj.Email))
            {
                return BadRequest(new { Message = "Email Already Exists" });
            }

            //check password strength
            var pass = CheckPasswordStrength(userObj.Password);
            if(!string.IsNullOrEmpty(pass))
            {
                return BadRequest(new { Message = pass.ToString() });
            }


            userObj.Password = PasswordHasher.HashPassword(userObj.Password);
            userObj.Role = "";
            userObj.Token = "";
            await _authContext.Users.AddAsync(userObj);
            await _authContext.SaveChangesAsync();
            return Ok(new 
                {
                Message = "Registered Successfully!!"
               
            });
        }
        private async Task<bool> CheckUserNameExistAsync(string userName)
        {
            return await  _authContext.Users.AnyAsync(x => x.Username == userName);
        }
        private async Task<bool> CheckEmailExistAsync(string email)        {
            return await _authContext.Users.AnyAsync(x => x.Email == email);
        }

        private string CheckPasswordStrength(string password)
        {
            StringBuilder sb = new StringBuilder();
            if(password.Length < 8)
            {
                sb.Append("Minimum password length should be 8"+Environment.NewLine);
            }
            //regex

            if(!(Regex.IsMatch(password,"[a-z]")) && (Regex.IsMatch(password, "[A-Z]")) && (Regex.IsMatch(password,"[0-9]")))
            {
                sb.Append("Password Should be Alphanumeric" + Environment.NewLine);

            }

            if(!Regex.IsMatch(password,"[<,>,@,!,#,$,%,^,&,*,(,),_,+,.,=,{,},[,?/,|,:,`,~]"))
            {
                sb.Append("Password Should Contain special charaters" + Environment.NewLine);
            }

            return sb.ToString();
        }

        //creating token for authentication
        private string CreateJwt(User user) 
        {
            //token is madeup of 3 things 
            //1. header
            //2. Paylod
            //3. signature
            // create instance of JWTsecurityTokenHandler
            var jwtTokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("veryverysceret.....");
            //creating Payload
            var identity = new ClaimsIdentity(new Claim[]
            {
                new Claim(ClaimTypes.Role, user.Role),
                new Claim(ClaimTypes.Name, $"{user.Username}")
            });
            //key is in bytes
            var credentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = identity,
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = credentials,
            };
            var token = jwtTokenHandler.CreateToken(tokenDescriptor);
            
            return jwtTokenHandler.WriteToken(token);
        }

        //getprijncipal from expire token this method is going to give the payload data to check the access token(expire token) user is sending is valid or not
        private ClaimsPrincipal GetPrincipleFromExpiredToken(string token)
        {
            var key = Encoding.ASCII.GetBytes("veryverysceret.....");
            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateAudience = false,
                ValidateIssuer = false,
                ValidateIssuerSigningKey = true, // if iot macth then the toekn is valid
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateLifetime = false,
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            SecurityToken securityToken;
            var principle = tokenHandler.ValidateToken(token, tokenValidationParameters, out securityToken);
            var jwtSecurityToken = securityToken as JwtSecurityToken;
            if (jwtSecurityToken == null || !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase))
            {
               throw new SecurityTokenException("this is invalid token");
            }
            return principle;
            
        }








        //method for refreshtoken
        private string CreateRefreshToken()
        {
            var tokenBytes = RandomNumberGenerator.GetBytes(64);
            var refreshToken = Convert.ToBase64String(tokenBytes);

            //check the token is there in user
            var tokenInUser =  _authContext.Users.Any(a => a.RefreshToken == refreshToken);

            if(tokenInUser)
            {
                return CreateRefreshToken();
            }

            return refreshToken;

        }

        [Authorize]
        [HttpGet("GetUsers")]
        public async Task<ActionResult<User>> Getusers()
        {
            return Ok(await _authContext.Users.ToListAsync());
        }

        [HttpPost("refresh")]
        public async Task<IActionResult> Refresh(TokenApiDtocs tokenApiDtocs)
        {
            if(tokenApiDtocs is null)
            {
                return BadRequest("inavlid Client Request");

            }
            string accessToken = tokenApiDtocs.AccessToken;
            string refreshToken = tokenApiDtocs.RefreshToken;   
            var principle = GetPrincipleFromExpiredToken(accessToken);
            var username = principle.Identity.Name; //taking this from priciple

            var user = await _authContext.Users.FirstOrDefaultAsync(a => a.Username == username);
            if(user == null || user.RefreshToken != refreshToken || user.RefreshTokenExpiryTime <= DateTime.Now)
            {
                return BadRequest("Inavlid request");
                

            }
            var newAccessToken = CreateJwt(user);
            var newRefreshToken = CreateRefreshToken();
            user.RefreshToken = newRefreshToken;
            await _authContext.SaveChangesAsync();
            return Ok(new TokenApiDtocs()
            {
                AccessToken = newAccessToken,
                RefreshToken = newRefreshToken,
            });
        }

            

    }
}
