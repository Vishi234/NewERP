using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ERP.Models.Entity
{
    public class CustomerEntity
    {
        private static CustomerEntity _instance;
        public CustomerEntity()
        {

        }
        public static CustomerEntity GetInstance()
        {
            if (_instance == null) _instance = new CustomerEntity();
            return _instance;
        }
        public string customerId { get; set; }
        public string customerCode { get; set; }
        public string customerName { get; set; }
        public string address { get; set; }
        public string city { get; set; }
        public string mobile { get; set; }
        public string website { get; set; }
        public string faxNo { get; set; }
        public string cEmail { get; set; }
        public string panNo { get; set; }
        public string cActive { get; set; }
        public string state { get; set; }
        public string pinCode { get; set; }
        public string cWef { get; set; }
        public string cWet { get; set; }
    }
}