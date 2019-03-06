function CallToast(message, flag) {
    var heading = ((flag == 'F') ? "Error" : ((flag == 'V') ? "Information" : "Success"));
    var icon = ((flag == 'F') ? "error" : ((flag == 'V') ? "info" : "success"));
    $.toast({
        heading: heading,
        text: message,
        icon: icon,
        position: 'top-right',
        hideAfter: 3000,
        stack: false
    })

}
function GetReportConfiguration(module) {
    var url = '/Content/DynamicJs/' + module + '.js';
    var grdarray = '';
    $.ajax({
        url: url,
        dataType: 'script',
        async: false,
        success: function (result) {
            var str = "get" + module + "GridSettings";
            var func = window[str];
            if (typeof func === "function") grdarray = func();

        },
    });
    return grdarray;
}
function GetJsonData(path) {
    var resData = new Object();
    $.ajax(
        {
            url: path,
            type: 'get',
            dataType: 'json',
            async: false,
            success: function (response) {
                resData = response;
            },
            error: function (xhr, status, error) {

            }
        })
    return resData;
}
function ReadDropDownData(key, customerId, isParam) {
    var MyData = null;
    var jsonData = GetJsonData('../../Content/DynamicJs/DropdownData.json');

    if (isParam == false) {
        MyData = $.grep(jsonData[key], function (item, i) {
            return item.CUSTOMER_ID == customerId
        });
    }
    else {
        MyData = $.grep(jsonData[key], function (item, i) {
            return item.PARAM_TYPE == customerId
        });
    }
    return MyData;
}
function ReadLocationData(key, locationType, selectedVal) {
    debugger;
    var MyData = null;
    var jsonData = GetJsonData('../../Content/DynamicJs/DropdownData.json');

    if (locationType == 1) {//1 return country name
        MyData = $.grep(jsonData[key], function (item, i) {
            return item.PARENT_ID == null;
        });
    }
    else if (locationType == 2) {//1 return state name
        MyData = $.grep(jsonData[key], function (item, i) {
            return item.PARENT_ID == selectedVal;
        });
    }
    else {//return city
        MyData = $.grep(jsonData[key], function (item, i) {
            return item.PARENT_ID == selectedVal
        });
    }
    return MyData;
}

