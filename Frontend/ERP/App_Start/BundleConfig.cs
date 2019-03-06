using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Optimization;

namespace ERP
{
    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js",
                        "~/Scripts/popper.min.js",
                        "~/Scripts/bootstrap.js",
                        "~/Scripts/jquery.validate.js",
                        "~/Scripts/jquery.validate.unobtrusive.js",
                        "~/Scripts/jquery.unobtrusive-ajax.min.js",
                        "~/Scripts/jquery.toast.min.js",
                        "~/Scripts/chosen.jquery.min.js",
                        "~/Scripts/jquery-isotope.min.js",
                        "~/Scripts/moment.min.js",
                        "~/Scripts/daterangepicker.js",
                        "~/Scripts/jquery.lwMultiSelect.js",
                        "~/Scripts/appconfig.js",
                        "~/Scripts/common.js",
                        "~/Scripts/custom.js",
                        "~/Scripts/ag-grid.min.js",
                        "~/Scripts/fontawesome/all.js"
                        ));

            bundles.Add(new ScriptBundle("~/bundles/react").Include(
                         "~/Scripts/react.development.js",
                        "~/Scripts/react-dom.development.js",
                        "~/Scripts/remarkable.min.js",
                        "~/Scripts/prop-types.js",
                        "~/React/common/CommonInputFields.jsx",
                        "~/React/common/AgGridReact.jsx"
                        ));

            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/config")
                        .IncludeDirectory("~/Content/DynamicJs", "*.js", true));

            bundles.Add(new StyleBundle("~/bundles/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/style.css",
                      "~/Content/fontawesome-all.css",
                      "~/Content/jquery.toast.min.css",
                      "~/Content/daterangepicker.css",
                      "~/Content/chosen.css",
                      "~/Content/ag-grid.css",
                      "~/Content/ag-theme-balham.css",
                      "~/Content/jquery.lwMultiSelect.css"));
        }
    }
}