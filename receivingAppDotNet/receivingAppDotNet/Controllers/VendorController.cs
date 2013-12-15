using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using receivingAppDotNet.Models;

namespace receivingAppDotNet.Controllers
{
    public class VendorController : Controller
    {
        private static readonly List<Vendor> Vendors = new List<Vendor>();

        static VendorController()
        {
            string[] fakeNames = {"Acme", 
                                     "Bob's Hardware", 
                                     "CogCo", 
                                     "DisIsAFakeName", 
                                     "Emeryville Supply",
                                     "Fakestown Indisutrial",
                                     "Great Company LTD",
                                     "Having trouble coming up with more fake names INC",
                                     "IM Nearly Out of Ideas Co",
                                     "My Fake Company"
                                 };

            for (var i = 0; i < 10; i++)
            {
                Vendors.Add(new Vendor
                {
                    Id = i,
                    Address1 = String.Format("{0}{0}{0} Main Street", i),
                    City = "Springfield",
                    State = "IL",
                    Name = fakeNames[i],
                    Zip = String.Format("{0}{0}{0}{0}{0}", i)
                });
            }
        }

        //
        // GET: /Vendor/
        public ActionResult Index()
        {
            return View(Vendors.OrderBy(x => x.Name));
        }

        //
        // GET: /Vendor/Details/5
        public ActionResult Details(int id)
        {
            return View();
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
                Vendors.Add(vendor);

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        //
        // GET: /Vendor/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        //
        // POST: /Vendor/Edit/5
        [HttpPost]
        public ActionResult Edit(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add update logic here

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
            var model = Vendors.Find(x => x.Id == id);

            return View(model);
        }

        //
        // POST: /Vendor/Delete/5
        [HttpPost]
        public ActionResult Delete(int id, FormCollection collection)
        {
            try
            {
                Vendors.Remove(Vendors.Find(x => x.Id == id));

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }
    }
}
