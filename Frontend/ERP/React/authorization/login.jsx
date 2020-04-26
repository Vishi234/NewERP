var MyInput = React.createClass({
    //onchange event
    handleChange: function (e) {
        this.props.onChange(e.target.value);
        var isValidField = this.isValid(e.target);
    },
    //validation function
    isValid: function (input) {
        //check required field

        if (input.getAttribute('required') != null && input.value === "") {
            input.classList.add('input-validation-error'); //add classNameName error
            input.nextSibling.classList.add('field-validation-error');
            input.nextSibling.textContent = this.props.messageRequired; // show error message
            return false;
        }
        else {
            input.classList.remove('input-validation-error');
            input.nextSibling.classList.remove('field-validation-error');
            input.nextSibling.textContent = "";
            return true;
        }
    },
    componentDidMount: function () {
        if (this.props.onComponentMounted) {
            this.props.onComponentMounted(this); //register this input in the form
        }
    },
    render: function () {
        var inputField;
        if (this.props.type == 'textarea') {
            inputField = <textarea value={this.props.value} ref={this.props.name} name={this.props.name}
                className='form-control' required={this.props.isrequired} onChange={this.handleChange} />
        }
        else {
            inputField = <input type={this.props.type} value={this.props.value} ref={this.props.name} name={this.props.name}
                className='form-control' required={this.props.isrequired} onChange={this.handleChange} />
        }
        return (
            <div className="form-group">
                <label htmlFor={this.props.htmlFor}>{this.props.label}:</label>
                {inputField}
                <span className="field-validation-error"></span>
            </div>
        );
    }
})
var LoginForm = React.createClass({
    getInitialState: function () {
        return {
            Email: '',
            Password: '',
            Fields: [],
            ServerMessage: ''
        }
    },
    handleSubmit: function (e) {
        e.preventDefault();
        var validForm = true;
        this.state.Fields.forEach(function (field) {
            if (typeof field.isValid === "function") {
                var validField = field.isValid(field.refs[field.props.name]);
                validForm = validForm && validField;
            }
        });
        //after validation complete post to server
        if (validForm) {
            var d = {
                email: this.state.Email,
                password: this.state.Password
            }
            $.ajax({
                type: "POST",
                url: this.props.urlPost,
                data: d,
                beforeSend: function () {
                    $("#progress").show();
                },
                success: function (data) {
                    $("#progress").hide();
                    if (data.flag == "S") {
                        $('.leftlist ul').empty();
                        if (data.addParams != null) {
                            var customerList = JSON.parse(data.addParams); var dynamicLi = ""; var dynamicData = "";
                            var param;
                            $.each(customerList, function (i, data) {
                                param =
                                    {
                                        customerId: data.CUSTOMER_ID,
                                        customerCode: data.CUSTOMER_CODE,
                                        customerName: data.CUSTOMER_NAME,
                                        address: data.ADDRESS,
                                        city: data.CITY,
                                        mobile: data.MOBILE,
                                        website: data.WEBSITE,
                                        faxNo: data.FAX_NO,
                                        cEmail: data.EMAIL_ADDRESS,
                                        panNo: data.PAN_NO,
                                        cActive: data.IS_ACTIVE,
                                        state: data.STATE,
                                        pinCode: data.PIN_CODE,
                                        cWef: data.WEF_DATE,
                                        cWet: data.WET_DATE
                                    }
                                var a = JSON.stringify(param);
                                var url = "/Auth/Redirect?jsonData=" + a.split(' ').join('+');
                                dynamicLi += '<li><a href=' + url + '><i classNameName="fa fa-home" ></i> ' + ' ' + data.CUSTOMER_NAME + '</a></li>';
                                dynamicData = data.CUSTOMER_ID + '~' + data.CUSTOMER_NAME + '~' + data.ADDRESS_PRIMARY + '~' + data.ADDRESS_SECONDRY + '~' + data.FAX_NO;
                            });
                            $('.leftlist ul').append(dynamicLi);
                            $("#selectorg").modal("show");
                        }
                        else {
                            CallToast(data.msg, data.flag);
                            window.location.href = "/Dashboard/Overview";
                        }
                    }
                    else {
                        CallToast(data.msg, data.flag);
                    }
                }.bind(this),
                error: function (e) {
                    console.log(e);
                    $("#progress").hide();
                    alert('Error! Please try again');
                }
            })
        }
    },
    onChangeEmail: function (value) {
        this.setState({
            Email: value
        });
    },
    onChangePassword: function (value) {
        this.setState({
            Password: value
        });
    },
    //register input controls
    register: function (field) {
        var s = this.state.Fields;
        s.push(field);
        this.setState({
            Fields: s
        })
    },
    render: function () {
        //Render form
        return (
            <div>
                <div className="eheader">
                    <div className="container-fluid">
                        <div className="elogohome float-left"></div>
                        <div className="etopmenu float-right">
                            <ul>
                                <li>
                                    <a href="javascript:void(0)">
                                        <svg x="0px" y="0px" viewBox="0 0 429.723 429.723" style={{ enableBackground: 'new 0 0 429.723 429.723' }} xmlSpace="preserve">
                                            <g>
                                                <g><path d="M264.878,188.443c-2.927-1.946-6.413-2.873-9.92-2.64h-43.36c1.228-1.909,2.591-3.727,4.08-5.44 c5.28-5.829,11.062-11.183,17.28-16c8.373-6.827,14.347-11.84,17.92-15.04c4.118-3.896,7.648-8.369,10.48-13.28 c3.432-5.693,5.206-12.233,5.12-18.88c-0.025-8.743-3.371-17.15-9.36-23.52c-2.982-3.091-6.543-5.565-10.48-7.28 c-6.92-2.848-14.36-4.21-21.84-4c-6.302-0.134-12.572,0.924-18.48,3.12c-4.841,1.761-9.277,4.482-13.04,8 c-3.41,3.205-6.132,7.07-8,11.36c-1.633,3.793-2.503,7.871-2.56,12c-0.159,2.773,0.823,5.491,2.72,7.52 c1.842,1.834,4.363,2.819,6.96,2.72c2.743,0.167,5.406-0.958,7.2-3.04c1.948-2.608,3.437-5.53,4.4-8.64 c0.725-2.372,1.663-4.675,2.8-6.88c3.58-6.07,10.154-9.739,17.2-9.6c3.344-0.041,6.644,0.756,9.6,2.32 c2.879,1.506,5.287,3.775,6.96,6.56c1.729,2.9,2.616,6.224,2.56,9.6c-0.057,3.495-0.876,6.935-2.4,10.08 c-1.609,3.732-3.796,7.188-6.48,10.24c-3.52,3.644-7.407,6.915-11.6,9.76c-4.411,3.359-8.606,6.993-12.56,10.88 c-5.973,5.333-12.667,11.92-20.08,19.76c-2.084,2.374-3.76,5.077-4.96,8c-1.279,2.488-2.041,5.209-2.24,8 c0.023,3.037,1.296,5.931,3.52,8c2.654,2.419,6.175,3.66,9.76,3.44h61.52c2.947,0.165,5.834-0.875,8-2.88 c1.802-1.862,2.781-4.37,2.72-6.96C268.427,192.881,267.143,190.163,264.878,188.443z" /> </g>
                                            </g>
                                            <g>
                                                <g><path d="M369.838,162.043c-3.281-1.296-6.795-1.895-10.32-1.76h-3.6v-64.32c0-9.707-4.24-14.56-12.72-14.56 c-2.501-0.045-4.918,0.904-6.72,2.64c-2.603,2.626-4.984,5.462-7.12,8.48l-44.24,59.2l-3.12,4.08 c-0.853,1.12-1.653,2.267-2.4,3.44c-0.716,1.076-1.307,2.23-1.76,3.44c-0.37,1.026-0.56,2.109-0.56,3.2 c-0.164,3.683,1.299,7.251,4,9.76c3.335,2.63,7.521,3.94,11.76,3.68h41.6v15.52c-0.261,3.421,0.767,6.817,2.88,9.52 c1.93,2.146,4.716,3.32,7.6,3.2c3.005,0.252,5.959-0.9,8-3.12c2.09-2.743,3.088-6.164,2.8-9.6v-15.52h5.12 c3.326,0.219,6.641-0.561,9.52-2.24c2.205-1.641,3.414-4.299,3.2-7.04C374.341,166.806,372.753,163.566,369.838,162.043z M334.638,160.603h-35.6l35.6-48.56V160.603z" /></g>
                                            </g>
                                            <g>
                                                <g><path d="M376.638,413.723l-0.24-0.72c-29.52,1.28-40.72-17.12-53.76-38.4c-11.52-18.8-24.48-40-51.84-40 c1.575-3.275,2.705-6.746,3.36-10.32c3.36-20.16-5.76-51.28-68.16-84.48c-2.329-1.223-5.111-1.223-7.44,0l-20.96,10.8 c-5.04,0-27.84-2-52.56-50.24c-20.8-51.28-8.88-70.16-6.32-73.44l21.52-9.44c2.415-1.062,4.151-3.247,4.64-5.84 c13.44-69.44-5.04-96-22.8-106.16c-7.058-3.683-14.92-5.552-22.88-5.44c-18.191-0.82-34.86,10.11-41.36,27.12 c-12.88,32-27.68,101.04,17.12,196.64c46.08,94.88,108.8,126.4,142.08,136.8c4.296,1.362,8.773,2.063,13.28,2.08 c10.351-0.107,20.296-4.039,27.92-11.04c0.453,0.039,0.907,0.039,1.36,0c25.6-5.2,35.04,8,49.6,32 c12.64,20.56,28.24,46.08,64.64,46.08h3.44c4.418-0.177,7.857-3.902,7.68-8.32C384.781,416.985,381.056,413.546,376.638,413.723z M258.318,321.243c-2.965,13.6-14.382,23.724-28.24,25.04c-2.879-0.025-5.738-0.483-8.48-1.36c-30.96-9.6-88.96-39.04-132.4-128.4 s-28.64-154.16-16.72-183.84c4.228-10.797,14.902-17.666,26.48-17.04c5.212-0.122,10.375,1.032,15.04,3.36 c18.16,10.32,24,40.4,16,85.04l-19.04,8c-0.661,0.289-1.28,0.665-1.84,1.12c-2.8,2.32-26.4,24,1.52,92.96 c27.52,53.84,56,59.6,66.56,59.6c1.613,0.016,3.222-0.145,4.8-0.48c0.641-0.163,1.259-0.405,1.84-0.72l18.48-9.52 C241.838,277.403,261.758,300.683,258.318,321.243z" />

                                                </g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>
                                        Support : 9650402952
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                        <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m341 452 80 60v-60h91v-271h-181v-181h-331v271h91v60l80-60h10v181zm141-30h-91v30l-40-30h-140v-211h271zm-321-181-40 30v-30h-91v-211h271v151h-65.730469l-69.269531-138.539062-73.417969 146.832031 26.832031 13.417969 18.355469-36.710938h56.460938l7.5 15h-20.730469v60zm18.230469-105h-26.460938l13.230469-26.460938zm0 0" /><path d="m324.964844 340.40625c-16.085938 13.546875-31.273438 20.59375-38.964844 20.59375v30c19.328125 0 42.546875-14.144531 60-29.132812 17.453125 14.988281 40.671875 29.132812 60 29.132812v-30c-7.691406 0-22.878906-7.046875-38.964844-20.59375 8.710938-10.589844 17.875-24.453125 21.878906-39.40625h32.085938v-30h-60v-30h-30v30h-60v30h32.085938c4.003906 14.953125 13.167968 28.816406 21.878906 39.40625zm21.035156-21.691406c-4.730469-6.085938-8.496094-12.121094-11.070312-17.726563h22.140624c-2.574218 5.605469-6.339843 11.640625-11.070312 17.726563zm0 0" /></svg>
                                        English
                                     </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="eloginbody">
                    <div className="banner">
                        <div className="banner-circle">
                            <div className="container-fluid">
                                <div className="col-lg-4 col-xs-12 col-sm-6 col-md-4 float-left"></div>
                                <div className="col-lg-8 col-xs-12 col-sm-6 col-md-8 float-right">
                                    <div className="elgnbase">
                                        <div className="elgnuser">
                                            <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 53 53" style={{ enableBackground: 'new 0 0 53 53' }} xmlSpace="preserve">
                                                <path style={{ fill: '#E7ECED' }} d="M18.613,41.552l-7.907,4.313c-0.464,0.253-0.881,0.564-1.269,0.903C14.047,50.655,19.998,53,26.5,53 c6.454,0,12.367-2.31,16.964-6.144c-0.424-0.358-0.884-0.68-1.394-0.934l-8.467-4.233c-1.094-0.547-1.785-1.665-1.785-2.888v-3.322 c0.238-0.271,0.51-0.619,0.801-1.03c1.154-1.63,2.027-3.423,2.632-5.304c1.086-0.335,1.886-1.338,1.886-2.53v-3.546 c0-0.78-0.347-1.477-0.886-1.965v-5.126c0,0,1.053-7.977-9.75-7.977s-9.75,7.977-9.75,7.977v5.126 c-0.54,0.488-0.886,1.185-0.886,1.965v3.546c0,0.934,0.491,1.756,1.226,2.231c0.886,3.857,3.206,6.633,3.206,6.633v3.24 C20.296,39.899,19.65,40.986,18.613,41.552z" />
                                                <g>
                                                    <path style={{ fill: '#556080' }} d="M26.953,0.004C12.32-0.246,0.254,11.414,0.004,26.047C-0.138,34.344,3.56,41.801,9.448,46.76 c0.385-0.336,0.798-0.644,1.257-0.894l7.907-4.313c1.037-0.566,1.683-1.653,1.683-2.835v-3.24c0,0-2.321-2.776-3.206-6.63 c-0.734-0.475-1.226-1.296-1.226-2.231v-3.546c0-0.78,0.347-1.477,0.886-1.965v-5.126c0,0-1.053-7.977,9.75-7.977 s9.75,7.977,9.75,7.977v5.126c0.54,0.488,0.886,1.185,0.886,1.965v3.546c0,1.192-0.8,2.195-1.886,2.53 c-0.605,1.881-1.478,3.674-2.632,5.304c-0.291,0.411-0.563,0.759-0.801,1.03V38.8c0,1.223,0.691,2.342,1.785,2.888l8.467,4.233 c0.508,0.254,0.967,0.575,1.39,0.932c5.71-4.762,9.399-11.882,9.536-19.9C53.246,12.32,41.587,0.254,26.953,0.004z" />
                                                </g>
                                                <g>
                                                </g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g>
                                            </svg>
                                        </div>
                                        <form name="loginForm" noValidate onSubmit={this.handleSubmit}>
                                            <div className="elgninside">
                                                <div className="elgnttl">
                                                    <h4>User Login</h4>
                                                </div>
                                                <div className="elgnform">
                                                    <hr />
                                                    <ul>
                                                        <li>
                                                            <MyInput type={'email'} value={this.state.Email} label={'Username or Email address'} name={'Email'} htmlFor={'Email'} isrequired={true}
                                                                onChange={this.onChangeEmail} className="form-control" onComponentMounted={this.register} messageRequired={'Email Required'} messageEmail={'Invalid Email'} />
                                                        </li>
                                                        <li>
                                                            <MyInput type={'password'} value={this.state.Password} label={'Password'} name={'Password'} htmlFor={'Password'} isrequired={true}
                                                                onChange={this.onChangePassword} className="form-control col-md-12" onComponentMounted={this.register} messageRequired={'Password required'} />
                                                        </li>
                                                        <li>
                                                            <button type="submit" className="btn btn-info">Login</button>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className="elgnftr">
                                                    <span><a href="javascript:void(0)">Forgot Password ?</a></span>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});
//Render react component into the page
ReactDOM.render(<LoginForm urlPost="/Auth/Login" />, document.getElementById('logincontent'));
