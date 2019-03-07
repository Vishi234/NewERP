﻿var grdArray;
var MyData = null;
var fields = [];
class AcademicYearForm extends React.Component {
    constructor(props) {
        super(props);
        grdArray = GetReportConfiguration("Master");

        var records = JSON.parse(content.addParams);
        var columnDefs = grdArray["$AcademicDetails$"];
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
       // var columnDefs = columns;
        this.state =
            {
                yearId: 1,
                active: ReadDropDownData("Param", '16', true),
                selectedActive: 0,
                yearCode: "",
                academicYear: "",
                wfDate: "",
                wtDate: "",
                Fields: [],
                columnDef: columnDefs,
                rowData: records,
                records: ((records == null) ? 0 : records.length),
                ServerMessage: '',
                label: "Save",
                flag:"A",
            };
        this.handleSubmit = this.handleSubmit.bind(this);

        this.handleClick = this.handleClick.bind(this);


    }
    handleSubmit(e) {
        var validForm = true;
        e.preventDefault();
        fields.forEach(function (field) {
            if (typeof field[0].isValid === "function") {
                debugger;
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
                yearCode: this.state.yearCode,
                academicYear: this.state.academicYear,
                wfDate: this.state.wfDate,
                wtDate: this.state.wtDate,
                yearId: this.state.yearId,
                active: this.state.selectedActive,
                flag: this.state.flag ,
                reportId: 1
            }
            $.ajax({
                type: "POST",
                url: this.props.urlPost,
                data: d,
                beforeSend: function () {
                    btnloading("academicYear", 'show');
                },
                success: function (data) {
                    btnloading("academicYear", 'hide');
                    CallToast(data.msg, data.flag);
                    if (data.flag == "S") {
                        MyData = JSON.parse(data.addParams);
                        this.setState
                            ({
                                yearCode: "",
                                academicYear: "",
                                wfDate: "",
                                wtDate: "",
                                active: ReadDropDownData("Param", 16, true),
                                selectedActive: 0,
                                label: "Save",
                                flag: "A"
                            })
                        this.setState({ rowData: MyData });
                        this.setState({ records: MyData.length })

                    }
                }.bind(this),
                error: function (evt) {
                    btnloading("academicYear", 'hide');
                    alert('Error! Please try again');
                }
            })

            e.preventDefault();
        }
    }
    onChangeCode(value) {
        this.setState({
            yearCode: value
        });
    }
    handleClick(param) {
        debugger;
        var data = JSON.parse(param.currentTarget.getAttribute("dataattr"));
        this.setState
            ({
                yearId:data.id,
                academicYear: data.acYear,
                wfDate: data.wfDate,
                wtDate: data.wtDate,
                selectedActive: data.isActive,
                label: "Update",
                flag:"M"

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

    onChangeYear(value) {
        var validation = new RegExp("[0-9\-]", 'g');
        var foo;
        if (validation.test(value)) {
            foo = value.split("-").join("");
            if (foo.length > 0) {
                foo = foo.match(new RegExp('.{1,4}', 'g')).join("-");
            }
            this.setState({
                academicYear: foo
            });
        }
        else if (value == "") {
            this.setState({
                academicYear: value
            });
        }
    }
    onWefBlur(value) {
        this.setState({
            wfDate: value
        });
    }
    onWetBlur(value) {
        this.setState({
            wtDate: value
        });
    }

    onChangeActive(value) {
        this.setState({
            selectedActive: value
        });
    }
    //register input controls
    register(field) {
        var s = [];
        s.push(field);
        fields.push(s);
    }
    GetData(data) {
        this.setState({ rowData: data });
    }



    render() {
        //Render form
        return (
            <div>
                <div className="block-header container-fluid">
                    <div className="row clearfix">
                        <div className="col-lg-6 col-xs-12 col-sm-4 col-md-6">
                            <h1>Academic Year</h1>
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item">
                                        <a href="javascript:void(0)">Master</a>
                                    </li>
                                    <li className="breadcrumb-item active" aria-current="page">
                                        Academic Year
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
                                        <form name='AcademicYear' id="academicYear" noValidate onSubmit={this.handleSubmit}>
                                            <ul>
                                                <li>
                                                <CreateInput type={'text'} value={this.state.academicYear} label={'Academic Year'} name={'academicYear'} htmlFor={'academicYear'} isrequired={true}
                                                             onChange={this.onChangeYear.bind(this)} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                                </li>
                                                <li>
                                                <CreateInput type={'date'} value={this.state.wfDate} id={'wfDate'} label={'Start Date'} name={'startDate'} htmlFor={'wfDate'} isrequired={true}
                                                             className={'startDate form-control'} onBlur={this.onWefBlur.bind(this)} onComponentMounted={this.register} messageRequired={'required.'} />
                                                </li>
                                                <li>
                                                <CreateInput type={'date'} value={this.state.wtDate} id={'wtDate'} label={'End Date'} name={'endDate'} htmlFor={'wtDate'} isrequired={true}
                                                             className={'endDate form-control'} onBlur={this.onWetBlur.bind(this)} onComponentMounted={this.register} messageRequired={'required.'} />
                                                </li>
                                                <li>
                                                    <CreateInput type={'ddl'} value={this.state.selectedActive} data={this.state.active} label={'Status'} name={'active'} htmlFor={'active'} isrequired={true}
                                                    keyId={'PARAM_ID'} keyName={'PARAM_NAME'} onChange={this.onChangeActive.bind(this)} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                                </li>
                                                <li>
                                                    <button type="submit" className="btn btn-success"><span className="inload hide"><i className="fa fa-spinner fa-spin"></i></span>{this.state.label}</button>

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
ReactDOM.render(<AcademicYearForm urlPost="/Master/Academic" />, document.getElementById('academicform'));
