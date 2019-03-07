var grdArray;
var MyData = null;
var fields = [];
var fieldsGenInfo = [];
var fieldsContInfo = [];
var fieldsAuthInfo = [];
var newUserId = "";



var EmployeeForm = React.createClass({

    getInitialState: function () {

        grdArray = GetReportConfiguration("Master");
        var columnDefs = grdArray["$EmployeeDetails$"];
        var records = JSON.parse(content.addParams);
        jsonData = GetJsonData('../../Content/DynamicJs/DropdownData.json');
        return {
            gender: ReadDropDownData("Param", '12', true),
            bloodgrp: ReadDropDownData("Param", '10', true),
            maritalst: ReadDropDownData("Param", '11', true),
            empDepartment: ReadDropDownData("Param", '7', true),
            empDesignation: ReadDropDownData("Param", '8', true),
            empType: ReadDropDownData("Param", '9', true),
            accStatus: ReadDropDownData("Param", '1', true),
            bank: ReadDropDownData("Param", '4', true),
            country: ReadLocationData("Location", 1, ""),
            state: [],
            city: [],
            Fields: [],
            columnDef: columnDefs,
            rowData: records,
            records: ((records == null) ? 0 : records.length),

        }
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
                                gender: ReadDropDownData("Param", '12', true),
                                bloodgrp: ReadDropDownData("Param", '10', true),
                                maritalst: ReadDropDownData("Param", '11', true),
                                empDepartment: ReadDropDownData("Param", '7', true),
                                empDesignation: ReadDropDownData("Param", '8', true),
                                empType: ReadDropDownData("Param", '9', true),
                                firstName: '',
                                middleName: '',
                                lastName: '',
                                adharNo: '',
                                empCode: '',
                                empPunchCard: ''

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
        var validForm = true;
        e.preventDefault();

        fieldsContInfo.forEach(function (field) {
            if (typeof field[0].isValid === "function") {
                var validField = field[0].isValid(field[0].refs[field[0].props.name]);
                validForm = validForm && validField;
            }
        });

        if (validForm) {
            var d = {

                email: this.state.email,
                address: this.state.address,
                country: ReadLocationData("Location", 1, ""),
                city: this.state.SelectedCity,
                state: this.state.SelectedState,
                pinCode: this.state.pinCode,
                phone: this.state.phone,
                mobile: this.state.mobile,
                userId: newUserId,
                operType: 'A',
                reportId: '10'
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
        fieldsAuthInfo.forEach(function (field) {
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
    onChangeAddar(value) {
        this.setState({
            adharNo: value
        });
    },
    onChangeGender(value) {
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
    onDOBBlur(value) {
        this.setState({
            SelectedDOB: value
        });
    },
    onJoinBlur(value) {
        this.setState({
            SelectedJoinDate: value
        });
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
    onChangeEmployeeType(value) {
        this.setState({
            selectedEmpType: value
        });
    },

    onChangeIsMember(value) {
        this.setState({
            SelectedIsMember: value
        });
    },
    onChangeAddress(value) {
        this.setState({
            address: value
        });
    },
    onChangeCity(value) {
        this.setState({
            city: value
        });
    },
    onChangePinCode(value) {
        this.setState({
            pinCode: value
        });
    },
    onChangeNationality(value) {
        this.setState({
            nationality: value
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
            SelectedCountry: value
        });
    },


    register(field) {
        var s = [];
        s.push(field);
        fieldsGenInfo.push(s);
    },
    AuthenticateRegister(field) {
        var s = [];
        s.push(field);
        fieldsAuthInfo.push(s);
    },
    contactRegister(field) {
        var s = [];
        s.push(field);
        fieldsContInfo.push(s);
    },

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
                                            <CreateInput type={'text'} value={this.state.firstName} label={'First Name'} name={'firstName'} htmlFor={'firstName'}
                                                isrequired={true} onChange={this.onChangeFName.bind(this)} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />

                                        </li>
                                        <li>
                                            <CreateInput type={'text'} value={this.state.middleName} label={'Middle Name'} name={'middleName'} htmlFor={'middleName'}
                                                isrequired={true} onChange={this.onChangeMName.bind(this)} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                        </li>
                                        <li>
                                            <CreateInput type={'text'} value={this.state.lastName} label={'Last Name'} name={'lastName'} htmlFor={'lastName'}
                                                isrequired={true} onChange={this.onChangeLName.bind(this)} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                        </li>
                                        <li>
                                            <CreateInput type={'text'} value={this.state.adharNo} label={'Adhaar Card No.'} name={'adharNo'} htmlFor={'adharNo'}
                                                isrequired={true} onChange={this.onChangeAddar.bind(this)} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                        </li>
                                        <li>
                                            <CreateInput type={'ddl'} value={this.state.SelectedGender} data={this.state.gender} label={'Gender'} name={'gender'} htmlFor={'gender'} isrequired={true}
                                                keyId={'PARAM_ID'} keyName={'PARAM_NAME'} onChange={this.onChangeGender} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />


                                        </li>
                                        <li>
                                            <CreateInput type={'ddl'} value={this.state.SelectedBloodG} data={this.state.bloodgrp} label={'Blood Group'} name={'bloodgrp'} htmlFor={'bloodgrp'} isrequired={true}
                                                keyId={'PARAM_ID'} keyName={'PARAM_NAME'} onChange={this.onChangeBlood} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />

                                        </li>
                                        <li>
                                            <CreateInput type={'ddl'} value={this.state.SelectedMarital} data={this.state.maritalst} label={'Marital Status'} name={'maritalst'} htmlFor={'maritalst'} isrequired={true}
                                                keyId={'PARAM_ID'} keyName={'PARAM_NAME'} onChange={this.onChangeMarital} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                        </li>
                                        <li>
                                            <CreateInput type={'date'} value={this.state.SelectedDOB} data={this.state.DOB} label={'Date Of Birth'} name={'DOB'} htmlFor={'DOB'} isrequired={true}
                                                className={'startDate form-control'} onBlur={this.onDOBBlur.bind(this)} onComponentMounted={this.register} messageRequired={'required.'} />
                                        </li>
                                        <li>
                                            <CreateInput type={'date'} value={this.state.SelectedJoinDate} data={this.state.joinDate} id={'JoinDate'} label={'Joining Date'} name={'joinDate'} htmlFor={'joinDate'} isrequired={true}
                                                className={'startDate form-control'} onBlur={this.onJoinBlur.bind(this)} onComponentMounted={this.register} messageRequired={'required.'} />
                                        </li>
                                        <li>
                                            <CreateInput type={'text'} value={this.state.empCode} label={'Employee Code'} name={'empCode'} htmlFor={'empCode'}
                                                isrequired={true} onChange={this.onChangeCode.bind(this)} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                        </li>
                                        <li>
                                            <CreateInput type={'text'} value={this.state.empPunchCard} label={'Punch Card Number'} name={'empPunchCard'}
                                                htmlFor={'empPunchCard'}
                                                isrequired={true} onChange={this.onChangePunchCard.bind(this)} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                        </li>
                                        <li>
                                            <CreateInput type={'ddl'} value={this.state.selectedDepartment} data={this.state.empDepartment} label={'Department'}
                                                name={'empDepartment'} htmlFor={'empDepartment'} isrequired={true} keyId={'PARAM_ID'} keyName={'PARAM_NAME'}
                                                onChange={this.onChangeDepartment} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                        </li>
                                        <li>
                                            <CreateInput type={'ddl'} value={this.state.selectedDesignation} data={this.state.empDesignation} label={'Designation'}
                                                name={'empDesignation'} htmlFor={'empDesignation'} isrequired={true} keyId={'PARAM_ID'} keyName={'PARAM_NAME'}
                                                onChange={this.onChangeDesignation} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                        </li>
                                        <li>
                                            <CreateInput type={'ddl'} value={this.state.selectedEmpType} data={this.state.empType} label={'Employee Type'}
                                                name={'empType'} htmlFor={'empType'} isrequired={true} keyId={'PARAM_ID'} keyName={'PARAM_NAME'}
                                                onChange={this.onChangeEmployeeType} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
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
                                                isrequired={true} onChange={this.onChangeAddress.bind(this)} className={'form-control'} onComponentMounted={this.contactRegister} messageRequired={'required.'} />
                                        </li>

                                        <li>
                                            <CreateInput type={'ddl'} value={this.state.SelectedCountry} label={'Country'} data={this.state.country}
                                                name={'country'} htmlFor={'country'} isrequired={true} keyId={'LOCATION_ID'} keyName={'LOCATION_NAME'}
                                                onChange={this.onChangeCountry.bind(this)} className={'form-control'} onComponentMounted={this.contactRegister} messageRequired={'required.'} />
                                        </li>

                                        <li>
                                            <CreateInput type={'ddl'} value={this.state.SelectedState} label={'State'} data={this.state.state}
                                                name={'state'} htmlFor={'state'} isrequired={true} keyId={'STATE_ID'} keyName={'STATE_NAME'}
                                                onChange={this.onChangeState.bind(this)} className={'form-control'} onComponentMounted={this.contactRegister} messageRequired={'required.'} />
                                        </li>
                                        <li>
                                            <CreateInput type={'ddl'} value={this.state.SelectedCity} label={'City'} data={this.state.city}
                                                name={'city'} htmlFor={'city'} isrequired={true} keyId={'CITY_ID'} keyName={'CITY_NAME'}
                                                onChange={this.onChangeCity.bind(this)} className={'form-control'} onComponentMounted={this.contactRegister} messageRequired={'required.'} />
                                        </li>

                                        <li>
                                            <CreateInput type={'text'} value={this.state.pinCode} label={'Pincode'} name={'pinCode'} htmlFor={'pinCode'}
                                                isrequired={true} onChange={this.onChangePinCode.bind(this)} className={'form-control'} onComponentMounted={this.contactRegister} messageRequired={'required.'} />
                                        </li>
                                        <li>
                                            <CreateInput type={'text'} value={this.state.nationality} label={'Nationality'} name={'nationality'} htmlFor={'nationality'}
                                                isrequired={true} onChange={this.onChangeNationality.bind(this)} className={'form-control'} onComponentMounted={this.contactRegister} messageRequired={'required.'} />
                                        </li>
                                        <li>
                                            <CreateInput type={'text'} value={this.state.phone} label={'Phone'} name={'phone'} htmlFor={'phone'}
                                                isrequired={true} onChange={this.onChangePhone.bind(this)} className={'form-control'} onComponentMounted={this.contactRegister} messageRequired={'required.'} />
                                        </li>
                                        <li>
                                            <CreateInput type={'text'} value={this.state.mobile} label={'Mobile'} name={'mobile'} htmlFor={'mobile'}
                                                isrequired={true} onChange={this.onChangeMobile.bind(this)} className={'form-control'} onComponentMounted={this.contactRegister} messageRequired={'required.'} />
                                        </li>
                                        <li>
                                            <CreateInput type={'text'} value={this.state.email} label={'Email Address'} name={'email'} htmlFor={'email '}
                                                isrequired={true} onChange={this.onChangeEmail.bind(this)} className={'form-control'} onComponentMounted={this.contactRegister} messageRequired={'required.'} />
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
                                                isrequired={true} onChange={this.onChangeUsername.bind(this)} className={'form-control'} onComponentMounted={this.AuthenticateRegister} messageRequired={'required.'} />
                                        </li>
                                        <li>
                                            <CreateInput type={'text'} value={this.state.password} label={'Password'} name={'password'} htmlFor={'password'}
                                                isrequired={true} onChange={this.onChangePassword.bind(this)} className={'form-control'} onComponentMounted={this.AuthenticateRegister} messageRequired={'required.'} />
                                        </li>
                                        <li>
                                            <CreateInput type={'text'} value={this.state.conPassword} label={'Confirm Password'} name={'conPassword'} htmlFor={'conPassword'}
                                                isrequired={true} onChange={this.onChangeConPassword.bind(this)} className={'form-control'} onComponentMounted={this.AuthenticateRegister} messageRequired={'required.'} />
                                        </li>
                                        <li>
                                            <CreateInput type={'text'} value={this.state.defPage} label={'Default Page'} name={'defPage'} htmlFor={'defPage'}
                                                isrequired={true} onChange={this.onChangeDefPage.bind(this)} className={'form-control'} onComponentMounted={this.AuthenticateRegister} messageRequired={'required.'} />
                                        </li>
                                        <li>
                                            <CreateInput type={'ddl'} value={this.state.SelectedAccStatus} label={'Account Status'} data={this.state.accStatus}
                                                name={'accStatus'} htmlFor={'accStatus'} isrequired={true} keyId={'PARAM_ID'} keyName={'PARAM_NAME'}
                                                onChange={this.onChangeAccStatus} className={'form-control'} onComponentMounted={this.AuthenticateRegister} messageRequired={'required.'} />
                                        </li>
                                        <li>
                                            <CreateInput type={'text'} value={this.state.panCard} label={'Pan Card Number'} name={'panCard'} htmlFor={'panCard'}
                                                isrequired={true} onChange={this.onChangePanCard.bind(this)} className={'form-control'} onComponentMounted={this.AuthenticateRegister} messageRequired={'required.'} />
                                        </li>
                                        <li>
                                            <CreateInput type={'ddl'} value={this.state.SelectedBank} label={'Bank'} data={this.state.bank}
                                                name={'bank'} htmlFor={'bank'} isrequired={true} keyId={'PARAM_ID'} keyName={'PARAM_NAME'}
                                                onChange={this.onChangeBank} className={'form-control'} onComponentMounted={this.AuthenticateRegister} messageRequired={'required.'} />
                                        </li>
                                        <li>
                                            <CreateInput type={'text'} value={this.state.accNumber} label={'Bank Account Number'} name={'accNumber'} htmlFor={'accNumber'}
                                                isrequired={true} onChange={this.onChangeAccNumber.bind(this)} className={'form-control'} onComponentMounted={this.AuthenticateRegister} messageRequired={'required.'} />
                                        </li>
                                        <li>
                                            <button type="submit" className="btn btn-success"><span className="inload hide"><i className="fa fa-spinner fa-spin"></i></span> Save</button>
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
        );
    }
});

ReactDOM.render(<EmployeeForm urlPost='' contactPost="/Employee/AddContact" authPost="/Employee/AddAuth" />, document.getElementById('employeeform'));