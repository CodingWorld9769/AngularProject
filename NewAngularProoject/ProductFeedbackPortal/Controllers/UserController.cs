using Microsoft.AspNetCore.Mvc;
using ProductFeedbackPortal.Model;

namespace ProductFeedbackPortal.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : Controller
    {
        public readonly ProductContext _productContext;
        public UserController(ProductContext productContext)
        {
            _productContext = productContext;
            
        }


    }
}
