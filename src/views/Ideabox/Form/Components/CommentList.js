import React from "react";
import { Card, CardHeader, CardBody } from "reactstrap";
import moment from "moment";

const CommentList = ({ value }) => {
  const renderItems = () => {
    const result = value.map((item, key) => {
      return (
        <li key={key}>
          <strong>{item.comment}</strong> ({item.createdBy}{" "}
          {moment(item.createdAt).format("YYYY-MM-DD")})
        </li>
      );
    });

    return result;
  };

  return (
    <Card>
      <CardHeader>
        Permintaan atau komentar dari pimpinan kerja pembuat ideasheet
      </CardHeader>
      <CardBody>{renderItems()}</CardBody>
    </Card>
  );
};

export default CommentList;
