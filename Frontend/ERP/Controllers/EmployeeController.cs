using ERP.Models.Bal.Common;
using ERP.Models.Bal.Employee;
using ERP.Models.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ERP.Controllers
{
    [SessionCheck]
    public class EmployeeController : Controller
    {
        
        [HttpPost]
        public ActionResult Registration(EmployeeEntity employeeEntity)
        {
            return Json(new Employee().AddEmployee(employeeEntity));
        }
        public ActionResult Manage()
        {
            EmployeeEntity employeeEntity = new EmployeeEntity();
            employeeEntity.flag = 'G';
            employeeEntity.reportId = "8";
            TempData["EmployeeData"] = new Employee().GetEmployee(employeeEntity);
            return View();
        }
       
    }
}