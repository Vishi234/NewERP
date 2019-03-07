using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ERP.Models.Entity
{
    public class ResultEntity
    {
        public string flag { get; set; }
        public string msg { get; set; }
        public string userType { get; set; }
        public string optionalVal { get; set; }
        public string addParams { get; set; }

    }

    public class customerList {
       public string customerId { get; set; }
       public string customerName { get; set; }
       public string operType { get; set; }
    }
}