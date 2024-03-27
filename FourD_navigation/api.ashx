<%@ WebHandler Language="C#" Class="api" %>

using DCoolWeb.Data;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using ServiceReference1;
using System.Runtime.Serialization;
using System.Runtime.Serialization.Formatters.Binary;
using System.IO;

using DCoolWeb;
using DCoolWeb.Report.xls;
using System.Text;

public class api : IHttpHandler {

    public void ProcessRequest (HttpContext context) {
        //context.Response.ContentType = "text/plain";
        //application/json
        context.Response.ContentType = "application/json";
        string type = "",v_in="",ret_val="";
        try {
            type = context.Request.QueryString["type"].ToString();
        }
        catch (Exception) {
            type = context.Request.Form["type"].ToString();

        }

        string xm = "";

        var forms = context.Request.Form;
        var query = context.Request.QueryString;
        try
        {

            if (query["v_owner"].ToString().Length > 0)
            {

                xm = query["v_owner"];
            }
        }
        catch (Exception ex) { }
        DataTable dss;
        switch (type) {
            case "GET_programs_DETAIL":
                v_in="<v_in><para name=\"v_proc_name\">GET_programs_DETAIL</para>";
                v_in +="<para name=\"v_owner\">"+query["v_owner"]+"</para>";
                v_in +="<para name=\"v_project_id\">"+query["v_project_id"]+"</para> ";
                v_in +="<para name=\"v_phase\">"+query["v_phase"]+"</para>";
                v_in +="</v_in>";
                v_in +="";
                dss = dt(v_in, 1);
                ret_val = Dtb2Json(dss);
                break;
            case "GET_PROJECT_OVERVIEW_DMAIC_DETAIL":
                v_in="<v_in><para name=\"v_proc_name\">GET_PROJECT_OVERVIEW_DMAIC_DETAIL</para>";
                v_in +="<para name=\"v_owner\">"+query["v_owner"]+"</para> ";
                v_in +="<para name=\"v_project_id\">"+query["v_project_id"]+"</para>";
                v_in +="<para name=\"v_phase\">"+query["v_phase"]+"</para></v_in>";
                v_in +="";
                dss = dtitg(v_in, 1); ret_val = Dtb2Json(dss);
                break;
            case "GET_PROJECT_OVERVIEW_MADS_DETAIL":
                v_in="<v_in><para name=\"v_proc_name\">GET_PROJECT_OVERVIEW_MADS_DETAIL</para> ";
                v_in +="<para name=\"v_owner\">"+query["v_owner"]+"</para> ";
                v_in +="<para name=\"v_project_id\">"+query["v_project_id"]+"</para>";
                v_in +="<para name=\"v_phase\">"+query["v_phase"]+"</para></v_in>";
                v_in +="";
                dss = dtitg(v_in, 1);
                ret_val = Dtb2Json(dss);
                break;
            case "get_prog_prod_link":
                 v_in="<v_in><para name=\"v_proc_name\">get_prog_prod_link</para>";
  v_in +="";
  v_in +="                        <para name=\"v_type\">"+query["v_type"]+"</para>";
  v_in +="";
  v_in +="                        <para name=\"v_proj_prod_id\">"+query["v_proj_prod_id"]+"</para>";
  v_in +="";
  v_in +="                        <para name=\"v_owner\">"+query["v_owner"]+"</para>";
  v_in +="";
  v_in +="                        ";
  v_in +="";
  v_in +="             </v_in>";
                   DataSet dtt  = dt_meeting(v_in, 1);
                ret_val = "["+Dtb2Json(dtt.Tables[1])+","+Dtb2Json(dtt.Tables[2])+","+Dtb2Json(dtt.Tables[3])+","+Dtb2Json(dtt.Tables[4])+","+Dtb2Json(dtt.Tables[5])+"]" ;

                    break;

                     case "GET_PROJECT_ALL_CHECKLIST_STATUS":
                      v_in="<v_in><para name=\"v_proc_name\">GET_PROJECT_ALL_CHECKLIST_STATUS</para>";
             
                v_in +="<para name=\"v_project_id\">"+query["v_project_id"]+"</para> ";
             
                v_in +="</v_in>";
                v_in +="";
                dss = dtitg(v_in, 1);
                ret_val = Dtb2Json(dss);
               
                    break;
                      case "get_npe_deck_overview":
                      v_in="<v_in><para name=\"v_proc_name\">get_npe_deck_overview</para>";
             
                v_in +="<para name=\"v_project_id\">"+query["v_project_id"]+"</para> ";
             
                v_in +="</v_in>";
                v_in +="";
                dss = dtnpe(v_in, 1);
                ret_val = Dtb2Json(dss);
               
                    break;




        }





        /////////////////
        ///
        DateTime dtts = DateTime.Now;//HHmmssffff
        string sjc=  string.Format("{0:yyyyMMddHHmmss}", dtts);


        context.Response.Write(ret_val);
        context.Response.End();

    }


    public DataTable dt(string v_in, int ind)
    {
        string v_out = "";
        DataSet ds = new DataProvier().ExecProce<DataSet>("pkg_4d_navigation.select_records", "",DCoolWeb.Data.DbType.Oracle, v_in, v_out, v_out, v_out, v_out, v_out, v_out);
        DataTable tabs = ds.Tables[ind];
        int rows = tabs.Rows.Count;
        return tabs;
    }
        //pkg_circle_desk_meeting.select_records
          public DataSet dt_meeting(string v_in, int ind)
    {
        string v_out = "";
        DataSet ds = new DataProvier().ExecProce<DataSet>("pkg_circle_desk_meeting.select_records", "",DCoolWeb.Data.DbType.Oracle, v_in, v_out, v_out, v_out, v_out, v_out, v_out);
        
        return ds;
    }
         public DataTable dtnpe(string v_in, int ind)
    {
        string v_out = "";
        DataSet ds = new DataProvier().ExecProce<DataSet>("pkg_npe_deck.select_records", "", DCoolWeb.Data.DbType.Oracle, v_in, v_out, v_out, v_out);
        DataTable tabs = ds.Tables[ind];
        int rows = tabs.Rows.Count;
        return tabs;
    }
    public DataTable dtitg(string v_in, int ind)
    {
        string v_out = "";
        DataSet ds = new DataProvier().ExecProce<DataSet>("PKG_TOLL_GATE.select_records", "", DCoolWeb.Data.DbType.Oracle, v_in, v_out, v_out, v_out);
        DataTable tabs = ds.Tables[ind];
        int rows = tabs.Rows.Count;
        return tabs;
    }

    public static string Dtb2Json(DataTable dtb)
    {
        JavaScriptSerializer jss = new JavaScriptSerializer();jss.MaxJsonLength = Int32.MaxValue;
        System.Collections.ArrayList dic = new System.Collections.ArrayList();
        bianjiema b = new bianjiema();
        foreach (DataRow dr in dtb.Rows)
        {

            System.Collections.Generic.Dictionary<string, object> drow = new System.Collections.Generic.Dictionary<string, object>();
            foreach (DataColumn dc in dtb.Columns)
            {
                drow.Add(dc.ColumnName.ToString(),b.j( dr[dc.ColumnName].ToString(),1));
                //加_是因为json的key在不符合变量的命名规则时会引发异常，后期_由前台处理掉。
            }
            dic.Add(drow);

        }
        //序列化  
        return jss.Serialize(dic);
    }
    public bool IsReusable {
        get {
            return false;
        }
    }


}