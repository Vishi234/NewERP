using ERP.Models.Bal.Login;
using ERP.Models.Entity;
using System.Web.Mvc;
using System.Web.Script.Serialization;

namespace ERP.Controllers
{
    public class AuthController : Controller
    {
        // GET: Auth
        public ActionResult Login()
        {
            return View();
        }
        public ActionResult Logout()
        {
            Session.Abandon();
            return RedirectToAction("Login");
        }
        [HttpGet]
        public ActionResult Redirect(string jsonData)
        {
            JavaScriptSerializer serializer = new JavaScriptSerializer();
            UserEntity objCustomer = new UserEntity();
            objCustomer = (UserEntity)Session["UserDetails"];
            var model = serializer.Deserialize<UserEntity>(jsonData);
            objCustomer.customerId = model.customerId;
            objCustomer.customerCode = model.customerCode;
            objCustomer.customerName = model.customerName;
            objCustomer.address = model.address;
            objCustomer.city = model.city;
            objCustomer.mobile = model.mobile;
            objCustomer.website = model.website;
            objCustomer.faxNo = model.faxNo;
            objCustomer.cEmail = model.cEmail;
            objCustomer.panNo = model.panNo;
            objCustomer.cActive = model.cActive;
            objCustomer.state = model.state;
            objCustomer.pinCode = model.pinCode;
            objCustomer.cWef = model.cWef;
            objCustomer.cWet = model.cWet;
            Session["UserDetails"] = objCustomer;
            return RedirectToAction("Overview", "Dashboard");
        }

        [HttpPost]
        public JsonResult Login(string email, string password)
        {
            CommonLogin objLogin = new CommonLogin();
            return Json(objLogin.CheckLogin(email, password));
        }
    }
}