﻿﻿var grdArray;
var MyData = null;
var fields = [];
class ActivityForm extends React.Component {
    constructor(props) {
        super(props);
        grdArray = GetReportConfiguration("Master");
        var columnDefs = grdArray["$ActivityDetails$"];
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
                actId: 1,
                actName: "",
                actType: ReadDropDownData("Param", "1", true),
                active: ReadDropDownData("Param", '16', true),
                selectedActive: 0,
                selectedType: 0,
                stDate: "",
                endDate: "",
                Fields: [],
                columnDef: columnDefs,
                rowData: records,
                records: ((records == null) ? 0 : records.length),
                ServerMessage: '',
                label: "Save",
                flag: "A",
            };
    }
    handleSubmit(e) {
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
            var d = {
                actId: this.state.actId,
                active: this.state.selectedActive,
                actName: this.state.actName,
                actType: this.state.selectedType,
                wfDate: this.state.stDate,
                wetDate: this.state.endDate,
                reportId: '6',
                flag: this.state.flag,
            }
            $.ajax({
                type: "POST",
                url: this.props.urlPost,
                data: d,
                beforeSend: function () {
                    btnloading("ActivityForm", 'show');
                },
                success: function (data) {
                    btnloading("ActivityForm", 'hide');
                    CallToast(data.msg, data.flag);
                    if (data.flag == "S") {
                        MyData = JSON.parse(data.addParams);
                        this.setState
                            ({
                                actName: "",
                                actType: ReadDropDownData("Param", "1", true),
                                selectedType: 0,
                                stDate: "",
                                endDate: "",
                                active: ReadDropDownData("Param", 16, true),
                                selectedActive: 0,
                                label: "Save",
                                flag: "A"
                            })
                        this.setState({ rowData: MyData });
                        this.setState({ records: MyData.length })

                    }
                }.bind(this),
                error: function (e) {
                    btnloading("ActivityForm", 'hide');
                    alert('Error! Please try again');
                }
            })
            e.preventDefault();
        }
    }
    onChangeactName(value) {
        this.setState({
            actName: value
        });
    }
    onChangeactType(value) {
        this.setState({
            selectedType: value
        });
    }
    onBlurWefDate(value) {
        this.setState({
            stDate: value
        });
    }
    onBlurWetDate(value) {
        this.setState({
            endDate: value
        });
    }
    onChangeActive(value) {
        this.setState({
            selectedActive: value
        });
    }
    handleClick(param) {
        
        var data = JSON.parse(param.currentTarget.getAttribute("dataattr"));
        this.setState
            ({
                actId: data.id,
                actName: data.anm,
                selectedType: data.atyp,
                stDate: data.sDt,
                endDate: data.eDt,
                selectedActive: data.isActive,
                label: "Update",
                flag: "M"

            })
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
    componentDidMount() {
        $('.testClass').on("click", this.handleClick.bind(this));
    }
    componentDidUpdate() {
        $('.testClass').on("click", this.handleClick.bind(this));
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
    //register input controls
    register(field) {
        var s = [];
        s.push(field);
        fields.push(s);
    }
    render() {
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
                           Activity
                        </div>
                        <div className="card-body">
                            <form name='ActivityForm' id="ActivityForm" noValidate onSubmit={this.handleSubmit.bind(this)}>
                                <ul className="einrform">
                                    <li>
                                        <CreateInput type={'text'} value={this.state.actName} label={'Activity Name'} name={'actName'} htmlFor={'actName'} isrequired={true}
                                        onChange={this.onChangeactName.bind(this)} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                    </li>
                                    <li>
                                        <CreateInput type={'ddl'} value={this.state.selectedType} data={this.state.actType} label={'Activity Type'} name={'actType'} htmlFor={'actType'} isrequired={true}
                                            onChange={this.onChangeactType.bind(this)} keyId={'PARAM_ID'} keyName={'PARAM_NAME'} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                    </li>
                                    <li>
                                        <CreateInput type={'date'} value={this.state.stDate} id={'stDate'} label={'Start Date'} name={'stDate'} htmlFor={'stDate'} isrequired={true}
                                            className={'startDate form-control'} onBlur={this.onBlurWefDate.bind(this)} onComponentMounted={this.register} messageRequired={'required.'} />
                                    </li>
                                    <li>
                                        <CreateInput type={'date'} value={this.state.endDate} id={'endDate'} label={'End Date'} name={'endDate'} htmlFor={'endDate'} isrequired={true}
                                            className={'endDate form-control'} onBlur={this.onBlurWetDate.bind(this)} onComponentMounted={this.register} messageRequired={'required.'} />
                                    </li>
                                    <li>
                                        <CreateInput type={'ddl'} value={this.state.selectedActive} data={this.state.active} label={'Status'} name={'active'} htmlFor={'active'} isrequired={true}
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

ReactDOM.render(<ActivityForm urlPost="/Master/Activity" />, document.getElementById('activityform'));
