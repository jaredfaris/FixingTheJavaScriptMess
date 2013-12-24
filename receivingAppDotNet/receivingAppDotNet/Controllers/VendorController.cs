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
                VendorDataService.Vendors.Add(vendor);

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
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

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }
    }
}
