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

const NotificationMappingList = ({ history }) => {
  const authContext = React.useContext(AuthContext);
  const { user } = authContext;

  const [data, setData] = React.useState([]);
  const [modalData, setModalData] = React.useState({
    employeeId: user.employee_id,
    departmentId: 0,
    departmentList: [{ value: 0, label: "-- Departemen --" }],
    approvalRole: user.approval_role,
    notificationType: 0,
    notificationTypeList: [{ value: 0, label: "-- Notification --" }],
  });

  const [departmentOptions, setDepartmentOptions] = React.useState([]);
  const [isOpenModal, setIsOpenModal] = React.useState(false);
  const [selected, setSelected] = React.useState([]);

  React.useEffect(() => {
    fetchMappingData();
    fetchDepartmentList();
    fetchNotificationTypeList();
  }, []);

  const fetchMappingData = async () => {
    try {
      const url =
        ApiUrl + "/ideabox/notification/mapping?employeeId=" + user.employee_id;
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
          label: item.departmentName,
        };
      });

      setDepartmentOptions(options);
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

      setModalData({ ...modalData, notificationTypeList: options });
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

  const handleDelete = async () => {
    if (selected.length > 0) {
      const result = await confirm("Apakah anda yakin menghapus setting ini ?");

      if (result === true) {
        try {
          const formData = {
            ids: selected,
          };
          const url = ApiUrl + "/ideabox/notification/mapping/remove";
          await axios.post(url, formData, JsonContentType);

          fetchMappingData();
        } catch (err) {
          console.log(err);
        }
      }
    }
  };

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
      fetchMappingData();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDepartmentChange = (item) => {
    if (item.value !== null) {
      setModalData({ ...modalData, departmentId: item.value });
    }
  };

  const handleNotificationTypeChange = (item) => {
    if (item.value !== null) {
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
      dataField: "id",
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
      text: "Name",
      sort: true,
    },
    {
      dataField: "departmentName",
      text: "Department",
      sort: true,
    },
    {
      dataField: "notifTypeDescription",
      text: "Setting",
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
                keyField="id"
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
              <Input name="employeeId" value={modalData.employeeId} readOnly />
            </FormGroup>
            <FormGroup>
              <Label>Department</Label>
              <Select
                isSearchable={true}
                name="departmentId"
                options={departmentOptions}
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
            <Button onClick={() => setIsOpenModal(false)}>Cancel</Button>
            <Button type="submit" color="success">
              Save
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    </div>
  );
};

export default NotificationMappingList;
