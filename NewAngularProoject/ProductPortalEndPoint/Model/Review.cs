using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProductPortalEndPoint.Model
{
    public class Review
    {
        [Key]
        public string ReviewId { get; set; }
        public string Text { get; set; }
        public int Rating { get; set; }

        // Foreign key properties
        [ForeignKey("User")]
        public int UserId { get; set; }
        [ForeignKey("Product")]
        public int ProductId { get; set; }

        // Navigation properties
        public User User { get; set; }
        public Product Product { get; set; }

    }
}
