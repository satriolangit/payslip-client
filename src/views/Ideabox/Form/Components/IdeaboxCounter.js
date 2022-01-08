import React from "react";
import { Card, CardHeader, CardBody } from "reactstrap";

const IdeaboxCounter = ({ value }) => {
  return (
    <Card>
      <CardHeader>
        <strong>Idea sheet has been approved</strong>
      </CardHeader>
      <CardBody>
        <h4>{value}</h4>
      </CardBody>
    </Card>
  );
};

export default IdeaboxCounter;
