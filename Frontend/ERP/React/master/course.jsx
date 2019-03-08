var grdArray;
var MyData = null;
var fields = [];
class CourseForm extends React.Component {
    constructor(props) {
        super(props);
        grdArray = GetReportConfiguration("Master");
        var columnDefs = grdArray["$CourseDetails$"];
        var records = JSON.parse(content.addParams);
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
   //     var columnDefs = columns;

        this.state =
            {
                courseType: ReadDropDownData("Param", '17', true),
                active: ReadDropDownData("Param", '16', true),
                selectedCourseType: 0,
                selectedActive: 0,
                courseId: 0,
                courseName: "",
                noOfSemester: "",
                Fields: [],
                columnDef: columnDefs,
                rowData: records,
                records: ((records == null) ? 0 : records.length),
                ServerMessage: '',
                label: "Save",
                flag: "A",
            };
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    //resetData() {
    //    this.setState({
    //        courseCode: '',
    //        courseName: '',
    //        noOfSemester: '',
    //    });
    //}
  
    handleSubmit(e) {
        e.preventDefault();
        var validForm = true;
        fields.forEach(function (field) {
            if (typeof field[0].isValid === "function") {
                var validField;
                if (field[0].props.type == 'ddl') {
                    validField = field[0].isValid(field[0].refs.MySelect2);
                } else {
                    validField = field[0].isValid(field[0].refs[field[0].props.name]);
                }
                validForm = validForm && validField;
            }
        });
        //after validation complete post to server
        if (validForm) {
            debugger;
            var d = {
                courserId: this.state.courserId,
                courseName: this.state.courseName,
                noOfSemester: this.state.noOfSemester,
                courseType:this.state.selectedCourseType,
                active: this.state.selectedActive,
                flag: this.state.flag,
                reportId: 2
            }
            $.ajax({
                type: "POST",
                url: this.props.urlPost,
                data: d,
                beforeSend: function () {
                    btnloading("CourseForm", 'show');
                },
                success: function (data) {
                    btnloading("CourseForm", 'hide');
                    CallToast(data.msg, data.flag);
                    if (data.flag == "S") {
                        MyData = JSON.parse(data.addParams);
                        this.setState
                            ({                               
                                courseName: '',
                                noOfSemester: '',
                                active: ReadDropDownData("Param", 16, true),
                                courseType: ReadDropDownData("Param", '17', true),
                                selectedActive: 0,
                                selectedCourseType:0,
                                label: "Save",
                                flag: "A"
                            })
                        this.setState({ rowData: MyData });
                        this.setState({ records: MyData.length })
                    }
                }.bind(this),
                error: function (evt) {
                    btnloading("CourseForm", 'hide');
                    alert('Error! Please try again');
                }
            })

            e.preventDefault();
        }
    }
    onChangeCode(value) {
        this.setState({
            courseCode: value
        });
    }
    onChangeName(value) {
        this.setState({
            courseName: value
        });
    }
    onChangeSemester(value) {
        this.setState({
            noOfSemester: value
        });
    }
    onChangeType(value) {
        this.setState({
            selectedCourseType: value
        });
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
    handleClick(param) {
        debugger;
        var data = JSON.parse(param.currentTarget.getAttribute("dataattr"));
        this.setState
            ({
                selectedCourseType: data.cType,
                courseName: data.cnm,
                noOfSemester: data.nsem,
                courserId: data.id,
                selectedActive: data.isActive,
                label: "Update",
                flag: "M"

            })
    }
    CreateEdit(params) {
        debugger;
        var html = "";
        var domElement = "";
        var jsonObj = JSON.stringify(params.data);

        html = '<div><a class="testClass" href="javascript:void(0)" dataAttr=' + jsonObj + '><img style="height: 16px;margin-top: 5px;margin-left:5px;"  src="../images/icons/edit.png"></img></a></div>';
        domElement = document.createElement("div");
        domElement.innerHTML = html;
        return domElement;
    }
    componentDidMount() {
        $('.testClass').on("click", this.handleClick.bind(this));
    }
    componentDidUpdate() {
        $('.testClass').on("click", this.handleClick.bind(this));
    }
    CreateActive(params) {
        debugger;
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
    render()
    {
        //Render form
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
                            Course Management
                        </div>
                        <div className="card-body">
                            <form name='CourseForm' id="CourseForm" noValidate onSubmit={this.handleSubmit}>
                                <ul className="einrform">
                                    <li>
                                        <CreateInput type={'ddl'} value={this.state.selectedCourseType} data={this.state.courseType} label={'Course Type'} name={'courseType'} htmlFor={'courseType'} isrequired={true}
                                            keyId={'PARAM_ID'} keyName={'PARAM_NAME'} onChange={this.onChangeType.bind(this)} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                    </li>
                                    <li>
                                        <CreateInput type={'text'} value={this.state.courseName} label={'Course Name'} name={'courseName'} htmlFor={'courseName'} isrequired={true}
                                            onChange={this.onChangeName.bind(this)} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                    </li>
                                    <li>
                                        <CreateInput type={'text'} value={this.state.noOfSemester} label={'No. Of Semester'} name={'noOfSemester'} htmlFor={'noOfSemester'} isrequired={true}
                                            className={'form-control'} onChange={this.onChangeSemester.bind(this)} onComponentMounted={this.register} messageRequired={'required.'} />
                                    </li>
                                    <li>
                                        <CreateInput type={'ddl'} value={this.state.selectedActive} data={this.state.active} label={'Active'} name={'active'} htmlFor={'active'} isrequired={true}
                                            keyId={'PARAM_ID'} keyName={'PARAM_NAME'} onChange={this.onChangeActive.bind(this)} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                    </li>
                                    <li>
                                        <button type="submit" className="btn btn-info"><span className="inload hide"><i className="fa fa-spinner fa-spin"></i></span> {this.state.label}</button>
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
ReactDOM.render(<CourseForm urlPost="/Master/Course" />, document.getElementById('courseform'));
