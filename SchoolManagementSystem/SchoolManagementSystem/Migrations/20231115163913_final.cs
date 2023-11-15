using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SchoolManagementSystem.Migrations
{
    public partial class final : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "schools",
                columns: table => new
                {
                    sch_code = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    sch_name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    sch_type = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    sch_phone = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    sch_dean_name = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_schools", x => x.sch_code);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "schools");
        }
    }
}
