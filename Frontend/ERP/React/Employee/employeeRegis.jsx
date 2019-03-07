var grdArray;
var MyData = null;
var fields = [];
var perfields = [];
var contfields = [];
var authfields = [];

var EmployeeForm = React.createClass({

        //grdArray = GetReportConfiguration("Employee");
        //var columnDefs = grdArray["$EmployeeDetails$"];
        //var records = JSON.parse(content.addParams);
    getInitialState: function () {
        return {
                empCode: "",
                empPunchCard: "",
                empDepartment: ReadDropDownData("Param", '7', true),
                empDesignation: ReadDropDownData("Param", '8', true),
                empSupervisior: "",
                empType: ReadDropDownData("Param", '9', true),
                empIsMember: ReadDropDownData("Param", '12', true),
                nationality: "",
                addarCard: "",
                empLastName: "",
                empMName: "",
                empFirstName: "",
                gender: ReadDropDownData("Param", '13', true),
                DOB: "",
                bloodgrp: ReadDropDownData("Param", '10', true),
                maritalst: ReadDropDownData("Param", '11', true),
                joinDate: "",
                address: "",
                city: [],
                pinCode: "",
                phone: "",
                mobile: "",
                email: "",
                state: [],
                country: [],
                Username: "",
                password: "",
                conPassword: "",
                defPage: "",
                panCard: "",
                accNumber: "",
                accStatus: "",
                bank: "",
                SelectedGender: 0,
                SelectedMarital: 0,
                SelectedBloodG: 0,
                selectedDepartment: 0,
                selectedDesignation: 0,
                selectedEmptType: 0,
                SelectedIsMember: 0,
                SelectedState: 0,
                SelectedCountry: 0,
                SelectedCity: 0,
                SelectedAccStatus: 0,
                SelectedBank: 0,
                Fields: [],


                //columnDef: columnDefs,
                //rowData: records,
                //records: ((records == null) ? 0 : records.length),
                ServerMessage: ''
            }
        // this.handleSubmit = this.handleSubmit.bind(this);
    },
    handleSubmit(e) {
        var validForm = true;
        e.preventDefault();

        fieldsGenInfo.forEach(function (field) {

            if (typeof field[0].isValid === "function") {

                var validField = field[0].isValid(field[0].refs[field[0].props.name]);
                validForm = validForm && validField;
            }
        });

        //after validation complete post to server
        if (validForm) {
            var d = {
                userId: "",
                firstName: this.state.firstName,
                middleName: this.state.middleName,
                lastName: this.state.lastName,
                adharNo: this.state.adharNo,
                gender: this.state.SelectedGender,
                DOB: this.state.SelectedDOB,
                bloodgrp: this.state.SelectedBloodG,
                maritalst: this.state.SelectedMarital,
                joinDate: this.state.SelectedJoinDate,

                empCode: this.state.empCode,
                empPunchCard: this.state.empPunchCard,
                empDepartment: this.state.selectedDepartment,
                empDesignation: this.state.selectedDesignation,
                empType: this.state.selectedEmpType,
                operType: 'A',
                reportId: 8
            }
            $.ajax({
                type: "POST",
                url: this.props.urlPost,
                data: d,
                beforeSend: function () {
                    btnloading("employeeGeneral", 'show');
                },
                success: function (data) {
                    btnloading("employeeGeneral", 'hide');
                    CallToast(data.msg, data.flag);
                    if (data.flag == "S") {
                        MyData = JSON.parse(data.addParams);
                        this.setState
                            ({
                                empCode: "",
                                empPunchCard: "",
                                empDepartment: "",
                                empDesignation: "",
                                empSupervisior: "",
                                empType: "",
                                empIsMember: "",
                                Username: "",
                                password: "",
                                conPassword: "",
                                defPage: "",
                                panCard: "",
                                accNumber: "",
                                accStatus: "",
                                bank: "",
                                selectedDepartment: [],
                                selectedDesignation: [],
                                selectedEmptType: [],
                                SelectedIsMember: [],
                                SelectedAccStatus: [],
                                SelectedBank: [],
                            })
                        //this.setState({ rowData: MyData });
                        //this.setState({ records: MyData.length })
                    }
                }.bind(this),
                error: function (evt) {
                    btnloading("employeeGeneral", 'hide');
                    alert('Error! Please try again');
                }
            })
            e.preventDefault();
        }
    },

    handlePersSubmit(e) {
        var validForm = true;
        e.preventDefault();
        perfields.forEach(function (field) {
            if (typeof field[0].isValid === "function") {
                var validField = field[0].isValid(field[0].refs[field[0].props.name]);
                validForm = validForm && validField;
            }
        });
        //after validation complete post to server
        if (validForm) {
            var d = {
                empLastName: this.state.empLastName,
                empMName: this.state.empMName,
                empFirstName: this.state.empFirstName,
                gender: this.state.SelectedGender,
                DOB: this.state.DOB,
                bloodgrp: this.state.SelectedBloodG,
                maritalst: this.state.SelectedMarital,
                joinDate: this.state.joinDate,
                flag: 'A',
                reportId: 9
            }
            $.ajax({
                type: "POST",
                url: "/Employee/Registration",
                data: d,
                success: function (data) {
                    btnloading("employeeGeneral", 'hide');
                    CallToast(data.msg, data.flag);
                    if (data.flag == "S") {
                        MyData = JSON.parse(data.addParams);
                        newUserId = data.optionalVal;
                        this.setState
                            ({
                                empCode: "",
                                empPunchCard: "",
                                empDepartment: "",
                                empDesignation: "",
                                empSupervisior: "",
                                empType: "",
                                empIsMember: "",
                                Username: "",
                                password: "",
                                conPassword: "",
                                defPage: "",
                                panCard: "",
                                accNumber: "",
                                accStatus: "",
                                bank: ""
                            })
                        this.setState({ rowData: MyData });
                        //this.setState({ records: MyData.length })
                    }
                }.bind(this),
                error: function (evt) {
                    btnloading("employeeGeneral", 'hide');
                    alert('Error! Please try again');
                }
            })
            e.preventDefault();
        }
    },

    handleContSubmit(e) {
        alert(11);
        var validForm = true;
        e.preventDefault();
        contfields.forEach(function (contfield) {
            if (typeof contfield[0].isValid === "function") {
                var validField = contfield[0].isValid(contfield[0].refs[contfield[0].props.name]);
                validForm = validForm && validField;
            }
        });

        if (validForm) {
            var d = {
                email: this.state.email,
                address: this.state.address,
                country: this.state.SelectedCountry,
                city: this.state.SelectedCity,
                state: this.state.SelectedState,
                pinCode: this.state.pinCode,
                phone: this.state.phone,
                mobile: this.state.mobile,
                flag: 'A',
                reportId: 10
            }
            $.ajax({
                type: "POST",
                url: this.props.contactPost,
                data: d,
                success: function (data) {
                    btnloading("employeeGeneral", 'hide');
                    CallToast(data.msg, data.flag);
                    if (data.flag == "S") {
                        MyData = JSON.parse(data.addParams);
                        this.setState
                            ({
                                address: "",
                                SeletedCountry: 0,
                                SelectedState: 0,
                                SelectedCity: 0,
                                pinCode: "",
                                phone: "",
                                mobile: "",
                                email: "",
                            })
   
                    }
                }.bind(this),
                error: function (evt) {
                    btnloading("employeeGeneral", 'hide');
                    alert('Error! Please try again');
                }
            })
            e.preventDefault();
        }
    },

    handleAuthSubmit(e) {
        var validForm = true;
        e.preventDefault();
        authfields.forEach(function (field) {
            if (typeof field[0].isValid === "function") {
                var validField = field[0].isValid(field[0].refs[field[0].props.name]);
                validForm = validForm && validField;
            }
        });
        //after validation complete post to server
        if (validForm) {
            var d = {
                Username: this.state.Username,
                password: this.state.password,
                conPassword: this.state.conPassword,
                defPage: this.state.defPage,
                panCard: this.state.panCard,
                accNumber: this.state.accNumber,
                accStatus: this.state.SelectedAccStatus,
                bank: this.state.SelectedBank,
                operType: 'A',
                reportId: 11,
                userId: 11,
            }
            $.ajax({
                type: "POST",
                url: this.props.authPost,
                data: d,
                beforeSend: function () {
                    btnloading("employeeGeneral", 'show');
                },
                success: function (data) {
                    btnloading("employeeGeneral", 'hide');
                    CallToast(data.msg, data.flag);
                    if (data.flag == "S") {
                        MyData = JSON.parse(data.addParams);
                        this.setState
                            ({
                                Username: "",
                                password: "",
                                conPassword: "",
                                defPage: "",
                                panCard: "",
                                accNumber: "",
                                SelectedAccStatus: 0,
                                SelectedBank: 0,                                
                            })
                        //this.setState({ rowData: MyData });
                        //this.setState({ records: MyData.length })
                    }
                }.bind(this),
                error: function (evt) {
                    btnloading("employeeGeneral", 'hide');
                    alert('Error! Please try again');
                }
            })
            e.preventDefault();
        }
    },
    onChangeCode(value) {
        this.setState({
            empCode: value
        });
    },
    onChangePunchCard(value) {
        this.setState({
            empPunchCard: value
        });
    },
    onChangeDepartment(value) {
        this.setState({
            selectedDepartment: value
        });
    },
    onChangeDesignation(value) {
        this.setState({
            selectedDesignation: value
        });
    },
    onChangeSupervisior(value) {
        this.setState({
            empSupervisior: value
        });
    },
    onChangeType(value) {
        this.setState({
            selectedEmptType: value
        });
    },
    onChangeIsMember(value) {
        this.setState({
            SelectedIsMember: value
        });
    },
    onChangeFName(value) {
        this.setState({
            firstName: value
        });
    },
    onChangeMName(value) {
        this.setState({
            middleName: value
        });
    },
    onChangeLName(value) {
        this.setState({
            lastName: value
        });
    },
    onChangeGender(value) {
        this.setState({
            adharNo: value
        });
    },
    onChangeAddar(value) {
        this.setState({
            SelectedGender: value
        });
    },
    onChangeBlood(value) {
        this.setState({
            SelectedBloodG: value
        });
    },
    onChangeMarital(value) {
        this.setState({
            SelectedMarital: value
        });
    },
    onChangeNationality(value) {
        this.setState({
            SelectedDOB: value
        });
    },
    onChangeGender(value) {
        this.setState({
            SelectedJoinDate: value
        });
    },

    onChangeAddar(value) {
        this.setState({
            empCode: value
        });
    },

    onChangeBlood(value) {
        this.setState({
            empPunchCard: value
        });
    },
    onJoinBlur(value) {
        this.setState({
            selectedDepartment: value
        });
    },
    onDOBBlur(value) {
        this.setState({
            selectedDesignation: value
        });
    },
    onChangeAddress(value) {
        this.setState({
            address: value
        });
    },
    onChangeCity(value) {
        this.setState({
            SelectedCity: value
        });
    },
    onChangePinCode(value) {
        this.setState({
            pinCode: value
        });
    },
    onChangePhone(value) {
        this.setState({
            phone: value
        });
    },
    onChangeMobile(value) {
        this.setState({
            mobile: value
        });
    },
    onChangeEmail(value) {
        this.setState({
            email: value
        });
    },
    onChangeState(value) {
        debugger;
        var obj = [];
        var city = 2;
        var jsonData = ReadLocationData("Location", 3, value);

        for (var i = 0; i < jsonData.length; i++) {
            data = {};
            data.CITY_ID = jsonData[i].LOCATION_ID;
            data.CITY_NAME = jsonData[i].LOCATION_NAME;
            obj.push(data);
        }
        this.setState({ city: obj });
        this.setState({
            SelectedState: value
        });
    },
    onChangeCountry(value) {
        var obj = [];
        var state = 0;
        var jsonData = ReadLocationData("Location", 2, value);

        for (var i = 0; i < jsonData.length; i++) {
            data = {};
            data.STATE_ID = jsonData[i].LOCATION_ID;
            data.STATE_NAME = jsonData[i].LOCATION_NAME;
            obj.push(data);
        }
        this.setState({ state: obj });
        this.setState({
            SelectedCountry: value
        });
    },
    onChangeUsername(value) {
        this.setState({
            Username: value
        });
    },
    onChangePassword(value) {
        this.setState({
            password: value
        });
    },
    onChangeConPassword(value) {
        this.setState({
            conPassword: value
        });
    },
    onChangeDefPage(value) {
        this.setState({
            defPage: value
        });
    },
    onChangePanCard(value) {
        this.setState({
            panCard: value
        });
    },
    onChangeAccNumber(value) {
        this.setState({
            accNumber: value
        });
    },

    onChangeAccStatus(value) {
        this.setState({
            SelectedAccStatus: value
        });
    },
    onChangeBank(value) {
        this.setState({
            SelectedBank: value
        });
    },
    //register input controls
    register(field) {
        var s = [];
        s.push(field);
        fields.push(s);
    },

    perregister(field) {
        var s = [];
        s.push(field);
        perfields.push(s);
    },
    contregister(contfield) {
        var s = [];
        s.push(contfield);
        contfields.push(s);
    },
    authregister(field) {
        var s = [];
        s.push(field);
        authfields.push(s);
    },
    //GetData(data) {
    //    this.setState({ rowData: data });
    //}
    render() {
        return (
            <div>
                <div className="infoblock">
                    <div className="f">
                        <div className="pull-left lftttl act">
                            General Information
            <i className="fa fa-angle-down"></i>
                        </div>
                        <div className="pull-right rgtfrm rgtfrmexp">

                            <div className="acform">
                                <form name='GeneralForm' id="GeneralForm" noValidate onSubmit={this.handleSubmit}>
                                    <ul>
                                        <li>
                                            <CreateInput type={'text'} value={this.state.empCode} label={'Employee Code'} name={'empCode'} htmlFor={'empCode'}
                                                isrequired={true} onChange={this.onChangeCode.bind(this)} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />

                                        </li>
                                        <li>
                                            <CreateInput type={'text'} value={this.state.empPunchCard} label={'Punch Card Number'} name={'empPunchCard'}
                                                htmlFor={'empPunchCard'}
                                                isrequired={true} onChange={this.onChangeCode.bind(this)} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                        </li>
                                        <li>
                                            <CreateInput type={'ddl'} value={this.state.selectedDepartment} data={this.state.empDepartment} label={'Department'}
                                                name={'empDepartment'} htmlFor={'empDepartment'} isrequired={true} keyId={'PARAM_ID'} keyName={'PARAM_NAME'}
                                                onChange={this.onChangeYear} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                        </li>
                                        <li>
                                            <CreateInput type={'ddl'} value={this.state.selectedDesignation} data={this.state.empDesignation} label={'Designation'}
                                                name={'empDesignation'} htmlFor={'empDesignation'} isrequired={true} keyId={'PARAM_ID'} keyName={'PARAM_NAME'}
                                                onChange={this.onChangeYear} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                        </li>
                                        <li>
                                            <CreateInput type={'text'} value={this.state.empSupervisior} label={'Supervisior Code'} name={'Supervisior Code'}
                                                htmlFor={'empSupervisior'}
                                                isrequired={true} onChange={this.onChangeCode.bind(this)} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                        </li>
                                        <li>
                                            <CreateInput type={'ddl'} value={this.state.selectedEmptType} data={this.state.empType} label={'Employee Type'}
                                                name={'empType'} htmlFor={'empType'} isrequired={true} keyId={'PARAM_ID'} keyName={'PARAM_NAME'}
                                                onChange={this.onChangeYear} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                        </li>
                                        <li>
                                            <CreateInput type={'ddl'} value={this.state.SelectedIsMember} data={this.state.empIsMember} label={'Is Member'}
                                                name={'empIsMember'} htmlFor={'empIsMember'} isrequired={true} keyId={'PARAM_ID'} keyName={'PARAM_NAME'}
                                                onChange={this.onChangeYear} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                        </li>
                                        <li>
                                            <button type="submit" className="btn btn-success"><span className="inload hide"><i className="fa fa-spinner fa-spin"></i></span> Save</button>
                                        </li>
                                    </ul>
                                </form>
                            </div>
                            <div className="empbse">
                                <div className="empimg">
                                    <img src="~/Images/admin_bg.jpg" />
                                </div>
                                <a href="javascript:void(0)"></a>
                                <input type="file" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="infoblock">
                    <div className="f fm2">
                        <div className="pull-left lftttl">
                            Personal Information
                <i className="fa fa-angle-down"></i>
                        </div>
                        <div className="pull-right rgtfrm">
                            <div className="acform cstform">
                                <form name='PersonalForm' id="PersonalForm" noValidate onSubmit={this.handlePersSubmit}>
                                    <ul>
                                        <li>
                                            <CreateInput type={'text'} value={this.state.empFirstName} label={'First Name'} name={'empFirstName'} htmlFor={'empFirstName'}
                                                isrequired={true} onChange={this.onChangeFName.bind(this)} className={'form-control'} onComponentMounted={this.perregister} messageRequired={'required.'} />

                                        </li>
                                        <li>
                                            <CreateInput type={'text'} value={this.state.empMName} label={'Last Name'} name={'empMName'} htmlFor={'empMName'}
                                                isrequired={true} onChange={this.onChangeFName.bind(this)} className={'form-control'} onComponentMounted={this.perregister} messageRequired={'required.'} />
                                        </li>
                                        <li>
                                            <CreateInput type={'text'} value={this.state.empLastName} label={'Last Name'} name={'empLastName'} htmlFor={'empLastName'}
                                                isrequired={true} onChange={this.onChangeFName.bind(this)} className={'form-control'} onComponentMounted={this.perregister} messageRequired={'required.'} />
                                        </li>
                                        <li>
                                            <CreateInput type={'ddl'} value={this.state.SelectedGender} label={'Gender'} data={this.state.gender}
                                                name={'gender'} htmlFor={'gender'} isrequired={true} keyId={'PARAM_ID'} keyName={'PARAM_NAME'}
                                                onChange={this.onChangeYear} className={'form-control'} onComponentMounted={this.perregister} messageRequired={'required.'} />
                                        </li>
                                        <li>
                                            <CreateInput type={'date'} value={this.state.SelectedDOB} id={'DOBDate'} label={'Date Of Birth'} name={'DOB'} htmlFor={'DOB'} isrequired={true}
                                                className={'startDate form-control'} onBlur={this.onDOBBlur.bind(this)} onComponentMounted={this.perregister} messageRequired={'required.'} />
                                        </li>
                                        <li>
                                            <CreateInput type={'text'} value={this.state.addarCard} label={'Adhaar Card No.'} name={'addarCard'} htmlFor={'addarCard'}
                                                isrequired={true} onChange={this.onChangeFName.bind(this)} className={'form-control'} onComponentMounted={this.perregister} messageRequired={'required.'} />
                                        </li>
                                        <li>
                                            <CreateInput type={'ddl'} value={this.state.SelectedBloodG} label={'Blood Group'} data={this.state.bloodgrp}
                                                name={'bloodgrp'} htmlFor={'bloodgrp'} isrequired={true} keyId={'PARAM_ID'} keyName={'PARAM_NAME'}
                                                onChange={this.onChangeYear} className={'form-control'} onComponentMounted={this.perregister} messageRequired={'required.'} />
                                        </li>
                                        <li>
                                            <CreateInput type={'ddl'} value={this.state.SelectedMarital} label={'Marital Status'} data={this.state.maritalst}
                                                name={'maritalst'} htmlFor={'maritalst'} isrequired={true} keyId={'PARAM_ID'} keyName={'PARAM_NAME'}
                                                onChange={this.onChangeYear} className={'form-control'} onComponentMounted={this.perregister} messageRequired={'required.'} />
                                        </li>
                                        <li>
                                            <CreateInput type={'text'} value={this.state.nationality} label={'Nationality'} name={'nationality'} htmlFor={'nationality'}
                                                isrequired={true} onChange={this.onChangeFName.bind(this)} className={'form-control'} onComponentMounted={this.perregister} messageRequired={'required.'} />
                                        </li>
                                        <li>
                                            <CreateInput type={'date'} value={this.state.SelectedJoinDate} id={'JoinDate'} label={'Joining Date'} name={'joinDate'} htmlFor={'joinDate'} isrequired={true}
                                                className={'startDate form-control'} onBlur={this.onJoinBlur.bind(this)} onComponentMounted={this.perregister} messageRequired={'required.'} />
                                        </li>
                                        <li>
                                            <button type="submit" className="btn btn-success"><span className="inload hide"><i className="fa fa-spinner fa-spin"></i></span> Save</button>
                                        </li>
                                    </ul>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="infoblock">
                    <div className="f fm3">
                        <div className="pull-left lftttl">
                            Contact Information
                        <i className="fa fa-angle-down"></i>
                        </div>
                        <div className="pull-right rgtfrm">
                            <div className="acform cstform">
                                <form name='ContactForm' id="ContactForm" noValidate onSubmit={this.handleContSubmit}>
                                    <ul>
                                        <li>
                                            <CreateInput type={'text'} value={this.state.address} label={'Address'} name={'address'} htmlFor={'address'}
                                                isrequired={true} onChange={this.onChangeAddress.bind(this)} className={'form-control'} onComponentMounted={this.contregister} messageRequired={'required.'} />
                                        </li>

                                        <li>
                                            <CreateInput type={'ddl'} value={this.state.SelectedCountry} label={'Country'} data={this.state.country}
                                                name={'country'} htmlFor={'country'} isrequired={true} keyId={'PARAM_ID'} keyName={'PARAM_NAME'}
                                                onChange={this.onChangeCountry} className={'form-control'} onComponentMounted={this.contregister} messageRequired={'required.'} />
                                        </li>
                                        
                                        <li>
                                            <CreateInput type={'ddl'} value={this.state.SelectedCity} label={'City'} data={this.state.city}
                                                name={'city'} htmlFor={'city'} isrequired={true} keyId={'PARAM_ID'} keyName={'PARAM_NAME'}
                                                onChange={this.onChangeCity} className={'form-control'} onComponentMounted={this.contregister} messageRequired={'required.'} />
                                        </li>
                                        <li>
                                            <CreateInput type={'ddl'} value={this.state.SelectedState} label={'State'} data={this.state.state}
                                                name={'state'} htmlFor={'state'} isrequired={true} keyId={'PARAM_ID'} keyName={'PARAM_NAME'}
                                                onChange={this.onChangeState} className={'form-control'} onComponentMounted={this.contregister} messageRequired={'required.'} />
                                        </li>
                                        <li>
                                            <CreateInput type={'text'} value={this.state.pinCode} label={'Pincode'} name={'pinCode'} htmlFor={'pinCode'}
                                                isrequired={true} onChange={this.onChangePinCode.bind(this)} className={'form-control'} onComponentMounted={this.contregister} messageRequired={'required.'} />
                                        </li>
                                        <li>
                                            <CreateInput type={'text'} value={this.state.phone} label={'Phone'} name={'phone'} htmlFor={'phone'}
                                                isrequired={true} onChange={this.onChangePhone.bind(this)} className={'form-control'} onComponentMounted={this.contregister} messageRequired={'required.'} />
                                        </li>
                                        <li>
                                            <CreateInput type={'text'} value={this.state.mobile} label={'Mobile'} name={'mobile'} htmlFor={'mobile'}
                                                isrequired={true} onChange={this.onChangeMobile.bind(this)} className={'form-control'} onComponentMounted={this.contregister} messageRequired={'required.'} />
                                        </li>
                                        <li>
                                            <CreateInput type={'text'} value={this.state.email} label={'Email Address'} name={'email'} htmlFor={'email '}
                                                isrequired={true} onChange={this.onChangeEmail.bind(this)} className={'form-control'} onComponentMounted={this.contregister} messageRequired={'required.'} />
                                        </li>
                                        <li>
                                            <button type="submit" className="btn btn-success"><span className="inload hide"><i className="fa fa-spinner fa-spin"></i></span> Save</button>
                                        </li>
                                    </ul>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="infoblock lst">
                    <div className="f fm4">
                        <div className="pull-left lftttl">
                            Authentication Information
                <i className="fa fa-angle-down"></i>
                        </div>
                        <div className="pull-right rgtfrm">
                            <div className="acform cstform">
                                <form name='AuthenticationForm' id="AuthForm" noValidate onSubmit={this.handleAuthSubmit}>
                                    <ul>
                                        <li>
                                            <CreateInput type={'text'} value={this.state.username} label={'Username'} name={'username'} htmlFor={'username'}
                                                isrequired={true} onChange={this.onChangeUsername.bind(this)} className={'form-control'} onComponentMounted={this.authregister} messageRequired={'required.'} />
                                        </li>
                                        <li>
                                            <CreateInput type={'text'} value={this.state.password} label={'Password'} name={'password'} htmlFor={'password'}
                                                isrequired={true} onChange={this.onChangePassword.bind(this)} className={'form-control'} onComponentMounted={this.authregister} messageRequired={'required.'} />
                                        </li>
                                        <li>
                                            <CreateInput type={'text'} value={this.state.conPassword} label={'Confirm Password'} name={'conPassword'} htmlFor={'conPassword'}
                                                isrequired={true} onChange={this.onChangeConPassword.bind(this)} className={'form-control '} onComponentMounted={this.authregister} messageRequired={'required.'} />
                                        </li>
                                        <li>
                                            <CreateInput type={'text'} value={this.state.defPage} label={'Default Page'} name={'defPage'} htmlFor={'defPage'}
                                                isrequired={true} onChange={this.onChangeDefPage.bind(this)} className={'form-control'} onComponentMounted={this.authregister} messageRequired={'required.'} />
                                        </li>
                                        <li>
                                            <CreateInput type={'ddl'} value={this.state.SelectedAccStatus} label={'Account Status'} data={this.state.accStatus}
                                                name={'accStatus'} htmlFor={'accStatus'} isrequired={true} keyId={'PARAM_ID'} keyName={'PARAM_NAME'}
                                                onChange={this.onChangeAccStatus} className={'form-control'} onComponentMounted={this.authregister} messageRequired={'required.'} />
                                        </li>
                                        <li>
                                            <CreateInput type={'text'} value={this.state.panCard} label={'Pan Card Number'} name={'panCard'} htmlFor={'panCard'}
                                                isrequired={true} onChange={this.onChangePanCard.bind(this)} className={'form-control'} onComponentMounted={this.authregister} messageRequired={'required.'} />
                                        </li>
                                        <li>
                                            <CreateInput type={'ddl'} value={this.state.SelectedBank} label={'Bank'} data={this.state.bank}
                                                name={'bank'} htmlFor={'bank'} isrequired={true} keyId={'PARAM_ID'} keyName={'PARAM_NAME'}
                                                onChange={this.onChangeBank} className={'form-control'} onComponentMounted={this.authregister} messageRequired={'required.'} />
                                        </li>
                                        <li>
                                            <CreateInput type={'text'} value={this.state.accNumber} label={'Bank Account Number'} name={'accNumber'} htmlFor={'accNumber'}
                                                isrequired={true} onChange={this.onChangeAccNumber.bind(this)} className={'form-control'} onComponentMounted={this.authregister} messageRequired={'required.'} />
                                        </li>
                                        <li>
                                            <button type="submit" className="btn btn-success"><span className="inload hide"><i className="fa fa-spinner fa-spin"></i></span> Save</button>
                                        </li>
                                    </ul>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});
ReactDOM.render(<EmployeeForm urlPost='' personalPost='' contactPost="/Employee/AddContact" authPost="/Employee/AddAuth" />, document.getElementById('employeeform'));
