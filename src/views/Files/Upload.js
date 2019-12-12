import React from "react";
import UploadForm from "./../Upload/Upload";
import "./upload.css";

const Upload = () => {
  return (
    <div className="animated fadeIn">
      <div className="page-content-wrap">
        <div className="row">
          <div className="col-md-12">
            <div className="App">
              <div className="Card">
                <UploadForm server="/upload/files" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
