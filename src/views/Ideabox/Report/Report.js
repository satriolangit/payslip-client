import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Alert from "react-s-alert";

import { ApiUrl, AlertOptions } from "../../../setting";
import Ideasheet from "../Ideasheet/IdeasheetReport";
import {
  Card,
  CardBody,
  CardHeader,
  Row,
  Col,
  FormGroup,
  Label,
  Input,
  CardFooter,
  Button,
} from "reactstrap";

import LoadingOverlay from "react-loading-overlay";

function Report() {
  const [data, setData] = useState([]);
  const [documentWidth, setDocumentWidth] = useState(800);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [ideaType, setIdeaType] = useState("ALL");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const width = document.getElementById("pdfContainer").clientWidth;
    setDocumentWidth(width - 50);
  }, []);

  const fetchData = async () => {
    try {
      const url = `${ApiUrl}/ideabox/report`;

      const payload = {
        startDate,
        endDate,
        type: ideaType,
      };

      const res = await axios.post(url, payload);
      const result = res.data.data;

      setData(result);

      console.log(result);
    } catch (err) {
      console.log(err);
    }
  };

  const handleReport = async () => {
    setIsLoading(true);
    await fetchData();
  };

  const handleTypeChange = (type) => {
    setIdeaType(type);
  };

  const handleRender = (value) => {
    setIsLoading(false);
  };

  const pdf = data.length > 0 && (
    <Ideasheet
      data={data}
      width={documentWidth}
      onRenderFinished={handleRender}
    />
  );

  return (
    <div>
      <Card>
        <CardHeader>Generate Report</CardHeader>
        <CardBody>
          <Row>
            <Col md="6">
              <FormGroup>
                <Label>Tanggal Dari</Label>

                <DatePicker
                  dateFormat="yyyy-MM-dd"
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                />
                <Label>Tanggal Sampai</Label>
                <DatePicker
                  dateFormat="yyyy-MM-dd"
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                />
              </FormGroup>
              <FormGroup tag="fieldset">
                <legend>Jenis Form</legend>
                <FormGroup check>
                  <Input
                    name="rAll"
                    type="radio"
                    value="ALL"
                    checked={ideaType === "ALL"}
                    onChange={() => handleTypeChange("ALL")}
                  />{" "}
                  <Label check>ALL</Label>
                </FormGroup>
                <FormGroup check>
                  <Input
                    name="rUmum"
                    type="radio"
                    value="UMUM"
                    checked={ideaType === "UMUM"}
                    onChange={() => handleTypeChange("UMUM")}
                  />{" "}
                  <Label check>UMUM</Label>
                </FormGroup>
                <FormGroup check>
                  <Input
                    name="rQKYT"
                    type="radio"
                    value="Q-KYT"
                    checked={ideaType === "Q-KYT"}
                    onChange={() => handleTypeChange("Q-KYT")}
                  />{" "}
                  <Label check>Q-KYT</Label>
                </FormGroup>
              </FormGroup>
            </Col>
          </Row>
        </CardBody>
        <CardFooter>
          <Button onClick={handleReport}>Generate File</Button>
        </CardFooter>
      </Card>
      <LoadingOverlay active={isLoading} spinner text="Loading please wait...">
        <Card id="pdfContainer">
          <CardBody>{pdf}</CardBody>
        </Card>
      </LoadingOverlay>
    </div>
  );
}

export default Report;
