using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using receivingAppDotNet.Models;

namespace receivingAppDotNet.Controllers
{
    public class PartController : Controller
    {

        private static readonly List<Part> Parts = new List<Part>();

        static PartController()
        {
            string[] fakeNames = {"Anchor", 
                                     "Bottle", 
                                     "Bigger Hammer",
                                     "Cog", 
                                     "Everburning Torch",
                                     "Hammer",
                                     "Really Big Hammer",
                                     "Screwdriver",
                                     "Super Big Hammer",
                                     "Unstoppable Hammer", 
                                 };

            for (var i = 0; i < 10; i++)
            {
                Parts.Add(new Part
                {
                    Id = i,
                    Name = fakeNames[i],
                    Weight = i
                });
            }
        }

        //
        // GET: /Part/
        public ActionResult Index()
        {
            return View(Parts.OrderBy(x => x.Name));
        }

        //
        // GET: /Part/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        //
        // GET: /Part/Create
        public ActionResult Create()
        {
            return View();
        }

        //
        // POST: /Part/Create
        [HttpPost]
        public ActionResult Create(Part part)
        {
            try
            {
                Parts.Add(part);

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        //
        // GET: /Part/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        //
        // POST: /Part/Edit/5
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
        // GET: /Part/Delete/5
        public ActionResult Delete(int id)
        {
            var model = Parts.Find(x => x.Id == id);

            return View(model);
        }

        //
        // POST: /Part/Delete/5
        [HttpPost]
        public ActionResult Delete(int id, FormCollection collection)
        {
            try
            {
                Parts.Remove(Parts.Find(x => x.Id == id));

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }
    }
}
