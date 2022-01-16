import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  FormGroup,
  Label,
  Input,
} from "reactstrap";

const DetailFormGeneral = ({ data, onChange }) => {
  const [formData, setFormData] = React.useState({
    beforeValueSummary: "",
    beforeImage: "",
    beforeKapan: "",
    beforeDimana: "",
    beforeSiapa: "",
    beforeBagaimana: "",
    beforeIncident: "",
    beforeSituation: "",
    afterSummary: "",
    afterImage: "",
    afterRank: 0,
  });

  return (
    <Card>
      <CardHeader>
        <strong>UMUM</strong>
      </CardHeader>
      <CardBody>
        <Row form>
          <Col md="6">
            <FormGroup>
              <Label>Before</Label>
              <Input
                name="beforeSummary"
                type="textarea"
                value={data.beforeValueSummary}
              />
            </FormGroup>
          </Col>
          <Col md="6">
            <FormGroup>
              <Label>After</Label>
              <Input name="afterSummary" type="textarea" />
            </FormGroup>
          </Col>
        </Row>
        <Row form>
          <Col md="6">
            <FormGroup>
              <Label>Image</Label>
              <Input name="beforeImage" type="file" />
            </FormGroup>
          </Col>
          <Col md="6">
            <FormGroup>
              <Label>Image</Label>
              <Input name="afterImage" type="file" />
            </FormGroup>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default DetailFormGeneral;
