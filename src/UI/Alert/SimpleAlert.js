import React, { useState, useEffect } from "react";
import { Alert } from "reactstrap";

const SimpleAlert = ({ type, message }) => {
  const [visible, setVisible] = useState(true);
  const onDismiss = () => setVisible(false);

  useEffect(() => {
    setVisible(true);
  }, [message]);

  if (!visible || message.length <= 0) {
    return "";
  } else {
    return (
      <Alert color={type} isOpen={visible} toggle={onDismiss}>
        {message}
      </Alert>
    );
  }
};

export default SimpleAlert;
