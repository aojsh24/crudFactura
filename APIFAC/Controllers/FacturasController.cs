using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using APIFAC.Models;

namespace APIFAC.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FacturasController : ControllerBase
    {
        private readonly DbConnection _context;

        public FacturasController(DbConnection context)
        {
            _context = context;
        }

        // GET: api/Facturas
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Factura>>> GetFactura([FromQuery] Factura factura)
        {
            /*var query =  _context.Factura.ToListAsync();
            return await query
                .Include(d => d.detalle)
                .ToListAsync();*/

            var query = _context.Factura.Where(f => f.Id.Equals(factura.Id != 0 ? factura.Id : f.Id));
            if (factura.Nit != null)
                query = query.Where(f => f.Nit.Contains(factura.Nit));
            if (factura.NombreFactura != null)
                query = query.Where(f => f.NombreFactura.Contains(factura.NombreFactura));
            if (factura.Fecha != null)
                query = query.Where(f => f.Fecha.Contains(factura.Fecha));
            if (factura.Estado != 0)
                query = query.Where(f => f.Id.Equals(factura.Estado));

            return await query
                .Include(d => d.Detalles)
                .ToListAsync();
        }

        // GET: api/Facturas/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Factura>> GetFactura(int id)
        {
            var factura = await _context.Factura.FindAsync(id);
            factura.Detalles = await _context.Detalle.Where(d => d.IdFactura == id).ToListAsync();

            if (factura == null)
            {
                return NotFound();
            }

            return factura;
        }

        // PUT: api/Facturas/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutFactura(int id, Factura factura)
        {
            if (id != factura.Id)
            {
                return BadRequest();
            }

            _context.Entry(factura).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FacturaExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Facturas
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Factura>> PostFactura(Factura factura)
        {
            _context.Factura.Add(factura);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetFactura", new { id = factura.Id }, factura);
        }

        // DELETE: api/Facturas/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFactura(int id)
        {
            var factura = await _context.Factura.FindAsync(id);
            if (factura == null)
            {
                return NotFound();
            }

            _context.Factura.Remove(factura);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool FacturaExists(int id)
        {
            return _context.Factura.Any(e => e.Id == id);
        }
    }
}
