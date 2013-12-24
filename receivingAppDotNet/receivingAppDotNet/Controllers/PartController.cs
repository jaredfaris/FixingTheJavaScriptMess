using System.Linq;
using System.Web.Mvc;
using receivingAppDotNet.DataServices;
using receivingAppDotNet.Models;

namespace receivingAppDotNet.Controllers
{
    public class PartController : Controller
    {
        //
        // GET: /Part/
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult DiscontinuedParts()
        {
            return Json(PartDataService.Parts.Where(x => x.Discontinued).OrderBy(x => x.Name), JsonRequestBehavior.AllowGet);
        }

        public JsonResult CurrentParts()
        {
            return Json(PartDataService.Parts.Where(x => !x.Discontinued).OrderBy(x => x.Name), JsonRequestBehavior.AllowGet);
        }

        //
        // POST: /Part/Create
        [HttpPost]
        public JsonResult Create(Part part)
        {
            try
            {
                part = PartDataService.Add(part);

                return new JsonResult
                {
                    Data = part
                };
            }
            catch
            {
                return null;
            }
        }

        //
        // POST: /Part/Delete/5
        [HttpPost]
        public JsonResult Delete(int id, FormCollection collection)
        {
            try
            {
                PartDataService.Remove(PartDataService.Parts.Find(x => x.Id == id));
            }
            catch
            {
                return null;
            }

            return null;
        }
    }
}
