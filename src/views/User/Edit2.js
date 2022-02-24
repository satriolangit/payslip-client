import React, { useState, useEffect, Fragment, useContext } from "react";
import axios from "axios";
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Button,
  Form,
  FormGroup,
  Label,
  CardFooter,
  Input,
  FormText,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap";
import Alert from "react-s-alert";

import { ApiUrl, AlertOptions } from "../../setting";
import avatar from "./../../assets/img/users/no-image.jpg";
import SiteContext from "../../context/site/siteContext";

const Edit = ({ match, history }) => {
  const [data, setData] = useState({
    email: "",
    name: "",
    employee_id: "",
    photo: "",
    password: "",
    confirmPassword: "",
    phone: "",
    siteName: "",
    department_id: 0,
  });

  const [photoFile, setPhotoFile] = useState(null);
  const [role, setRole] = useState("employee");
  const [status, setStatus] = useState(0);
  const [departments, setDepartments] = useState([]);

  const siteContext = useContext(SiteContext);
  const { siteName: currentSite } = siteContext;

  const {
    email,
    name,
    employee_id,
    photo,
    password,
    confirmPassword,
    phone,
    site_name: siteName,
    department_id: departmentId,
  } = data;

  useEffect(() => {
    if (match.params.id !== "0") {
      loadData();
    }
    fetchDepartments();
    // eslint-disable-next-line
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (match.params.id !== "0") {
      await update();
    } else {
      await add();
    }
  };

  const add = async () => {
    const user = {
      email,
      name,
      employeeId: employee_id,
      role,
      isActive: status,
      password,
      phone,
      confirmPassword,
      siteName,
      departmentId,
    };

    try {
      let formData = new FormData();
      formData.append("photo", photoFile);
      formData.append("data", JSON.stringify(user));

      const url = ApiUrl + "/users/add";
      const result = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      //  console.log(result);

      if (result.data.result === "FAIL") {
        Alert.error(result.data.message, AlertOptions);
      } else {
        history.push("/admin/user");
      }
    } catch (err) {
      console.log(err.response);
      Alert.error(err.response.data.message, AlertOptions);
    }
  };

  const update = async () => {
    const user = {
      email,
      name,
      employeeId: employee_id,
      role,
      isActive: status,
      userId: match.params.id,
      phone,
      photo,
      siteName: currentSite,
      departmentId,
    };

    try {
      const url = ApiUrl + "/users/update";
      let formData = new FormData();
      formData.append("photo", photoFile);
      formData.append("data", JSON.stringify(user));

      const result = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (result.data.result === "FAIL") {
        Alert.error(result.data.message, AlertOptions);
      } else {
        history.push("/admin/user_by_site");
      }
    } catch (err) {
      console.log("error: ", err.response);
      Alert.error(err.response.data.message, AlertOptions);
    }
  };

  const loadData = async () => {
    if (match.params.id !== "0") {
      try {
        const url = ApiUrl + "/users/" + match.params.id;
        const res = await axios.get(url);
        const record = res.data.data[0];

        setData(record);
        setRole(record.role);
        setStatus(record.is_active);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const fetchDepartments = async () => {
    try {
      const url = `${ApiUrl}/master/department`;

      const res = await axios.get(url);

      setDepartments(res.data.data);
    } catch (error) {
      console.error("fetch department :", error);
    }
  };

  const onChange = (e) => setData({ ...data, [e.target.name]: e.target.value });

  const onStatusChange = (e) => setStatus(e.target.checked ? 1 : 0);

  const onRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handlePhotoChange = (e) => {
    setPhotoFile(e.target.files[0]);
  };

  const handleDepartmentChange = (e) => {
    setData({ ...data, department_id: e.target.value });
  };

  const handleClearForm = (e) => {
    setData({
      email: "",
      name: "",
      employee_id: "",
      photo: "",
      password: "",
      confirmPassword: "",
      phone: "",
      site_name: currentSite,
    });
  };

  const renderPhoto = () => {
    if (photo) {
      return (
        <img src={photo} alt={name} className="img-thumbnail profile-picture" />
      );
    } else {
      return (
        <img
          src={avatar}
          alt={name}
          className="img-thumbnail profile-picture"
        />
      );
    }
  };

  const renderPasswordForm = () => {
    if (match.params.id === "0") {
      return (
        <Fragment>
          <FormGroup row>
            <Col md="3">
              <Label>Password</Label>
            </Col>
            <Col xs="12" md="9">
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="fa fa-lock"></i>
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  type="password"
                  name="password"
                  value={password}
                  onChange={onChange}
                />
              </InputGroup>
              <FormText color="muted">Password</FormText>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col md="3">
              <Label>Confirm Password</Label>
            </Col>
            <Col xs="12" md="9">
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="fa fa-lock"></i>
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  type="password"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={onChange}
                />
              </InputGroup>
              <FormText color="muted">Confirm Password</FormText>
            </Col>
          </FormGroup>
        </Fragment>
      );
    } else {
      return "";
    }
  };

  const renderBackButton = () => {
    return (
      <Button
        className="btn btn-secondary btn-sm float-right"
        onClick={() => history.goBack()}
      >
        <span className="icon-close"></span> Close
      </Button>
    );
  };

  return (
    <div className="animated fadeIn">
      <Row>
        <Col lg="12" sm="12" xs="12">
          <Form onSubmit={handleSubmit}>
            <Card>
              <CardHeader>
                <strong>{match.params.id === "0" ? "Add" : "Edit"}</strong> User
                {renderBackButton()}
              </CardHeader>
              <CardBody>
                <FormGroup row>
                  <Col md="3">
                    <Label>Name</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="fa fa-pencil"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="text"
                        name="name"
                        value={name}
                        onChange={onChange}
                      />
                    </InputGroup>
                    <FormText color="muted">Nama user</FormText>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label>Email</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="fa fa-envelope"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="text"
                        name="email"
                        value={email}
                        onChange={onChange}
                      />
                    </InputGroup>
                    <FormText color="muted">Alamat email</FormText>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label>NIK</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="fa fa-pencil"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="text"
                        name="employee_id"
                        value={employee_id}
                        onChange={onChange}
                      />
                    </InputGroup>
                    <FormText color="muted">Nomor Induk Karyawan</FormText>
                  </Col>
                </FormGroup>
                {renderPasswordForm()}
                <FormGroup row>
                  <Col md="3">
                    <Label>No. Telp</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="fa fa-phone-square"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="text"
                        name="phone"
                        value={phone}
                        onChange={onChange}
                      />
                    </InputGroup>
                    <FormText color="muted">No. Telp</FormText>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label>Role</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <FormGroup check inline>
                      <Input
                        className="form-check-input"
                        type="radio"
                        name="radioEmployee"
                        onChange={onRoleChange}
                        value="employee"
                        checked={role === "employee"}
                      />
                      <Label className="form-check-label" check>
                        Employee
                      </Label>
                    </FormGroup>
                    <FormGroup check inline>
                      <Input
                        className="form-check-input"
                        type="radio"
                        name="radioEmployee"
                        onChange={onRoleChange}
                        value="admin"
                        checked={role === "admin"}
                      />
                      <Label className="form-check-label" check>
                        Administrator
                      </Label>
                    </FormGroup>
                    <FormText color="muted">Role</FormText>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label>Department</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <select
                      name="departmentId"
                      className="form-control"
                      value={data.department_id}
                      onChange={handleDepartmentChange}
                    >
                      {departments.map((dept) => (
                        <option value={dept.id}>{dept.departmentName}</option>
                      ))}
                    </select>
                    <FormText color="muted">No. Telp</FormText>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">Status</Col>
                  <Col xs="12" md="9">
                    <FormGroup check inline>
                      <Input
                        className="form-check-input"
                        type="checkbox"
                        name="isActive"
                        onChange={onStatusChange}
                        checked={status === 1}
                      />
                      <Label className="form-check-label" check>
                        Active ?
                      </Label>
                    </FormGroup>
                    <FormText color="muted">Status user</FormText>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">Photo</Col>
                  <Col xs="12" md="9">
                    {renderPhoto()}
                    <div>
                      <input
                        type="file"
                        onChange={handlePhotoChange}
                        accept="image/*|MIME_type"
                      />
                    </div>
                  </Col>
                </FormGroup>
              </CardBody>
              <CardFooter>
                <Button type="submit" size="sm" color="primary">
                  <i className="fa fa-dot-circle-o"></i> Submit
                </Button>
                <Button
                  type="reset"
                  size="sm"
                  color="danger"
                  onClick={handleClearForm}
                >
                  <i className="fa fa-ban"></i> Reset
                </Button>
              </CardFooter>
            </Card>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default Edit;
