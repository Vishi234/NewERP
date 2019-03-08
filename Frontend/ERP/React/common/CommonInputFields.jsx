class CreateInput extends React.Component {
    handleChange(e) {
        this.props.onChange(e.target.value);
        if (this.props.type != "ddl") {
            var isValidField = this.isValid(e.target);
        }
        if (this.props.validate) {
            this.validate(e.target.value);
        }
    }
    validate(value) {
        
        if (this.props.validate && this.props.validate(value)) {
            this.setState({
                valid: true,
                errorVisible: false
            });
        } else {
            this.setState({
                valid: false,
                errorVisible: true
            });
        }
    }
    handleBlur(e) {
        this.props.onBlur(e.target.value);
        var isValidField = this.isValid(e.target);
    }
    handleClick(e) {
        this.props.onBlur(e.target.value);
        var isValidField = this.isValid(e.target);
    }
    isValid(input) {
        //check required field
        if (input.tagName == 'INPUT') {
            if (input.getAttribute('required') != null && input.value === "") {
                input.classList.add('input-validation-error'); //add class error
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
        }
        else if (input.tagName == "SELECT")
        {
            return true;
            //if (input.getAttribute('required') != null && input.value == "0") {
            //    input.classList.add('input-validation-error'); //add class error
            //    input.nextSibling.classList.add('field-validation-error');
            //    input.nextSibling.textContent = this.props.messageRequired; // show error message
            //    return false;
            //}
            //else {
            //    input.classList.remove('input-validation-error');
            //    input.nextSibling.classList.remove('field-validation-error');
            //    input.nextSibling.textContent = "";
            //    return true;
            //}
        }

    }
    CheckDateDiff(startDate, endDate) {
        var startDate = moment(startDate, "DD-MMM-YYYY");
        var endDate = moment(endDate, "DD-MMM-YYYY");
        return endDate.diff(startDate);
    }
    //componentWillUnmount() {
    //    this.setState({ mode: false })
    //}
    componentDidMount() {
        if (this.props.onComponentMounted) {
            this.props.onComponentMounted(this); //register this input in the form
        }
        if (this.props.type == "date") {
            InitializeDate(this.props.name);
        }
        if (this.props.type == "ddl") {
                InitializeSelect(this.props.name);
                $('select[name=' + this.props.name + ']').on('change', this.handleChange.bind(this));
            $('select[name=' + this.props.name + ']').trigger("chosen:updated")

        }
        if (this.props.type =='selectBox') {
            InitializeSelectList(this.props.name);
        }

        //this.setState({ mode: true })
        //this.setState({ this.props.mode = true});


    }
    componentDidUpdate() {
        if (this.props.type == "ddl")
        {
                $('select[name=' + this.props.name + ']').trigger("chosen:updated")      
        }
        if (this.props.type == "date") {
            InitializeDate(this.props.name);
        }
    }
    render() {

        var inputField;
        if (this.props.type == 'textarea') {
            inputField = <textarea value={this.props.value} ref={this.props.name} name={this.props.name}
                                   className='registration-form-control' required={this.props.isrequired} onChange={this.handleChange.bind(this)} />
        }
        else if (this.props.type == 'ddl') {
            inputField = <select value={this.props.value} ref='MySelect2' onChange={this.handleChange.bind(this)} name={this.props.name}
                                 className='registration-form-control dropdown' required={this.props.isrequired}>
                            <option key="0" value="0">Select {this.props.label}</option>
                {this.props.data.map((obj) =>
                <option key={obj[this.props.keyId]} onClick={this.handleClick.bind(this)} value={obj[this.props.keyId] }>{obj[this.props.keyName]}</option>)}
            </select>
        }
        else if (this.props.type == 'multiSelect') {
            inputField = <select value={this.props.value} ref='MySelect3' onChange={this.handleChange.bind(this)} name={this.props.name}
                                 className='registration-form-control dropdown' required={this.props.isrequired}>
                <option key="0" value="0">Select {this.props.label}</option>
                {this.props.data.map((obj) =>
                    <option key={obj[this.props.keyId]} onClick={this.handleClick.bind(this)} value={obj[this.props.keyId]}>{obj[this.props.keyName]}</option>)}
            </select>
        }
        else if (this.props.type == 'date') {
            inputField = <input type="text" id={this.props.id} value={this.props.value} ref={this.props.name} readOnly autoComplete="off" name={this.props.name}
                                className={this.props.className} required={this.props.isrequired} onBlur={this.handleBlur.bind(this)} />
        }
        else if (this.props.type == 'password') {
            inputField = <input type="password" value={this.props.value} ref={this.props.name}  autoComplete="off" name={this.props.name}
                className={this.props.className} required={this.props.isrequired} onChange={this.handleChange.bind(this)} validate={this.handleChange.bind(this)}/>
        } else if (this.props.type == 'selectBox') {
            inputField = <select value={this.props.value}  onChange={this.handleChange.bind(this)} name={this.props.name}
                 required={this.props.isrequired}>              
                {this.props.data.map((obj) =>
                    <option key={obj[this.props.keyId]} onClick={this.handleClick.bind(this)} value={obj[this.props.keyId]}>{obj[this.props.keyName]}</option>)}
            </select>
        }
        else {
            inputField = <input type={this.props.type} value={this.props.value} ref={this.props.name} autoComplete="off" name={this.props.name}
                                className={this.props.className} required={this.props.isrequired} onChange={this.handleChange.bind(this)} />

        }
        return (
            <div className={this.props.type}>
                <div className="form-group">
                    <label htmlFor={this.props.htmlFor}>{this.props.label}:</label>{inputField}
                    <span className="field-validation-error"></span>
                </div>
                <span className="calendarbase"><img src="../../Images/calendar.png" /></span>
            </div>
        );
    }
}
