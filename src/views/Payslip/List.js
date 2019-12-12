import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Button,
  ButtonGroup
} from "reactstrap";
import BootstrapTable from "react-bootstrap-table-next";
import moment from "moment";
import { ApiUrl, JsonContentType } from "../../setting";
import pagination from "../Pagination/pagination";
import SearchBox from "../SearchBox/SearchBox";

const Index = () => {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const handleRefresh = () => {
    fetchData();
  };

  const fetchData = async () => {
    try {
      const url = ApiUrl + "/payslip/";
      const res = await axios.get(url);
      setData(res.data.data);
    } catch (err) {
      console.log(err.response);
    }
  };

  const handleDelete = async (id, filename) => {
    const formData = {
      id,
      filename
    };

    try {
      const url = ApiUrl + "/payslip/delete";
      await axios.post(url, formData, JsonContentType);

      fetchData();
    } catch (err) {
      console.log(err.response);
    }
  };

  const handleDeleteSelected = async () => {
    try {
      const url = ApiUrl + "/payslip/deletes";
      await axios.post(url, { ids: selected }, JsonContentType);

      setSelected([]);
    } catch (err) {
      console.log(err);
    } finally {
      fetchData();
    }
  };

  const handleDownload = async filename => {
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
          //Build a URL from the file
          const fileURL = URL.createObjectURL(file);
          //Open the URL on new Window
          window.open(fileURL);
        })
        .catch(error => {
          console.log(error);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const handleOnSelect = (row, isSelect) => {
    if (isSelect) {
      setSelected([...selected, row.idx]);
    } else {
      setSelected(selected.filter(x => x !== row.idx));
    }
  };

  const handleOnSelectAll = (isSelect, rows) => {
    const ids = rows.map(r => r.idx);
    if (isSelect) {
      setSelected(ids);
    } else {
      setSelected([]);
    }
  };

  const handleSearch = keyword => {
    if (keyword === "") {
      fetchData();
    } else {
      searchData(keyword);
    }
  };

  const searchData = async keywords => {
    try {
      const url = ApiUrl + "/payslip/search";
      const res = await axios.post(url, { keywords }, JsonContentType);
      setData(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const optionFormatter = (cell, row) => {
    return (
      <ButtonGroup>
        <Button
          color="danger"
          onClick={() => handleDelete(row.id, row.filename)}
        >
          <i className="icon-trash"></i>
        </Button>
        <Button color="info" onClick={() => handleDownload(row.filename)}>
          <i className="fa fa-cloud-download"></i>
        </Button>
      </ButtonGroup>
    );
  };

  const datetimeFormatter = (cell, row) => {
    if (cell) return moment(cell).format("DD MMM YYYY hh:mm");
  };

  const selectRow = {
    mode: "checkbox",
    clickToSelect: true,
    selected: selected,
    onSelect: handleOnSelect,
    onSelectAll: handleOnSelectAll
  };

  const columns = [
    {
      dataField: "employee_name",
      text: "Nama",
      sort: true
    },
    {
      dataField: "employee_id",
      text: "N.I.K",
      sort: true
    },
    {
      dataField: "year",
      text: "Tahun",
      sort: true
    },
    {
      dataField: "month",
      text: "Bulan",
      sort: true
    },
    {
      dataField: "filename",
      text: "File",
      sort: true
    },
    {
      dataField: "download_count",
      text: "Jumlah download",
      sort: true
    },
    {
      dataField: "last_download_on",
      text: "Terakhir download",
      formatter: datetimeFormatter,
      sort: true
    },
    {
      text: "Option",
      isDummy: true,
      formatter: optionFormatter
    }
  ];

  return (
    <div className="animated fadeIn">
      <Row>
        <Col lg="12" sm="12" xs="12">
          <Card>
            <CardHeader>
              <Row>
                <Col lg="6" sm="6" xs="6">
                  <SearchBox onSearch={handleSearch} />
                </Col>
                <Col lg="6" sm="6" xs="6" className="text-right">
                  <Link
                    to="/admin/payslip/upload"
                    className="btn btn-success btn-sm add-right-margin"
                  >
                    <i className="icon-cloud-upload" /> Upload
                  </Link>
                  <Button
                    color="info"
                    onClick={handleRefresh}
                    className="btn btn-sm"
                  >
                    <i className="icon-refresh" /> Refresh
                  </Button>
                  <Button
                    color="danger"
                    onClick={handleDeleteSelected}
                    className="btn btn-sm"
                  >
                    <i className="icon-trash" /> Delete
                  </Button>
                </Col>
              </Row>
            </CardHeader>
            <CardBody>
              <BootstrapTable
                bootstrap4
                keyField="idx"
                data={data}
                columns={columns}
                selectRow={selectRow}
                pagination={pagination}
                wrapperClasses="table-responsive"
                striped
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Index;
