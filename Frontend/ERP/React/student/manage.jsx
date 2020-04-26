class AdmissionForm extends React.Component {
    constructor(props) {
        super(props);
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
                            Student Management
                        </div>
                        <div className="card-body">
                            <div className="efltrform"></div>
                            <div className="action">
                                <ul>
                                    <li>
                                        <a href="javascript:void(0)" data-toggle="modal" data-target="#student" className="btn btn-secondary">
                                            <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                                 width="357px" height="357px" viewBox="0 0 357 357" style={{enableBackground:'new 0 0 357 357;'}} xmlSpace="preserve">
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
                        </div>
                    </div>
                </div>
                <div id="student" className="modal fade">
                    <div className="modal-dialog modal-dialog-vertical-center modal-lg" role="document">
                        <div className="modal-content bd-0 tx-14">
                            <form name='StudentAdmi' id="StudentAdmi">
                                <div className="modal-header pd-y-20 pd-x-25">
                                    <h6 className="tx-14 mg-b-0 tx-uppercase tx-inverse tx-bold">Add/Edit Student</h6>
                                    <button type="button" className="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span className="sr-only">Close</span></button>
                                </div>
                                <div className="modal-body pd-25">
                                    <div className="einrformbase">

                                        <ul className="einrform ecustform">
                                            <li>
                                                <div className="form-group">
                                                    <label>Student Code</label>
                                                    <input type="text" className="form-control" />
                                                </div>
                                            </li>
                                            <li>
                                                <div className="form-group">
                                                    <label>First Name</label>
                                                    <input type="text" className="form-control" />
                                                </div>
                                            </li>
                                            <li>
                                                <div className="form-group">
                                                    <label>Last Name</label>
                                                    <input type="text" className="form-control" />
                                                </div>
                                            </li>
                                            <li>
                                                <div className="form-group">
                                                    <label>Course</label>
                                                    <input type="text" className="form-control" />
                                                </div>
                                            </li>
                                            <li>
                                                <div className="form-group">
                                                    <label>Semester</label>
                                                    <input type="text" className="form-control" />
                                                </div>
                                            </li>
                                            <li>
                                                <div className="form-group">
                                                    <label>Category</label>
                                                    <input type="text" className="form-control" />
                                                </div>
                                            </li>
                                            <li>
                                                <div className="form-group">
                                                    <label>Academic Year</label>
                                                    <input type="text" className="form-control" />
                                                </div>
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
                                            <a className="nav-link active show" data-toggle="tab" href="#personal">Personal Information</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" data-toggle="tab" href="#contact">Contact Information</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" data-toggle="tab" href="#subject">Subject Information</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" data-toggle="tab" href="#academic">Academic Information</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" data-toggle="tab" href="#account">Account Information</a>
                                        </li>
                                    </ul>
                                    <div className="tab-content">
                                        <div className="tab-pane active show" id="personal">
                                            <ul className="einrform">
                                                <li>
                                                    <div className="form-group">
                                                        <label>Father Name</label>
                                                        <input type="text" className="form-control" />
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="form-group">
                                                        <label>Mother Name</label>
                                                        <input type="text" className="form-control" />
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="form-group">
                                                        <label>Gender</label>
                                                        <input type="text" className="form-control" />
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="form-group">
                                                        <label>Date Of Birth</label>
                                                        <input type="text" className="form-control" />
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="form-group">
                                                        <label>Blood Group</label>
                                                        <input type="text" className="form-control" />
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="form-group">
                                                        <label>Nationality</label>
                                                        <input type="text" className="form-control" />
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="form-group">
                                                        <label>Mother Tongue</label>
                                                        <input type="text" className="form-control" />
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="form-group">
                                                        <label>Place Of Birth</label>
                                                        <input type="text" className="form-control" />
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="form-group">
                                                        <label>Are You Handicap?</label>
                                                        <input type="text" className="form-control" />
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="form-group">
                                                        <label>Parent Income(Annually)</label>
                                                        <input type="text" className="form-control" />
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="tab-pane" id="contact">
                                            <ul className="einrform">
                                                <li>
                                                    <div className="form-group">
                                                        <label>Address Line 1</label>
                                                        <input type="text" className="form-control" />
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="form-group">
                                                        <label>Address Line 2</label>
                                                        <input type="text" className="form-control" />
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="form-group">
                                                        <label>State</label>
                                                        <input type="text" className="form-control" />
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="form-group">
                                                        <label>City</label>
                                                        <input type="text" className="form-control" />
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="form-group">
                                                        <label>Phone</label>
                                                        <input type="text" className="form-control" />
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="form-group">
                                                        <label>Mobile</label>
                                                        <input type="text" className="form-control" />
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="form-group">
                                                        <label>Email</label>
                                                        <input type="text" className="form-control" />
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="form-group">
                                                        <label>Zipcode</label>
                                                        <input type="text" className="form-control" />
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="tab-pane" id="subject">

                                        </div>
                                        <div className="tab-pane" id="academic">
                                            <ul className="einrform">
                                                <li>
                                                    <div className="form-group">
                                                        <label>Institute Name</label>
                                                        <input type="text" className="form-control" />
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="form-group">
                                                        <label>University/Board</label>
                                                        <input type="text" className="form-control" />
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="form-group">
                                                        <label>Course</label>
                                                        <input type="text" className="form-control" />
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="form-group">
                                                        <label>Year</label>
                                                        <input type="text" className="form-control" />
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="form-group">
                                                        <label>Obtained Marks</label>
                                                        <input type="text" className="form-control" />
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="form-group">
                                                        <label>Percentage(%)</label>
                                                        <input type="text" className="form-control" />
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="tab-pane" id="account">
                                            <ul className="einrform">
                                                <li>
                                                    <div className="form-group">
                                                        <label>Login Id</label>
                                                        <input type="text" className="form-control" />
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="form-group">
                                                        <label>Password</label>
                                                        <input type="text" className="form-control" />
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="form-group">
                                                        <label>Confirm Password</label>
                                                        <input type="text" className="form-control" />
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="form-group">
                                                        <label>Account Status</label>
                                                        <input type="text" className="form-control" />
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="submit" className="btn btn-info pd-x-20"><span className="inload hide"><i className="fa fa-spinner fa-spin"></i></span> Save</button>
                                    <button type="button" className="btn btn-secondary pd-x-20" data-dismiss="modal">Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            )
    }
}
ReactDOM.render(<AdmissionForm urlPost="/Employee/Registration" personalPost='' contactPost='' authPost='' />, document.getElementById('studentform'));