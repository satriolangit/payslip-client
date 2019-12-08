import React from "react";
import UploadForm from "./../Upload/Upload";
import "./payslip.css";

const Upload = () => {
  return (
    <div className="animated fadeIn">
      <div className="page-content-wrap">
        <div className="row">
          <div className="col-md-12">
            <div className="App">
              <div className="Card">
                <UploadForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
