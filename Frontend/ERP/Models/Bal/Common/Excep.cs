using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;

namespace ERP.Models.Bal.Common
{
    public class Excep
    {
        public static void WriteException(Exception e)
        {
            string logfileadd = ConfigurationManager.AppSettings["ExceptionLogFile"].ToString();
            using (System.IO.StreamWriter writer = new System.IO.StreamWriter(logfileadd, true))
            {

                writer.WriteLine("Exception :" + e.ToString() + "\r\n");
                writer.WriteLine("Time :" + DateTime.Now.ToString("dd-MMM-yyyy HH:mm:ss") + "\r\n");
                writer.WriteLine("----------------------------------------------------------------------------------------------------------------------");
                writer.Close();
            }

        }
        public static void WriteLogs(string errMsg)
        {
            string logfileadd = ConfigurationManager.AppSettings["ExceptionLogFile"].ToString();
            using (System.IO.StreamWriter writer = new System.IO.StreamWriter(logfileadd, true))
            {
                writer.WriteLine("Log Exception :" + errMsg + "\r\n");
                writer.WriteLine("Time :" + DateTime.Now.ToString("dd-MMM-yyyy HH:mm:ss") + "\r\n");
                writer.Close();
            }

        }
    }
}