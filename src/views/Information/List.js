import React, { useState, useEffect } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import moment from "moment";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Button,
  ButtonGroup
} from "reactstrap";

import pagination from "../Pagination/pagination";
import SearchBox from "../SearchBox/SearchBox";
import { ApiUrl, JsonContentType } from "../../setting";
import "./information.css";

const List = () => {
  const [selected, setSelected] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const handleRefresh = () => {
    fetchData();
  };

  const datetimeFormatter = (cell, row) => {
    return moment(cell).format("DD MMM YYYY hh:mm");
  };

  const optionFormatter = (cell, row) => {
    return (
      <ButtonGroup>
        <Link className="btn btn-success" to={"/admin/information/" + row.id}>
          <span>
            <i className="icon-pencil"></i>
          </span>
        </Link>
        <Button color="danger" onClick={id => handleDelete(row.id)}>
          <i className="icon-trash" />
        </Button>
      </ButtonGroup>
    );
  };

  const handleDelete = async id => {
    try {
      const url = ApiUrl + "/information/delete";
      const res = await axios.post(
        url,
        {
          id
        },
        JsonContentType
      );
      console.log(res.data.message);
      fetchData();
    } catch (err) {
      console.log(err);
    }
  };

  const handleOnSelect = (row, isSelect) => {
    if (isSelect) {
      setSelected([...selected, row.id]);
    } else {
      setSelected(selected.filter(x => x !== row.id));
    }
  };

  const handleOnSelectAll = (isSelect, rows) => {
    const ids = rows.map(r => r.id);
    if (isSelect) {
      setSelected(ids);
    } else {
      setSelected([]);
    }
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
      dataField: "title",
      text: "Title",
      sort: true
    },
    {
      dataField: "text",
      text: "Text",
      sort: true
    },
    {
      dataField: "created_on",
      text: "Created on",
      formatter: datetimeFormatter,
      sort: true
    },
    {
      text: "Option",
      isDummy: true,
      formatter: optionFormatter
    }
  ];

  const handleDeleteSelected = async () => {
    console.log(selected);
    try {
      const url = ApiUrl + "/information/multidelete";
      await axios.post(url, { ids: selected }, JsonContentType);

      fetchData();
    } catch (err) {
      console.log(err);
    }
  };

  const handleSearch = keyword => {
    if (keyword === "") {
      fetchData();
    } else {
      searchData(keyword);
    }
  };

  const fetchData = async () => {
    try {
      const url = ApiUrl + "/information/";
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
                  <SearchBox onSearch={handleSearch} />
                </Col>
                <Col lg="6" sm="6" xs="6" className="text-right">
                  <Link
                    to="/admin/information/0"
                    className="btn btn-success btn-sm add-right-margin"
                  >
                    <span className="icon-plus"></span> New
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
                keyField="id"
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

export default List;
