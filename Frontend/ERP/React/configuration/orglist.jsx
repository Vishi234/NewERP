//alert(window.dynamicData);
var OrgList = React.createClass({
   // alert(window.dynamicData)
    render: function () {
        //Render form
        return (
            <div>
                <div className="modal fade" id="selectorg" data-backdrop="static" data-keyboard="false">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Select Organization</h4>
                                <button type="button" className="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span className="sr-only">Close</span></button>
                            </div>
                            <div className="modal-body">
                                <div className="listorg show">
                                    <div className="leftlist">
                                        <ul>
                                            
                                        </ul>
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
ReactDOM.render(<OrgList />, document.getElementById('orglist'));