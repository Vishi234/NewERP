var SubjectForm = React.createClass({
    getInitialState: function () {
        grdArray = GetReportConfiguration("Master");
        var columnDefs = grdArray["$SubjectDetails$"];
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
        return {
            subjectId: "",
            subjectCode: "",
            subjectName: "",
            shortName: "",
            medium: ReadDropDownData("Param", '18', true),
            subjectType: ReadDropDownData("Param", '19', true),
            active: ReadDropDownData("Param", '16', true),
            selectedActive: 0,
            selectedMedium: 0,
            selectedSubjectType: 0,
            Fields: [],
            columnDef: columnDefs,
            rowData: records,
            records: ((records == null) ? 0 : records.length),
            label: "Save",
            flag: "A",
        }
    },
    handleSubmit: function (e) {
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
            var d = {
                subjectId: this.state.subjectId,
                subjectCode: this.state.subjectCode,
                subjectName: this.state.subjectName,
                shortName: this.state.shortName,
                medium: this.state.selectedMedium,
                activityType: this.state.selectedActivityType,
                subjectType: this.state.selectedSubjectType,
                active: this.state.selectedActive,
                reportId: "5",
                flag: this.state.flag,

            }
            $.ajax({
                type: "POST",
                url: this.props.urlPost,
                data: d,
                beforeSend: function () {
                    btnloading("SubjectForm", 'show');
                },
                success: function (data) {
                    btnloading("SubjectForm", 'hide');
                    CallToast(data.msg, data.flag);
                    if (data.flag == "S") {
                        MyData = JSON.parse(data.addParams);
                        this.setState
                            ({
                                subjectCode: "",
                                subjectName: "",
                                shortName: "",
                                medium: ReadDropDownData("Param", '4', true),
                                activityType: ReadDropDownData("Param", '2', true),
                                subjectType: ReadDropDownData("Param", '5', true),
                                selectedActive: 0,
                                selectedMedium: 0,
                                selectedActivityType: 0,
                                selectedSubjectType: 0,
                                label: "Save",
                                flag: "A",
                            })
                        this.setState({ rowData: MyData });
                    }
                }.bind(this),
                error: function (evt) {
                    btnloading("subjectForm", 'hide');
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
    onChangeCode: function (value) {
        this.setState({
            subjectCode: value
        });
    },
    onChangeName: function (value) {
        this.setState({
            subjectName: value
        });
    },
    onChangeShortName: function (value) {
        this.setState({
            shortName: value
        });
    },
    onChangeMedium: function (value) {
        this.setState({
            selectedMedium: value
        });
    },
    onChangeSubType: function (value) {
        this.setState({
            selectedSubjectType: value
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
                subjectId: data.id,
                subjectCode: data.scde,
                subjectName: data.snm,
                shortName: data.ssnm,
                selectedMedium: data.smed,
                selectedSubjectType: data.styp,
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
                            Subject Management
                        </div>
                        <div className="card-body">
                            <form name='SubjectForm' id="SubjectForm" noValidate onSubmit={this.handleSubmit}>
                                <ul className="einrform">
                                    <li>
                                        <CreateInput type={'text'} value={this.state.subjectCode} label={'Subject Code'} name={'subjectCode'} htmlFor={'subjectCode'} isrequired={true}
                                            onChange={this.onChangeCode} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                    </li>
                                    <li>
                                        <CreateInput type={'text'} value={this.state.subjectName} label={'Subject Name'} name={'subjectName'} htmlFor={'subjectName'} isrequired={true}
                                            onChange={this.onChangeName} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                    </li>
                                    <li>
                                        <CreateInput type={'text'} value={this.state.shortName} label={'Short Name'} name={'shortName'} htmlFor={'shortName'} isrequired={true}
                                            onChange={this.onChangeShortName} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                    </li>
                                    <li>
                                        <CreateInput type={'ddl'} value={this.state.selectedMedium} data={this.state.medium} label={'Medium'} name={'medium'} htmlFor={'medium'} isrequired={true}
                                            keyId={'PARAM_ID'} keyName={'PARAM_NAME'} onChange={this.onChangeMedium} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                    </li>
                                    <li>
                                        <CreateInput type={'ddl'} value={this.state.selectedSubjectType} data={this.state.subjectType} label={'Subject Type'} name={'subjectType'} htmlFor={'subjectType'} isrequired={true}
                                            keyId={'PARAM_ID'} keyName={'PARAM_NAME'} onChange={this.onChangeSubType} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                    </li>
                                    <li>
                                        <CreateInput type={'ddl'} value={this.state.selectedActive} data={this.state.active} label={'Active'} name={'active'} htmlFor={'active'} isrequired={true}
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
});
ReactDOM.render(<SubjectForm urlPost="/Master/Subject" />, document.getElementById('subjectform')); 