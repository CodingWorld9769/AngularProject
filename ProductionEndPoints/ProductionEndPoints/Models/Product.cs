namespace ProductionEndPoints.Models
{
    public class Product 
    {
        public int ProductId { get; set; }
        public string ProductName { get; set; }

        public ProductCategory Category { get; set; }

        public float Price { get; set; }

        public bool IsAvailable { get; set; }

        public int Quantity { get; set; }

        //nullable value " ? " 
        public List<Orders> Orders { get; set; } = new List<Orders>();

    }

    public enum ProductCategory
    {
        Electronics=0,
        Clothing,
        Furniture,
        Books

    }
}
