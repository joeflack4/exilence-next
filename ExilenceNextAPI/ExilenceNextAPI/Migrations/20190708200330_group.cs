using Microsoft.EntityFrameworkCore.Migrations;

namespace ExilenceNextAPI.Migrations
{
    public partial class group : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Group",
                table: "Connections",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Group",
                table: "Connections");
        }
    }
}
