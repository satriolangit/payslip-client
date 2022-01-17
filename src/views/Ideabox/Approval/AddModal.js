import React from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  Col,
  Row,
  ModalFooter,
} from "reactstrap";

import Select from "react-select";
import axios from "axios";

import { ApiUrl, AlertOptions, JsonContentType } from "../../../setting";
import DepartmentCheckbox from "./DepartmentCheckbox";

const roleOptions = [
  { value: "SECTION_MANAGER", label: "Section Manager" },
  { value: "DEPARTMENT_MANAGER", label: "Department Manager" },
  { value: "KOMITE_IDEABOX", label: "Komite Ideabox" },
  { value: "ADMIN", label: "Administrator" },
];

const AddModal = ({ isOpen, data }) => {
  const [formData, setFormData] = React.useState({
    employeeId: "",
    approvalRole: "",
    departments: [],
  });

  const [options, setOptions] = React.useState([]);

  React.useEffect(() => {
    if (isOpen && options.length <= 0) {
      fetchUser();
    }
  }, [options, isOpen]);

  const fetchUser = async () => {
    try {
      const url = ApiUrl + "/approval/mapping/users";
      const res = await axios.get(url);
      const result = res.data.data;

      setOptions(
        result.map((user) => {
          return {
            value: user.employeeId,
            label: user.name,
          };
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handleSave = () => {
    alert("save");
  };

  const handleChange = (e) => {
    alert(e.target.value);
  };

  const handleDepartmentChange = (value) => {
    alert(value);
  };

  return (
    <Modal isOpen={isOpen}>
      <ModalHeader>Register Approval</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label>Name</Label>
            <Select
              isSearchable={true}
              name="employeeId"
              options={options}
              isClearable={true}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label>Role</Label>
            <Select
              isSearchable={true}
              name="employeeId"
              options={roleOptions}
              isClearable={true}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label>Department</Label>
            <DepartmentCheckbox onChange={handleDepartmentChange} value={[]} />
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button onClick={handleSave}>Save</Button>
      </ModalFooter>
    </Modal>
  );
};

export default AddModal;