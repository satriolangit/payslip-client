import React, { useState, useEffect, useContext } from "react";
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
import ReactExport from "react-data-export";
import { confirm } from "react-bootstrap-confirmation";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import "react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css";
import { Link } from "react-router-dom";

import pagination from "../../Pagination/pagination";
import { ApiUrl, JsonContentType } from "../../../setting";
import AuthContext from "./../../../context/auth/authContext";
import {
  AdminButtonGroup,
  DeparmentManagerButtonGroup,
  EmployeeButtonGroup,
  KomiteButtonGroup,
  SectionManagerButtonGroup,
} from "./ButtonGroup";

const Dashboard = (props) => {
  const authContext = useContext(AuthContext);
  const { user } = authContext;

  const [data, setData] = useState([]);
  const [selected, setSelected] = useState([]);
  const [selectedNumber, setSelectedNumber] = useState([]);

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

  const handleDeleteItems = async () => {
    const result = await confirm("Apakah anda yakin menghapus item ini ?");

    if (result === true) {
      try {
        const url = ApiUrl + "/ideabox/delete";
        fetchData();
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleOnSelect = (row, isSelect) => {
    if (isSelect) {
      setSelected([...selected, row.ideaboxId]);
      setSelectedNumber([...selectedNumber, row.ideaNumber]);
    } else {
      setSelected(selected.filter((x) => x !== row.ideaboxId));
      setSelectedNumber(selectedNumber.filter((x) => x !== row.ideaNumber));
    }
  };

  const handleOnSelectAll = (isSelect, rows) => {
    const ids = rows.map((r) => r.ideaboxId);
    const numbers = rows.map((r) => r.ideaNumber);
    if (isSelect) {
      setSelected(ids);
      setSelectedNumber(numbers);
    } else {
      setSelected([]);
      setSelectedNumber([]);
    }
  };

  const handleAccept = async () => {
    if (selected.length <= 0) return;

    const result = await confirm(
      "Apakah anda yakin untuk melakukan approve ideasheet ?"
    );

    if (result === true) {
      try {
        const url = ApiUrl + "/ideabox/approve";

        const formData = {
          employeeId: user.employee_id,
          ideaboxIds: selected,
        };

        const res = await axios.post(url, formData, JsonContentType);
        console.log(res.data);

        fetchData();
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleEdit = () => {
    if (selected.length > 0) {
      const ideaboxId = selected[0];
      props.history.push("/ideabox/edit/" + ideaboxId);
    }
  };

  const handleSubmit = () => {
    props.history.push("/ideabox/submit");
  };

  const handlePosting = async () => {
    if (selected.length <= 0) return;

    const result = await confirm(
      "Apakah anda yakin untuk melakukan posting ideasheet?"
    );

    if (result === true) {
      try {
        const url = ApiUrl + "/ideabox/posting";

        const formData = {
          employeeId: user.employee_id,
          ideaboxIds: selected,
        };

        const res = await axios.post(url, formData, JsonContentType);
        console.log(res.data);
        fetchData();
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleApprove = async () => {
    if (selected.length <= 0) return;

    const result = await confirm(
      "Apakah anda yakin untuk melakukan approve ideasheet?"
    );

    if (result === true) {
      try {
        const url = ApiUrl + "/ideabox/approve";

        const formData = {
          employeeId: user.employee_id,
          ideaboxIds: selected,
        };

        const res = await axios.post(url, formData, JsonContentType);
        console.log(res.data);
        fetchData();
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleReject = async () => {
    if (selected.length <= 0) return;

    const result = await confirm(
      "Apakah anda yakin untuk melakukan reject ideasheet ?"
    );

    if (result === true) {
      try {
        const url = ApiUrl + "/ideabox/reject";

        const formData = {
          employeeId: user.employee_id,
          ideaboxIds: selected,
        };

        const res = await axios.post(url, formData, JsonContentType);
        console.log(res.data);
        fetchData();
      } catch (err) {
        console.log(err);
      }
    }
  };

  const renderButton = () => {
    console.log("render buttons: ", user);
    if (user) {
      const { role, approval_role: approvalRole } = user;
      console.log(role, approvalRole);

      if (approvalRole === "KOMITE_IDEABOX") {
        return (
          <KomiteButtonGroup
            onAccept={handleAccept}
            onRefresh={handleRefresh}
          />
        );
      } else if (approvalRole === "SECTION_MANAGER") {
        return (
          <SectionManagerButtonGroup
            onApprove={handleApprove}
            onEdit={handleEdit}
            onRefresh={handleRefresh}
            onReject={handleReject}
          />
        );
      } else if (approvalRole === "DEPARTMENT_MANAGER") {
        return (
          <DeparmentManagerButtonGroup
            onApprove={handleApprove}
            onEdit={handleEdit}
            onRefresh={handleRefresh}
            onReject={handleReject}
          />
        );
      } else {
        if (role === "administrator") {
          return <AdminButtonGroup onRefresh={handleRefresh} />;
        } else {
          return (
            <EmployeeButtonGroup
              onSubmit={handleSubmit}
              onRefresh={handleRefresh}
              onPosting={handlePosting}
            />
          );
        }
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

  const previewFormatter = (cell, row) => {
    const route = `/ideabox/view/${row.ideaboxId}`;
    return (
      <ButtonGroup>
        <Link to={route} className="btn btn-info btn-sm">
          Preview
        </Link>
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
      text: "NIK Pembuat Ide",
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
      formatter: previewFormatter,
    },
  ];

  const ExcelFile = ReactExport.ExcelFile;
  const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
  const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

  return (
    <div className="animated fadeIn">
      <Row>
        <Col lg="12" sm="12" xs="12">
          <Card>
            <CardHeader>
              <Row>
                <Col md="12" className="text-right">
                  {renderButton()}
                  <ExcelFile
                    element={
                      <button
                        className="btn btn-sm btn-warning"
                        filename="ReportSurvey"
                      >
                        <i className="icon-printer" /> Export
                      </button>
                    }
                  >
                    <ExcelSheet data={data} name="ReportIdeabox">
                      <ExcelColumn label="NOMOR URUT" value="ideaNumber" />
                      <ExcelColumn label="JENIS IDE" value="ideaboxType" />
                      <ExcelColumn
                        label="NAMA PEMBUAT IDE"
                        value="submitterName"
                      />
                      <ExcelColumn
                        label="NIK PEMBUAT IDE"
                        value="submittedBy"
                      />
                      <ExcelColumn
                        label="DEPT PEMBUAT IDE"
                        value="departmentName"
                      />
                      <ExcelColumn
                        label="PELAKSANAAN IDE"
                        value="isIdeasheet"
                      />
                      <ExcelColumn label="NILAI RUPIAH" value="amount" />
                      <ExcelColumn label="TANGGAL SUBMIT" value="submitDate" />
                      <ExcelColumn
                        label="NAMA PEMERIKSA"
                        value="reviewerName"
                      />
                      <ExcelColumn
                        label="TANGGAL APPROVAL"
                        value="reviewDate"
                      />
                      <ExcelColumn
                        label="NAMA PENYETUJU"
                        value="approverName"
                      />
                      <ExcelColumn
                        label="TANGGAL APPROVAL"
                        value="approvalDate"
                      />
                      <ExcelColumn label="NAMA PENERIMA" value="receiverName" />
                      <ExcelColumn
                        label="TANGGAL DITERIMA"
                        value="acceptedDate"
                      />
                      <ExcelColumn label="STATUS" value="status" />
                    </ExcelSheet>
                  </ExcelFile>
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
