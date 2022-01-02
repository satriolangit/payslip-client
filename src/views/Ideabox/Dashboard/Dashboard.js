import React, { useState, useEffect, useContext, Fragment } from "react";
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
import AuthContext from "./../../../context/auth/authContext";
import {
  AdminButtonGroup,
  DeparmentManagerButtonGroup,
  EmployeeButtonGroup,
  KomiteButtonGroup,
  SectionManagerButtonGroup,
} from "./ButtonGroup";

const Dashboard = () => {
  const authContext = useContext(AuthContext);
  const { user } = authContext;

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
      const url = ApiUrl + "/ideabox/list";
      const formData = {
        employeeId: user.employee_id,
        approvalRole: user.approval_role,
      };
      const res = await axios.post(url, formData, JsonContentType);
      const list = res.data.data;

      setData(list);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSearch = (keywords) => {
    console.log("handle search");
  };

  const handleDeleteItems = () => {
    console.log("handle delete items");
  };

  const handleOnSelect = (row, isSelect) => {
    if (isSelect) {
      setSelected([...selected, row.ideaboxId]);
    } else {
      setSelected(selected.filter((x) => x !== row.ideaboxId));
    }
  };

  const handleOnSelectAll = (isSelect, rows) => {
    const ids = rows.map((r) => r.ideaboxId);
    if (isSelect) {
      setSelected(ids);
    } else {
      setSelected([]);
    }
  };

  const handleAccept = () => {
    alert("handle accept");
  };

  const handleExport = () => {
    alert("handle export");
  };

  const handleEdit = () => {
    alert("handleEdit");
  };

  const handleSubmit = () => {
    alert("handle submit");
  };

  const handleApprove = () => {
    alert("handle approve");

    console.log(selected);

    try {
      const url = ApiUrl + "/ideabox/approve";

      selected.map(async (id) => {
        const formData = {
          employeeId: user.employee_id,
          ideaboxId: id,
        };

        const res = await axios.post(url, formData, JsonContentType);
        console.log(res.data);
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleReject = () => {
    alert("handle reject");
    console.log(selected);

    try {
      const url = ApiUrl + "/ideabox/reject";

      selected.map(async (id) => {
        const formData = {
          employeeId: user.employee_id,
          ideaboxId: id,
        };

        const res = await axios.post(url, formData, JsonContentType);
        console.log(res.data);
      });
    } catch (err) {
      console.log(err);
    }
  };

  const renderButton = () => {
    console.log("render buttons: ", user);
    const { role, approval_role: approvalRole } = user;
    console.log(role, approvalRole);

    if (approvalRole === "KOMITE_IDEABOX") {
      return (
        <KomiteButtonGroup
          onAccept={handleAccept}
          onExport={handleExport}
          onRefresh={handleRefresh}
        />
      );
    } else if (approvalRole === "SECTION_MANAGER") {
      return (
        <SectionManagerButtonGroup
          onApprove={handleApprove}
          onEdit={handleEdit}
          onExport={handleExport}
          onRefresh={handleRefresh}
          onReject={handleReject}
        />
      );
    } else if (approvalRole === "DEPARTMENT_MANAGER") {
      return (
        <DeparmentManagerButtonGroup
          onApprove={handleApprove}
          onEdit={handleEdit}
          onExport={handleExport}
          onRefresh={handleRefresh}
          onReject={handleReject}
        />
      );
    } else {
      if (role === "administrator") {
        return (
          <AdminButtonGroup onExport={handleExport} onRefresh={handleRefresh} />
        );
      } else {
        return (
          <EmployeeButtonGroup
            onSubmit={handleSubmit}
            onRefresh={handleRefresh}
          />
        );
      }
    }
  };

  const handlePreview = (id) => {
    console.log("preview pdf id :", id);
  };

  const selectRow = {
    mode: "checkbox",
    clickToSelect: true,
    selected: selected,
    onSelect: handleOnSelect,
    onSelectAll: handleOnSelectAll,
  };

  const statusFormatter = (cell, row) => {
    let result = null;

    if (cell === "CLOSED") {
      result = <Badge color="success">CLOSED</Badge>;
    } else {
      result = <Badge color="secondary">{cell}</Badge>;
    }

    return result;
  };

  const datetimeFormatter = (cell, row) => {
    if (cell) return moment(cell).format("DD-MM-YYYY");
    else return "-";
  };

  const pdfFormatter = (cell, row) => {
    return (
      <ButtonGroup>
        <Button color="info" onClick={(id) => handlePreview(row.ideaboxId)}>
          Preview Formulir
        </Button>
      </ButtonGroup>
    );
  };

  const columns = [
    {
      dataField: "ideaNumber",
      text: "Nomor Urut",
      sort: true,
      style: { width: "90px" },
    },
    {
      dataField: "ideaboxType",
      text: "Jenis Idea",
      sort: true,
    },
    {
      dataField: "submitterName",
      text: "Nama Pembuat Ide",
      sort: true,
    },
    {
      dataField: "submittedBy",
      text: "NIK",
      sort: true,
    },
    {
      dataField: "departmentName",
      text: "Department",
      sort: true,
    },
    {
      dataField: "isIdeasheet",
      text: "Pelaksanaan Ide",
    },
    {
      dataField: "amount",
      text: "Nilai Rupiah",
    },
    {
      dataField: "submitDate",
      text: "Tanggal Submit",
      formatter: datetimeFormatter,
    },
    {
      dataField: "reviewerName",
      text: "Nama Pemeriksa",
    },
    {
      dataField: "reviewDate",
      text: "Tanggal Periksa",
      formatter: datetimeFormatter,
      sort: true,
    },
    {
      dataField: "approverName",
      text: "Nama Penyetuju",
      sort: true,
    },
    {
      dataField: "approvalDate",
      text: "Tanggal Approval",
      formatter: datetimeFormatter,
      sort: true,
    },
    {
      dataField: "receiverName",
      text: "Nama Penerima",
      sort: true,
    },
    {
      dataField: "acceptedDate",
      text: "Tanggal Diterima",
      formatter: datetimeFormatter,
      sort: true,
    },
    {
      dataField: "status",
      text: "Status",
      formatter: statusFormatter,
    },
    {
      text: "File",
      dataField: "ideaboxId",
      formatter: pdfFormatter,
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
                  {renderButton()}
                </Col>
              </Row>
            </CardHeader>
            <CardBody>
              <BootstrapTable
                bootstrap4
                keyField="ideaboxId"
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

export default Dashboard;
