using ERP.Models.Entity;
using System;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Security.Cryptography;
using System.Text;
using System.Web;
using System.Configuration;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using Dal;
using ERP.Models.Entity;
using DaL;
using ERP.Models.Bal.Common;
namespace ERP.Models.Bal.Login
{
    public class CommonLogin
    {

        string sqlConn = ConfigurationManager.ConnectionStrings["CS"].ConnectionString;

        public ResultEntity CheckLogin(string email, string password)
        {
            ResultEntity result = new ResultEntity();
            try
            {
                SqlParameter[] sqlParameter = new SqlParameter[5];
                sqlParameter[0] = new SqlParameter("@LOGIN_ID", email);
                sqlParameter[1] = new SqlParameter("@PASSWORD", Encrypt(password));

                sqlParameter[2] = new SqlParameter("@USER_TYPE", SqlDbType.Char);
                sqlParameter[2].Direction = ParameterDirection.Output;
                sqlParameter[2].Size = 50;
                sqlParameter[3] = new SqlParameter("@FLAG", SqlDbType.Char);
                sqlParameter[3].Direction = ParameterDirection.Output;
                sqlParameter[3].Size = 1;
                sqlParameter[4] = new SqlParameter("@MSG", SqlDbType.NVarChar);
                sqlParameter[4].Direction = ParameterDirection.Output;
                sqlParameter[4].Size = 200;
                DataSet ds = new DataSet();
                ds = SqlHelper.ExecuteDataset(sqlConn, CommandType.StoredProcedure, "SP_CHECK_LOGIN", sqlParameter);
                result.flag = sqlParameter[3].Value.ToString();
                result.msg = sqlParameter[4].Value.ToString();
                result.userType= sqlParameter[2].Value.ToString();


                UserEntity objUserEntity = UserEntity.GetInstance();

                if (result.flag.ToUpper() == "S")
                {
                    HttpContext.Current.Session["ModuelInfo"] = ds.Tables[0];
                    if (result.userType == "2")
                    {
                        objUserEntity.userId = ds.Tables[1].Rows[0]["USER_ID"].ToString();
                        objUserEntity.firstName = ds.Tables[1].Rows[0]["FIRST_NAME"].ToString();
                        objUserEntity.middleName = ds.Tables[1].Rows[0]["MIDDLE_NAME"].ToString();
                        objUserEntity.lastName = ds.Tables[1].Rows[0]["LAST_NAME"].ToString();
                        objUserEntity.fatherName = ds.Tables[1].Rows[0]["FATHER_NAME"].ToString();
                        objUserEntity.motherName = ds.Tables[1].Rows[0]["MOTHER_NAME"].ToString();
                        objUserEntity.gender = ds.Tables[1].Rows[0]["GENDER"].ToString();
                        objUserEntity.dob = ds.Tables[1].Rows[0]["DATE_OF_BIRTH"].ToString();
                        objUserEntity.course = ds.Tables[1].Rows[0]["COURSE"].ToString();
                        objUserEntity.semester = ds.Tables[1].Rows[0]["SEMESTER"].ToString();
                        objUserEntity.category = ds.Tables[1].Rows[0]["CATEGORY"].ToString();
                        objUserEntity.academicYear = ds.Tables[1].Rows[0]["ACADEMIC_YEAR"].ToString();
                        objUserEntity.admissionDate = ds.Tables[1].Rows[0]["ADMISSION_DATE"].ToString();
                        objUserEntity.isActive = ds.Tables[1].Rows[0]["IS_ACTIVE"].ToString();
                        objUserEntity.accountLocked = ds.Tables[1].Rows[0]["ACCOUNT_LOCKED"].ToString();
                    }
                    else
                    {
                        objUserEntity.userId = ds.Tables[1].Rows[0]["USER_ID"].ToString();
                        objUserEntity.deptId = ds.Tables[1].Rows[0]["DEPARTMENT"].ToString();
                        objUserEntity.desigId = ds.Tables[1].Rows[0]["DESIGNATION"].ToString();
                        objUserEntity.firstName = ds.Tables[1].Rows[0]["FIRST_NAME"].ToString();
                        objUserEntity.middleName = ds.Tables[1].Rows[0]["MIDDLE_NAME"].ToString();
                        objUserEntity.lastName = ds.Tables[1].Rows[0]["LAST_NAME"].ToString();
                        objUserEntity.gender = ds.Tables[1].Rows[0]["GENDER"].ToString();
                        objUserEntity.joinDate = ds.Tables[1].Rows[0]["JOINING_DATE"].ToString();
                        objUserEntity.isActive = ds.Tables[1].Rows[0]["IS_ACTIVE"].ToString();
                        objUserEntity.accountLocked = ds.Tables[1].Rows[0]["ACCOUNT_LOCKED"].ToString();
                        objUserEntity.role = ds.Tables[1].Rows[0]["ROLE"].ToString();

                        
                        //role should be there//gender
                    }

                    if (ds.Tables[2].Rows.Count == 1)
                    {
                        objUserEntity.customerId = ds.Tables[2].Rows[0]["CUSTOMER_ID"].ToString();
                        objUserEntity.customerName = ds.Tables[2].Rows[0]["CUSTOMER_NAME"].ToString();
                        objUserEntity.address = ds.Tables[2].Rows[0]["ADDRESS"].ToString();
                        objUserEntity.city = ds.Tables[2].Rows[0]["CITY"].ToString();
                        objUserEntity.mobile = ds.Tables[2].Rows[0]["MOBILE"].ToString();
                        objUserEntity.website = ds.Tables[2].Rows[0]["WEBSITE"].ToString();
                        objUserEntity.faxNo = ds.Tables[2].Rows[0]["FAX_NO"].ToString();
                        objUserEntity.cEmail = ds.Tables[2].Rows[0]["EMAIL_ADDRESS"].ToString();
                        objUserEntity.panNo = ds.Tables[2].Rows[0]["PAN_NO"].ToString();
                        objUserEntity.cActive = ds.Tables[2].Rows[0]["IS_ACTIVE"].ToString();
                        objUserEntity.state = ds.Tables[2].Rows[0]["STATE"].ToString();
                        objUserEntity.pinCode = ds.Tables[2].Rows[0]["PIN_CODE"].ToString();
 
                    }
                    else
                    {
                        result.addParams = CommonFunc.DtToJSON(ds.Tables[2]);
                    }

                    HttpContext.Current.Session["UserDetails"] = objUserEntity;
                }
                return result;
            }
            catch (Exception ex)
            {
                Excep.WriteException(ex);
                return result;
            }

        }
        private string Encrypt(string clearText)
        {
            string EncryptionKey = "MAKV2SPBNI99212";
            byte[] clearBytes = Encoding.Unicode.GetBytes(clearText);
            using (Aes encryptor = Aes.Create())
            {
                Rfc2898DeriveBytes pdb = new Rfc2898DeriveBytes(EncryptionKey, new byte[] { 0x49, 0x76, 0x61, 0x6e, 0x20, 0x4d, 0x65, 0x64, 0x76, 0x65, 0x64, 0x65, 0x76 });
                encryptor.Key = pdb.GetBytes(32);
                encryptor.IV = pdb.GetBytes(16);
                using (MemoryStream ms = new MemoryStream())
                {
                    using (CryptoStream cs = new CryptoStream(ms, encryptor.CreateEncryptor(), CryptoStreamMode.Write))
                    {
                        cs.Write(clearBytes, 0, clearBytes.Length);
                        cs.Close();
                    }
                    clearText = Convert.ToBase64String(ms.ToArray());
                }
            }
            return clearText;
        }

        private string Decrypt(string cipherText)
        {
            string EncryptionKey = "MAKV2SPBNI99212";
            byte[] cipherBytes = Convert.FromBase64String(cipherText);
            using (Aes encryptor = Aes.Create())
            {
                Rfc2898DeriveBytes pdb = new Rfc2898DeriveBytes(EncryptionKey, new byte[] { 0x49, 0x76, 0x61, 0x6e, 0x20, 0x4d, 0x65, 0x64, 0x76, 0x65, 0x64, 0x65, 0x76 });
                encryptor.Key = pdb.GetBytes(32);
                encryptor.IV = pdb.GetBytes(16);
                using (MemoryStream ms = new MemoryStream())
                {
                    using (CryptoStream cs = new CryptoStream(ms, encryptor.CreateDecryptor(), CryptoStreamMode.Write))
                    {
                        cs.Write(cipherBytes, 0, cipherBytes.Length);
                        cs.Close();
                    }
                    cipherText = Encoding.Unicode.GetString(ms.ToArray());
                }
            }
            return cipherText;
        }
    }
}