using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using receivingAppDotNet.DataServices;
using receivingAppDotNet.Models;

namespace receivingAppDotNet.Controllers
{
    public class VendorController : Controller
    {
        //
        // GET: /Vendor/
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult CurrentVendors()
        {
            return Json(VendorDataService.Vendors.OrderBy(x => x.Name), JsonRequestBehavior.AllowGet);
        }

        //
        // POST: /Vendor/Create
        [HttpPost]
        public JsonResult Create(Vendor vendor)
        {
            try
            {
                vendor = VendorDataService.Add(vendor);

                return new JsonResult
                {
                    Data = vendor
                };
            }
            catch
            {
                return null;
            }
        }

        //
        // POST: /Vendor/Delete/5
        [HttpPost]
        public JsonResult Delete(int id, FormCollection collection)
        {
            try
            {
                VendorDataService.Vendors.Remove(VendorDataService.Vendors.Find(x => x.Id == id));
            }
            catch
            {
                return null;
            }

            return null;
        }
    }
}
