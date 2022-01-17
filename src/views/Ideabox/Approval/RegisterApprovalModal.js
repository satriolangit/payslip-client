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
  { value: "ADMIN", label: "Administrator" },
];

const AddModal = ({ isOpen }) => {
  const [formData, setFormData] = React.useState({
    employeeId: "",
    approvalRole: "",
    departments: [],
  });

  const [close, setClose] = React.useState(false);
  const [options, setOptions] = React.useState([]);

  React.useEffect(() => {
    fetchUser();
  }, [isOpen]);

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

    const result = await confirm(
      "Apakah anda yakin untuk melakukan register role ?"
    );
    if (result) {
      try {
        const url = ApiUrl + "/approval/mapping/add";
        const payload = {
          employeeId: formData.employeeId,
          approvalRole: formData.approvalRole,
          departments: formData.departments,
        };

        await axios.post(url, payload, JsonContentType);

        setClose(true);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleNameChange = (e) => {
    setFormData({ ...formData, employeeId: e.value });
  };

  const handleRoleChange = (e) => {
    setFormData({ ...formData, approvalRole: e.value });
  };

  const handleDepartmentChange = (e) => {
    setFormData({ ...formData, departments: e });
  };

  return (
    <Modal isOpen={isOpen && !close}>
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
          <Button onClick={() => setClose(true)}>Cancel</Button>
        </ModalFooter>
      </Form>
    </Modal>
  );
};

export default AddModal;
