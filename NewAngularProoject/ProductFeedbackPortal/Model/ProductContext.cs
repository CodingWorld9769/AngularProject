using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Reflection.Emit;

namespace ProductFeedbackPortal.Model
{
    public class ProductContext: DbContext 
    {
        public ProductContext(DbContextOptions<ProductContext> option) : base(option)
        {

        }
        public DbSet<Product> Products { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Review> Reviews { get; set; }
        public DbSet<Seller> sellers { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //config the relation explicitly
        }
    }
}
