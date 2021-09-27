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
            const photos = cell.split(';');
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

  return (
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
            <img src={photo.url} alt="photoSurvey" style={{minWidth: "400px", height: "auto"}}/>
        </ModalBody>        
      </Modal>
    </div>
  );
};

export default Report;
