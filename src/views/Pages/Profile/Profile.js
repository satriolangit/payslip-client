import React, { useState, useContext, useEffect } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  FormGroup,
  FormText,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row
} from "reactstrap";

import axios from "axios";
import { ApiUrl } from "./../../../setting";
import AuthContext from "./../../../context/auth/authContext";

const Profile = () => {
  const authContext = useContext(AuthContext);
  const { user } = authContext;

  const [data, setData] = useState({
    name: "",
    email: "",
    employee_id: "",
    role: "",
    photo: ""
  });

  const { name, email, employee_id, role } = data;

  const onChange = e => setData({ ...data, [e.target.name]: e.target.value });

  useEffect(() => {
    if (user) {
      loadData();
    }
    // eslint-disable-next-line
  }, [user]);

  const loadData = async () => {
    if (user) {
      try {
        const url = ApiUrl + "/users/profile/" + user.user_id;
        const res = await axios.get(url);
        const result = res.data.data[0];

        setData(result);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="animated fadeIn">
      <Row>
        <Col xs="12" sm="12">
          <Card>
            <CardHeader>
              <strong>Profile</strong>
            </CardHeader>
            <CardBody>
              <Form>
                <FormGroup>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="fa fa-user"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      type="text"
                      name="name"
                      value={name}
                      onChange={onchange}
                    />
                  </InputGroup>
                  <FormText className="help-block">Name</FormText>
                </FormGroup>
                <FormGroup>
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
                  <FormText className="help-block">Email</FormText>
                </FormGroup>
                <FormGroup>
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
                      readOnly
                    />
                  </InputGroup>
                  <FormText className="help-block">NIK</FormText>
                </FormGroup>
                <FormGroup>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="fa fa-gear"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      type="text"
                      name="role"
                      value={role}
                      onChange={onChange}
                      readOnly
                    />
                  </InputGroup>
                  <FormText className="help-block">Role</FormText>
                </FormGroup>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Profile;
