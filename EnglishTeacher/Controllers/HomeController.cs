using EnglishTeacher.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace EnglishTeacher.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.Title = "Home Page";
         //   DataManager dataManager = new DataManager();
         //   ViewBag.Items = dataManager.GetWords();
            return View();
        }
        //public ActionResult Words(string id)
        //{
        // //   DataManager dataManager = new DataManager();
        // //   ViewBag.Items = dataManager.GetWords();

        // //   return View(dataManager.GetWordById(id));
        //}

        //[HttpGet]
        //[AllowAnonymous]
        //public ActionResult Themes()
        //{
        //    DataManager dataManager = new DataManager();
        //    ViewBag.Themes = dataManager.GetThemes();

        //    return View();
        //}
    }
}
