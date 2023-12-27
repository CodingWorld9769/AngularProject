using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProductionEndPoints.Models;
using System.ComponentModel;
using System.Security.Cryptography.X509Certificates;

namespace ProductionEndPoints.Controllers
{
    [Route("api/Controller")]
    [ApiController]
    public class ProductionController : Controller
    {

        private readonly ProductionContext _context;

        public ProductionController(ProductionContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("GetProducts")]
        public async Task<IActionResult> Get()
        {
            var products = await _context.Products.ToListAsync();
            return Ok(products);
        }

        [HttpGet]
        [Route("GetProduct/{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var product = await _context.Products.FindAsync(id);
            return Ok(product);



        }

        [HttpPost]
        [Route("AddProduct")]

        public IActionResult Post(Product product)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                _context.Products.Add(product);
                _context.SaveChanges();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }

            return Ok();
        }

        [HttpPut]
        [Route("Updateproduct/{id}")]
        public IActionResult Put(int id, [FromBody] Product Updatedproduct)
        {
            var existingProduct = _context.Products.Find(id);

            if (existingProduct == null)
            {
                return NotFound();

            }
            existingProduct.ProductName = Updatedproduct.ProductName;
            //  existingProduct.ProductId = Updatedproduct.ProductId;
            existingProduct.Orders = Updatedproduct.Orders;
            existingProduct.Price = Updatedproduct.Price;
            existingProduct.Category = Updatedproduct.Category;
            existingProduct.IsAvailable = Updatedproduct.IsAvailable;
            existingProduct.Quantity = Updatedproduct.Quantity;
            _context.SaveChanges();
            return Ok(existingProduct);
        }


        //Delete product
        [HttpDelete]
        [Route("DeleteProduct/{id}")]

        public IActionResult Delete(int id)
        {
            var product = _context.Products.Find(id);
            if (product == null)
            {
                return NotFound();
            }
            _context.Remove(product);
            _context.SaveChanges();
            return Ok("Deleted Successfully!!");
        }


        [HttpGet]
        [Route("GetOrder")]
        public async Task<IActionResult> GetOrderList()
        {
            var order = await _context.Orders.ToListAsync();
            return Ok(order);
        }

        [HttpGet]
        [Route("GetOrderbyId/{id}")]
        public async Task<IActionResult> GetOrderOfId(int id)
        {
            var order = _context.Orders.Find(id);
            return Ok(order);
        }




        [HttpPost]
        [Route("AddOrder")]
        public IActionResult AddOrder([FromBody] Orders order)
        {

            try
            {
                _context.Orders.Add(order);
                _context.SaveChanges();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }

            return Ok();
        }


        [HttpPut]
        [Route("updateOrder/{id}") ]
        public async Task<IActionResult> updateOrder(int id , [FromBody] Orders Updatedorder)
        {
            var existingOrder = await _context.Orders.FindAsync(id);

            if(existingOrder == null)
            {
                return NotFound();
            }

            existingOrder.CustomerName = Updatedorder.CustomerName;
            existingOrder.OrderDate = Updatedorder.OrderDate;
            existingOrder.ProductId = Updatedorder.ProductId;
            existingOrder.Quantity = Updatedorder.Quantity;

            _context.SaveChanges();
            return Ok();

        }

        [HttpDelete]
        [Route("DeleteOrder/{id}")]
        public IActionResult DeleteOrder(int id)
        {
            var orderToBedelete = _context.Orders.Find(id);
            _context.Orders.Remove(orderToBedelete);
            _context.SaveChanges();
            return Ok();
        }

    }
}
