using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace APIFAC.Models
{
    public class Factura
    {
        [Key]
        public int Id { get; set; }

        [Column(TypeName = "VARCHAR(255)")]
        public string Nit { get; set; }

        [Column(TypeName = "VARCHAR(255)")]
        public string NombreFactura { get; set; }

        [Column(TypeName = "VARCHAR(255)")]
        public string Fecha { get; set; }

        [Column(TypeName = "INT")]
        public int Estado { get; set; }

        [ForeignKey("IdFactura")]
        public ICollection<Detalle> Detalles { get; set; }
    }
}
