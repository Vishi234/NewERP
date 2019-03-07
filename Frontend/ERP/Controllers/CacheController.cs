using ERP.Models.Cache;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ERP.Controllers
{
    public class CacheController : Controller
    {
        // GET: Cache
        public ActionResult Index()
        {
            return View();
        }

        public void RefreshGridSettings()
        {

            GlobalCache gcObj = new GlobalCache();
            gcObj.CreateDynamicGridJS();
        }
        public void RefreshAllDropDown()
        {

            GlobalCache gcObj = new GlobalCache();
            gcObj.RefreshAllDropDown();
        }
        public string GetCommonDDL()
        {
            GlobalCache gcObj = new GlobalCache();
            return (gcObj.GetCommonDDL());
        }
    }
}