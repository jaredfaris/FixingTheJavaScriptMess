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
            return View(VendorDataService.Vendors.OrderBy(x => x.Name));
        }

        //
        // GET: /Vendor/Create
        public ActionResult Create()
        {
            return View();
        }

        //
        // POST: /Vendor/Create
        [HttpPost]
        public ActionResult Create(Vendor vendor)
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
        // GET: /Vendor/Delete/5
        public ActionResult Delete(int id)
        {
            var model = VendorDataService.Vendors.Find(x => x.Id == id);

            return View(model);
        }

        //
        // POST: /Vendor/Delete/5
        [HttpPost]
        public ActionResult Delete(int id, FormCollection collection)
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
