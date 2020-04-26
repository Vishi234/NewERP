document.addEventListener("DOMContentLoaded", function () {
    $(".top-menu li a").click(function () {
        $(".top-menu li").find("a").removeClass("top-menu-active");
        $(this).addClass("top-menu-active");
    });

    $(".navigation-menu > ul > li").click(function () {
        if ($(this).find(".smenu>ul>li").length > 0) {
            if ($(this).find("a").first().hasClass("click-remove")) {
                var level = $(this).find(".smenu").attr("menu-level");
                $(this).find(".smenu").removeClass(level)
                $(this).find("a").first().removeClass("click-remove");
            }
            else {
                $(".navigation-menu > ul > li").each(function () {
                    var level = $(this).find(".smenu").attr("menu-level");
                    $(this).find(".smenu").removeClass(level)
                    $(this).find("a").first().removeClass("click-remove");
                });
                var level = $(this).find(".smenu").attr("menu-level");
                $(this).find(".smenu").addClass(level)
                $(this).find("a").first().addClass("click-remove");
            }

        }

    });

    $(".user-dtl").click(function () {
        $(this).toggleClass("userinfoactive");
        $(".top-sub-menu").toggleClass("show");
    });

    //$('#selector').val();
    //$('#selector').data('plugin_lwMultiSelect').updateList();
    //$('#selector').data('plugin_lwMultiSelect').selectAll();
    //$('#selector').data('plugin_lwMultiSelect').removeAll(); //remove all selected  items

    $('.chosen-select').chosen();
    $('.openmodal').click(function () {
        $(".modal").modal("hide");
        $($(this).attr("data-target"))
            .prop('class', 'modal fade') // revert to default
            .addClass($(this).data('direction'));
        $($(this).attr("data-target")).modal('show');
    });
    $(".nav-tabs li").click(function () {
        var tabId = $(this).find("a").attr("href");
        $(".nav-tabs>li").removeClass("active");
        $(".nav-tabs>li>a").removeClass("fade in active show");
        $(".tab-content").find("div").removeClass("in active show");
        $(this).addClass("active");
        $(this).find("a").addClass("active show");
        $(tabId).addClass("in active show");
    });
    $(".aclft span:nth-child(1)").click(function () {
        if ($(this).find("svg").hasClass("fa-plus")) {
            $(this).find("svg").removeClass("fa-plus");
            $(this).find("svg").addClass("fa-minus");
            $(".acform").addClass("acformopen");
        }
        else {
            $(this).find("svg").addClass("fa-plus");
            $(this).find("svg").removeClass("fa-minus");
            $(".acform").removeClass("acformopen");
        }
    })
    $(".hider").click(function () {
        if ($(this).hasClass("op")) {
            $(".sidebar").addClass("scol");
            $(".rightcontentsec").addClass("rconcol");
            $(this).removeClass("op");
            $(this).addClass("cls");
        }
        else {
            $(".sidebar").removeClass("scol");
            $(".rightcontentsec").removeClass("rconcol");
            $(this).addClass("op");
            $(this).removeClass("cls");
        }
    });
    $(".f>.lftttl").click(function () {
        $(".rgtfrm").removeClass("rgtfrmexp");
        if ($(this).hasClass("act")) {
            $($(this)[0].parentNode).find(".rgtfrm").removeClass("rgtfrmexp");
            $(this).removeClass("act")
        }
        else {
            $($(this)[0].parentNode).find(".rgtfrm").addClass("rgtfrmexp");
            $(".lftttl").removeClass("act");
            $(this).addClass("act")
        }
    })

})

function btnloading(evt, action) {
    if (action == "show") {
        $("#" + evt).find(".inload").removeClass("hide")
        $("#" + evt).find(':button[type=submit]').prop('disabled', true);
    }
    else {
        $("#" + evt).find(".inload").addClass("hide")
        $("#" + evt).find(':button[type=submit]').prop('disabled', false);
    }
}
function InitializeSelect(name) {
    //$('select[name=' + name + ']').SumoSelect(
    //    {
    //        forceCustomRendering: true,
    //        search: true,
    //        searchText: 'Enter here.'
    //    });
    $('select[name=' + name + ']').chosen();
    $('select[name=' + name + ']').trigger("chosen:updated");
}
function InitializeDate(name) {
    var thisYear = (new Date()).getFullYear();
    var start = new Date("1/1/" + thisYear);
    var defaultStart = moment(start.valueOf());
    $('input[name=' + name + ']').daterangepicker({
        singleDatePicker: true,
        //minDate: moment(start.valueOf()).format("DD-MMM-YYYY"),
        //startDate: moment(start.valueOf()).format("DD-MMM-YYYY"),
        start: moment(),
        locale: { format: 'DD-MMM-YYYY' }
    });
}
function InitializeSelectList(name) {
    $('select[name=' + name + ']').lwMultiSelect({
        addAllText: "Select All",
        removeAllText: "Remove All",
        selectedLabel: "Values accepted",
        maxSelect: 0, //0 = no restrictions
        maxText: '',
    });
}
function ShowCreate() {
    $(".listorg").addClass("slideOutLeft");
    $(".listorg").removeClass("show");
    $(".listorg").addClass("hide");
    setTimeout(function () {
        $(".createorg").removeClass("hide");
        $(".createorg").addClass("show");
        $(".createorg").addClass("slideInRight");
    }, 500)

}
function Back() {
    $(".listorg").animate({ 'margin': '0 auto' });
    $(".listorg").addClass("show");
    $(".listorg").removeClass("hide");
    $(".createorg").animate({ 'margin': '0 auto' });
    $(".createorg").addClass("hide");
    $(".createorg").removeClass("show");
}
function InlineLoading(evt, action) {
    var a = document.getElementById(evt);
    if (action == "Show") {
        a.children[0].classList.remove("hide");
        a.children[0].classList.add("show");
        a.children[0].children[0].classList.add("fa-spin")
        $("#" + evt).attr("disabled", "disabled");
    }
    else {
        a.children[0].classList.remove("show");
        a.children[0].classList.add("hide");
        a.children[0].children[0].classList.remove("fa-spin")
        $("#" + evt).removeAttr("disabled");
    }
}
