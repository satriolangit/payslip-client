import React from "react";
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import Select from "react-select";
import axios from "axios";
import BootstrapTable from "react-bootstrap-table-next";
import { confirm } from "react-bootstrap-confirmation";
import { ApiUrl, JsonContentType } from "../../../setting";
import AuthContext from "./../../../context/auth/authContext";

const Report = ({ history }) => {
  const authContext = React.useContext(AuthContext);
  const { user } = authContext;

  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const url = ApiUrl + "/ideabox/notification/mapping/list";
      const res = await axios.get(url);
      const result = res.data.data;

      setData(result);
    } catch (err) {
      console.log(err);
    }
  };

  const handleRefresh = () => {
    fetchData();
  };

  const columns = [
    {
      dataField: "id",
      text: "id",
      hidden: true,
    },
    {
      dataField: "employeeId",
      text: "NIK",
      sort: true,
    },
    {
      dataField: "name",
      text: "Name",
      sort: true,
    },
    {
      dataField: "departmentName",
      text: "Department",
      sort: true,
    },
    {
      dataField: "notifTypeDescription",
      text: "Setting",
    },
  ];

  return (
    <div className="animated fadeIn">
      <Row>
        <Col lg="12" sm="12" xs="12">
          <Card>
            <CardHeader>
              <Row>
                <Col md="12" className="text-right">
                  <Button
                    color="secondary"
                    onClick={handleRefresh}
                    className="btn btn-sm"
                  >
                    <i className="icon-refresh" /> Refresh
                  </Button>
                </Col>
              </Row>
            </CardHeader>
            <CardBody>
              <BootstrapTable
                bootstrap4
                keyField="id"
                data={data}
                columns={columns}
                wrapperClasses="table-responsive"
                striped
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Report;
