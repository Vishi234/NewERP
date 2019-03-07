var grdArray;
var MyData = null;
var fields = [];
class MappingForm extends React.Component {
    constructor(props) {
        super(props);
        grdArray = GetReportConfiguration("Master");
        var columnDefs = grdArray["$MappingDetails$"];
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
        this.state =
            {
                mapId: 0,
                active: ReadDropDownData("Param", '16', true),
                selectedActive: 0,
                course: ReadDropDownData("Course", $("#hfCustomerId").val(), false),
                active: ReadDropDownData("Param", 16, true),
                selectedCourseType: 0,
                semester: [],
                subject: ReadDropDownData("Subject", $("#hfCustomerId").val(), false),
                type: ReadDropDownData("Param", "4", true),
                selectedCourse: 0,
                selectedSemester: 0,
                selectedSubject: 0,
                selectedType: 0,
                Fields: [],
                columnDef: columnDefs,
                rowData: records,
                records: ((records == null) ? 0 : records.length),
                // rowData: null,
                ServerMessage: '',
                label: "Save",
                flag: "A",
            };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    handleSubmit(e) {
        debugger;
        e.preventDefault();
        var validForm = true;
        var validField;
        fields.forEach(function (field) {
            if (typeof field[0].isValid === "function") {
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
                mapId: this.state.mapId,
                course: this.state.selectedCourse,
                semester: this.state.selectedSemester,
                subject: this.state.selectedSubject,
                active: this.state.selectedActive,
                reportId: '7',
                flag: this.state.flag,
            }
            $.ajax({
                type: "POST",
                url: this.props.urlPost,
                data: d,
                async: false,
                beforeSend: function () {
                    btnloading("mappingForm", 'show');
                },
                success: function (data) {
                    btnloading("mappingForm", 'hide');
                    CallToast(data.msg, data.flag);
                    if (data.flag == "S") {
                        MyData = JSON.parse(data.addParams);
                        this.setState
                            ({
                                course: ReadDropDownData("Course", $("#hfCustomerId").val(), false),
                                semester: [],
                                subject: ReadDropDownData("Subject", $("#hfCustomerId").val(), false),
                                type: [],
                                selectedCourse: 0,
                                selectedSemester: 0,
                                selectedSubject: 0,
                                selectedType: 0,
                                active: ReadDropDownData("Param", 16, true),
                                selectedCourseType: 0,

                            })
                        this.setState({ rowData: MyData });
                        this.setState({ records: MyData.length })

                    }
                }.bind(this),
                error: function (e) {
                    btnloading("mappingForm", 'hide');
                    alert('Error! Please try again');
                }
            })
        }
    }
    register(field) {
        var s = [];
        s.push(field);
        fields.push(s);
    }
    onChangeCourse(value) {
        debugger;
        var obj = [];
        var semester = 0;
        var jsonData = ReadDropDownData("Course", $("#hfCustomerId").val(), false);
        for (var i = 0; i < jsonData.length; i++) {
            if (jsonData[i].COURSE_ID == value) {
                semester = jsonData[i].NO_OF_SEMESTER;
            }
        }
        for (var i = 1; i <= semester; i++) {
            data = {};
            //data.ID = i;
            data.NO_SEMESTER = i;
            obj.push(data);
        }
        this.setState({ semester: obj });
        this.setState({
            selectedCourse: value
        });
    }
    onChangeSemester(value) {
        this.setState({
            selectedSemester: value
        });
    }
    onChangeSubject(value) {
        this.setState({
            selectedSubject: value
        });
    }
    onChangeType(value) {
        this.setState({
            type: value
        });
    }
    onChangeActive(value) {
        this.setState({
            selectedActive: value
        });
    }
    handleClick(param) {
        debugger;
        var obj = [];
        var gridData = JSON.parse(param.currentTarget.getAttribute("dataattr"));
        courseEdit = ReadDropDownData("Course", $("#hfCustomerId").val(), false);
        for (var i = 0; i < courseEdit.length; i++) {
            if (courseEdit[i].COURSE_ID == gridData.cId) {
                semester = courseEdit[i].NO_OF_SEMESTER;
            }
        }
        for (var i = 1; i <= semester; i++) {
            data = {};
            //data.ID = i;
            data.NO_SEMESTER = i;
            obj.push(data);
        }
        this.setState({ semester: obj });
        this.setState
            ({
                mapId: gridData.id,
                selectedCourse: gridData.cId,
                selectedSemester: gridData.sem,
                selectedSubject: gridData.subId,
                selectedActive: gridData.isActive,
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
    render() {
        //Render form
        return (
            <div>
                <div className="block-header container-fluid">
                    <div className="row clearfix">
                        <div className="col-lg-6 col-xs-12 col-sm-4 col-md-6">
                            <h1>Course Subject Mapping</h1>
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item">
                                        <a href="javascript:void(0)">Master</a>
                                    </li>
                                    <li className="breadcrumb-item active" aria-current="page">
                                        Mapping
                                    </li>
                                </ol>
                            </nav>
                        </div>
                        <div className="col-lg-6 col-xs-12 col-sm-8 col-md-6">
                            <h4 className="text-right font-14">{this.state.records} Record(S)</h4>
                        </div>
                    </div>
                </div>
                <div className="block-body container-fluid">
                    <div className="row clearfix">
                        <div className="col-lg-12 col-xs-12 col-md-12 col-sm-12">
                            <div className="card">
                                <div className="body">
                                    <div className="acform">
                                        <form name='MappingForm' id="MappingForm" noValidate onSubmit={this.handleSubmit}>
                                            <ul>
                                                <li>
                                                    <CreateInput type={'ddl'} value={this.state.selectedCourse} data={this.state.course} label={'Course'} name={'course'} htmlFor={'course'} isrequired={true}
                                                        onChange={this.onChangeCourse.bind(this)} keyId={'COURSE_ID'} keyName={'COURSE_NAME'} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                                </li>
                                                <li>
                                                    <CreateInput type={'ddl'} value={this.state.selectedSemester} data={this.state.semester} label={'Semester'} name={'semester'} htmlFor={'semester'} isrequired={true}
                                                        onChange={this.onChangeSemester.bind(this)} keyId={'NO_SEMESTER'} keyName={'NO_SEMESTER'} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                                </li>
                                                <li>
                                                    <CreateInput type={'ddl'} value={this.state.selectedSubject} data={this.state.subject} label={'Subject'} name={'subject'} htmlFor={'subject'} isrequired={true}
                                                        onChange={this.onChangeSubject.bind(this)} keyId={'SUBJECT_ID'} keyName={'SUBJECT_NAME'} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                                </li>
                                                <li>
                                                    <CreateInput type={'ddl'} value={this.state.selectedActive} data={this.state.active} label={'Active'} name={'active'} htmlFor={'active'} isrequired={true}
                                                        keyId={'PARAM_ID'} keyName={'PARAM_NAME'} onChange={this.onChangeActive.bind(this)} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                                </li>
                                                <li>
                                                    <button type="submit" className="btn btn-success"><span className="inload hide"><i className="fa fa-spinner fa-spin"></i></span> {this.state.label}</button>
                                                </li>
                                            </ul>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div className="card">
                                <div className="body">
                                    <AgGrid columnDef={this.state.columnDef} rowData={this.state.rowData} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
ReactDOM.render(<MappingForm />, document.getElementById('mappingform'));