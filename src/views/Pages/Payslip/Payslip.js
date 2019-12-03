import React, { useState, useEffect, useContext } from "react";
import { Card, CardBody, CardHeader, Col, Row, Table } from "reactstrap";
import axios from "axios";

import AuthContext from "../../../context/auth/authContext";
import { ApiUrl, PayslipFileUrl } from "../../../setting";

const Payslip = () => {
  const [data, setData] = useState([]);
  const authContext = useContext(AuthContext);
  const { user } = authContext;
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (user) {
      setUrl(ApiUrl + "/payslip/" + user.employee_id + "/1");
    }
  }, [user]);

  useEffect(() => {
    if (url !== "") loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  const handleRefresh = () => {
    loadData();
  };

  const loadData = async () => {
    try {
      const res = await axios.get(url);
      setData(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDownload = async filename => {
    console.log("download :", filename);

    try {
      const url = ApiUrl + "/payslip/download/" + filename;
      axios(url, {
        method: "GET",
        responseType: "blob"
        //Force to receive data in a Blob Format
      })
        .then(response => {
          //Create a Blob from the PDF Stream
          const file = new Blob([response.data], {
            type: "application/pdf"
          });

          const url = window.URL.createObjectURL(file);
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", filename);
          document.body.appendChild(link);
          link.click();
        })
        .catch(error => {
          console.log(error);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const renderItems = () => {
    let num = 1;
    if (data.length > 0) {
      return data.map(item => (
        <tr key={item.id}>
          <td>{num++}</td>
          <td>{item.year}</td>
          <td>{item.month}</td>
          <td>
            <a
              href={PayslipFileUrl + item.filename}
              target="_blank"
              rel="noopener noreferrer"
            >
              {item.filename}
            </a>
          </td>
          <td>
            <button
              className="btn btn-rounded"
              onClick={() => handleDownload(item.filename)}
            >
              <i className="fa fa-cloud-download"></i>
            </button>
          </td>
        </tr>
      ));
    } else {
      return (
        <tr>
          <td colSpan="5">Data tidak ada</td>
        </tr>
      );
    }
  };

  return (
    <div className="animated fadeIn">
      <Row>
        <Col lg="12" sm="12" xs="12">
          <Card>
            <CardHeader>
              <strong>Payslip</strong>
              <div className="card-header-actions">
                <a
                  href="#!"
                  onClick={handleRefresh}
                  className="card-header-action btn"
                >
                  <span className="fa fa-refresh"></span>
                </a>
              </div>
            </CardHeader>
            <CardBody>
              <Table responsive striped>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Tahun</th>
                    <th>Bulan</th>
                    <th>File</th>
                    <th>
                      <i className="fa fa-gear"></i> Download
                    </th>
                  </tr>
                </thead>
                <tbody>{renderItems()}</tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Payslip;
