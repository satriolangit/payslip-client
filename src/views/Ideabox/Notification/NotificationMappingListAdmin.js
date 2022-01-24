import React from "react";
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
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import Select from "react-select";
import axios from "axios";
import BootstrapTable from "react-bootstrap-table-next";
import { confirm } from "react-bootstrap-confirmation";
import { ApiUrl, JsonContentType } from "../../../setting";
import AuthContext from "./../../../context/auth/authContext";

function NotificationMappingListAdmin() {
  const authContext = React.useContext(AuthContext);
  const { user } = authContext;

  const [data, setData] = React.useState([]);
  const [modalData, setModalData] = React.useState({
    employeeId: user.employee_id,
    departmentId: 0,
    departmentList: [],
    approvalRole: user.approval_role,
    notificationType: 0,
    notificationTypeList: [],
  });
  const [isOpenModal, setIsOpenModal] = false;
  const [selected, setSelected] = React.useState([]);

  React.useEffect(() => {
    fetchMappingData();
    fetchDepartmentList();
    fetchNotificationTypeList();
  }, []);

  const fetchMappingData = async () => {
    try {
      const url =
        ApiUrl + "/ideabox/notification/mapping?employeeId=" + user.employeeId;
      const res = await axios.get(url);
      const result = res.data.data;

      setData(result);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchDepartmentList = async () => {
    try {
      const url =
        ApiUrl +
        "/ideabox/notification/mapping/department?employeeId=" +
        user.employee_id;
      const res = await axios.get(url);
      const result = res.data.data;

      const options = result.map((item) => {
        return {
          value: item.departmentId,
          label: item.departmentname,
        };
      });
      setModalData({ ...modalData, departmentList: options });
    } catch (err) {
      console.log(err);
    }
  };

  const fetchNotificationTypeList = async () => {
    try {
      const url = ApiUrl + "/ideabox/notification/notiftype";
      const res = await axios.get(url);
      const result = res.data.data;

      const options = result.map((item) => {
        return {
          value: item.type,
          label: item.description,
        };
      });
      setModalData({ ...modalData, departmentList: options });
    } catch (err) {
      console.log(err);
    }
  };

  const handleRefresh = () => {
    fetchMappingData();
    fetchDepartmentList();
    fetchNotificationTypeList();
  };

  const handleAdd = () => {
    setIsOpenModal(true);
  };

  const handleDelete = () => {};

  const handleModalSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = ApiUrl + "/ideabox/notification/mapping/add";
      const payload = {
        notificationType: modalData.notificationType,
        employeeId: user.employee_id,
        departmentId: modalData.departmentId,
      };

      await axios.post(url, payload, JsonContentType);

      setIsOpenModal(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDepartmentChange = (item) => {
    if (item.value) {
      setModalData({ ...modalData, departmentId: item.value });
    }
  };

  const handleNotificationTypeChange = (item) => {
    if (item.value) {
      setModalData({ ...modalData, notificationType: item.value });
    }
  };

  const handleOnSelect = (row, isSelect) => {
    if (isSelect) {
      setSelected([...selected, row.id]);
    } else {
      setSelected(selected.filter((x) => x !== row.id));
    }
  };

  const handleOnSelectAll = (isSelect, rows) => {
    const ids = rows.map((r) => r.id);

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
      dataField: "notificationType",
      text: "Type",
      hidden: true,
    },
    {
      dataField: "employeeId",
      text: "NIK",
      sort: true,
    },
    {
      dataField: "name",
      text: "username",
      sort: true,
    },
    {
      dataField: "department",
      text: "Department",
      sort: true,
    },
  ];

  return (
    <div className="animated fadeIn">
      <Row>
        <Col lg="12" sm="12" xs="12">
          <Card>
            <CardHeader>
              <Row>
                <Col md="12" className="text-right">
                  <Button
                    color="secondary"
                    onClick={handleRefresh}
                    className="btn btn-sm"
                  >
                    <i className="icon-refresh" /> Refresh
                  </Button>
                  <Button
                    color="success"
                    className="btn btn-sm"
                    onClick={handleAdd}
                  >
                    <i className="icon-plus" /> Add
                  </Button>
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
                keyField="mappingId"
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
      <Modal isOpen={isOpenModal}>
        <Form onSubmit={handleModalSubmit}>
          <ModalHeader>Notification Setting</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label>NIK</Label>
              <Input name="employeeId" value={modalData.employeeId} readonly />
            </FormGroup>
            <FormGroup>
              <Label>Nama</Label>
              <Input name="name" value={modalData.name} readonly />
            </FormGroup>
            <FormGroup>
              <Label>Department</Label>
              <Select
                isSearchable={true}
                name="departmentId"
                options={modalData.departmentList}
                isClearable={true}
                onChange={handleDepartmentChange}
              />
            </FormGroup>
            <FormGroup>
              <Label>Setting</Label>
              <Select
                isSearchable={true}
                name="notificationType"
                options={modalData.notificationTypeList}
                isClearable={true}
                onChange={handleNotificationTypeChange}
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button type="submit" color="success">
              Save
            </Button>
            <Button onClick={() => setIsOpenModal(false)}>Cancel</Button>
          </ModalFooter>
        </Form>
      </Modal>
    </div>
  );
}

export default NotificationMappingListAdmin;
