import React, { useState } from "react";
import axios from "axios";
import Alert from "react-s-alert";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Input,
  Spinner
} from "reactstrap";

import { ApiUrl, AlertOptions } from "../../setting";

const Uploader = () => {
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
      Alert.success("Successfully upload user", AlertOptions);
    } catch (error) {
      console.log(error);
      setLogMessage(error.response);
      Alert.error(logMessage, AlertOptions);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
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
      <CardFooter>
        <Button className="btn btn-primary pull-right" onClick={handleUpload}>
          {loading ? (
            <Spinner color="secondary" />
          ) : (
            <i className="icon-cloud-upload"></i>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Uploader;
