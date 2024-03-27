<%@ WebHandler Language="C#" Class="get" %>

using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;

public class get : IHttpHandler {
    
    public void ProcessRequest (HttpContext context) {
       context.Response.ContentType = "text/plain";
            var query = context.Request.QueryString;
            string ret_val = "";
            if (query["type"] == "GET_HIS_DATA") {
                string Spath = context.Server.MapPath("~/maps/");
                ArrayList ls = getDirectory(Spath);
                for (int i = 0; i < ls.Count; i++) {
                    ret_val += ls[i].ToString().Replace(Spath, "") + "|";
                }
            }
            if (query["type"] == "GET_AREA_IMG")
            {
                string Spath = context.Server.MapPath("~/Images/"+query["area"]+"/");
                ret_val = getFiles(Spath);
               
            }
            context.Response.Write(ret_val);
            context.Response.End();
    }
   private string getFiles(string path) { 
        DirectoryInfo folder = new DirectoryInfo(path);
            string filesList = "|";
foreach (FileInfo file in folder.GetFiles("*"))
{
filesList+= file.FullName.Replace(path,"")+"|";
}
            return filesList;
        }
    private ArrayList getDirectory(string path)
        {
            ArrayList list = new ArrayList();

            if (Directory.Exists(path))
            {
                list.AddRange(Directory.GetDirectories(path));
            }
            return list;

          
        }
    public bool IsReusable {
        get {
            return false;
        }
    }

}