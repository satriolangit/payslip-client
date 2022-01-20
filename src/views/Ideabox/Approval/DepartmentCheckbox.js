import React from "react";
import { FormGroup, Input, Label } from "reactstrap";
import axios from "axios";

import usePrevious from "./../../../hooks/usePrevious";
import { ApiUrl } from "../../../setting";

const DepartmentCheckbox = ({ onChange, value }) => {
  const [data, setData] = React.useState([]);
  const [values, setValues] = React.useState(value);
  const prevValues = usePrevious(values);

  React.useEffect(() => {
    if (values !== prevValues) {
      onChange(values);
    }
  }, [values]);

  React.useEffect(() => {
    if (value !== prevValues) {
      setValues([...values, ...value]);
    }
  }, [value]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const url = ApiUrl + "/master/department";
        const res = await axios.get(url);
        const result = res.data.data;

        setData(result);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  const handleChange = (checked, val) => {
    if (checked) {
      setValues([...values, val]);
    } else {
      setValues(values.filter((x) => x !== val));
    }
  };

  return data.map((item, i) => {
    if (value.length > 0) {
      return (
        <FormGroup check key={i}>
          <Input
            type="checkbox"
            name="checkbox"
            value={item.id}
            onChange={(e, index, value) =>
              handleChange(e.target.checked, item.id)
            }
            checked={value.filter((x) => x === item.id).length > 0}
          />{" "}
          <Label check>{item.departmentName}</Label>
        </FormGroup>
      );
    } else {
      return (
        <FormGroup check key={i}>
          <Input
            type="checkbox"
            name="checkbox"
            value={item.id}
            onChange={(e, index, value) =>
              handleChange(e.target.checked, item.id)
            }
          />{" "}
          <Label check>{item.departmentName}</Label>
        </FormGroup>
      );
    }
  });
};

export default DepartmentCheckbox;
