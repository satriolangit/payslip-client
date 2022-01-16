import React from "react";
import axios from "axios";
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Button,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import BootstrapTable from "react-bootstrap-table-next";
import { confirm } from "react-bootstrap-confirmation";
import { Link } from "react-router-dom";

import { ApiUrl, JsonContentType } from "../../../setting";
import SearchBox from "../../SearchBox/SearchBox";
import pagination from "../../Pagination/pagination";

const ApprovalAdd = ({ history }) => {
  const [data, setData] = React.useState([]);
  const [selected, setSelected] = React.useState([]);
  const [dropdownOpen, setOpen] = React.useState(false);

  const toggle = () => setOpen(!dropdownOpen);

  React.useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const url = ApiUrl + "/approval/mapping/";
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
      const url = ApiUrl + "/approval/mapping/search";
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

  const handleOnSelect = (row, isSelect) => {
    if (isSelect) {
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

  const handleMapping = async (role) => {
    if (selected.length > 0) {
      const result = await confirm(
        "Apakah anda yakin melakukan proses mapping ?"
      );
      if (result) {
        try {
          const url = ApiUrl + "/approval/mapping/add";
          const formData = {
            employees: selected,
            approvalRole: role,
          };

          await axios.post(url, formData, JsonContentType);
        } catch (err) {
          console.log(err);
        }
      }
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
      dataField: "userId",
      text: "id",
      hidden: true,
    },
    {
      dataField: "employeeId",
      text: "NIK",
      sort: true,
    },
    {
      dataField: "name",
      text: "Username",
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

                  <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
                    <DropdownToggle className="btn btn-sm btn-success" caret>
                      Set To
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem
                        onClick={(role) => handleMapping("EMPLOYEE")}
                      >
                        Employee
                      </DropdownItem>
                      <DropdownItem
                        onClick={(role) => handleMapping("SECTION_MANAGER")}
                      >
                        Section Manager
                      </DropdownItem>
                      <DropdownItem
                        onClick={(role) => handleMapping("DEPARTMENT_MANAGER")}
                      >
                        Department Manager
                      </DropdownItem>
                      <DropdownItem
                        onClick={(role) => handleMapping("KOMITE_IDEABOX")}
                      >
                        Komite Ideabox
                      </DropdownItem>
                      <DropdownItem onClick={(role) => handleMapping("ADMIN")}>
                        Administrator
                      </DropdownItem>
                    </DropdownMenu>
                  </ButtonDropdown>
                  <Link
                    to="/ideabox/approval"
                    className="btn btn-sm btn-danger"
                  >
                    <i className="icon-close" /> Close
                  </Link>
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

export default ApprovalAdd;
