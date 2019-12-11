import React, { useState } from "react";
import axios from "axios";
import SimpleAlert from "./../../UI/Alert/SimpleAlert";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Input
} from "reactstrap";

import { ApiUrl } from "../../setting";

const Uploader = ({ onFinish }) => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [logMessage, setLogMessage] = useState("");

  const handleFileUploadChange = e => {
    setLogMessage("");
    setUploadedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const data = new FormData();
    data.append("file", uploadedFile);
    const url = ApiUrl + "/users/upload";

    setLoading(true);
    setLogMessage("");

    try {
      const res = await axios.post(url, data);
      //const message = res.response.data.message;
      console.log(res.data);
      setLogMessage(res.data.message);
    } catch (error) {
      console.log(error);
      setLogMessage(error.response);
    } finally {
      setLoading(false);
      onFinish();
    }
  };

  const renderButton = () => {
    let result = null;
    if (loading) {
      result = (
        <Button className="pull-right" color="primary" onClick={handleUpload}>
          <i className="fa fa-circle-o-notch fa-spin" /> Please wait...
        </Button>
      );
    } else {
      result = (
        <Button className="pull-right" color="primary" onClick={handleUpload}>
          <i className="icon-cloud-upload" /> Upload
        </Button>
      );
    }

    return result;
  };

  return (
    <Card>
      <CardHeader>
        <SimpleAlert type="success" message={logMessage} />
        <h4>Select a file to upload (excel)</h4>
      </CardHeader>
      <CardBody>
        <Input
          type="file"
          id="fileupload"
          name="fileupload"
          onChange={handleFileUploadChange}
        />
      </CardBody>
      <CardFooter>{renderButton()}</CardFooter>
    </Card>
  );
};

export default Uploader;
