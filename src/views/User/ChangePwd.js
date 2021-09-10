import React, { useState, useEffect } from "react";
import axios from "axios";
import Alert from "react-s-alert";
import { Link } from "react-router-dom";

import { ApiUrl, AlertOptions } from "../../setting";

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

const ChangePassword = ({ match, history }) => {
  const [data, setData] = useState({
    password: "",
    confirmPassword: ""
  });

  const [currentUserId, setCurrentUserId] = useState("");
  const { password, confirmPassword} = data;

  useEffect(() => {
    setCurrentUserId(match.params.id);        
  }, [match.params.id])

  const onChange = e => {
    setData({ ...data, [e.target.name]: e.target.value });        
  }

  const handleSubmit = async e => {
    e.preventDefault();

    if (!password || password.length === 0) {
      Alert.info("Please fill new password.", AlertOptions);
    } else if (confirmPassword !== password) {
      Alert.info("Confirm password not valid.", AlertOptions);
    } else {
      try {
        const formData = {
          userId: currentUserId,
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

  const handleReset = () => {
    setData({
      password: "",
      confirmPassword: ""
    });
  };

  return (
    <div className="animated fadeIn">
      <Row>
        <Col xs="12" sm="12">
          <Card>
            <CardHeader>
              <strong>Change Password</strong>
              <Link
                  to="/admin/user"
                  className="btn btn-secondary btn-sm float-right"
                >
                  <span className="icon-close"></span> Close
                </Link>
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
                <Button
                  type="reset"
                  size="sm"
                  color="danger"
                  onClick={handleReset}
                >
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
