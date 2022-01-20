import React from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  Button,
  Form,
  FormGroup,
  Label,
  ModalFooter,
} from "reactstrap";
import { confirm } from "react-bootstrap-confirmation";
import Select from "react-select";
import axios from "axios";

import { ApiUrl, JsonContentType } from "../../../setting";
import DepartmentCheckbox from "./DepartmentCheckbox";

const roleOptions = [
  { value: "SECTION_MANAGER", label: "Section Manager" },
  { value: "DEPARTMENT_MANAGER", label: "Department Manager" },
  { value: "KOMITE_IDEABOX", label: "Komite Ideabox" },
];

const AddModal = ({ isOpen, onSubmit }) => {
  const [formData, setFormData] = React.useState({
    employeeId: "",
    approvalRole: "",
    departments: [],
  });

  const [options, setOptions] = React.useState([]);

  React.useEffect(() => {
    fetchUser();
  }, []);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      const url = ApiUrl + "/approval/mapping/add";
      const payload = {
        employeeId: formData.employeeId,
        approvalRole: formData.approvalRole,
        departments: formData.departments,
      };

      await axios.post(url, payload, JsonContentType);

      onSubmit();
    } catch (err) {
      console.log(err);
    }
  };

  const handleNameChange = (e) => {
    if (e.value) {
      setFormData({ ...formData, employeeId: e.value });
    }
  };

  const handleRoleChange = (e) => {
    if (e.value) {
      setFormData({ ...formData, approvalRole: e.value });
    }
  };

  const handleDepartmentChange = (e) => {
    setFormData({ ...formData, departments: e });
  };

  return (
    <Modal isOpen={isOpen}>
      <Form onSubmit={handleSubmit}>
        <ModalHeader>Register Approval</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label>Name</Label>
            <Select
              isSearchable={true}
              name="employeeId"
              options={options}
              isClearable={true}
              onChange={handleNameChange}
            />
          </FormGroup>
          <FormGroup>
            <Label>Role</Label>
            <Select
              isSearchable={true}
              name="approvalRole"
              options={roleOptions}
              isClearable={true}
              onChange={handleRoleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label>Department</Label>
            <DepartmentCheckbox onChange={handleDepartmentChange} value={[]} />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button type="submit" color="success">
            Save
          </Button>
          <Button onClick={() => onSubmit()}>Cancel</Button>
        </ModalFooter>
      </Form>
    </Modal>
  );
};

export default AddModal;
