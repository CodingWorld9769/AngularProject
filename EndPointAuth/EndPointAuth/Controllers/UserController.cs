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
            return Ok(new
            {
                Token=user.Token,
                Message = "Login Success!"
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
            userObj.Role = "User";
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
                new Claim(ClaimTypes.Name, $"{user.FirstName} {user.LastName}")
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

        [HttpGet("GetUsers")]
        public async Task<ActionResult<User>> Getusers()
        {
            return Ok(await _authContext.Users.ToListAsync());
        }
            

    }
}
