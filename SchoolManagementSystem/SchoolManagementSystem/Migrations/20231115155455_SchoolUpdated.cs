using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SchoolManagementSystem.Migrations
{
    public partial class SchoolUpdated : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Grades",
                columns: table => new
                {
                    student_id = table.Column<int>(type: "int", nullable: false),
                    gr_t1 = table.Column<int>(type: "int", nullable: false),
                    gr_t2 = table.Column<int>(type: "int", nullable: false),
                    gr_pr = table.Column<int>(type: "int", nullable: false),
                    gr_hw = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Grades", x => x.student_id);
                    table.ForeignKey(
                        name: "FK_Grades_Students_student_id",
                        column: x => x.student_id,
                        principalTable: "Students",
                        principalColumn: "StudentID",
                        onDelete: ReferentialAction.Cascade);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Grades");
        }
    }
}
