import React from "react";
import { Card } from "reactstrap";
import CardBody from "reactstrap/lib/CardBody";
import CardHeader from "reactstrap/lib/CardHeader";

function SignBox({ title, value }) {
  return (
    <Card>
      <CardHeader>
        <strong>{title}</strong>
      </CardHeader>
      <CardBody>{value}</CardBody>
    </Card>
  );
}

export default SignBox;
