using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using APIFAC.Models;

namespace APIFAC.Models
{
    public class DbConnection:DbContext
    {
        public DbConnection(DbContextOptions<DbConnection> options) : base(options)
        {

        }
        public DbSet<APIFAC.Models.Factura> Factura { get; set; }
        public DbSet<APIFAC.Models.Detalle> Detalle { get; set; }
        //public DbSet<Factura> Facturas { get; set; }
        //public DbSet<Detalle> DetallesFactura { get; set; }
    }
}
