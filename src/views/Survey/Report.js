import React, { useState, useEffect, useContext } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import "react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ButtonGroup,
} from "reactstrap";
import ReactExport from "react-data-export";
import { confirm } from "react-bootstrap-confirmation";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import AuthContext from "../../context/auth/authContext";
import pagination from "../Pagination/pagination";
import { ApiUrl, JsonContentType, SurveyPhotoUrl } from "../../setting";

const Report = () => {
  const authContext = useContext(AuthContext);
  const { user } = authContext;

  const [data, setData] = useState([]);
  const [photo, setPhoto] = useState({
    photo: "",
    url: "",
  });
  const [selectedRows, setSelectedRows] = useState([]);
  const [modal, setModal] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

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
      url: photoUrl,
    });
    setModal(!modal);

    console.log(photoUrl);
  };

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

  const handleDelete = async (id) => {
    const formData = {
      surveyId: id,
    };

    const result = await confirm("Apakah anda yakin menghapus survey ini ?");

    if (result === true) {
      try {
        const url = ApiUrl + "/survey/delete";
        await axios.post(url, formData, JsonContentType);

        fetchData();
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleDeleteRow = () => {
    console.log(selectedRows);

    if (selectedRows.length > 0) {
      selectedRows.map(async (item) => {
        const formData = {
          surveyId: item.id,
        };

        try {
          const url = ApiUrl + "/survey/delete";
          await axios.post(url, formData, JsonContentType);
        } catch (err) {
          console.log(err);
        }
      });

      fetchData();
    }
  };

  const handleFilter = async () => {
    console.log(startDate, endDate);

    const formData = {
      startDate,
      endDate,
    };

    try {
      const url = ApiUrl + "/survey/report/filter";
      const res = await axios.post(url, formData, JsonContentType);
      const list = res.data.data;

      setData(list);
      console.log(list);
    } catch (err) {
      console.log(err);
    }
  };

  const photoFormatter = (cell, row) => {
    if (!cell) {
      return "-";
    } else {
      const photos = cell.split(",");
      return photos.map((photo, index) => (
        <Link
          name={photo}
          to="#"
          onClick={toggle}
          style={{ marginRight: "2px" }}
        >
          {photo}
        </Link>
      ));
    }
  };

  const optionFormatter = (cell, row) => {
    return (
      <ButtonGroup>
        <Button color="danger" onClick={(id) => handleDelete(cell)}>
          <i className="icon-trash" />
        </Button>
      </ButtonGroup>
    );
  };

  const renderButtonDelete = () => {
    if (user.role === "admin") {
      return (
        <Button color="danger" onClick={handleDeleteRow} className="btn btn-sm">
          <i className="icon-trash" /> Delete
        </Button>
      );
    }
  };

  const renderBreadcrumb = () => {
    return (
      <div>
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">Home</li>
            <li class="active breadcrumb-item" aria-current="page">
              Report Survey
            </li>
          </ol>
        </nav>
      </div>
    );
  };

  const renderDateFilter = () => {
    const child = {
      display: "inline-block",
      verticalAlign: "middle",
      marginRight: "2px",
    };

    return (
      <Col md="6">
        <Row>
          <div>
            <div style={child}>
              <label>Tanggal Submit : </label>
            </div>
            <div style={child}>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
            </div>
            <div style={child}>
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
              />
            </div>
            <div style={child}>
              <button class="btn btn-sm btn-info" onClick={handleFilter}>
                <i className="fa fa-search"></i>Filter
              </button>
            </div>
          </div>
        </Row>
        {/* <Row>        
          <Col md="2"><label>Tanggal Submit :</label></Col>
          <Col md="4"><DatePicker selected={startDate} onChange={(date) => setStartDate(date)} /></Col>
          <Col md="4"><DatePicker selected={endDate} onChange={(date) => setEndDate(date)} /></Col>
          <Col md="2">
            <button class="btn btn-sm btn-info" onClick={handleFilter}><i className="fa fa-search"></i>Filter</button>
          </Col>
        </Row> */}
      </Col>
    );
  };

  const columns = [
    {
      dataField: "id",
      text: "id",
      hidden: true,
    },
    {
      dataField: "submittedAt",
      text: "Tanggal Submit",
      sort: true,
    },
    {
      dataField: "nik",
      text: "NIK",
      sort: true,
      filter: textFilter(),
    },
    {
      dataField: "nama",
      text: "Nama",
      sort: true,
      filter: textFilter(),
    },
    {
      dataField: "department",
      text: "Department",
      sort: true,
      filter: textFilter(),
    },
    {
      dataField: "result",
      text: "Penilaian",
      sort: true,
      filter: textFilter(),
    },
    {
      dataField: "reason",
      text: "Alasan",
      sort: true,
      filter: textFilter(),
    },
    {
      dataField: "photos",
      text: "Photo Attachment",
      formatter: photoFormatter,
    },
    {
      dataField: "id",
      text: "Option",
      hidden: user.role === "admin" ? false : true,
      formatter: optionFormatter,
    },
  ];

  const selectRow = {
    mode: "checkbox",
    onSelectAll: (isSelect, rows, e) => {
      if (isSelect) {
        setSelectedRows(rows);
      } else {
        setSelectedRows([]);
      }
    },
    onSelect: (row, isSelect, rowIndex, e) => {
      if (isSelect) {
        setSelectedRows([...selectedRows, row]);
      } else {
        var filtered = selectedRows.filter((item) => item.id !== row.id);
        setSelectedRows(filtered);
      }
    },
  };

  const ExcelFile = ReactExport.ExcelFile;
  const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
  const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

  return (
    <div>
      {renderBreadcrumb()}
      <div className="animated fadeIn">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <Row>
                  {renderDateFilter()}
                  <Col md="6" className="text-right">
                    <ExcelFile
                      element={
                        <button
                          className="btn btn-sm btn-success"
                          filename="ReportSurvey"
                        >
                          <i className="icon-printer" /> Export
                        </button>
                      }
                    >
                      <ExcelSheet data={data} name="ReportCatering">
                        <ExcelColumn label="Bulan" value="bulan" />
                        <ExcelColumn label="Tahun" value="tahun" />
                        <ExcelColumn
                          label="Tanggal Submit"
                          value="submittedAt"
                        />
                        <ExcelColumn label="NIK" value="nik" />
                        <ExcelColumn label="Nama" value="nama" />
                        <ExcelColumn label="Departemen" value="department" />
                        <ExcelColumn label="Penilaian" value="result" />
                        <ExcelColumn label="Alasan" value="reason" />
                        <ExcelColumn label="Photo" value="photos" />
                      </ExcelSheet>
                    </ExcelFile>
                    <Button
                      color="info"
                      onClick={handleRefresh}
                      className="btn btn-sm"
                    >
                      <i className="icon-refresh" /> Refresh
                    </Button>
                    {renderButtonDelete()}
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
                  filter={filterFactory()}
                  selectRow={selectRow}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Modal isOpen={modal} toggle={toggle} size="lg">
          <ModalHeader toggle={toggle}>{photo.name}</ModalHeader>
          <ModalBody>
            <img
              src={photo.url}
              alt="photoSurvey"
              style={{ width: "100%", height: "auto" }}
            />
          </ModalBody>
        </Modal>
      </div>
    </div>
  );
};

export default Report;
