var grdArray;
var MyData = null;
var fields = [];
class AdmissionForm extends React.Component {
    constructor(props) {
        super(props);
        //grdArray = GetReportConfiguration("Employee");
        //var columnDefs = grdArray["$EmployeeDetails$"];
        //var records = JSON.parse(content.addParams);
        this.state =
            {
                stuCourse: ReadDropDownData("Course", $("#hfCustomerId").val(), false),
                stuSemester: [],
                stuCategory: ReadDropDownData("Param", '13', true),
                stuAcademic: ReadDropDownData("AcademicYear", $("#hfCustomerId").val(), false),
                stuFName: "",
                stuMName: "",
                stuLName: "",
                stuFatherName: "",
                stuMotherName: "",
                stuGender:  ReadDropDownData("Param", '12', true) ,
                stuDOB: "",
                stuBloodGrp: ReadDropDownData("Param", '10', true),
                stuNationaltiy: "",
                stuMTongue: "",
                stuPlaceBirth: "",
                stuReligion: ReadDropDownData("Param", '14', true),
                stuHandicap: ReadDropDownData("Param", '15', true),
                stuParentIncome: "",
                stuAddress: "",
                stuCountry: ReadLocationData("Location", 1, ""),
                stuState: [],
                stuCity: [],
                pinCode: "",
                phone: "",
                mobile: "",
                email: "",
                stuPrevInsti: "",
                stuPreUnivser: "",
                stuPreCourse: "",
                stuPreYear: "",
                stuPreMarks: "",
                stuPrePercen: "",
                selectedCourse: 0,
                selectedSemester: 0,
                selectedCategory: 0,
                selectedAcademic: 0,
                selectedGender: 0,
                selectedBloodGrp: 0,
                selectedReligion: 0,
                selectedHandicap: 0,
                selectedCountry: 0,
                selectedState: 0,
                selectedCity: 0,              
                Fields: 0,
                //columnDef: columnDefs,
                //rowData: records,
                //records: ((records == null) ? 0 : records.length),
                ServerMessage: ''
            };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleContSubmit = this.handleContSubmit.bind(this);
        this.handleAcadSubmit = this.handleAcadSubmit.bind(this);
    }
    handleSubmit(e) {
        var validForm = true;
        e.preventDefault();
        fields.forEach(function (field) {
            if (typeof field[0].isValid === "function") {
                var validField = field[0].isValid(field[0].refs[field[0].props.name]);
                validForm = validForm && validField;
            }
        });
        //after validation complete post to server
        if (validForm) {
            var d = {
                stuCourse: this.state.selectedCourse,
                stuSemester: this.state.selectedSemester,
                stuCategory: this.state.selectedCategory,
                stuAcademic: this.state.selectedAcademic,
                stuFName: this.state.stuFName,
                stuMName: this.state.stuMName,
                stuLName: this.state.stuLName,
                stuFatherName: this.state.stuFatherName,
                stuMotherName: this.state.stuMotherName,
                stuGender: this.state.selectedGender,

                stuDOB: this.state.stuDOB,
                stuBloodGrp: this.state.stuBloodGrp,
                stuNationaltiy: this.state.stuNationaltiy,
                stuMTongue: this.state.stuMTongue,
                stuPlaceBirth: this.state.stuPlaceBirth,
                stuReligion: this.state.stuReligion,
                stuHandicap: this.state.stuHandicap,
                stuParentIncome: this.state.stuParentIncome,
                flag: 'A',
                reportId: 8
            }
            $.ajax({
                type: "POST",
                url: this.props.urlPost,
                data: d,
                beforeSend: function () {
                    btnloading("studentGeneral", 'show');
                },
                success: function (data) {
                    btnloading("studentGeneral", 'hide');
                    CallToast(data.msg, data.flag);
                    if (data.flag == "S") {
                        MyData = JSON.parse(data.addParams);
                        this.setState
                            ({
                                stuCourse: [],
                                stuSemester: [],
                                stuCategory: [],
                                stuAcademic: [],
                                stuFName: "",
                                stuMName: "",
                                stuLName: "",
                                stuFatherName:"",
                                stuMotherName: "",
                                stuGender: [],
                                stuDOB: "",
                                stuBloodGrp: [],
                                stuNationaltiy: "",
                                stuMTongue: "",
                                stuPlaceBirth: "",
                                stuReligion: [],
                                stuHandicap: [],
                                stuParentIncome: "",
                                selectedCourse: 0,
                                selectedSemester: 0,
                                selectedCategory: 0,
                                selectedAcademic: 0,
                                selectedGender: 0,
                                selectedBloodGrp: 0,
                                selectedReligion: 0,
                                selectedHandicap: 0,
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
    }

    handleContSubmit(e) {
        var validForm = true;
        e.preventDefault();
        fields.forEach(function (field) {
            if (typeof field[0].isValid === "function") {
                var validField = field[0].isValid(field[0].refs[field[0].props.name]);
                validForm = validForm && validField;
            }
        });
        //after validation complete post to server
        if (validForm) {
            var d = {
                stuAddress: this.state.stuAddress,
                stuCountry: this.state.selectedCountry,
                stuState: this.state.selectedState,
                stuCity: this.state.selectedCity,
                phone: this.state.stuPhone,
                mobile: this.state.stuMobile,
                email: this.state.stuEmail,
                flag: 'A',
                reportId: 9
            }
            $.ajax({
                type: "POST",
                url: this.props.personalPost,
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
                                stuAddress: "",
                                stuCountry: [],
                                stuState: [],
                                stuCity: [],
                                phone: "",
                                mobile: "",
                                email: "",
                                selectedCountry: 0,
                                selectedState: 0,
                                selectedCity:0,
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
    }

    handleAcadSubmit(e) {
        var validForm = true;
        e.preventDefault();
        fields.forEach(function (field) {
            if (typeof field[0].isValid === "function") {
                var validField = field[0].isValid(field[0].refs[field[0].props.name]);
                validForm = validForm && validField;
            }
        });
        //after validation complete post to server
        if (validForm) {
            var d = {
                stuPrevInsti: this.state.stuPrevInsti,
                stuPreUnivser: this.state.stuPreUnivser,
                stuPreCourse: this.state.stuPreCourse,
                stuPreYear: this.state.stuPreYear,
                stuPreMarks: this.state.stuPreMarks,
                stuPrePercen: this.state.stuPrePercen,
                flag: 'A',
                reportId: 10
            }
            $.ajax({
                type: "POST",
                url: this.props.contactPost,
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
                                stuPrevInsti: "",
                                stuPreUnivser: "",
                                stuPreCourse: "",
                                stuPreYear: "",
                                stuPreMarks: "",
                                stuPrePercen: "",
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
    }

  
    onChangeCourse = (value) => {   
        debugger;
        var obj = [];
        var jsonData = ReadDropDownData("Course", $("#hfCustomerId").val(), false);
        for (var i = 0; i < jsonData.length; i++) {
            if (jsonData[i].COURSE_NAME == value) {    
                data = {};
                data.ID = i;
                data.NO_SEMESTER = jsonData[i].NO_SEMESTER;
                obj.push(data);
            }
        }
        this.setState({ stuSemester: obj });
        this.setState({
            selectedCourse: value
        });
    }
    onChangeSemester(value) {
        this.setState({
            selectedSemester: value
        });
    }
    onChangeCategory(value) {
        this.setState({
            selectedCategory: value
        });
    }
    onChangeAcademic(value) {
        this.setState({
            selectedAcademic: value
        });
    }
    onChangeFName(value) {
        this.setState({
            stuFName: value
        });
    }
    onChangeMName(value) {
        this.setState({
            stuMName: value
        });
    }
    onChangeLName(value) {
        this.setState({
            stuLName: value
        });
    }
    onChangeFatherName(value) {
        this.setState({
            stuFatherName: value
        });
    }
    onChangeMotherName(value) {
        this.setState({
            stuMotherName: value
        });
    }
    onChangeGender(value) {
        this.setState({
            selectedGender: value
        });
    }
    onChangeGender(value) {
        this.setState({
            SelectedGender: value
        });
    }
    onDOBBlur(value) {
        this.setState({
            stuDOB: value
        });
    }

    onChangeBloodGrp(value) {
        this.setState({
            selectedBloodGrp: value
        });
    }

    onChangeNationality(value) {
        this.setState({
            stuNationaltiy: value
        });
    }
    onChangeMTongue(value) {
        this.setState({
            stuMTongue: value
        });
    }

    onChangePlaceBirth(value) {
        this.setState({
            stuPlaceBirth: value
        });
    }

    onChangeReligion(value) {
        this.setState({
            selectedReligion: value
        });
    }
    onChangeHandicap(value) {
        this.setState({
            selectedHandicap: value
        });
    }
    onChangePIncome(value) {
        this.setState({
            stuParentIncome: value
        })
    }
    onChangeAddress(value) {
        this.setState({
            stuAddress: value
        });
    }
    onChangeState=(value)=> {
        var obj = [];
        var stuCity = 2;
        var jsonData = ReadLocationData("Location", 3, value);

        for (var i = 0; i < jsonData.length; i++) {
            data = {};
            data.CITY_ID = jsonData[i].LOCATION_ID;
            data.CITY_NAME = jsonData[i].LOCATION_NAME;
            obj.push(data);
        }
        this.setState({ stuCity: obj });
        this.setState({
            selectedState: value
        });
    }
    onChangeCountry=(value)=> {
        var obj = [];
        var stuState = 0;
        var jsonData = ReadLocationData("Location", 2, value);

        for (var i = 0; i < jsonData.length; i++) {
            data = {};
            data.STATE_ID = jsonData[i].LOCATION_ID;
            data.STATE_NAME = jsonData[i].LOCATION_NAME;
            obj.push(data);
        }
        this.setState({ stuState: obj });
        this.setState({
            selectedCountry: value
        });
    }
    onChangeCity(value) {
        this.setState({
            selectedCity: value
        });
    }
    onChangePhone(value) {
        this.setState({
            stuPhone: value
        });
    }
    onChangeMobile(value) {
        this.setState({
            stuMobile: value
        });
    }

    onChangeEmail(value) {
        this.setState({
            stuEmail: value
        });
    }

    onChangeInstitute(value) {
        this.setState({
            stuPrevInsti: value
        });
    }


    onChangeUniversity(value) {
        this.setState({
            stuPreUnivser: value
        });
    }
    onChangePreCourse(value) {
        this.setState({
            stuPreCourse: value
        });
    }
    onChangePreYear(value) {
        this.setState({
            stuPreYear: value
        });
    }
    onChangePreMarks(value) {
        this.setState({
            stuPreMarks: value
        });
    }

    onChangePrePercentage(value) {
        this.setState({
            stuPrePercen: value
        });
    }
    //register input controls
    register(field) {
        var s = [];
        s.push(field);
        fields.push(s);
    }
    //GetData(data) {
    //    this.setState({ rowData: data });
    //}
    render() {
        return (
            <div>
                <div className="block-header container-fluid">
                    <div className="row clearfix">
                        <div className="col-lg-6 col-xs-12 col-sm-4 col-md-6">
                            <h1>Student Management</h1>
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item">
                                        <a href="javascript:void(0)">Student</a>
                                    </li>
                                    <li className="breadcrumb-item active" aria-current="page">
                                        Admission
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
                                <div className="accordion" id="accordion">
                                    <div>
                                        <div className="card-header" id="headingOne">
                                            <h5 className="mb-0">
                                                <button className="btn btn-link" type="button" data-toggle="collapse" data-target="#generalcollapse" aria-expanded="true" aria-controls="generalcollapse">General Information</button>
                                            </h5>
                                        </div>
                                        <div id="generalcollapse" className="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                                            <div className="body">
                                                <div className="rgtfrm rgtfrmexp">
                                                    <div className="acform">
                                                        <form name='GeneralForm' id="GeneralForm" noValidate name='GeneralForm' onSubmit={this.handleSubmit}>
                                                            <ul>
                                                                <li>
                                                                    <CreateInput type={'ddl'} value={this.state.selectedCourse} data={this.state.stuCourse} label={'Course'}
                                                                        name={'stuCourse'} htmlFor={'stuCourse'} isrequired={true} keyId={'ID'} keyName={'COURSE_NAME'}
                                                                        onChange={this.onChangeCourse} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                                                </li>
                                                                <li>
                                                                    <CreateInput type={'ddl'} value={this.state.selectedSemester} data={this.state.stuSemester} label={'Semester'}
                                                                        name={'stuSemester'} htmlFor={'stuSemester'} isrequired={true} keyId={'ID'} keyName={'NO_SEMESTER'}
                                                                        onChange={this.onChangeSemester} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                                                </li>
                                                                <li>
                                                                    <CreateInput type={'ddl'} value={this.state.selectedCategory} data={this.state.stuCategory} label={'Category'}
                                                                        name={'stuCategory'} htmlFor={'stuCategory'} isrequired={true} keyId={'PARAM_ID'} keyName={'PARAM_NAME'}
                                                                        onChange={this.onChangeCategory} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                                                </li>
                                                                <li>
                                                                    <CreateInput type={'ddl'} value={this.state.selectedAcademic} data={this.state.stuAcademic} label={'Academic'}
                                                                        name={'stuAcademic'} htmlFor={'stuAcademic'} isrequired={true} keyId={'ID'} keyName={'ACADEMIC_YEAR'}
                                                                        onChange={this.onChangeAcademic} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                                                </li>
                                                                <li>
                                                                    <CreateInput type={'text'} value={this.state.stuFName} label={'First Name'} name={'stuFName'}
                                                                        htmlFor={'stuFName'}
                                                                        isrequired={true} onChange={this.onChangeFName.bind(this)} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                                                </li>
                                                                <li>
                                                                    <CreateInput type={'text'} value={this.state.stuMName} label={'Middle Name'} name={'stuMName'}
                                                                        htmlFor={'stuMName'}
                                                                        isrequired={true} onChange={this.onChangeMName.bind(this)} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                                                </li>
                                                                <li>
                                                                    <CreateInput type={'text'} value={this.state.stuLName} label={'Last Name'} name={'stuLName'}
                                                                        htmlFor={'stuLName'}
                                                                        isrequired={true} onChange={this.onChangeMName.bind(this)} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                                                </li>
                                                                <li>
                                                                    <CreateInput type={'text'} value={this.state.stuFatherName} label={'Father Name'} name={'stuFatherName'}
                                                                        htmlFor={'stuFatherName'}
                                                                        isrequired={true} onChange={this.onChangeFatherName.bind(this)} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                                                </li>
                                                                <li>
                                                                    <CreateInput type={'text'} value={this.state.stuMotherName} label={'Mother Name'} name={'stuMotherName'}
                                                                        htmlFor={'stuMotherName'}
                                                                        isrequired={true} onChange={this.onChangeMotherName.bind(this)} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                                                </li>
                                                                <li>
                                                                    <CreateInput type={'ddl'} value={this.state.selectedGender} data={this.state.stuGender} label={'Gender'}
                                                                        name={'stuGender'} htmlFor={'stuGender'} isrequired={true} keyId={'PARAM_ID'} keyName={'PARAM_NAME'}
                                                                        onChange={this.onChangeGender} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                                                </li>
                                                                <li>
                                                                    <CreateInput type={'date'} value={this.state.stuDOB} id={'stuDOB'} label={'Date Of Birth'} name={'stuDOB'} htmlFor={'stuDOB'} isrequired={true}
                                                                        className={'endDate form-control'} onBlur={this.onDOBBlur.bind(this)} onComponentMounted={this.register} messageRequired={'required.'} />
                                                                </li>
                                                                <li>
                                                                    <CreateInput type={'ddl'} value={this.state.selectedBloodGrp} data={this.state.stuBloodGrp} label={'Blood Group'}
                                                                        name={'stuBloodGrp'} htmlFor={'stuBloodGrp'} isrequired={true} keyId={'PARAM_ID'} keyName={'PARAM_NAME'}
                                                                        onChange={this.onChangeBloodGrp} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                                                </li>
                                                                <li>
                                                                    <CreateInput type={'text'} value={this.state.stuNationaltiy} label={'Mother Name'} name={'stuNationaltiy'}
                                                                        htmlFor={'stuNationaltiy'}
                                                                        isrequired={true} onChange={this.onChangeNationality.bind(this)} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                                                </li>
                                                                <li>
                                                                    <CreateInput type={'text'} value={this.state.stuMTongue} label={'Mother Tongue'} name={'stuMTongue'}
                                                                        htmlFor={'stuMTongue'}
                                                                        isrequired={true} onChange={this.onChangeMTongue.bind(this)} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                                                </li>
                                                                <li>
                                                                    <CreateInput type={'text'} value={this.state.stuPlaceBirth} label={'Place Of Birth'} name={'stuPlaceBirth'}
                                                                        htmlFor={'stuPlaceBirth'}
                                                                        isrequired={true} onChange={this.onChangePlaceBirth.bind(this)} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                                                </li>
                                                                <li>
                                                                    <CreateInput type={'ddl'} value={this.state.selectedReligion} data={this.state.stuReligion} label={'Religion'}
                                                                        name={'stuReligion'} htmlFor={'stuReligion'} isrequired={true} keyId={'PARAM_ID'} keyName={'PARAM_NAME'}
                                                                        onChange={this.onChangeReligion} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                                                </li>
                                                                <li>
                                                                    <CreateInput type={'ddl'} value={this.state.selectedHandicap} data={this.state.stuHandicap} label={'Are You Handicap'}
                                                                        name={'stuReligion'} htmlFor={'stuReligion'} isrequired={true} keyId={'PARAM_ID'} keyName={'PARAM_NAME'}
                                                                        onChange={this.onChangeHandicap} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                                                </li>
                                                                <li>
                                                                    <CreateInput type={'text'} value={this.state.stuParentIncome} label={'Parent Income'} name={'stuParentIncome'}
                                                                        htmlFor={'stuParentIncome'}
                                                                        isrequired={true} onChange={this.onChangePIncome.bind(this)} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                                                </li>
                                                            </ul>
                                                            <div className="empbse">
                                                                <div className="empimg">
                                                                    <img src="/Images/user-img.png" />
                                                                </div>
                                                                <a href="javascript:void(0)"></a>
                                                                <input type="file" />
                                                            </div>
                                                        </form>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="card-header" id="contact">
                                            <h5 className="mb-0">
                                                <button className="btn btn-link" type="button" data-toggle="collapse" data-target="#contactcollapse" aria-expanded="true" aria-controls="contactcollapse">Contact Information</button>
                                            </h5>
                                        </div>
                                        <div id="contactcollapse" className="collapse" aria-labelledby="contact" data-parent="#accordion">
                                            <div className="body">
                                                <div className="rgtfrm">
                                                    <div className="acform cstform">
                                                        <form name='ContactForm' id="ContactForm" noValidate onSubmit={this.handleContSubmit}>
                                                            <ul>
                                                                <li>
                                                                    <CreateInput type={'text'} value={this.state.stuAddress} label={'Address'} name={'stuAddress'}
                                                                        htmlFor={'stuAddress'}
                                                                        isrequired={true} onChange={this.onChangeAddress.bind(this)} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                                                </li>                                                             
                                                                
                                                                <li>

                                                                    <CreateInput type={'ddl'} value={this.state.selectedCountry} data={this.state.stuCountry} label={'Country'}
                                                                        name={'stuCountry'} htmlFor={'stuCountry'} isrequired={true} keyId={'LOCATION_ID'} keyName={'LOCATION_NAME'}
                                                                        onChange={this.onChangeCountry} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                                                </li>
                                                                <li>
                                                                    <CreateInput type={'ddl'} value={this.state.selectedState} data={this.state.stuState} label={'State'}
                                                                        name={'stuState'} htmlFor={'stuState'} isrequired={true} keyId={'STATE_ID'} keyName={'STATE_NAME'}
                                                                        onChange={this.onChangeState} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                                                </li>
                                                                <li>
                                                                    <CreateInput type={'ddl'} value={this.state.selectedCity} data={this.state.stuCity} label={'City'}
                                                                        name={'stuCity'} htmlFor={'stuCity'} isrequired={true} keyId={'CITY_ID'} keyName={'CITY_NAME'}
                                                                        onChange={this.onChangeCity} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                                                </li>
                                                                <li>
                                                                    <CreateInput type={'text'} value={this.state.phone} label={'Phone'} name={'phone'}
                                                                        htmlFor={'phone'}
                                                                        isrequired={true} onChange={this.onChangePhone.bind(this)} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                                                </li>
                                                                <li>
                                                                    <CreateInput type={'text'} value={this.state.mobile} label={'Mobile'} name={'mobile'}
                                                                        htmlFor={'mobile'}
                                                                        isrequired={true} onChange={this.onChangeMobile.bind(this)} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />

                                                                </li>
                                                                <li>
                                                                    <CreateInput type={'text'} value={this.state.email} label={'Email'} name={'email'}
                                                                        htmlFor={'email'}
                                                                        isrequired={true} onChange={this.onChangeEmail.bind(this)} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
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
                                    <div>
                                        <div className="card-header" id="authentication">
                                            <h5 className="mb-0">
                                                <button className="btn btn-link" type="button" data-toggle="collapse" data-target="#authcollapse" aria-expanded="true" aria-controls="authcollapse">Previous Academic Information</button>
                                            </h5>
                                        </div>
                                        <div id="authcollapse" className="collapse" aria-labelledby="authentication" data-parent="#accordion">
                                            <div className="body">
                                                <div className="rgtfrm">
                                                    <div className="acform cstform">
                                                        <form name='AuthenticationForm' id="AuthForm" noValidate onSubmit={this.handleAcadSubmit}>
                                                            <ul>
                                                                <li>
                                                                    <CreateInput type={'text'} value={this.state.stuPrevInsti} label={'Institute'} name={'stuPrevInsti'}
                                                                        htmlFor={'stuPrevInsti'}
                                                                        isrequired={true} onChange={this.onChangeInstitute.bind(this)} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                                                </li>
                                                                <li>
                                                                    <CreateInput type={'text'} value={this.state.stuPreUnivser} label={'University/Board'} name={'stuPreUnivser'}
                                                                        htmlFor={'stuPreUnivser'}
                                                                        isrequired={true} onChange={this.onChangeUniversity.bind(this)} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                                                </li>
                                                                <li>
                                                                    <CreateInput type={'text'} value={this.state.stuPreCourse} label={'Course'} name={'stuPreCourse'}
                                                                        htmlFor={'stuPreCourse'}
                                                                        isrequired={true} onChange={this.onChangePreCourse.bind(this)} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />

                                                                </li>
                                                                <li>
                                                                    <CreateInput type={'text'} value={this.state.stuPreYear} label={'Course Year'} name={'stuPreYear'}
                                                                        htmlFor={'stuPreYear'}
                                                                        isrequired={true} onChange={this.onChangePreYear.bind(this)} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />

                                                                </li>
                                                                <li>
                                                                    <CreateInput type={'text'} value={this.state.stuPreMarks} label={'Obtained Marks'} name={'stuPreMarks'}
                                                                        htmlFor={'stuPreMarks'}
                                                                        isrequired={true} onChange={this.onChangePreMarks.bind(this)} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                                                </li>
                                                                <li>
                                                                    <CreateInput type={'text'} value={this.state.stuPrePercen} label={'Percentage'} name={'stuPrePercen'}
                                                                        htmlFor={'stuPrePercen'}
                                                                        isrequired={true} onChange={this.onChangePrePercentage.bind(this)} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
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
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
ReactDOM.render(<AdmissionForm urlPost='' personalPost='' contactPost='' authPost='' />, document.getElementById('studentform'));