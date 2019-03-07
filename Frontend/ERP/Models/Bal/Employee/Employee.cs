using DaL;
using ERP.Models.Bal.Common;
using ERP.Models.Entity;
using System;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Security.Cryptography;
using System.Text;
using System.Web;

namespace ERP.Models.Bal.Employee
{
    public class Employee
    {
        string sqlConn = System.Configuration.ConfigurationManager.ConnectionStrings["CS"].ConnectionString;
        UserEntity objUserEntity = UserEntity.GetInstance();


        public ResultEntity AddEmployee(EmployeeEntity employeeEntity)
        {
            ResultEntity result = new ResultEntity();
            try
            {
                UserEntity objUserEntity = UserEntity.GetInstance();
                SqlParameter[] sqlParameter = new SqlParameter[47];

                sqlParameter[0] = new SqlParameter("@EMP_CODE", employeeEntity.empCode);
                sqlParameter[1] = new SqlParameter("@FIRST_NAME", employeeEntity.empFirst);
                sqlParameter[2] = new SqlParameter("@LAST_NAME", employeeEntity.empLast);
                sqlParameter[3] = new SqlParameter("@QUALIFICATION", employeeEntity.empQuali);
                sqlParameter[4] = new SqlParameter("@DEPARTMENT", employeeEntity.empDept);
                sqlParameter[5] = new SqlParameter("@DESIGNATION", employeeEntity.empDesig);
                sqlParameter[6] = new SqlParameter("@EMPLOYEE_TYPE", employeeEntity.empType);
                sqlParameter[7] = new SqlParameter("@JOB_TYPE", employeeEntity.empJType);
                sqlParameter[8] = new SqlParameter("@FATHER_NAME", employeeEntity.empFather);
                sqlParameter[9] = new SqlParameter("@MOTHER_NAME", employeeEntity.empMother);
                sqlParameter[10] = new SqlParameter("@SEX", employeeEntity.empSex);
                sqlParameter[11] = new SqlParameter("@DATE_OF_BIRTH", employeeEntity.empDOB);
                sqlParameter[12] = new SqlParameter("@DATE_OF_JOINING", employeeEntity.empDOJ);
                sqlParameter[13] = new SqlParameter("@SPOOUSE_NAME", employeeEntity.empSpoou);
                sqlParameter[14] = new SqlParameter("@BLOOD_GROUP", employeeEntity.empBGrp);
                sqlParameter[15] = new SqlParameter("@MARITAL_STATUS", employeeEntity.empMStat);
                sqlParameter[16] = new SqlParameter("@NATIONALITY", employeeEntity.empNation);
                sqlParameter[17] = new SqlParameter("@ADDRESS_LINE_1", employeeEntity.empAdres);
                sqlParameter[18] = new SqlParameter("@ADDRESS_LINE_2", employeeEntity.empAdres2);
                sqlParameter[19] = new SqlParameter("@MOBILE_NO", employeeEntity.empMobile);
                sqlParameter[20] = new SqlParameter("@PHONE_NO", employeeEntity.empPhone);
                sqlParameter[21] = new SqlParameter("@STATE", employeeEntity.empState);
                sqlParameter[22] = new SqlParameter("@CITY", employeeEntity.empCity);
                sqlParameter[23] = new SqlParameter("@ZIPCODE", employeeEntity.empZip);
                sqlParameter[24] = new SqlParameter("@L_EMPLOYER_NAME", employeeEntity.preEmp);
                sqlParameter[25] = new SqlParameter("@L_DATE_OF_JOINING", employeeEntity.preDOJ);
                sqlParameter[26] = new SqlParameter("@L_DATE_OF_LEAVING", employeeEntity.preDOL);
                sqlParameter[27] = new SqlParameter("@L_PHONE", employeeEntity.prePhone);
                sqlParameter[28] = new SqlParameter("@L_EXPERIENCE", employeeEntity.empExpre);
                sqlParameter[29] = new SqlParameter("@L_REASON", employeeEntity.empResLeav);
                sqlParameter[30] = new SqlParameter("@L_SALARY", employeeEntity.preSal);
                sqlParameter[31] = new SqlParameter("@SUBJECTS", employeeEntity.empSub);
                sqlParameter[32] = new SqlParameter("@BANK_NAME", employeeEntity.empBank);
                sqlParameter[33] = new SqlParameter("@BANK_ACCOUNT", employeeEntity.empAccNo);
                sqlParameter[34] = new SqlParameter("@IFSC_CODE", employeeEntity.empIFSC);
                sqlParameter[35] = new SqlParameter("@ADDHAR_NO", employeeEntity.empAdhar);
                sqlParameter[36] = new SqlParameter("@PF_NUMBER", employeeEntity.empPF);
                sqlParameter[37] = new SqlParameter("@SALARY", employeeEntity.empSalary);
                sqlParameter[38] = new SqlParameter("@LOGIN_ID", employeeEntity.empLogin);
                sqlParameter[39] = new SqlParameter("@PASSWORD", employeeEntity.empPwd);
                sqlParameter[40] = new SqlParameter("@ROLE_ID", employeeEntity.empRole);
                sqlParameter[41] = new SqlParameter("@ACCOUNT_STATUS", employeeEntity.empAccStat);
                sqlParameter[42] = new SqlParameter("@CUSTOMER_ID", Convert.ToInt32(objUserEntity.customerId));
                sqlParameter[43] = new SqlParameter("@USER_ID", objUserEntity.userId);
                //sqlParameter[16] = new SqlParameter("@P_IMG_PATH", employeeEntity.imgPath);
                sqlParameter[44] = new SqlParameter("@OPER_TYPE", employeeEntity.flag);

                sqlParameter[45] = new SqlParameter("@FLAG", SqlDbType.Char);
                sqlParameter[45].Direction = ParameterDirection.Output;
                sqlParameter[45].Size = 1;
                sqlParameter[46] = new SqlParameter("@MSG", SqlDbType.NVarChar);
                sqlParameter[46].Direction = ParameterDirection.Output;
                sqlParameter[46].Size = 500;

                DataSet ds = new DataSet();
                int count = SqlHelper.ExecuteNonQuery(sqlConn, CommandType.StoredProcedure, "SP_MANAGE_EMPLOYEE", sqlParameter);
                result.flag = sqlParameter[45].Value.ToString();
                result.msg = sqlParameter[46].Value.ToString();

                //if (result.flag.ToUpper() == "S")
                //{
                //    if (count >0)
                //    {
                //        if (ds.Tables[0].Rows.Count > 0)
                //        {
                //            result.addParams = CommonFunc.DtToJSON(ds.Tables[0]);
                //        }
                //    }
                //}

                return result;
            }
            catch (Exception ex)
            {
                Excep.WriteException(ex);
                return result;
            }
        }
        public ResultEntity GetEmployee(EmployeeEntity employeeEntity)
        {
            ResultEntity result = new ResultEntity();
            try
            {
                UserEntity objUserEntity = UserEntity.GetInstance();

                SqlParameter[] sqlParameter = new SqlParameter[11];
                string empFullName = employeeEntity.empFirst + employeeEntity.empLast;
                sqlParameter[0] = new SqlParameter("@EMP_CODE", employeeEntity.empCode);
                sqlParameter[1] = new SqlParameter("@EMPLOYEE_NAME", empFullName);
                sqlParameter[2] = new SqlParameter("@DEPARTMENT", employeeEntity.empDept);
                sqlParameter[3] = new SqlParameter("@DESIGNATION", employeeEntity.empDesig);
                sqlParameter[4] = new SqlParameter("@EMPLOYEE_TYPE", employeeEntity.empType);
                sqlParameter[5] = new SqlParameter("@STATE", employeeEntity.empState);
                sqlParameter[6] = new SqlParameter("@CITY", employeeEntity.empCity);
                sqlParameter[7] = new SqlParameter("@LOGIN_ID", employeeEntity.empLogin);
                sqlParameter[8] = new SqlParameter("@ROLE", employeeEntity.empRole);
                sqlParameter[9] = new SqlParameter("@CUSTOMER_ID", Convert.ToInt32(objUserEntity.customerId));
                sqlParameter[10] = new SqlParameter("@REPORT_ID", Convert.ToInt32(employeeEntity.reportId));
                DataSet ds = new DataSet();
                ds = SqlHelper.ExecuteDataset(sqlConn, CommandType.StoredProcedure, "SP_GET_EMPLOYEE_DETAILS", sqlParameter);
                if (ds != null)
                {
                    if (ds.Tables[0].Rows.Count > 0)
                    {
                        result.addParams = CommonFunc.DtToJSON(ds.Tables[0]);
                    }
                }
                return result;
            }
            catch (Exception ex)
            {
                Excep.WriteException(ex);
                return result;
            }
        }
        //public ResultEntity AddUserContact(EmployeeEntity employeeEntity, string customerId, string userid)
        //    {
        //        ResultEntity result = new ResultEntity();
        //        try
        //        {
        //            SqlParameter[] sqlParameter = new SqlParameter[14];
        //            sqlParameter[0] = new SqlParameter("@P_USER_ADDRESS", employeeEntity.address);
        //            sqlParameter[1] = new SqlParameter("@P_USER_COUNTRY", employeeEntity.country);
        //            sqlParameter[2] = new SqlParameter("@P_USER_CITY", employeeEntity.city);
        //            sqlParameter[3] = new SqlParameter("@P_USER_STATE", employeeEntity.state);
        //            sqlParameter[4] = new SqlParameter("@P_USER_PINCODE", employeeEntity.pinCode);
        //            sqlParameter[5] = new SqlParameter("@P_USER_PHONE", employeeEntity.phone);
        //            sqlParameter[6] = new SqlParameter("@P_USER_MOBILE", employeeEntity.mobile);
        //            sqlParameter[7] = new SqlParameter("@P_USER_EMAIL", employeeEntity.email);
        //            sqlParameter[8] = new SqlParameter("@OPER_TYPE", employeeEntity.flag);
        //            sqlParameter[9] = new SqlParameter("@P_CUSTOMER_ID", customerId);
        //            sqlParameter[10] = new SqlParameter("@P_USER_ID", userid);
        //            sqlParameter[11] = new SqlParameter("@REPORT_ID", Convert.ToInt32(employeeEntity.reportId));
        //            sqlParameter[12] = new SqlParameter("@FLAG", SqlDbType.Char);
        //            sqlParameter[12].Direction = ParameterDirection.Output;
        //            sqlParameter[12].Size = 1;
        //            sqlParameter[13] = new SqlParameter("@MSG", SqlDbType.NVarChar);
        //            sqlParameter[13].Direction = ParameterDirection.Output;
        //            sqlParameter[13].Size = 500;

        //            DataSet ds = new DataSet();
        //            ds = SqlHelper.ExecuteDataset(sqlConn, CommandType.StoredProcedure, "SP_USER_CONTACT_INFO", sqlParameter);
        //            result.flag = sqlParameter[12].Value.ToString();
        //            result.msg = sqlParameter[13].Value.ToString();

        //            if (result.flag.ToUpper() == "S")
        //            {
        //                if (ds != null)
        //                {
        //                    if (ds.Tables[0].Rows.Count > 0)
        //                    {
        //                        result.addParams = CommonFunc.DtToJSON(ds.Tables[0]);
        //                    }
        //                }
        //            }

        //            return result;
        //        }
        //        catch (Exception ex)
        //        {
        //            Excep.WriteException(ex);
        //            return result;
        //        }
        //    }
        //public ResultEntity AddUserAuth(EmployeeEntity employeeEntity, string customerId, string userid)
        //{
        //    ResultEntity result = new ResultEntity();
        //    try
        //    {
        //        SqlParameter[] sqlParameter = new SqlParameter[13];
        //        sqlParameter[0] = new SqlParameter("@P_USERNAME", employeeEntity.Username);
        //        sqlParameter[1] = new SqlParameter("@P_USER_PASSWORD", Encrypt(employeeEntity.password));
        //        sqlParameter[2] = new SqlParameter("@P_USER_DEF_PAGE", employeeEntity.defPage);
        //        sqlParameter[3] = new SqlParameter("@P_USER_ACC_STATUS", employeeEntity.accStatus);
        //        sqlParameter[4] = new SqlParameter("@P_USER_PANCARD", employeeEntity.panCard);
        //        sqlParameter[5] = new SqlParameter("@P_USER_BANK", employeeEntity.bank);
        //        sqlParameter[6] = new SqlParameter("@P_USER_ACC_NO", employeeEntity.accNumber);

        //        sqlParameter[7] = new SqlParameter("@OPER_TYPE", employeeEntity.flag);
        //        sqlParameter[8] = new SqlParameter("@P_CUSTOMER_ID", customerId);
        //        sqlParameter[9] = new SqlParameter("@P_USER_ID", userid);
        //        sqlParameter[10] = new SqlParameter("@REPORT_ID", Convert.ToInt32(employeeEntity.reportId));
        //        sqlParameter[11] = new SqlParameter("@FLAG", SqlDbType.Char);
        //        sqlParameter[11].Direction = ParameterDirection.Output;
        //        sqlParameter[11].Size = 1;
        //        sqlParameter[12] = new SqlParameter("@MSG", SqlDbType.NVarChar);
        //        sqlParameter[12].Direction = ParameterDirection.Output;
        //        sqlParameter[12].Size = 500;

        //        DataSet ds = new DataSet();
        //        ds = SqlHelper.ExecuteDataset(sqlConn, CommandType.StoredProcedure, "SP_USER_AUTH_INFO", sqlParameter);
        //        result.flag = sqlParameter[11].Value.ToString();
        //        result.msg = sqlParameter[12].Value.ToString();

        //        if (result.flag.ToUpper() == "S")
        //        {
        //            if (ds != null)
        //            {
        //                if (ds.Tables[0].Rows.Count > 0)
        //                {
        //                    result.addParams = CommonFunc.DtToJSON(ds.Tables[0]);
        //                }
        //            }
        //        }

        //        return result;
        //    }
        //    catch (Exception ex)
        //    {
        //        Excep.WriteException(ex);
        //        return result;
        //    }
        //}

        //private string Encrypt(string clearText)
        //{
        //    string EncryptionKey = "MAKV2SPBNI99212";
        //    byte[] clearBytes = Encoding.Unicode.GetBytes(clearText);
        //    using (Aes encryptor = Aes.Create())
        //    {
        //        Rfc2898DeriveBytes pdb = new Rfc2898DeriveBytes(EncryptionKey, new byte[] { 0x49, 0x76, 0x61, 0x6e, 0x20, 0x4d, 0x65, 0x64, 0x76, 0x65, 0x64, 0x65, 0x76 });
        //        encryptor.Key = pdb.GetBytes(32);
        //        encryptor.IV = pdb.GetBytes(16);
        //        using (MemoryStream ms = new MemoryStream())
        //        {
        //            using (CryptoStream cs = new CryptoStream(ms, encryptor.CreateEncryptor(), CryptoStreamMode.Write))
        //            {
        //                cs.Write(clearBytes, 0, clearBytes.Length);
        //                cs.Close();
        //            }
        //            clearText = Convert.ToBase64String(ms.ToArray());
        //        }
        //    }
        //    return clearText;
        //}

        //private string Decrypt(string cipherText)
        //{
        //    string EncryptionKey = "MAKV2SPBNI99212";
        //    byte[] cipherBytes = Convert.FromBase64String(cipherText);
        //    using (Aes encryptor = Aes.Create())
        //    {
        //        Rfc2898DeriveBytes pdb = new Rfc2898DeriveBytes(EncryptionKey, new byte[] { 0x49, 0x76, 0x61, 0x6e, 0x20, 0x4d, 0x65, 0x64, 0x76, 0x65, 0x64, 0x65, 0x76 });
        //        encryptor.Key = pdb.GetBytes(32);
        //        encryptor.IV = pdb.GetBytes(16);
        //        using (MemoryStream ms = new MemoryStream())
        //        {
        //            using (CryptoStream cs = new CryptoStream(ms, encryptor.CreateDecryptor(), CryptoStreamMode.Write))
        //            {
        //                cs.Write(cipherBytes, 0, cipherBytes.Length);
        //                cs.Close();
        //            }
        //            cipherText = Encoding.Unicode.GetString(ms.ToArray());
        //        }
        //    }
        //    return cipherText;
        //}

    }
}
