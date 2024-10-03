import React from "react";

const InformationModalMolecule = () => (
    
    <div className="modal fade" id="infoModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered " role="document">
            <div className="modal-content bg-dark border border-primary">
                <div className="modal-header text-white d-flex justify-content-between">
                    <h5 className="modal-title" id="exampleModalLabel">Instructions</h5>
                </div>
                <div className="modal-body text-white">
                    <p>............</p>
                    <p>............</p>
                    <p>............</p>
                    <p>............</p>
                    <p>............</p>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-primary text-white" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
)

export default InformationModalMolecule