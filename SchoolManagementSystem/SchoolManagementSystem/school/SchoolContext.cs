using Microsoft.EntityFrameworkCore;

namespace SchoolManagementSystem.school
{
    public class SchoolContext : DbContext
    {
        public SchoolContext(DbContextOptions<SchoolContext> options) : base(options)
        {

        }

        public DbSet<Student> Students { get; set; }
        public DbSet<Grade> Grades { get; set; }

        public DbSet<School> schools { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<School>().HasKey(g => g.sch_code);
            modelBuilder.Entity<Grade>().HasKey(g => g.student_id);
            modelBuilder.Entity<Grade>().HasOne(g => g.student).WithMany(s => s.Grades).HasForeignKey(g => g.student_id);
        }
    }
}

