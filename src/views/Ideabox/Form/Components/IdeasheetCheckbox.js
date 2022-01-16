import React, { Fragment } from "react";
import { FormGroup, Label, Input } from "reactstrap";
import usePrevious from "./usePrevious";

const IdeasheetCheckbox = ({ onChange, value }) => {
  const [val, setVal] = React.useState(value);
  const prevVal = usePrevious(val);

  // React.useEffect(() => {
  //   setVal(value);
  // }, []);

  React.useEffect(() => {
    // this one is your didupdate method for count variable
    if (val !== prevVal) {
      onChange(val);
      console.log(val);
    }
  }, [val]);

  const handleChange = (e) => {
    if (e.target.checked) {
      const checkValue = parseInt(e.target.value);
      setVal(checkValue);
      // onChange(checkValue);
    }
  };

  return (
    <Fragment>
      <FormGroup check>
        <input
          type="checkbox"
          value="0"
          checked={value === 0}
          onChange={handleChange}
        />{" "}
        <Label>Belum</Label>
      </FormGroup>
      <FormGroup check>
        <input
          type="checkbox"
          value="1"
          checked={value === 1}
          onChange={handleChange}
        />{" "}
        <Label>Sudah</Label>
      </FormGroup>
    </Fragment>
  );
};

export default IdeasheetCheckbox;
