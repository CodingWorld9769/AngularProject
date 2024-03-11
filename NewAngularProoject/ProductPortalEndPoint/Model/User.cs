using System.ComponentModel.DataAnnotations;

namespace ProductPortalEndPoint.Model
{
    public class User
    {
        [Key]
        public int UserId { get; set; } 
        
        public string Username { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }

        //Navigation property for review
        //here the user can give review and it will store the user Id and product
        public ICollection<Review> Reviews { get; set; }
    }
}
