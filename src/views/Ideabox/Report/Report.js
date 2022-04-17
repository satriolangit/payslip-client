import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { ApiUrl } from "../../../setting";
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

function Report() {
  const [data, setData] = useState([]);
  const [documentWidth, setDocumentWidth] = useState(800);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [ideaType, setIdeaType] = useState("ALL");

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
    await fetchData();
  };

  const handleTypeChange = (type) => {
    setIdeaType(type);
  };

  const pdf = data.length > 0 && (
    <Ideasheet data={data} width={documentWidth} />
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
                    onChange={() => handleTypeChange("ALL")}
                  />{" "}
                  <Label check>ALL</Label>
                </FormGroup>
                <FormGroup check>
                  <Input
                    name="rUmum"
                    type="radio"
                    value="UMUM"
                    onChange={() => handleTypeChange("UMUM")}
                  />{" "}
                  <Label check>UMUM</Label>
                </FormGroup>
                <FormGroup check>
                  <Input
                    name="rQKYT"
                    type="radio"
                    value="Q-KYT"
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
      <Card id="pdfContainer">
        <CardBody>{pdf}</CardBody>
      </Card>
    </div>
  );
}

export default Report;
