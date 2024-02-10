namespace EndPointAuth.Models.Dto
{
    public class TokenApiDtocs
    {
        //this class will have two things AccessToken // jwt token
        public string AccessToken { get; set; } = string.Empty;//jwt token
        public string RefreshToken { get; set; } = string.Empty;
    }
}
