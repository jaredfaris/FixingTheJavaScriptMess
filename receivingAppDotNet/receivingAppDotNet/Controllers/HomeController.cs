using System.Web.Mvc;

namespace receivingAppDotNet.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return RedirectToAction("Index", "Vendor");
        }
    }
}