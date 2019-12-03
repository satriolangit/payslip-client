import React, { useState, useContext } from "react";
import axios from "axios";
import Alert from "react-s-alert";

import { ApiUrl, AlertOptions } from "./../../../setting";
import AuthContext from "./../../../context/auth/authContext";

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
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

const ChangePassword = () => {
  const [data, setData] = useState({ password: "", confirmPassword: "" });
  const { password, confirmPassword } = data;
  const authContext = useContext(AuthContext);
  const { user } = authContext;

  const onChange = e => setData({ ...data, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();

    if (!password || password.length === 0) {
      Alert.info("Please fill new password.", AlertOptions);
    } else if (confirmPassword !== password) {
      Alert.info("Confirm password not valid.", AlertOptions);
    } else {
      try {
        const formData = {
          userId: user.user_id,
          password,
          confirmPassword
        };

        const config = {
          headers: {
            "Content-Type": "application/json"
          }
        };

        const url = ApiUrl + "/users/changepwd";
        const result = await axios.post(url, formData, config);
        Alert.success(result.data.message, AlertOptions);
      } catch (error) {
        console.log(error);

        Alert.error("Change password failed.", AlertOptions);
      }
    }
  };

  return (
    <div className="animated fadeIn">
      <Row>
        <Col xs="12" sm="12">
          <Card>
            <CardHeader>
              <strong>Change Password</strong>
            </CardHeader>
            <Form onSubmit={handleSubmit}>
              <CardBody>
                <FormGroup>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="fa fa-lock"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      type="text"
                      name="password"
                      value={password}
                      onChange={onChange}
                    />
                  </InputGroup>
                  <FormText className="help-block">New Password</FormText>
                </FormGroup>
                <FormGroup>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="fa fa-lock"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      type="text"
                      name="confirmPassword"
                      value={confirmPassword}
                      onChange={onChange}
                    />
                  </InputGroup>
                  <FormText className="help-block">
                    Confirm new password
                  </FormText>
                </FormGroup>
              </CardBody>
              <CardFooter>
                <Button type="submit" size="sm" color="primary">
                  <i className="fa fa-dot-circle-o"></i> Submit
                </Button>
                <Button type="reset" size="sm" color="danger">
                  <i className="fa fa-ban"></i> Reset
                </Button>
              </CardFooter>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ChangePassword;
