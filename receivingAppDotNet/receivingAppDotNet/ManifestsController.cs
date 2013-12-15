using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace receivingAppDotNet
{
    public class ManifestsController : Controller
    {
        //
        // GET: /Manifests/
        public ActionResult Index()
        {
            return View();
        }

        //
        // GET: /Manifests/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        //
        // GET: /Manifests/Create
        public ActionResult Create()
        {
            return View();
        }

        //
        // POST: /Manifests/Create
        [HttpPost]
        public ActionResult Create(FormCollection collection)
        {
            try
            {
                // TODO: Add insert logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        //
        // GET: /Manifests/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        //
        // POST: /Manifests/Edit/5
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
        // GET: /Manifests/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        //
        // POST: /Manifests/Delete/5
        [HttpPost]
        public ActionResult Delete(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add delete logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }
    }
}
