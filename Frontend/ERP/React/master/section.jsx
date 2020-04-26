
var grdArray;
var MyData = null;
var fields = [];
var operationFlag = 'A';
class SectionForm extends React.Component {
    constructor(props) {
        super(props);
        grdArray = GetReportConfiguration("Master");

        var records = JSON.parse(content.addParams);
        var columnDefs = grdArray["$SectionDetails$"];

        for (var i = 0; i < columnDefs.length; i++) {
            if (columnDefs[i].cellRenderer) {
                if (columnDefs[i].cellRenderer == "CreateEdit") {
                    columnDefs[i].cellRenderer = this.CreateEdit;
                }
                else if (columnDefs[i].cellRenderer == "CreateActive") {
                    columnDefs[i].cellRenderer = this.CreateActive;
                }
            }
        }
        this.state =
            {
            sectionId:0,
                course: ReadDropDownData("Course", $("#hfCustomerId").val(), false),
                semester: [],
                sectionName: ReadDropDownData("Param", '3', true),
                selectedActive: 0,
                Fields: [],
                selectCourse: 0,
                selectSemester: 0,
                selectSectionName: 0,
                columnDef: columnDefs,
                rowData: records,
                label: "Save",
                active: ReadDropDownData("Param", '16', true),
                records: ((records == null) ? 0 : records.length),
            };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClick = this.handleClick.bind(this);

    }

    CreateActive(params) {

        var html = "";
        var domElement = "";
        if ((params.data.isActive).trim() == 70) {
            html = '<span style="margin-top: 5px;padding: 6px 20px;" class="badge badge-pill badge-success">Active</span>'
        }
        else if ((params.data.isActive).trim() == 71) {
            html = '<span style="margin-top: 5px;padding: 6px 15px;" class="badge badge-pill badge-danger">In-Active</span>'
        }
        else {
            html = '<span style="margin-top: 5px;padding: 6px 10px;" class="badge badge-pill badge-warning">Temporary</span>'
        }

        domElement = document.createElement("div");
        domElement.innerHTML = html;
        return domElement;
    }
    CreateEdit(params) {
        var html = "";
        var domElement = "";
        var jsonObj = JSON.stringify(params.data);
        html = '<div><a class="testClass" href="javascript:void(0)" dataAttr=' + jsonObj + '><img style="height: 16px;margin-top: 5px;margin-left:5px;"  src="../images/icons/edit.png"></img></a></div>';
        domElement = document.createElement("div");
        domElement.innerHTML = html;
        return domElement;
    }
    handleSubmit(e) {
        debugger;
        e.preventDefault();
        var validForm = true;
        this.state.Fields.forEach(function (field) {
            if (typeof field.isValid === "function") {
                var validField = field.isValid(field.refs[field.props.name]);
                validForm = validForm && validField;
            }
        });
        //after validation complete post to server
        if (validForm) {
            var d =
                {
                    sectionId: this.state.sectionId,
                    courseId: this.state.selectCourse,
                    semesterId: this.state.selectSemester,
                    sectionName: this.state.selectSectionName,
                    isActive: this.state.selectedActive,
                    reportId: "4",
                    operType: operationFlag
                }
            $.ajax({
                type: "POST",
                url: '/Master/SaveSectionDetails',
                data: d,
                beforeSend: function () {
                    btnloading("SectionForm", 'show');
                },
                success: function (data) {
                    btnloading("SectionForm", 'hide');
                    CallToast(data.msg, data.flag);
                    if (data.flag == "S") {
                        debugger;
                        MyData = JSON.parse(data.addParams);
                        operationFlag = "A";
                        this.setState
                            ({
                                course: ReadDropDownData("Course", $("#hfCustomerId").val(), false),
                                semester: [],
                                sectionName: ReadDropDownData("Param", '3', true),
                                selectCourse: 0,
                                selectSemester: 0,
                                selectSectionName: 0,
                                active: ReadDropDownData("Param", 16, true),
                                selectedActive: 0,
                                label: "Save",
                                flag: "A"
                            })
                        this.setState({ rowData: MyData });
                    }

                }.bind(this),
                error: function (e) {
                    console.log(e);
                    btnloading("SectionForm", 'hide');
                    alert('Error! Please try again');
                }
            })
            e.preventDefault();
        }
    }
    onChangeCourse(value)
    {
        debugger;
        var obj = [];
        var semester = 0;
        var jsonData = ReadDropDownData("Course", $("#hfCustomerId").val(), false);
        for (var i = 0; i < jsonData.length; i++) {
            if (jsonData[i].COURSE_ID == value) {
                semester = jsonData[i].NO_OF_SEMESTER
            }
        }
          for (var i = 1; i <= semester; i++) {
            data = {};
            data.SEMESTER_ID = i;
            obj.push(data);
        }
        this.setState({
            semester: obj
        });
        this.setState({
            selectCourse: value
        });
    }
    handleClick(param) {
        var obj = []; var semester = 0;
        var gridData = JSON.parse(param.currentTarget.getAttribute("dataattr"));
        courseEdit = ReadDropDownData("Course", $("#hfCustomerId").val(), false);
        for (var i = 0; i < courseEdit.length; i++) {
            if (courseEdit[i].COURSE_ID == gridData.courseId) {
                semester = courseEdit[i].NO_OF_SEMESTER;
            }
        }
        for (var i = 1; i <= semester; i++) {
            data = {};
            data.SEMESTER_ID = i;
            obj.push(data);
        }
        this.setState({ semester: obj });

        operationFlag = "M";
      //  editSectionId = gridData.secId;

        //this.setState({
        //    secId: gridData.secId;
        //})

        this.setState
            ({

                sectionId: gridData.secId,
                selectCourse: gridData.courseId,
                selectSemester: gridData.semId,
                selectSectionName: gridData.secName,
                selectedActive: gridData.isActive,
                label: "Update",
                operType: operationFlag
            })



    }
    componentDidMount() {
        $('.testClass').on("click", this.handleClick.bind(this));
    }
    componentDidUpdate() {
        $('.testClass').on("click", this.handleClick.bind(this));
    }
    onChangeActive(value) {
        this.setState({
            selectedActive: value
        });
    }
    register(field) {
        var s = [];
        s.push(field);
        fields.push(s);
    }
    GetData(data) {
        this.setState({ rowData: data });
    }
    onChangeSemester(value) {
        this.setState({
            selectSemester: value
        });
    }
    onChangSectioneName(value) {
        this.setState({
            selectSectionName: value
        });
    }

    render() {
        return (
            <div>
                <div className="esubmenu">
                    <ul className="breadcrumb float-left">
                        <li><a href="#">Home /</a></li>
                        <li><a href="#">Pictures /</a></li>
                        <li><a href="#">Summer 15 /</a></li>
                        <li><a href="#" className="active">Summer 15</a></li>
                    </ul>
                    <div className="ever float-right">
                        <span>Version : 0.0.1</span>
                    </div>
                </div>
                <div className="pagebody">
                    <div className="einrformbase card p-4">
                        <div className="card-title">
                            Academic Year
                        </div>
                        <div className="card-body">
                            <form name='SectionForm' id="SectionForm" noValidate onSubmit={this.handleSubmit}>
                                <ul className="einrform">
                                    <li>
                                        <CreateInput type={'ddl'} value={this.state.selectCourse} data={this.state.course} label={'Course'} name={'course'} htmlFor={'course'} isrequired={true}
                                            onChange={this.onChangeCourse.bind(this)} keyName={'COURSE_NAME'} keyId={'COURSE_ID'} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                    </li>
                                    <li>
                                        <CreateInput type={'ddl'} value={this.state.selectSemester} data={this.state.semester} label={'Semester'} name={'semester'} htmlFor={'semester'} isrequired={true}
                                            onChange={this.onChangeSemester.bind(this)} keyName={'SEMESTER_ID'} keyId={'SEMESTER_ID'} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                    </li>
                                    <li>
                                        <CreateInput type={'ddl'} value={this.state.selectSectionName} data={this.state.sectionName} label={'Section Name'} name={'sectionName'} htmlFor={'sectionName'} isrequired={true}
                                            onChange={this.onChangSectioneName.bind(this)} keyName={'PARAM_NAME'} keyId={'PARAM_NAME'} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                    </li>
                                    <li>
                                        <CreateInput type={'ddl'} value={this.state.selectedActive} data={this.state.active} label={'Status'} name={'active'} htmlFor={'active'} isrequired={true}
                                            keyId={'PARAM_ID'} keyName={'PARAM_NAME'} onChange={this.onChangeActive.bind(this)} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                    </li>
                                    <li>
                                        <button type="submit" className="btn btn-info"><span className="inload hide"><i className="fa fa-spinner fa-spin"></i></span>{this.state.label}</button>
                                    </li>
                                </ul>
                            </form>
                            <AgGrid columnDef={this.state.columnDef} rowData={this.state.rowData} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<SectionForm urlPost="/Master/Section" />, document.getElementById('sectionform'));