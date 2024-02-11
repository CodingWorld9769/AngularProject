using System.ComponentModel.DataAnnotations;

namespace EndPointAuth.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }

        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }

        public string Token { get; set; }
        public string Role { get; set; }
        public string? RefreshToken { get; set; }
        public DateTime RefreshTokenExpiryTime { get; set; }

        // i have to generate a password token if the user has token that means he valid user
        // and resetpassword expiry is for setinf time for let say 5 min within 5 min he/she has to reset the password
        public  string? ResetPasswordToken { get; set; }
        public DateTime ResetPasswordExpiry { get; set; }

    }
}
