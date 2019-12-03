import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Col, Card, CardBody } from "reactstrap";
import AuthContext from "./../../../context/auth/authContext";

const Widget = () => {
  const authContext = useContext(AuthContext);
  const { user } = authContext;

  const [currentUser, setCurrentUser] = useState({});
  const [url, setUrl] = useState("/pages/payslip/");

  useEffect(() => {
    setCurrentUser(user);
  }, [user]);

  useEffect(() => {
    if (currentUser) setUrl("/pages/payslip/" + currentUser.employee_id);
  }, [currentUser]);

  return (
    <Col xs="12" sm="6" lg="3">
      <Card>
        <CardBody>
          <Link to={url} className="tile tile-primary">
            Payslip
            <p></p>
            <div className="informer informer-default dir-bl">
              <span className="fa fa-cloud-download"></span> download
            </div>
          </Link>
        </CardBody>
      </Card>
    </Col>
  );
};

export default Widget;
