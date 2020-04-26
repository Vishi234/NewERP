using ERP.Models.Bal.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ERP.Controllers
{
    [SessionCheck]
    public class StudentController : Controller
    {
        // GET: Student
        public ActionResult Admission()
        {
            return View();
        }
        public ActionResult Manage()
        {
            return View();
        }
    }
}