using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace APIFAC.Models
{
    public class Detalle
    {
        [Key]
        public int Id { get; set; }

        public int IdFactura { get; set; }

        [Column(TypeName = "VARCHAR(255)")]
        public string NombreProducto { get; set; }

        [Column(TypeName = "INT")]
        public int Cantidad { get; set; }

        [Column(TypeName = "DECIMAL(18,2)")]
        public int Precio { get; set; }

        [Column(TypeName = "DECIMAL(18,2)")]
        public int TotalLinea { get; set; }

    }
}
