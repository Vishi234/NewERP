var grdArray;
var MyData = null;
var fields = [];
class EmployeeForm extends React.Component {
    constructor(props) {
        super(props);
        debugger;
        grdArray = GetReportConfiguration("Employee");
        var records = JSON.parse(content.addParams);
        var columnDefs = grdArray["$EmployeeDetails$"];
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
            selectedSubject:0,
            Fields: [],
            columnDef: columnDefs,
            rowData: records,
            records: ((records == null) ? 0 : records.length),
            ServerMessage: '',
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e) {
        debugger;
        var validForm = true;
        e.preventDefault();
        fields.forEach(function (field) {
            if (typeof field[0].isValid === "function") {
                debugger;
                var validField;
                if (field[0].props.type == 'ddl') {
                    validField = field[0].isValid(field[0].refs.MySelect2);
                } else {
                    debugger;
                    validField = field[0].isValid(field[0].refs[field[0].props.name]);
                }
                validForm = validForm && validField;
            }
        });
        //after validation complete post to server
        if (validForm) {              
            var d = {
                empCode          :this.state.empCode   ,
                empFirst         :this.state.empFirst  ,
                empLast          :this.state.empLast   ,
                empQuali         :this.state.empQuali  ,
                empDept          :this.state.selectedDept,
                empDesig         :this.state.selectedDesig,
                empType          :this.state.selectedType,
                empJType         :this.state.selectedJType,
                empFather	     :this.state.empFather ,
                empMother        :this.state.empMother ,
                empSex           :this.state.selectedSex ,
                empDOB           :this.state.empDOB    ,
                empDOJ           :this.state.empDOJ    ,
                empSpoou         :this.state.empSpoou  ,
                empBGrp          :this.state.selectedBGrp   ,
                empMStat         :this.state.selectedMat  ,
                empNation        :this.state.empNation ,
                empAdres         :this.state.empAdres  ,
                empAdres2        :this.state.empAdres2 ,
                empMobile        :this.state.empMobile ,
                empPhone         :this.state.empPhone  ,
                empCount         :this.state.selectedCount  ,
                empState         :this.state.selectedState  ,
                empCity          :this.state.selectedCity   ,
                empZip           :this.state.empZip    ,
                preEmp           :this.state.preEmp    ,
                preDOJ           :this.state.preDOJ    ,
                preDOL           :this.state.preDOL    ,
                prePhone         :this.state.prePhone  ,
                empExpre         :this.state.empExpre  ,
                empResLeav       :this.state.empResLeav,
                preSal           :this.state.preSal,
                empSub           :this.state.selectedSubject,
                empBank          :this.state.empBank   ,
                empAccNo         :this.state.empAccNo  ,
                empIFSC          :this.state.empIFSC   ,
                empAdhar         :this.state.empAdhar  ,
                empPF            :this.state.empPF     ,
                empSalary        :this.state.empSalary ,
                empLogin         :this.state.empLogin  ,
                empPwd           :this.state.empPwd    ,
                empCPwd          :this.state.empCPwd   ,
                empRole          :this.state.selectedRole   ,
                empAccStat       :this.state.selectedAccStat,
                flag: 'A',
                reportId: 1
            }
            $.ajax({
                type: "POST",
                url: this.props.urlPost,
                data: d,
                beforeSend: function () {
                    btnloading("empRegistration", 'show');
                },
                success: function (data) {
                    btnloading("empRegistration", 'hide');
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
                    btnloading("empRegistration", 'hide');
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
        debugger;
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
        debugger;
        console.log(value, this.state.empPwd, value === this.state.empPwd);
        return (value === this.state.empPwd)

    }
    onChangeSubject(value) {
        this.setState({
            selectedSubject: value
        });
    }
    register(field) {
        var s = [];
        s.push(field);
        fields.push(s);
    }

    render() {
        return (
            <div>
               <div className="block-header container-fluid">
                    <div className="row clearfix">
                        <div className="col-lg-6 col-xs-12 col-sm-4 col-md-6">
                            <h1>Employee Management</h1>
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item">
                                        <a href="javascript:void(0)">Employee</a>
                                    </li>
                                    <li className="breadcrumb-item active" aria-current="page">
                                        Manage
                                    </li>
                                </ol>
                            </nav>
                        </div>
                    </div>
               </div>
               <div className="block-body container-fluid">
                <div className="row clearfix">
                    <div className="col-lg-12 col-xs-12 col-sm-12 col-md-12">
                        <div className="card">
                            <div className="mb-1 d-inline-block w-100">
                                <div className="aclft pull-left">
                                    <button type="button" className="btn btn-info" data-toggle="modal" data-target="#employee">
                                        <i className="fa fa-plus"></i> Add New
                                    </button>
                                    <button type="button" className="btn btn-info" data-toggle="modal" data-target="#employee">
                                        <i className="fa fa-download"></i> Export
                                    </button>
                                </div>
                                <div className="acrght pull-right">
                                    <input type="text" placeholder="Quick Search..." className="form-control" />
                                </div>
                            </div>
                            <div className="body">
                                            <AgGrid columnDef={this.state.columnDef} rowData={this.state.rowData} />
                            </div>
                        </div>
                    </div>
                </div>
               </div>
               <div className="modal fade" id="employee" data-backdrop="static" data-keyboard="false">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Add/Edit Employee</h4>
                                <button type="button" className="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span className="sr-only">Close</span></button>
                            </div>
                            <div className="modal-body">
                                <div className="card">
                                    <form name='EmpRegis' id="EmpRegis" noValidate onSubmit={this.handleSubmit}>
                                        <div className="acform cust">
                                            <ul>
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
                                                <a href="javascript:void(0)"></a>
                                                <input type="file" />
                                            </div>
                                        </div>
                                        <ul className="nav nav-tabs">
                                            <li className="nav-item">
                                                <a className="nav-link active show" data-toggle="tab" href="#personal"><img src="/Images/icons/personal.svg" /> Personal Details</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="tab" href="#address"><img src="/Images/icons/address.svg" /> Address Details</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="tab" href="#experience"><img src="/Images/icons/experience.svg" /> Last Employer Details</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="tab" href="#subject"><img src="/Images/icons/subject.svg" /> Subject Details</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="tab" href="#account"><img src="/Images/icons/accounts.svg" /> Account Details</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="tab" href="#authentication"><img src="/Images/icons/authentication.svg" /> Authentication Details</a>
                                            </li>
                                        </ul>
                                        <div className="tab-content">
                                            <div className="tab-pane active show" id="personal">
                                                <div className="acform">
                                                    <ul>
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
                                            </div>
                                            <div className="tab-pane" id="address">
                                                <div className="acform">
                                                   <ul>
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
                                            </div>
                                            <div className="tab-pane" id="experience">
                                                <div className="acform">
                                                    <ul>
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
                                            </div>
                                            <div className="tab-pane" id="subject">
                                                    <CreateInput type={'selectBox'} value={this.state.selectedSubject} data={this.state.empSub} label={''} name={'empSub'} htmlFor={'empSub'} isrequired={true}
                                                    onChange={this.onChangeSubject.bind(this)} keyId={'SUBJECT_ID'} keyName={'SUBJECT_NAME'} className={'listbox'} onComponentMounted={this.register} messageRequired={'required.'} />
                                            </div>
                                            <div className="tab-pane" id="account">
                                                <div className="acform">
                                                    <ul>
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
                                            </div>
                                            <div className="tab-pane" id="authentication">
                                                <div className="acform">
                                                    <ul>
                                                        <li>
                                                            <CreateInput type={'text'} value={this.state.empLogin} label={'Login Id'} name={'empLogin'} htmlFor={'empLogin'} isrequired={true}
                                                                onChange={this.onChangeLogin.bind(this)} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                                        </li>
                                                        <li>
                                                            <CreateInput type={'password'} value={this.state.empPwd}  label={'Password'} name={'empPwd'} htmlFor={'empPwd'} isrequired={true}
                                                                onChange={this.onChangePwd.bind(this)} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                                        </li>
                                                        <li>
                                                            <CreateInput type={'password'} value={this.state.empCPwd}  label={'Confirm Password'} name={'empCPwd'} htmlFor={'empCPwd'} isrequired={true}
                                                                onChange={this.onChangeCPwd.bind(this)} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'}  validate={this.isConfirmedPassword} />
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
                                        <div className="btn-group">
                                            <input type="submit" className="btn btn-success" value="Save" />
                                            <input type="submit" className="btn btn-danger" value="Reset" />
                                        </div>
                                    </form>
                                </div>
                                
                            </div>                           
                        </div>
                    </div>
               </div>
            </div>
        );
    }
}
ReactDOM.render(<EmployeeForm urlPost="/Employee/Registration" personalPost='' contactPost='' authPost='' />, document.getElementById('employeeform'));