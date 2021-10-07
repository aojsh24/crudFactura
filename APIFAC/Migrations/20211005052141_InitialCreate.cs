using Microsoft.EntityFrameworkCore.Migrations;
using MySql.EntityFrameworkCore.Metadata;

namespace APIFAC.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Factura",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    Nit = table.Column<string>(type: "VARCHAR(255)", nullable: true),
                    NombreFactura = table.Column<string>(type: "VARCHAR(255)", nullable: true),
                    Fecha = table.Column<string>(type: "VARCHAR(255)", nullable: true),
                    Estado = table.Column<int>(type: "INT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Factura", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Detalle",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    IdFactura = table.Column<int>(type: "int", nullable: false),
                    NombreProducto = table.Column<string>(type: "VARCHAR(255)", nullable: true),
                    Cantidad = table.Column<int>(type: "INT", nullable: false),
                    Precio = table.Column<decimal>(type: "DECIMAL(18,2)", nullable: false),
                    TotalLinea = table.Column<decimal>(type: "DECIMAL(18,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Detalle", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Detalle_Factura_IdFactura",
                        column: x => x.IdFactura,
                        principalTable: "Factura",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Detalle_IdFactura",
                table: "Detalle",
                column: "IdFactura");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Detalle");

            migrationBuilder.DropTable(
                name: "Factura");
        }
    }
}
