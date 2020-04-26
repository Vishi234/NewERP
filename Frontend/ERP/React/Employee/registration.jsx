var grdArray;
var MyData = null;
var fields = [];
class EmployeeForm extends React.Component {
    constructor(props) {
        super(props);
        grdArray = GetReportConfiguration("Employee");
        var records = JSON.parse(content.addParams);
        var columnDefs = grdArray["$EmployeeDetails$"];
        for (var i = 0; i < columnDefs.length; i++) {
            if (columnDefs[i].cellRenderer) {
                if (columnDefs[i].cellRenderer == "CreateEdit") {
                    columnDefs[i].cellRenderer = this.CreateEdit;
                }
            }
        }
        this.state = {
            empCode: "",
            empFirst: "",
            empLast: "",
            empQuali: "",
            empDept: ReadDropDownData("Param", '7', true),
            empDesig: [],
            empType: ReadDropDownData("Param", '9', true),
            empJType: [],
            empFather: "",
            empMother: "",
            empSex: ReadDropDownData("Param", '12', true),
            empDOB: "",
            empDOJ: "",
            empSpoou: "",
            empBGrp: ReadDropDownData("Param", '10', true),
            empMStat: ReadDropDownData("Param", '11', true),
            empNation: "",
            empAdres: "",
            empAdres2: "",
            empMobile: "",
            empPhone: "",
            empCount: ReadLocationData("Location", 1, ""),
            empState: [],
            empCity: [],
            empZip: "",
            preEmp: "",
            preDOJ: "",
            preDOL: "",
            prePhone: "",
            empExpre: "",
            empResLeav: "",
            preSal: "",
            empSub: ReadDropDownData("Subject", $("#hfCustomerId").val(), false),
            empBank: "",
            empAccNo: "",
            empIFSC: "",
            empAdhar: "",
            empPF: "",
            empSalary: "",
            empLogin: "",
            empPwd: "",
            empCPwd: "",
            empRole: ReadDropDownData("Param", '8', true),
            empAccStat: ReadDropDownData("Param", '1', true),
            selectedDept: 0,
            selectedDesig: 0,
            selectedType: 0,
            selectedJType: 0,
            selectedSex: 0,
            selectedBGrp: 0,
            selectedMat: 0,
            selectedCount: 0,
            selectedState: 0,
            selectedCity: 0,
            selectedRole: 0,
            selectedAccStat: 0,
            selectedSubject: 0,
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
    handleSubmit(e) {

        var validForm = true;
        e.preventDefault();
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
            var d = {
                empCode: this.state.empCode,
                empFirst: this.state.empFirst,
                empLast: this.state.empLast,
                empQuali: this.state.empQuali,
                empDept: this.state.selectedDept,
                empDesig: this.state.selectedDesig,
                empType: this.state.selectedType,
                empJType: this.state.selectedJType,
                empFather: this.state.empFather,
                empMother: this.state.empMother,
                empSex: this.state.selectedSex,
                empDOB: this.state.empDOB,
                empDOJ: this.state.empDOJ,
                empSpoou: this.state.empSpoou,
                empBGrp: this.state.selectedBGrp,
                empMStat: this.state.selectedMat,
                empNation: this.state.empNation,
                empAdres: this.state.empAdres,
                empAdres2: this.state.empAdres2,
                empMobile: this.state.empMobile,
                empPhone: this.state.empPhone,
                empCount: this.state.selectedCount,
                empState: this.state.selectedState,
                empCity: this.state.selectedCity,
                empZip: this.state.empZip,
                preEmp: this.state.preEmp,
                preDOJ: this.state.preDOJ,
                preDOL: this.state.preDOL,
                prePhone: this.state.prePhone,
                empExpre: this.state.empExpre,
                empResLeav: this.state.empResLeav,
                preSal: this.state.preSal,
                empSub: this.state.selectedSubject,
                empBank: this.state.empBank,
                empAccNo: this.state.empAccNo,
                empIFSC: this.state.empIFSC,
                empAdhar: this.state.empAdhar,
                empPF: this.state.empPF,
                empSalary: this.state.empSalary,
                empLogin: this.state.empLogin,
                empPwd: this.state.empPwd,
                empCPwd: this.state.empCPwd,
                empRole: this.state.selectedRole,
                empAccStat: this.state.selectedAccStat,
                flag:this.state.flag,
                reportId: 1
            }
            $.ajax({
                type: "POST",
                url: this.props.urlPost,
                data: d,
                beforeSend: function () {
                    btnloading("EmpRegis", 'show');
                },
                success: function (data) {
                    btnloading("EmpRegis", 'hide');
                    CallToast(data.msg, data.flag);
                    if (data.flag == "S") {
                        MyData = JSON.parse(data.addParams);
                        this.setState
                            ({
                                empCode: "",
                                empFirst: "",
                                empLast: "",
                                empQuali: "",
                                empDept: ReadDropDownData("Param", '7', true),
                                empDesig: [],
                                empType: ReadDropDownData("Param", '9', true),
                                empJType: [],
                                empFather: "",
                                empMother: "",
                                empSex: ReadDropDownData("Param", '12', true),
                                empDOB: "",
                                empDOJ: "",
                                empSpoou: "",
                                empBGrp: ReadDropDownData("Param", '10', true),
                                empMStat: ReadDropDownData("Param", '11', true),
                                empNation: "",
                                empAdres: "",
                                empAdres2: "",
                                empMobile: "",
                                empPhone: "",
                                empCount: ReadLocationData("Location", 1, ""),
                                empState: [],
                                empCity: [],
                                empZip: "",
                                preEmp: "",
                                preDOJ: "",
                                preDOL: "",
                                prePhone: "",
                                empExpre: "",
                                empResLeav: "",
                                preSal: "",
                                empSub: ReadDropDownData("Subject", $("#hfCustomerId").val(), false),
                                empBank: "",
                                empAccNo: "",
                                empIFSC: "",
                                empAdhar: "",
                                empPF: "",
                                empSalary: "",
                                empLogin: "",
                                empPwd: "",
                                empCPwd: "",
                                empRole: ReadDropDownData("Param", '8', true),
                                empAccStat: ReadDropDownData("Param", '1', true),
                                selectedDept: 0,
                                selectedDesig: 0,
                                selectedType: 0,
                                selectedJType: 0,
                                selectedSex: 0,
                                selectedBGrp: 0,
                                selectedMat: 0,
                                selectedCount: 0,
                                selectedState: 0,
                                selectedCity: 0,
                                selectedRole: 0,
                                selectedAccStat: 0,
                            })
                        this.setState({ rowData: MyData });
                        this.setState({ records: MyData.length })

                    }
                }.bind(this),
                error: function (evt) {
                    btnloading("EmpRegis", 'hide');
                    alert('Error! Please try again');
                }
            })

            e.preventDefault();
        }
    }
    onChangeDept(value) {
        this.setState({
            selectedDept: value
        });
    }
    onChangeDesig(value) {
        this.setState({
            selectedDesig: value
        });
    }
    onChangeType(value) {
        this.setState({
            selectedType: value
        });
    }
    onChangeJType(value) {
        this.setState({
            selectedJType: value
        });
    }
    onChangeSex(value) {
        this.setState({
            selectedSex: value
        });
    }
    onChangeBGrp(value) {
        this.setState({
            selectedBGrp: value
        });
    }
    onChangeMStat(value) {
        this.setState({
            selectedMat: value
        });
    }
    onChangeCount(value) {
        var obj = [];
        var empState = 0;
        var jsonData = ReadLocationData("Location", 2, value);

        for (var i = 0; i < jsonData.length; i++) {
            data = {};
            data.STATE_ID = jsonData[i].LOCATION_ID;
            data.STATE_NAME = jsonData[i].LOCATION_NAME;
            obj.push(data);
        }
        this.setState({ empState: obj });
        this.setState({
            selectedCount: value
        });
    }
    onChangeState(value) {
        var obj = [];
        var empCity = 2;
        var jsonData = ReadLocationData("Location", 3, value);

        for (var i = 0; i < jsonData.length; i++) {
            data = {};
            data.CITY_ID = jsonData[i].LOCATION_ID;
            data.CITY_NAME = jsonData[i].LOCATION_NAME;
            obj.push(data);
        }
        this.setState({ empCity: obj });
        this.setState({
            selectedState: value
        });
    }
    onChangeCity(value) {
        this.setState({
            selectedCity: value
        });
    }
    onChangeRole(value) {
        this.setState({
            selectedRole: value
        });
    }
    onChangeAccStat(value) {
        this.setState({
            selectedAccStat: value
        });
    }
    onChangeCode(value) {
        this.setState({
            empCode: value
        });
    }
    onChangeFirst(value) {
        this.setState({
            empFirst: value
        });
    }
    onChangeLast(value) {
        this.setState({
            empLast: value
        });
    }
    onChangeQuali(value) {
        this.setState({
            empQuali: value
        });
    }
    onChangeFather(value) {
        this.setState({
            empFather: value
        });
    }
    onChangeMother(value) {
        this.setState({
            empMother: value
        });
    }
    onDOBBlur(value) {
        this.setState({
            empDOB: value
        });
    }
    onDOJBlur(value) {
        this.setState({
            empDOJ: value
        });
    }
    onChangeSpoou(value) {
        this.setState({
            empSpoou: value
        });
    }
    onChangeNation(value) {
        this.setState({
            empNation: value
        });
    }
    onChangeAdres(value) {
        this.setState({
            empAdres: value
        });
    }
    onChangeAdres2(value) {
        this.setState({
            empAdres2: value
        });
    }
    onChangeMobile(value) {
        this.setState({
            empMobile: value
        });
    }
    onChangePhone(value) {
        this.setState({
            empPhone: value
        });
    }
    onChangeZip(value) {
        this.setState({
            empZip: value
        });
    }
    onChangePreEmp(value) {
        this.setState({
            preEmp: value
        });
    }
    onPreDOJBlur(value) {
        this.setState({
            preDOJ: value
        });
    }
    onPreDOLBlur(value) {
        this.setState({
            preDOL: value
        });
    }
    onChangePrePhone(value) {
        this.setState({
            prePhone: value
        });
    }
    onChangeExpre(value) {
        this.setState({
            empExpre: value
        });
    }
    onChangeLeave(value) {
        this.setState({
            empResLeav: value
        });
    }
    onChangePreSal(value) {
        this.setState({
            preSal: value
        });
    }
    onChangeBank(value) {
        this.setState({
            empBank: value
        });
    }
    onChangeAccNo(value) {
        this.setState({
            empAccNo: value
        });
    }
    onChangeIFSC(value) {
        this.setState({
            empIFSC: value
        });
    }
    onChangeAdhar(value) {
        this.setState({
            empAdhar: value
        });
    }
    onChangePF(value) {
        this.setState({
            empPF: value
        });
    }
    onChangeSalary(value) {
        this.setState({
            empSalary: value
        });
    }
    onChangeLogin(value) {
        this.setState({
            empLogin: value
        });
    }
    onChangePwd(value) {

        this.setState({
            empPwd: value
        });
        var self = this;
        window.setTimeout(function () {
            if (self.state.empCPwd && self.state.empCPwd.length) {
                self.refs.empCPwd.validate(self.state.empCPwd);
            }
        });
    }
    onChangeCPwd(value) {
        this.setState({
            empCPwd: value
        });
    }
    isConfirmedPassword(value) {

        console.log(value, this.state.empPwd, value === this.state.empPwd);
        return (value === this.state.empPwd)

    }
    onChangeSubject(value) {
        this.setState({
            selectedSubject: value
        });
    }
    handleClick(param) {
    var data = JSON.parse(param.currentTarget.getAttribute("dataattr"));
    this.setState
        ({
            empCode: data.empCode,
            empFirst: data.empfname,
            empLast: data.lname,
            empQuali: data.qual,
            selectedDept: data.deptId,
            selectedDesig: data.desigId,
            selectedType: data.empTpId,
            selectedJType: data.empJTpId,
            empFather: data.fName,
            empMother: data.mName,
            selectedSex: data.sex,
            empDOB: data.dob,
            empDOJ: data.doj,
            empSpoou: data.spName,
            selectedBGrp: data.bldGrp,
            selectedMat: data.mStatus,
            empNation: data.nationality,
            empAdres: data.addressLine1,
            empAdres2: data.addressLine2,
            empMobile: data.mobile,
            empPhone: data.pnNo,
            selectedState: data.state,
            selectedCity: data.city,
            empZip: data.zpCode,
            preEmp: data.employer,
            preDOJ: data.lDOJ,
            preDOL: data.lDOL,
            prePhone: data.lPhoneNo,
            empExpre: data.totalExp,
            empResLeav: data.resLeaving,
            preSal: data.lastSalary,
            selectedSubject: data.sbjct,
            empBank: data.bankName,
            empAccNo: data.accNo,
            empIFSC: data.ifsCode,
            empAdhar: data.adNo,
            empPF: data.pfNumber,
            empSalary: data.anPckg,
            empLogin: data.loginId,
            empPwd: data.pass,
            empCPwd: data.pass,
        })
    $("#employee").modal("show");
    }
    CreateEdit(params) {
        var html = "";
        var domElement = "";
        var jsonObj = JSON.stringify(params.data);
        html = "<div><a class='testClass' href='javascript:void(0)' dataAttr='" + jsonObj + "'><img style='height: 16px;margin-top: 5px;margin-left:5px;' src='../images/icons/edit.png'/></a></div>";
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
    register(field) {
        var s = [];
        s.push(field);
        fields.push(s);
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
                        Employee Management
                    </div>
                    <div className="card-body">
                        <div className="efltrform"></div>
                        <div className="action">
                            <ul>
                                <li>
                                    <a href="javascript:void(0)" data-toggle="modal" data-target="#employee" className="btn btn-secondary">
                                        <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                             width="357px" height="357px" viewBox="0 0 357 357" style={{enableBackground:'new 0 0 357 357;' }} xmlSpace="preserve">
                                        <g>
                                        <g id="add">
                                        <path d="M357,204H204v153h-51V204H0v-51h153V0h51v153h153V204z" />
                                        </g>
                                        </g>
                                        <g></g>
                                        <g></g>
                                        <g></g>
                                        <g></g>
                                        <g></g>
                                        <g></g>
                                        <g></g>
                                        <g></g>
                                        <g></g>
                                        <g></g>
                                        <g></g>
                                        <g></g>
                                        <g></g>
                                        <g></g>
                                        <g></g>
                                        </svg>
                                    </a>
                                </li>
                                <li>
                                    <a href="javascript:void(0)" className="btn btn-secondary">
                                        <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                             viewBox="0 0 512 512" style={{enableBackground:'new 0 0 512 512;'}} xmlSpace="preserve">
                                        <g>
                                        <g>
                                        <path d="M382.56,233.376C379.968,227.648,374.272,224,368,224h-64V16c0-8.832-7.168-16-16-16h-64c-8.832,0-16,7.168-16,16v208h-64 c-6.272,0-11.968,3.68-14.56,9.376c-2.624,5.728-1.6,12.416,2.528,17.152l112,128c3.04,3.488,7.424,5.472,12.032,5.472 c4.608,0,8.992-2.016,12.032-5.472l112-128C384.192,245.824,385.152,239.104,382.56,233.376z" />
                                        </g>
                                        </g>
                                        <g>
                                        <g>
                                        <path d="M432,352v96H80v-96H16v128c0,17.696,14.336,32,32,32h416c17.696,0,32-14.304,32-32V352H432z" />
                                        </g>
                                        </g>
            	                        <g></g>
            	                        <g></g>
            	                        <g></g>
            	                        <g></g>
            	                        <g></g>
            	                        <g></g>
            	                        <g></g>
            	                        <g></g>
            	                        <g></g>
            	                        <g></g>
            	                        <g></g>
            	                        <g></g>
            	                        <g></g>
            	                        <g></g>
            	                        <g></g>
                                        </svg>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <AgGrid columnDef={this.state.columnDef} rowData={this.state.rowData} />
                    </div>
                </div>
            </div>
                <div id="employee" className="modal fade">
                    <div className="modal-dialog modal-dialog-vertical-center modal-lg" role="document">
                        <div className="modal-content bd-0 tx-14">
                            <form name='EmpRegis' id="EmpRegis" noValidate onSubmit={this.handleSubmit}>
                                <div className="modal-header pd-y-20 pd-x-25">
                                    <h6 className="tx-14 mg-b-0 tx-uppercase tx-inverse tx-bold">Add/Edit Employee</h6>
                                    <button type="button" className="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span className="sr-only">Close</span></button>
                                </div>
                                <div className="modal-body pd-25">
                                    <div className="einrformbase">

                                        <ul className="einrform ecustform">
                                            <li>
                                                    <CreateInput type={'text'} value={this.state.empCode} label={'Employee Code'} name={'empCode'} htmlFor={'empCode'}
                                                                 onChange={this.onChangeCode.bind(this)} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                            </li>
                                            <li>
                                                <CreateInput type={'text'} value={this.state.empFirst} label={'First Name'} name={'empFirst'} htmlFor={'empFirst'} isrequired={true}
                                                             onChange={this.onChangeFirst.bind(this)} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                            </li>
                                            <li>
                                                <CreateInput type={'text'} value={this.state.empLast} label={'Last Name'} name={'empLast'} htmlFor={'empLast'} isrequired={true}
                                                             onChange={this.onChangeLast.bind(this)} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                            </li>
                                            <li>
                                                <CreateInput type={'text'} value={this.state.empQuali} label={'Qualification'} name={'empQuali'} htmlFor={'empQuali'} isrequired={true}
                                                             onChange={this.onChangeQuali.bind(this)} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                            </li>
                                            <li>
                                                <CreateInput type={'ddl'} value={this.state.selectedDept} data={this.state.empDept} label={'Department'} name={'empDept'} htmlFor={'empDept'} isrequired={true}
                                                             keyId={'PARAM_ID'} keyName={'PARAM_NAME'} onChange={this.onChangeDept.bind(this)} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                            </li>
                                            <li>
                                                <CreateInput type={'ddl'} value={this.state.selectedDesig} data={this.state.empDesig} label={'Designation'} name={'empDesig'} htmlFor={'empDesig'} isrequired={true}
                                                             keyId={'PARAM_ID'} keyName={'PARAM_NAME'} onChange={this.onChangeDesig.bind(this)} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                            </li>
                                            <li>
                                                <CreateInput type={'ddl'} value={this.state.selectedType} data={this.state.empType} label={'Employee Type'} name={'empType'} htmlFor={'empType'} isrequired={true}
                                                             keyId={'PARAM_ID'} keyName={'PARAM_NAME'} onChange={this.onChangeType.bind(this)} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                            </li>
                                            <li>
                                                <CreateInput type={'ddl'} value={this.state.selectedJType} data={this.state.empJType} label={'Job Type'} name={'empJType'} htmlFor={'empJType'} isrequired={true}
                                                             keyId={'PARAM_ID'} keyName={'PARAM_NAME'} onChange={this.onChangeJType.bind(this)} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                            </li>
                                        </ul>
                                        <div className="empbse">
                                            <div className="empimg">
                                                <img src="/Images/user-img.png" />
                                            </div>
                                            <div className="efinput">
                                                Choose File
                                                <input type="file" className="hide_file" />
                                            </div>
                                        </div>

                                    </div>
                                    <hr />
                                    <ul className="nav nav-tabs">
                                        <li className="nav-item">
                                            <a className="nav-link active show" data-toggle="tab" href="#personal">Personal Details</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" data-toggle="tab" href="#address">Address Details</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" data-toggle="tab" href="#experience">Last Employer Details</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" data-toggle="tab" href="#subject">Subject Details</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" data-toggle="tab" href="#account">Account Details</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" data-toggle="tab" href="#authentication">Authentication Details</a>
                                        </li>
                                    </ul>
                                    <div className="tab-content">
                                        <div className="tab-pane active show" id="personal">
                                           <ul className="einrform">
                                               <li>
                                                            <CreateInput type={'text'} value={this.state.empFather} label={'Father Name'} name={'empFather'} htmlFor={'empFather'} isrequired={true}
                                                                         onChange={this.onChangeFather.bind(this)} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                               </li>
                                                <li>
                                                    <CreateInput type={'text'} value={this.state.empMother} label={'Mother Name'} name={'empMother'} htmlFor={'empMother'} isrequired={true}
                                                                 onChange={this.onChangeMother.bind(this)} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                                </li>
                                                <li>
                                                    <CreateInput type={'ddl'} value={this.state.selectedSex} data={this.state.empSex} label={'Sex'} name={'empSex'} htmlFor={'empSex'} isrequired={true}
                                                                 keyId={'PARAM_ID'} keyName={'PARAM_NAME'} onChange={this.onChangeSex.bind(this)} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                                </li>
                                                <li>
                                                    <CreateInput type={'date'} value={this.state.empDOB} id={'empDOB'} label={'Date Of Birth'} name={'empDOB'} htmlFor={'empDOB'} isrequired={true}
                                                                 className={'startDate form-control'} onBlur={this.onDOBBlur.bind(this)} onComponentMounted={this.register} messageRequired={'required.'} />
                                                </li>
                                                <li>
                                                    <CreateInput type={'date'} value={this.state.empDOJ} id={'empDOJ'} label={'Date Of Joining'} name={'empDOJ'} htmlFor={'empDOJ'} isrequired={true}
                                                                 className={'startDate form-control'} onBlur={this.onDOJBlur.bind(this)} onComponentMounted={this.register} messageRequired={'required.'} />
                                                </li>
                                                <li>
                                                    <CreateInput type={'text'} value={this.state.empSpoou} label={'Spouse Name'} name={'empSpoou'} htmlFor={'empSpoou'} isrequired={true}
                                                                 onChange={this.onChangeSpoou.bind(this)} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                                </li>
                                                <li>
                                                    <CreateInput type={'ddl'} value={this.state.selectedBGrp} data={this.state.empBGrp} label={'Blood Group'} name={'empBGrp'} htmlFor={'empBGrp'} isrequired={true}
                                                                 keyId={'PARAM_ID'} keyName={'PARAM_NAME'} onChange={this.onChangeBGrp.bind(this)} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                                </li>
                                                <li>
                                                    <CreateInput type={'ddl'} value={this.state.selectedMat} data={this.state.empMStat} label={'Marital Status'} name={'empMStat'} htmlFor={'empMStat'} isrequired={true}
                                                                 keyId={'PARAM_ID'} keyName={'PARAM_NAME'} onChange={this.onChangeMStat.bind(this)} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                                </li>
                                                <li>
                                                    <CreateInput type={'text'} value={this.state.empNation} label={'Nationality'} name={'empNation'} htmlFor={'empNation'} isrequired={true}
                                                                 onChange={this.onChangeNation.bind(this)} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                                </li>
                                           </ul>
                                        </div>
                                        <div className="tab-pane" id="address">
                                            <ul className="einrform">
                                                <li>
                                                            <CreateInput type={'text'} value={this.state.empAdres} label={'Address Line 1'} name={'empAdres'} htmlFor={'empAdres'} isrequired={true}
                                                                         onChange={this.onChangeAdres.bind(this)} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                                </li>
                                                <li>
                                                    <CreateInput type={'text'} value={this.state.empAdres2} label={'Address Line 2'} name={'empAdres2'} htmlFor={'empAdres2'} isrequired={true}
                                                                 onChange={this.onChangeAdres2.bind(this)} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                                </li>
                                                <li>
                                                    <CreateInput type={'ddl'} value={this.state.selectedCount} data={this.state.empCount} label={'Country'} name={'empCount'} htmlFor={'empCount'} isrequired={true}
                                                                 keyId={'LOCATION_ID'} keyName={'LOCATION_NAME'} onChange={this.onChangeCount.bind(this)} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                                </li>
                                                <li>
                                                    <CreateInput type={'ddl'} value={this.state.selectedState} data={this.state.empState} label={'State'} name={'empState'} htmlFor={'empState'} isrequired={true} keyId={'STATE_ID'} keyName={'STATE_NAME'}
                                                                 onChange={this.onChangeState.bind(this)} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                                </li>
                                                <li>
                                                    <CreateInput type={'ddl'} value={this.state.selectedCity} data={this.state.empCity} label={'City'} name={'empCity'} htmlFor={'empCity'} isrequired={true} keyId={'CITY_ID'} keyName={'CITY_NAME'}
                                                                 onChange={this.onChangeCity.bind(this)} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                                </li>
                                                <li>
                                                    <CreateInput type={'text'} value={this.state.empZip} label={'Zip Code'} name={'empZip'} htmlFor={'empZip'} isrequired={true}
                                                                 onChange={this.onChangeZip.bind(this)} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                                </li>
                                                <li>
                                                    <CreateInput type={'text'} value={this.state.empMobile} label={'Mobile No'} name={'empMobile'} htmlFor={'empMobile'} isrequired={true}
                                                                 onChange={this.onChangeMobile.bind(this)} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                                </li>
                                                <li>
                                                    <CreateInput type={'text'} value={this.state.empPhone} label={'Phone No'} name={'empPhone'} htmlFor={'empPhone'} isrequired={true}
                                                                 onChange={this.onChangePhone.bind(this)} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="tab-pane" id="experience">
                                            <ul className="einrform">
                                                <li>
                                                            <CreateInput type={'text'} value={this.state.preEmp} label={'Employer Name'} name={'preEmp'} htmlFor={'preEmp'} isrequired={true}
                                                                         onChange={this.onChangePreEmp.bind(this)} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                                </li>
                                                <li>
                                                    <CreateInput type={'date'} value={this.state.preDOJ} id={'preDOJ'} label={'Date Of Joining'} name={'preDOJ'} htmlFor={'preDOJ'} isrequired={true}
                                                                 className={'startDate form-control'} onBlur={this.onPreDOJBlur.bind(this)} onComponentMounted={this.register} messageRequired={'required.'} />
                                                </li>
                                                <li>
                                                    <CreateInput type={'date'} value={this.state.preDOL} id={'empDOL'} label={'Date Of Leaving'} name={'preDOL'} htmlFor={'preDOL'} isrequired={true}
                                                                 className={'startDate form-control'} onBlur={this.onPreDOLBlur.bind(this)} onComponentMounted={this.register} messageRequired={'required.'} />
                                                </li>
                                                <li>
                                                    <CreateInput type={'text'} value={this.state.prePhone} label={'Phone No'} name={'prePhone'} htmlFor={'prePhone'} isrequired={true}
                                                                 onChange={this.onChangePrePhone.bind(this)} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                                </li>
                                                <li>
                                                    <CreateInput type={'text'} value={this.state.empExpre} label={'Total Experience'} name={'empExpre'} htmlFor={'empExpre'} isrequired={true}
                                                                 onChange={this.onChangeExpre.bind(this)} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                                </li>
                                                <li>
                                                    <CreateInput type={'text'} value={this.state.empResLeav} label={'Reason Of Leaving'} name={'empResLeav'} htmlFor={'empResLeav'} isrequired={true}
                                                                 onChange={this.onChangeLeave.bind(this)} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                                </li>
                                                <li>
                                                    <CreateInput type={'text'} value={this.state.preSal} label={'Last Salary'} name={'preSal'} htmlFor={'preSal'} isrequired={true}
                                                                 onChange={this.onChangePreSal.bind(this)} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="tab-pane" id="subject">
                                            <CreateInput type={'selectBox'} value={this.state.selectedSubject} data={this.state.empSub} label={''} name={'empSub'} htmlFor={'empSub'} isrequired={true}
                                                         onChange={this.onChangeSubject.bind(this)} keyId={'SUBJECT_ID'} keyName={'SUBJECT_NAME'} className={'listbox'} onComponentMounted={this.register} messageRequired={'required.'} />
                                        </div>
                                        <div className="tab-pane" id="account">
                                            <ul className="einrform">
                                                <li>
                                                            <CreateInput type={'text'} value={this.state.empBank} label={'Bank Name'} name={'empBank'} htmlFor={'empBank'} isrequired={true}
                                                                         onChange={this.onChangeBank.bind(this)} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                                </li>
                                                <li>
                                                    <CreateInput type={'text'} value={this.state.empAccNo} label={'Bank Account No'} name={'empAccNo'} htmlFor={'empAccNo'} isrequired={true}
                                                                 onChange={this.onChangeAccNo.bind(this)} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                                </li>
                                                <li>
                                                    <CreateInput type={'text'} value={this.state.empIFSC} label={'IFSC Code'} name={'empIFSC'} htmlFor={'empIFSC'} isrequired={true}
                                                                 onChange={this.onChangeIFSC.bind(this)} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                                </li>
                                                <li>
                                                    <CreateInput type={'text'} value={this.state.empAdhar} label={'Adhaar Number'} name={'empAdhar'} htmlFor={'empAdhar'} isrequired={true}
                                                                 onChange={this.onChangeAdhar.bind(this)} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                                </li>
                                                <li>
                                                    <CreateInput type={'text'} value={this.state.empPF} label={'PF Number'} name={'empPF'} htmlFor={'empPF'} isrequired={true}
                                                                 onChange={this.onChangePF.bind(this)} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                                </li>
                                                <li>
                                                    <CreateInput type={'text'} value={this.state.empSalary} label={'Current Salary'} name={'empSalary'} htmlFor={'empSalary'} isrequired={true}
                                                                 onChange={this.onChangeSalary.bind(this)} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="tab-pane" id="authentication">
                                            <ul className="einrform">
                                                <li>
                                                            <CreateInput type={'text'} value={this.state.empLogin} label={'Login Id'} name={'empLogin'} htmlFor={'empLogin'} isrequired={true}
                                                                         onChange={this.onChangeLogin.bind(this)} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                                </li>
                                                <li>
                                                    <CreateInput type={'password'} value={this.state.empPwd} label={'Password'} name={'empPwd'} htmlFor={'empPwd'} isrequired={true}
                                                                 onChange={this.onChangePwd.bind(this)} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                                </li>
                                                <li>
                                                    <CreateInput type={'password'} value={this.state.empCPwd} label={'Confirm Password'} name={'empCPwd'} htmlFor={'empCPwd'} isrequired={true}
                                                                 onChange={this.onChangeCPwd.bind(this)} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} validate={this.isConfirmedPassword} />
                                                </li>
                                                <li>
                                                    <CreateInput type={'ddl'} value={this.state.selectedRole} data={this.state.empRole} label={'Role'} name={'empRole'} htmlFor={'empRole'} isrequired={true}
                                                                 keyId={'PARAM_ID'} keyName={'PARAM_NAME'} onChange={this.onChangeRole.bind(this)} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                                </li>
                                                <li>
                                                    <CreateInput type={'ddl'} value={this.state.selectedAccStat} data={this.state.empAccStat} label={'Account Status'} name={'empAccStat'} htmlFor={'empAccStat'} isrequired={true}
                                                                 keyId={'PARAM_ID'} keyName={'PARAM_NAME'} onChange={this.onChangeAccStat.bind(this)} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="submit" className="btn btn-info pd-x-20"><span className="inload hide"><i className="fa fa-spinner fa-spin"></i></span> {this.state.label}</button>
                                    <button type="button" className="btn btn-secondary pd-x-20" data-dismiss="modal">Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
ReactDOM.render(<EmployeeForm urlPost="/Employee/Registration" personalPost='' contactPost='' authPost='' />, document.getElementById('employeeform'));