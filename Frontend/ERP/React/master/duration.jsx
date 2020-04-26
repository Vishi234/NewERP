var CourseDurationForm = React.createClass({
    getInitialState: function () {
        grdArray = GetReportConfiguration("Master");
        var columnDefs = grdArray["$DurationDetails$"];
        var records = JSON.parse(content.addParams);
        for (var i = 0; i < columnDefs.length; i++) {
            if (columnDefs[i].cellRenderer) {
                if (columnDefs[i].cellRenderer == "CreateEdit") {
                    columnDefs[i].cellRenderer = this.CreateEdit;
                }
                else if (columnDefs[i].cellRenderer == "CreateActive") {
                    columnDefs[i].cellRenderer = this.CreateActive ;
                }
            }
        }
        return {
            durId:0,
            courseId: ReadDropDownData("Course", $("#hfCustomerId").val(),false),
            semester: [],
            academicYear: ReadDropDownData("AcademicYear", $("#hfCustomerId").val(), false),
            active: ReadDropDownData("Param", '16', true),
            selectedActive: 0,
            selectedYear: 0,
            selectedCourse: 0,
            selectedSemester: 0,
            semCount: 0,
            wefDate: "",
            wetDate: "",
            Fields: [],
            label: "Save",
            flag: "A",
            columnDef: columnDefs,
            rowData: records,
            records: ((records == null) ? 0 : records.length),
        }
    },
    handleSubmit: function (e) {
        debugger
        e.preventDefault();
        var validForm = true;
        var validField;
        this.state.Fields.forEach(function (field) {
            if (typeof field.isValid === "function") {
                if (field.props.type == 'ddl') {
                    validField = field.isValid(field.refs.MySelect2);
                } else {
                    validField = field.isValid(field.refs[field.props.name]);
                }
                validForm = validForm && validField;
            }
        });
        //after validation complete post to server
        if (validForm) {
            debugger;
            var d = {
                durId: this.state.durId,
                academicYear: this.state.selectedYear,
                courseId: this.state.selectedCourse,
                semester: this.state.selectedSemester,
                wefDate: this.state.wefDate,
                wetDate: this.state.wetDate,
                active: this.state.selectedActive,
                reportId: 3,
                flag: this.state.flag,

            }
            $.ajax({
                type: "POST",
                url: this.props.urlPost,
                data: d,
                beforeSend: function () {
                    btnloading("DurationForm", 'show');
                },
                success: function (data) {
                    btnloading("DurationForm", 'hide');
                    CallToast(data.msg, data.flag);
                    if (data.flag == "S") {
                        MyData = JSON.parse(data.addParams);
                        this.setState
                            ({
                                courseId: ReadDropDownData("Course", $("#hfCustomerId").val(),false),
                                semester: [],
                                academicYear: ReadDropDownData("AcademicYear", $("#hfCustomerId").val(), false),
                                selectedYear: 0,
                                selectedCourse: 0,
                                selectedSemester: 0,
                                semCount: 0,
                                wefDate: "",
                                wetDate: "",
                                active: ReadDropDownData("Param", '16', true),
                                selectedActive: 0,
                                label: "Save",
                                flag: "A"
                            })
                        this.setState({ rowData: MyData });
                    }
                }.bind(this),
                error: function (evt) {
                    btnloading("DurationForm", 'hide');
                    alert('Error! Please try again');
                }
            })

            e.preventDefault();
        }
    },
    register: function (field) {
        var s = this.state.Fields;
        s.push(field);
        this.setState({
            Fields: s
        })
    },

    onChangeYear: function (value) {
        this.setState({
            selectedYear: value
        });
    },
    onChangeCourse: function (value) {
        var obj = [];
        //var semester = 0;
        var jsonData = ReadDropDownData("Course", $("#hfCustomerId").val(), false);
        for (var i = 0; i < jsonData.length; i++) {
            if (jsonData[i].COURSE_ID == value) {
                data = {};
                data.COURSE_ID = jsonData[i].COURSE_ID;
                data.NO_OF_SEMESTER = jsonData[i].NO_OF_SEMESTER;
                obj.push(data);
            }
        }
        //for (var i = 1; i <= semester; i++) {
        //    data = {};
        //    data.ID = i;
        //    data.NO_SEMESTER = i;
        //    obj.push(data);
        //}
        this.setState({ semester: obj });
        this.setState({
            selectedCourse: value
        });

    },
    onChangeSemester: function (value) {
        this.setState({
            selectedSemester: value
        });
    },
    onBlurWefDate: function (value) {
        this.setState({
            wefDate: value
        });

    },
    onBlurWetDate: function (value) {
        this.setState({
            wetDate: value
        });
    },
    onChangeActive(value) {
        this.setState({
            selectedActive: value
        });
    },
    handleClick(param) {
        debugger;
        var data = JSON.parse(param.currentTarget.getAttribute("dataattr"));
        this.setState
            ({
                durId: data.id,
                selectedYear: data.acYear,
                selectedCourse: data.cnm,
                selectedSemester: data.nsem,
                wefDate: data.sDt,
                wetDate: data.eDt,
                selectedActive: data.isActive,
                label: "Update",
                flag: "M"

            })
    },
    CreateEdit(params) {
        debugger;
        var html = "";
        var domElement = "";
        var jsonObj = JSON.stringify(params.data);

        html = '<div><a class="testClass" href="javascript:void(0)" dataAttr=' + jsonObj + '><img style="height: 16px;margin-top: 5px;margin-left:5px;"  src="../images/icons/edit.png"></img></a></div>';
        domElement = document.createElement("div");
        domElement.innerHTML = html;
        return domElement;
    },
    componentDidMount() {
        $('.testClass').on("click", this.handleClick.bind(this));
    },
    componentDidUpdate() {
        $('.testClass').on("click", this.handleClick.bind(this));
    },
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
    },
    render: function () {
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
                            Course Semester Duration
                        </div>
                        <div className="card-body">
                            <form name='DurationForm' id="DurationForm" noValidate onSubmit={this.handleSubmit}>
                                <ul className="einrform">
                                    <li>
                                        <CreateInput type={'ddl'} value={this.state.selectedYear} data={this.state.academicYear} label={'Academic Year'} name={'academicYear'} htmlFor={'academicYear'} isrequired={true}
                                            keyId={'YEAR_ID'} keyName={'ACADEMIC_YEAR'} onChange={this.onChangeYear} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                    </li>
                                    <li>
                                        <CreateInput type={'ddl'} value={this.state.selectedCourse} data={this.state.courseId} label={'Course'} name={'courseId'} htmlFor={'courseId'} isrequired={true}
                                            keyId={'COURSE_ID'} keyName={'COURSE_NAME'} onChange={this.onChangeCourse} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                    </li>
                                    <li>
                                        <CreateInput type={'ddl'} value={this.state.selectedSemester} data={this.state.semester} label={'Semester'} name={'semester'} htmlFor={'semester'} isrequired={true}
                                            keyId={'COURSE_ID'} keyName={'NO_OF_SEMESTER'} className={'form-control'} onChange={this.onChangeSemester} onComponentMounted={this.register} messageRequired={'required.'} />
                                    </li>
                                    <li>
                                        <CreateInput type={'date'} value={this.state.wefDate} label={'Start Date'} name={'daterangepicker'} htmlFor={'wefDate'} isrequired={true}
                                            className={'form-control'} onBlur={this.onBlurWefDate} onComponentMounted={this.register} messageRequired={'required.'} />
                                    </li>
                                    <li>
                                        <CreateInput type={'date'} value={this.state.wetDate} label={'End Date'} name={'daterangepicker'} htmlFor={'wetDate'} isrequired={true}
                                            className={'form-control'} onBlur={this.onBlurWetDate} onComponentMounted={this.register} messageRequired={'required.'} />
                                    </li>
                                    <li>
                                        <CreateInput type={'ddl'} value={this.state.selectedActive} data={this.state.active} label={'Status'} name={'active'} htmlFor={'active'} isrequired={true}
                                            keyId={'PARAM_ID'} keyName={'PARAM_NAME'} onChange={this.onChangeActive} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
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
});
ReactDOM.render(<CourseDurationForm urlPost="/Master/Duration" />, document.getElementById('durationform'));