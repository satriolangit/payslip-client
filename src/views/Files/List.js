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
import { CopyToClipboard } from "react-copy-to-clipboard";
import Alert from "react-s-alert";

import { ApiUrl, JsonContentType, AlertOptions } from "../../setting";
import pagination from "../Pagination/pagination";
import SearchBox from "../SearchBox/SearchBox";

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
      const url = ApiUrl + "/upload/";
      const res = await axios.get(url);
      setData(res.data.data);
    } catch (err) {
      console.log(err.response);
    }
  };

  const handleDeleteSelected = async () => {
    try {
      const url = ApiUrl + "/upload/bulkdelete";
      await axios.post(url, { ids: selected }, JsonContentType);

      fetchData();

      setSelected([]);
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
      const url = ApiUrl + "/upload/search";
      const res = await axios.post(url, { keywords }, JsonContentType);
      setData(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const optionFormatter = (cell, row) => {
    return (
      <ButtonGroup>
        <CopyToClipboard text={row.path}>
          <Button color="info" onClick={handleCopy}>
            Copy link to clipboard
          </Button>
        </CopyToClipboard>
      </ButtonGroup>
    );
  };

  const datetimeFormatter = (cell, row) => {
    if (cell) return moment(cell).format("DD MMM YYYY hh:mm");
  };

  const linkFormatter = (cell, row) => {
    return (
      <a href={cell} target="_blank" rel="noopener noreferrer">
        {cell}
      </a>
    );
  };

  const handleCopy = () => {
    Alert.info("Link copied !", AlertOptions);
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
      dataField: "filename",
      text: "Nama File",
      sort: true
    },
    {
      dataField: "path",
      text: "Link",
      formatter: linkFormatter
    },
    {
      dataField: "created_time",
      text: "Waktu upload",
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
                    to="/admin/files/upload"
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

export default List;
