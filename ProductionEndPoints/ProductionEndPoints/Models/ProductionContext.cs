using Microsoft.EntityFrameworkCore;

namespace ProductionEndPoints.Models
{
    public class ProductionContext: DbContext
    {
        public ProductionContext(DbContextOptions<ProductionContext> options) : base(options)
        { 

        }

        public DbSet<Product> Products { get; set; }
         
        public DbSet<Orders> Orders { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Orders>().HasKey(x => x.OrderId);
            modelBuilder.Entity<Orders>().HasOne(o => o.Product).WithMany(p => p.Orders).HasForeignKey(o => o.ProductId);


            modelBuilder.Entity<Product>()
             .Property(p => p.Category)
             .HasConversion<string>();

            modelBuilder.Entity<Product>()
                .Property(p => p.ProductId)
                .ValueGeneratedOnAdd();

            base.OnModelCreating(modelBuilder);
        }
    }
}
