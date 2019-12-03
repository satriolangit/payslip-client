import React from "react";
import moment from "moment";
import { Col, Card, CardBody } from "reactstrap";

const Widget = () => {
  return (
    <Col xs="12" sm="6" lg="3">
      <Card>
        <CardBody>
          <a href="#!" className="tile tile-success">
            {moment().format("DD")}
            <p>{moment().format("MMMM YYYY")}</p>
            <div className="informer informer-default dir-tr">
              <span className="fa fa-calendar" />
            </div>
          </a>
        </CardBody>
      </Card>
    </Col>
  );
};

export default Widget;
