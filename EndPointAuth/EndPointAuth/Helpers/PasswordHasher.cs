using System.Security.Cryptography;

namespace EndPointAuth.Helpers
{
    public class PasswordHasher
    {
        //we will use RNG crypto service provider
        private static RNGCryptoServiceProvider rng = new RNGCryptoServiceProvider();

        //creating property for hashing a our password
        private static readonly int SaltSize = 16;
        private static readonly int HashSize = 20;
        private static readonly int Iteration = 10000;

        //creating a method for hashing our password
        public static string HashPassword(string password)
        {
            byte[] salt;
            rng.GetBytes(salt = new byte[SaltSize]);
            var key = new Rfc2898DeriveBytes(password,salt , Iteration);
            var hash = key.GetBytes(HashSize);

            var hashBytes = new byte[SaltSize + HashSize];

            Array.Copy(salt,0, hashBytes,0,SaltSize);
            Array.Copy(hash, 0, hashBytes, SaltSize, HashSize);

            var base64Hash = Convert.ToBase64String(hashBytes);


            return base64Hash;
        }

        public static bool VerifyPassword(string password, string base64Hash)
        {
            //convert base64 to byte
            var hashBytes = Convert.FromBase64String(base64Hash);
            var salt = new byte[SaltSize];
            Array.Copy(hashBytes,0, salt,0,SaltSize);

            //get the key
            var key = new Rfc2898DeriveBytes(password,salt , Iteration);
            byte[] hash = key.GetBytes(HashSize);

            for(int i = 0; i < HashSize;i++)
            {
                if (hashBytes[i + SaltSize] != hash[i])
                {
                    return false;
                }
                
            }
            return true;
           
        }



    }
}
