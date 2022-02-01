import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Button,
  ButtonGroup,
  Badge,
} from "reactstrap";
import BootstrapTable from "react-bootstrap-table-next";

import pagination from "../../Pagination/pagination";
import SearchBox from "../../SearchBox/SearchBox";
import { ApiUrl, JsonContentType } from "../../../setting";

const List = () => {
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
      const url = ApiUrl + "/ideabox/user/";
      const res = await axios.get(url);
      const list = res.data.data;
      setData(list);
    } catch (err) {
      console.log(err);
    }
  };

  const handleOnSelect = (row, isSelect) => {
    if (isSelect) {
      setSelected([...selected, row.user_id]);
    } else {
      setSelected(selected.filter((x) => x !== row.user_id));
    }
  };

  const handleOnSelectAll = (isSelect, rows) => {
    const ids = rows.map((r) => r.user_id);
    if (isSelect) {
      setSelected(ids);
    } else {
      setSelected([]);
    }
  };

  const handleSearch = (keyword) => {
    if (keyword === "") {
      fetchData();
    } else {
      searchData(keyword);
    }
  };

  const searchData = async (keywords) => {
    try {
      const url = ApiUrl + "/ideabox/user/search";
      const res = await axios.post(url, { keywords }, JsonContentType);
      setData(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const datetimeFormatter = (cell, row) => {
    return moment(cell).format("DD MMM YYYY hh:mm");
  };

  const optionFormatter = (cell, row) => {
    return (
      <ButtonGroup>
        <Link className="btn btn-success" to={"/admin/user/" + row.user_id}>
          <span>
            <i className="icon-pencil"></i>
          </span>
        </Link>
      </ButtonGroup>
    );
  };

  const statusFormatter = (cell, row) => {
    let result = null;

    if (cell) {
      result = <Badge color="success">Active</Badge>;
    } else {
      result = <Badge color="secondary">Inactive</Badge>;
    }

    return result;
  };

  const renderSummaryLabel = () => {
    const total = data.length;
    const admin = data.filter((x) => x.role === "admin").length;
    const employee = total - admin;

    return (
      <p>
        Employee : {employee}, Admin : {admin}, Total : {total}
      </p>
    );
  };

  const selectRow = {
    mode: "checkbox",
    clickToSelect: true,
    selected: selected,
    onSelect: handleOnSelect,
    onSelectAll: handleOnSelectAll,
  };

  const columns = [
    {
      dataField: "name",
      text: "Nama",
      sort: true,
    },
    {
      dataField: "email",
      text: "Email",
      sort: true,
    },
    {
      dataField: "password_plain",
      text: "Password",
    },
    {
      dataField: "employee_id",
      text: "N.I.K",
      sort: true,
    },
    {
      dataField: "role",
      text: "Role",
      sort: true,
    },
    {
      dataField: "phone",
      text: "No. Telepon",
      sort: true,
    },
    {
      dataField: "is_active",
      text: "Status",
      formatter: statusFormatter,
      sort: true,
    },
    {
      dataField: "created_on",
      text: "Created on",
      formatter: datetimeFormatter,
      sort: true,
    },
    {
      dataField: "site_name",
      text: "Site",
      sort: true,
    },
    {
      text: "Option",
      isDummy: true,
      formatter: optionFormatter,
    },
  ];

  const renderBreadcrumb = () => {
    return (
      <div>
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">Home</li>
            <li class="active breadcrumb-item" aria-current="page">
              User
            </li>
          </ol>
        </nav>
      </div>
    );
  };

  return (
    <div>
      {renderBreadcrumb()}
      <div className="animated fadeIn">
        <Row>
          <Col lg="12" sm="12" xs="12">
            <Card>
              <CardHeader>
                <Row>
                  <Col lg="4" sm="4" xs="4">
                    <SearchBox onSearch={handleSearch} />
                  </Col>
                  <Col lg="4" sm="4" xs="4" className="text-center">
                    {renderSummaryLabel()}
                  </Col>
                  <Col lg="4" sm="4" xs="4" className="text-right">
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
                  keyField="user_id"
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
    </div>
  );
};

export default List;
