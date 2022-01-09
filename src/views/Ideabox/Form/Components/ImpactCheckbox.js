import React from "react";
import { FormGroup, Input, Label } from "reactstrap";
import usePrevious from "./usePrevious";

const data = [
  {
    id: 1,
    description: "Internal Control, Efisiensi Waktu Kerja dan Cost Down",
  },
  { id: 2, description: "Efisiensi Waktu (Penyederhanaan proses kerja)" },
  {
    id: 3,
    description:
      "Efisiensi Biaya (Cost Down) (General / Administrative / Labour cost / FOH)",
  },
  {
    id: 4,
    description: "Internal Control namun tidak ada efisiensi waktu dan biaya",
  },
  { id: 5, description: "Tidak Ada" },
];

const Checkboxes = ({ onChange, value }) => {
  const [values, setValues] = React.useState(value);
  const prevValues = usePrevious(values);

  React.useEffect(() => {
    // this one is your didupdate method for count variable
    if (values !== prevValues) {
      onChange(values);
      console.log(values);
    }
  }, [values]);

  const handleImpactChange = (checked, value) => {
    if (checked) {
      setValues([...values, value]);
    } else {
      setValues(values.filter((x) => x !== value));
    }
  };

  return data.map((item, i) => {
    return (
      <FormGroup check key={i}>
        <Input
          type="checkbox"
          name="ideaboxImpact"
          value={item.id}
          onChange={(e, index, value) =>
            handleImpactChange(e.target.checked, item.id)
          }
          checked={value.filter((x) => x === item.id).length > 0}
        />{" "}
        <Label check>{item.description}</Label>
      </FormGroup>
    );
  });
};

export default Checkboxes;
