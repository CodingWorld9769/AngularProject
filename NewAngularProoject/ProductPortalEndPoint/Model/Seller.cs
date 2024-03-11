using System.ComponentModel.DataAnnotations;

namespace ProductPortalEndPoint.Model
{
    public class Seller
    {
        [Key]
        public int SellorId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string ContactInfo { get; set; }

        //Navigation property for products
        public ICollection<Product> Products { get; set; }

    }
}
