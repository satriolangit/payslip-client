import React, { useState, useEffect } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Button,
  Modal, ModalHeader, ModalBody
} from "reactstrap";
import ReactExport from "react-data-export";

import pagination from "../Pagination/pagination";
import { ApiUrl, JsonContentType, SurveyPhotoUrl } from "../../setting";

const Report = () => {
  const [data, setData] = useState([]); 
  const [photo, setPhoto] = useState({
      photo: "",
      url:""
  });

  useEffect(() => {
    fetchData();
  }, []);

  const handleRefresh = () => {
    fetchData();
  };

  const [modal, setModal] = useState(false);

  const toggle = (e) => {
      const photoUrl = SurveyPhotoUrl + e.target.name;
      setPhoto({
          name: e.target.name,
          url: photoUrl
      });      
      setModal(!modal);

      console.log(photoUrl);
  }


  const photoFormatter = (cell, row) => {
      if(!cell) {
          return "-";
      } else { 
            const photos = cell.split(',');
            return (
                photos.map((photo, index) => (
                    <Link name={photo} to="#" onClick={toggle} style={{marginRight: "2px"}}>{photo}</Link>
                ))
            );
        }
  }

  
  const columns = [
    // {
    //   dataField: "no",
    //   text: "No",
    //   sort: true
    // },
    {
      dataField: "bulan",
      text: "Bulan",
      sort: true
    },
    {
        dataField: "tahun",
        text: "Tahun",      
        sort: true
    },
    {
      dataField: "submittedAt",
      text: "Tanggal Submit",      
      sort: true
    },
    {
        dataField: "nik",
        text: "NIK",      
        sort: true
    },
    {
        dataField: "nama",
        text: "Nama",      
        sort: true
    },
    {
        dataField: "department",
        text: "Department",      
        sort: true
    },
    {
        dataField: "result",
        text: "Penilaian",      
        sort: true
    },
    {
        dataField: "reason",
        text: "Alasan",      
        sort: true
      },
    {
      dataField: "photos",  
      text: "Photo Attachment",
      formatter: photoFormatter      
    }
  ];

  
  const fetchData = async () => {
    try {
      const url = ApiUrl + "/survey/report";
      const res = await axios.get(url);
      const list = res.data.data;

      setData(list);
      console.log(list);
    } catch (err) {
      console.log(err);
    }
  };

  const searchData = async keywords => {
    try {
      const url = ApiUrl + "/information/search";
      const res = await axios.post(url, { keywords }, JsonContentType);
      setData(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const ExcelFile = ReactExport.ExcelFile;
  const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
  const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

  const renderBreadcrumb = () => {
    return (
      <div>
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">Home</li>
            <li class="active breadcrumb-item" aria-current="page">Report Survey</li>
          </ol>
        </nav>
      </div>
    )    
}

  return (
    <div>
      {renderBreadcrumb()}
      <div className="animated fadeIn">
        <Row>
          <Col lg="12" sm="12" xs="12">
            <Card>
              <CardHeader>
              <Row>
                  <Col lg="6" sm="6" xs="6">
                      <h4>Report Survey</h4>
                  </Col>
                  <Col lg="6" sm="6" xs="6" className="text-right">
                  <ExcelFile element={<button className="btn btn-sm btn-success" filename="ReportSurvey">
                    <i className="icon-printer" /> Export</button>}>
                  <ExcelSheet data={data} name="ReportCatering">
                      <ExcelColumn label="Bulan" value="bulan"/>
                      <ExcelColumn label="Tahun" value="tahun"/>
                      <ExcelColumn label="Tanggal Submit" value="submittedAt"/>
                      <ExcelColumn label="NIK" value="nik"/>
                      <ExcelColumn label="Nama" value="nama"/>
                      <ExcelColumn label="Departemen" value="department"/>
                      <ExcelColumn label="Penilaian" value="result"/>
                      <ExcelColumn label="Alasan" value="reason"/>
                      <ExcelColumn label="Photo" value="photos"/>
                  </ExcelSheet>                
              </ExcelFile>
                    <Button
                      color="info"
                      onClick={handleRefresh}
                      className="btn btn-sm"
                    >
                      <i className="icon-refresh" /> Refresh
                    </Button>                 
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <BootstrapTable
                  bootstrap4
                  keyField="id"
                  data={data}
                  columns={columns}
                  pagination={pagination}
                  wrapperClasses="table-responsive"
                  striped
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Modal isOpen={modal} toggle={toggle} size="lg">
          <ModalHeader toggle={toggle}>{photo.name}</ModalHeader>
          <ModalBody>
              <img src={photo.url} alt="photoSurvey" style={{width: "100%", height: "auto"}}/>
          </ModalBody>        
        </Modal>
      </div>

    </div>
    
  );
};

export default Report;
