import React, { useState, useEffect, useContext } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Button,
  Modal, ModalHeader, ModalBody,ButtonGroup
} from "reactstrap";
import ReactExport from "react-data-export";
import DatePicker from 'react-date-picker';


import AuthContext from "../../context/auth/authContext";
import pagination from "../Pagination/pagination";
import { ApiUrl, JsonContentType, SurveyPhotoUrl } from "../../setting";

const Report = () => {

  const authContext = useContext(AuthContext);
  const { user } = authContext;

  const [data, setData] = useState([]); 
  const [photo, setPhoto] = useState({
      photo: "",
      url:""
  }); 

  const [modal, setModal] = useState(false);
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  useEffect(() => {
    fetchData();
  }, []);

  const handleRefresh = () => {
    fetchData();
  };

  const toggle = (e) => {
      const photoUrl = SurveyPhotoUrl + e.target.name;
      setPhoto({
          name: e.target.name,
          url: photoUrl
      });      
      setModal(!modal);

      console.log(photoUrl);
  }

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

  const handleDelete = async id => {
    
    const confirm = window.confirm("Apakah anda yakin menghapus survey ini ?");

    const formData = {
      surveyId: id
    };


    if(confirm === true) {
      try {
        const url = ApiUrl + "/survey/delete";
        await axios.post(url, formData, JsonContentType); 
  
        fetchData();
      } catch (err) {
        console.log(err);
      }
    } 
    
  };

  const handleDateFilter = async () => {
    console.log(startDate, endDate);
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

  const optionFormatter = (cell, row) => {
    return (
      <ButtonGroup>
        <Button color="danger" onClick={id => handleDelete(cell)}>
          <i className="icon-trash" />
        </Button>               
      </ButtonGroup>
    );
  };

  
  const columns = [ 
    {
      dataField: "id",
      text: "id",      
      hidden: true
    },
    {
      dataField: "submittedAt",
      text: "Tanggal Submit",      
      sort: true
    },
    {
        dataField: "nik",
        text: "NIK",      
        sort: true,
        filter: textFilter()
    },
    {
        dataField: "nama",
        text: "Nama",      
        sort: true,
        filter: textFilter()
    },
    {
        dataField: "department",
        text: "Department",      
        sort: true,
        filter: textFilter()
    },
    {
        dataField: "result",
        text: "Penilaian",      
        sort: true,
        filter: textFilter()
    },
    {
        dataField: "reason",
        text: "Alasan",      
        sort: true,
        filter: textFilter()
    },
    {
      dataField: "photos",  
      text: "Photo Attachment",
      formatter: photoFormatter      
    },
    {
      dataField: "id",
      text: "Option",      
      hidden: user.role === "admin" ? false : true,
      formatter: optionFormatter
    }
  ];  
  

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
          <Col md="12">
            <Card>
              <CardHeader>
              <Row>
                  <Col md="4">
                      <h4>Report Survey</h4>
                  </Col>
                  <Col md="4" className="text-right">
                      {/* <label>Tanggal Submit :</label>
                      <DatePicker
                        selectsRange={true}
                        startDate={startDate}
                        endDate={endDate}
                        onChange={(update) => {
                          setDateRange(update);
                        }}
                        isClearable={true}
                      />
                      <Button color="info" className="btn btn-sm" onClick={handleDateFilter}>Filter</Button> */}
                  </Col>
                  <Col md="4" className="text-right">
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
                  filter={ filterFactory() }
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
