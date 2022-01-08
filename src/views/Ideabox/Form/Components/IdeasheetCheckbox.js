import React, { Fragment } from "react";
import { FormGroup, Label, Input } from "reactstrap";

const IdeasheetCheckbox = ({ onChange, value }) => {
  const [val, setVal] = React.useState(value);

  React.useEffect(() => {
    setVal(value);
  }, []);

  const handleChange = (e) => {
    if (e.target.checked) {
      const checkValue = parseInt(e.target.value);
      setVal(checkValue);
      onChange(checkValue);
    }
  };

  return (
    <Fragment>
      <FormGroup check>
        <input
          type="checkbox"
          value="0"
          checked={val === 0}
          onChange={handleChange}
        />{" "}
        <Label>Belum</Label>
      </FormGroup>
      <FormGroup check>
        <input
          type="checkbox"
          value="1"
          checked={val === 1}
          onChange={handleChange}
        />{" "}
        <Label>Sudah</Label>
      </FormGroup>
    </Fragment>
  );
};

export default IdeasheetCheckbox;
