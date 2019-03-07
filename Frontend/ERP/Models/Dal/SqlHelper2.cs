using System;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;

//namespace ERP.Models.Dal
//{
//    public class Dal
//    {
//    }
//}


namespace Dal
{
    public sealed class SqlHelper2
    {
        private static SqlDataAdapter adaptr;
        private static SqlConnection conn;
        private static SqlCommand command;
        private static SqlDataReader reader;
        public SqlHelper2()
        {
            adaptr = new SqlDataAdapter();
            conn = new SqlConnection(ConfigurationManager.ConnectionStrings
                    ["CS"].ConnectionString);
        }
        //return dataset to business layer        
        public static DataSet ExecuteDataSet(string commandText, SqlParameter[] param, bool isProcedure)
        {
            command = new SqlCommand();
            command.Connection = conn;

            command.CommandText = commandText;
            DataSet dataset = new DataSet();
            if (isProcedure == false)
            {
                command.CommandType = CommandType.Text;
            }
            else
            {
                command.CommandType = CommandType.StoredProcedure;
            }
            if ((param != null) && (param.Length != 0))
            {
                foreach (SqlParameter p in param)
                {
                    command.Parameters.Add(p);
                }
            }
            adaptr = new SqlDataAdapter();
            adaptr.SelectCommand = (SqlCommand)command;

            adaptr.Fill(dataset);
            command.Dispose();
            return dataset;

        }
        //execute procedure without returning cursor        
        public static  void ExecuteNonQuery(string commandText, SqlParameter[] param, bool isProcedure)
        {
            command = new SqlCommand();
            command.Connection = conn;

            if (conn.State == ConnectionState.Closed)
            {
                conn.Open();
            }
            command.CommandText = commandText;
            if (isProcedure == false)
            {
                command.CommandType = CommandType.Text;
            }
            else
            {
                command.CommandType = CommandType.StoredProcedure;
            }

            if ((param != null) && (param.Length != 0))
            {
                foreach (SqlParameter p in param)
                {
                    command.Parameters.Add(p);
                }
            }
            command.ExecuteNonQuery();
            // string rowsEffected = "a";
            conn.Close();
            command.Dispose();
            //return rowsEffected;
        }
        //return datatable to business layer        
        public static DataTable ExecuteDataTable(string commandText, SqlParameter[] param, bool isProcedure)
        {
            command = new SqlCommand();
            command.Connection = conn;

            command.CommandText = commandText; ;
            DataTable datatable = new DataTable();
            if (isProcedure == false)
            {
                command.CommandType = CommandType.Text;
            }
            else
            {
                command.CommandType = CommandType.StoredProcedure;
            }
            if ((param != null) && (param.Length != 0))
            {
                foreach (SqlParameter p in param)
                {
                    command.Parameters.Add(p);
                }
            }
            adaptr = new SqlDataAdapter();
            adaptr.SelectCommand = (SqlCommand)command;


            adaptr.Fill(datatable);
            command.Dispose();
            return datatable;

        }
        //return datareader to business layer        
        public static SqlDataReader ExecuteReader(string commandText, SqlParameter[] param, bool isProcedure)
        {
            /// <summary>Executes Command and return DataReader </summary>

            if (conn.State == ConnectionState.Closed)
            {
                conn.Open();
            }
            command = new SqlCommand();
            command.CommandText = commandText;
            if (isProcedure == false)
            {
                command.CommandType = CommandType.Text;
            }
            else
            {
                command.CommandType = CommandType.StoredProcedure;
            }

            if ((param != null) && (param.Length != 0))
            {
                foreach (SqlParameter p in param)
                {
                    command.Parameters.Add(p);
                }
            }
            command.Connection = conn;
            return (SqlDataReader)command.ExecuteReader(CommandBehavior.CloseConnection);
        }

        public static DataTable ExecuteSelectQuery(String _query, SqlParameter[] sqlParameter)
        {
            command = new SqlCommand();
            DataTable dataTable = new DataTable();
            dataTable = null;
            DataSet ds = new DataSet();
            try
            {
                if (conn.State == ConnectionState.Closed)
                {
                    conn.Open();
                }
                command.CommandText = _query;
                command.Parameters.AddRange(sqlParameter);
                command.ExecuteNonQuery();
                adaptr.SelectCommand = command;
                adaptr.Fill(ds);
                dataTable = ds.Tables[0];
            }
            catch (SqlException e)
            {
                 return null;
            }
            finally
            {
               // conn.Close;
            }
            return dataTable;
        }

        public static bool ExecuteInsertQuery(String _query, SqlParameter[] sqlParameter)
        {
            command = new SqlCommand();
            try
            {
              //  myCommand.Connection = openConnection();
                command.CommandText = _query;
                command.Parameters.AddRange(sqlParameter);
                adaptr.InsertCommand = command;
                command.ExecuteNonQuery();
            }
            catch (SqlException e)
            {
                
                return false;
            }
            finally
            {
            }
            return true;
        }

        public static bool ExecuteUpdateQuery(String _query, SqlParameter[] sqlParameter)
        {
            command = new SqlCommand();
            try
            {
               // myCommand.Connection = openConnection();
                command.CommandText = _query;
                command.Parameters.AddRange(sqlParameter);
                adaptr.UpdateCommand = command;
                command.ExecuteNonQuery();
            }
            catch (SqlException e)
            {
               
                return false;
            }
            finally
            {
            }
            return true;
        }

    }
}
