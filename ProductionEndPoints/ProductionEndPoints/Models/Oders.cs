namespace ProductionEndPoints.Models
{
    public class Orders 
    {
        public int OrderId { get; set; }

        public string CustomerName { get; set; }

        public DateTime OrderDate { get; set; }

        public int Quantity { get; set; }
        //foreign key to refernce the Product
        public int ProductId { get; set; }
        public Product Product { get; set; }


    }
}
