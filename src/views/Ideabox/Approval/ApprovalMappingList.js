import React from "react";
import axios from "axios";
import { Row, Col, Card, CardHeader, CardBody, Button } from "reactstrap";
import BootstrapTable from "react-bootstrap-table-next";
import { confirm } from "react-bootstrap-confirmation";
import { Link } from "react-router-dom";

import { ApiUrl, JsonContentType } from "../../../setting";
import SearchBox from "../../SearchBox/SearchBox";

function ApprovalMappingList(props) {
  const [data, setData] = React.useState([]);
  const [selected, setSelected] = React.useState([]);

  React.useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const url = ApiUrl + "/approval/";
      const res = await axios.get(url);
      const list = res.data.data;

      setData(list);
    } catch (err) {
      console.log(err);
    }
  };

  const handleRefresh = () => {
    fetchData();
  };

  const searchData = async (keywords) => {
    try {
      const url = ApiUrl + "/approval/search";
      const formData = {
        keywords,
      };

      const res = await axios.post(url, formData, JsonContentType);
      setData(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSearch = (keyword) => {
    if (keyword === "") {
      fetchData();
    } else {
      searchData(keyword);
    }
  };

  const handleDelete = async () => {
    if (selected.length > 0) {
      const result = await confirm("Apakah anda yakin menghapus user ini ?");

      if (result === true) {
        try {
          const formData = {
            employees: selected,
          };
          const url = ApiUrl + "/approval/remove";
          await axios.post(url, formData, JsonContentType);

          fetchData();
        } catch (err) {
          console.log(err);
        }
      }
    }
  };

  const handleOnSelect = (row, isSelect) => {
    if (isSelect) {
      console.log(row);
      setSelected([...selected, row.employeeId]);
    } else {
      setSelected(selected.filter((x) => x !== row.employeeId));
    }
  };

  const handleOnSelectAll = (isSelect, rows) => {
    const ids = rows.map((r) => r.employeeId);

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
    onSelectAll: handleOnSelectAll,
  };

  const columns = [
    {
      dataField: "mappingId",
      text: "id",
      hidden: true,
    },
    {
      dataField: "approvalRoleId",
      text: "Role",
      sort: true,
    },
    {
      dataField: "employeeId",
      text: "NIK",
      sort: true,
    },
    {
      dataField: "username",
      text: "Username",
      sort: true,
    },
    {
      dataField: "department",
      text: "Department",
      sort: true,
    },
    {
      dataField: "email",
      text: "Email",
    },
  ];

  return (
    <div className="animated fadeIn">
      <Row>
        <Col lg="12" sm="12" xs="12">
          <Card>
            <CardHeader>
              <Row>
                <Col md="4">
                  <SearchBox onSearch={handleSearch} />
                </Col>
                <Col md="8" className="text-right">
                  <Button
                    color="secondary"
                    onClick={handleRefresh}
                    className="btn btn-sm"
                  >
                    <i className="icon-refresh" /> Refresh
                  </Button>
                  <Link
                    to="/ideabox/approval/mapping"
                    className="btn btn-sm btn-success"
                  >
                    <i className="icon-plus" /> Add
                  </Link>

                  <Button
                    color="danger"
                    onClick={handleDelete}
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
                keyField="employeeId"
                data={data}
                columns={columns}
                selectRow={selectRow}
                wrapperClasses="table-responsive"
                striped
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default ApprovalMappingList;
