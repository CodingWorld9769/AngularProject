using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProductPortalEndPoint.Model
{
    public class Product
    {
        [Key]
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public string ProductDescription { get; set; }
        [Column(TypeName = "decimal(18, 2)")]
        public decimal Price { get; set; }

        [ForeignKey("Seller")]
        public int SellerId { get; set; }

        //Navigation property 
        public Seller seller { get; set; }  // navigate from product to seller
        public ICollection<Review> Reviews { get; set;}

    }
}
