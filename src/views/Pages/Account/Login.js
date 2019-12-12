import React, { useState, useContext, useEffect } from "react";
import Alert from "react-s-alert";
import {
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row
} from "reactstrap";

import AuthContext from "./../../../context/auth/authContext";
import { AlertOptions } from "./../../../setting";
import "./Login.css";

const Login = props => {
  const authContext = useContext(AuthContext);
  const { login, error, clearErrors, isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/");
    }

    if (error === "Invalid credentials") {
      Alert.error("NIK atau Password salah, silahkan coba lagi.", AlertOptions);
      //setAlert(error, 'danger');
      clearErrors();
    }

    if (error === "User not active") {
      Alert.error(
        "Akun tidak aktif, silahkan hubungi administrator.",
        AlertOptions
      );

      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const [user, setUser] = useState({
    nik: "",
    password: ""
  });

  const { nik, password } = user;

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (error === "Invalid credentials") {
      Alert.error("NIK atau Password salah, silahkan coba lagi.", AlertOptions);

      clearErrors();
    }

    if (error === "User not active") {
      Alert.error(
        "Akun tidak aktif, silahkan hubungi administrator.",
        AlertOptions
      );

      clearErrors();
    }

    if (nik === "" || password === "") {
      Alert.info("Please fill all fields", AlertOptions);
    } else {
      login({
        nik,
        password
      });
    }
  };
  return (
    <div className="app flex-row align-items-center background">
      <Container>
        <Row className="justify-content-center">
          <Col md="4">
            <CardGroup>
              <Card className="p-4 login-box">
                <CardBody>
                  <Form onSubmit={onSubmit}>
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="text"
                        placeholder="NIK"
                        autoComplete="nik"
                        name="nik"
                        value={nik}
                        onChange={onChange}
                      />
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        name="password"
                        value={password}
                        onChange={onChange}
                      />
                    </InputGroup>
                    <Row className="justify-content-center">
                      <Col xs="6">
                        <Button color="primary" className="px-4" type="submit">
                          Login
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
            </CardGroup>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
