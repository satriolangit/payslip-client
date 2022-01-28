import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  Input,
  Label,
  Row,
  FormGroup,
  Button,
} from "reactstrap";

import axios from "axios";
import SignBox from "./SignBox";
import IdeasheetCheckbox from "./Components/IdeasheetCheckbox";
import ImpactCheckbox from "./Components/ImpactCheckbox";
import CommentList from "./Components/CommentList";

import { ApiUrl, IdeaboxFileUrl } from "../../../setting";

const ViewForm = ({ match }) => {
  const [formData, setFormData] = useState({
    ideaboxId: 0,
    ideaNumber: "",
    ideaType: "",
    submittedBy: "",
    submittedAt: "",
    submitterName: "",
    tema: "",
    kaizenArea: "",
    kaizenAmount: "",
    departmentId: 0,
    reviewerName: "",
    approverName: "",
    receiverName: "",
    status: "",
    isIdeasheet: 0,
    departmentName: "",
  });

  const [formDetailData, setFormDetailData] = useState({
    id: 0,
    ideaboxId: 0,
    beforeSummary: "",
    beforeImage: "",
    beforeKapan: "",
    beforeDimana: "",
    beforeSiapa: "",
    beforeApa: "",
    beforeBagaimana: "",
    beforeIncident: "",
    beforeSituation: "",
    afterSummary: "",
    afterImage: "",
    afterRank: 2,
  });

  const [impactData, setImpactData] = useState([]);
  const [commentData, setCommentData] = useState([]);

  React.useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const id = match.params.id;
      const url = `${ApiUrl}/ideabox/view/${id}`;

      const res = await axios.get(url);
      const result = res.data.data;

      const { master, detail, comments, impacts } = result;

      setImpactData(impacts);
      setFormData(master);
      setFormDetailData(detail);
      setCommentData(comments);
    } catch (err) {
      console.log(err);
    }
  };

  const handleImpactChange = (e) => {};
  const handleIdeasheetChange = (e) => {};

  const renderDetail = () => {
    if (formData.ideaType === "UMUM") {
      return renderDetailUmum();
    } else {
      return renderDetailKyt();
    }
  };

  const showBeforeImage = () => {
    const url = `${IdeaboxFileUrl}${formDetailData.beforeImage}`;
    return (
      <img
        src={url}
        className="img-thumbnail survey-attachment"
        alt="beforeImage"
        readOnly
      />
    );
  };

  const showAfterImage = () => {
    const url = `${IdeaboxFileUrl}${formDetailData.afterImage}`;
    return (
      <img
        src={url}
        className="img-thumbnail survey-attachment"
        alt="afterImage"
        readOnly
      />
    );
  };

  const renderDetailUmum = () => {
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
                  value={formDetailData.beforeSummary}
                />
              </FormGroup>
            </Col>
            <Col md="6">
              <FormGroup>
                <Label>After</Label>
                <Input
                  name="afterSummary"
                  type="textarea"
                  value={formDetailData.afterSummary}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col md="6">
              <FormGroup>{showBeforeImage()}</FormGroup>
            </Col>
            <Col md="6">
              <FormGroup>{showAfterImage()}</FormGroup>
            </Col>
          </Row>
        </CardBody>
      </Card>
    );
  };

  const renderDetailKyt = () => {
    return (
      <Card>
        <CardHeader>
          <strong>Q-KYT</strong>
        </CardHeader>
        <CardBody>
          <Row>
            <Col md="6">
              <FormGroup>
                <Label>
                  <strong>Before</strong>
                </Label>
                <Input
                  name="beforeSummary"
                  type="textarea"
                  value={formDetailData.beforeSummary}
                  readOnly
                />
              </FormGroup>
              <FormGroup>
                <Label>Kapan</Label>
                <Input
                  name="beforeKapan"
                  type="text"
                  value={formDetailData.beforeKapan}
                  readOnly
                />
              </FormGroup>
              <FormGroup>
                <Label>Dimana</Label>
                <Input
                  name="beforeDimana"
                  type="text"
                  value={formDetailData.beforeDimana}
                  readOnly
                />
              </FormGroup>
              <FormGroup>
                <Label>Siapa</Label>
                <Input
                  name="beforeSiapa"
                  type="text"
                  value={formDetailData.beforeSiapa}
                  readOnly
                />
              </FormGroup>
              <FormGroup>
                <Label>Apa</Label>
                <Input
                  name="beforeApa"
                  type="text"
                  value={formDetailData.beforeApa}
                  readOnly
                />
              </FormGroup>
              <FormGroup>
                <Label>Bagaimana</Label>
                <Input
                  name="beforeBagaimana"
                  type="text"
                  value={formDetailData.beforeBagaimana}
                  readOnly
                />
              </FormGroup>
              <FormGroup>
                <Label>Apa yang terjadi</Label>
                <Input
                  name="beforeIncident"
                  type="text"
                  value={formDetailData.beforeIncident}
                  readOnly
                />
              </FormGroup>
              <FormGroup>
                <Label>Bagaimana hal ini bisa menjadi masalah (situasi)?</Label>
                <Input
                  name="beforeSituation"
                  type="text"
                  value={formDetailData.beforeSituation}
                  readOnly
                />
              </FormGroup>
              <FormGroup>{showBeforeImage()}</FormGroup>
            </Col>
            <Col md="6">
              <FormGroup>
                <Label>After</Label>
                <Input
                  name="afterSummary"
                  type="textarea"
                  value={formDetailData.afterSummary}
                  readOnly
                />
              </FormGroup>
              <FormGroup>{showAfterImage()}</FormGroup>
              <FormGroup tag="fieldset">
                <legend>Rank</legend>
                <FormGroup check>
                  <Input
                    name="afterRank"
                    type="radio"
                    value="3"
                    checked={formDetailData.afterRank === 3}
                    readOnly
                  />
                  {"Rank 3 "}
                  <Label check>Frekuensi Bertambah</Label>
                </FormGroup>
                <FormGroup check>
                  <Input
                    name="afterRank"
                    type="radio"
                    value="2"
                    checked={formDetailData.afterRank === 2}
                    readOnly
                  />
                  {"Rank 2 "}
                  <Label check>Terjadi Sewaktu-waktu</Label>
                </FormGroup>
                <FormGroup check>
                  <Input
                    name="afterRank"
                    type="radio"
                    value="1"
                    checked={formDetailData.afterRank === 1}
                    readOnly
                  />
                  {"Rank 1 "}
                  <Label check>Jarang Terjadi</Label>
                </FormGroup>
              </FormGroup>
            </Col>
          </Row>
        </CardBody>
      </Card>
    );
  };

  return (
    <div className="animated fadeIn">
      <Row>
        <Col md="12">
          <Form>
            <Card>
              <CardHeader>
                <Link
                  to="/ideabox/dashboard"
                  className="btn btn-secondary btn-sm float-right"
                >
                  <span className="icon-close"></span> Close
                </Link>
              </CardHeader>
              <CardBody>
                <Row form>
                  <Col md="6">
                    <FormGroup>
                      <Label>Nama</Label>
                      <Input
                        type="text"
                        name="submitterName"
                        value={formData.submitterName}
                        readOnly
                      />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label>NIK</Label>
                      <Input
                        type="text"
                        name="submittedBy"
                        value={formData.submittedBy}
                        readOnly
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row form>
                  <Col md="6">
                    <FormGroup>
                      <Label>Departemen</Label>
                      <Input
                        name="departmentId"
                        type="text"
                        value={formData.departmentName}
                        readOnly
                      />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label>Area Kaizen</Label>
                      <Input
                        type="text"
                        name="kaizenArea"
                        value={formData.kaizenArea}
                        readOnly
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row form>
                  <Col md="6">
                    <FormGroup>
                      <Label>Tanggal</Label>
                      <Input
                        name="submitDate"
                        type="text"
                        value={formData.submittedAt}
                        readOnly
                      />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label>Jenis Idea</Label>
                      <Input
                        name="ideaboxType"
                        type="text"
                        value={formData.ideaType}
                        readOnly
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row form>
                  <Col md="6">
                    <FormGroup>
                      <Label>Tema</Label>
                      <Input
                        type="text"
                        name="tema"
                        value={formData.tema}
                        readOnly
                      />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label>No. Urut</Label>
                      <Input
                        type="text"
                        name="ideaNumber"
                        value={formData.ideaNumber}
                        readOnly
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </CardBody>
            </Card>
            {renderDetail()}
            <Card>
              <CardHeader></CardHeader>
            </Card>
            <Card>
              <CardBody>
                <FormGroup tag="fieldset">
                  <legend>Pelaksanaan Ideasheet</legend>
                  <IdeasheetCheckbox
                    value={formData.isIdeasheet}
                    onChange={handleIdeasheetChange}
                  />
                </FormGroup>
                <FormGroup tag="fieldset">
                  <legend>Isi pengaruhnya (Kalau ada)</legend>
                  <ImpactCheckbox
                    value={impactData}
                    onChange={handleImpactChange}
                  />
                </FormGroup>
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                <FormGroup>
                  <Label>Nilai Kaizen Jika dirupiahkan</Label>
                  <Input
                    type="text"
                    name="kaizenAmount"
                    value={formData.kaizenAmount}
                    readOnly
                  />
                </FormGroup>
              </CardBody>
            </Card>
            <CommentList value={commentData} />
            <Row>
              <Col md="3">
                <SignBox
                  title="Diterima"
                  value={formData.receiverName}
                  readOnly
                />
              </Col>
              <Col md="3">
                <SignBox
                  title="Disetujui"
                  value={formData.approverName}
                  readOnly
                />
              </Col>
              <Col md="3">
                <SignBox
                  title="Diperiksa"
                  value={formData.reviewerName}
                  readOnly
                />
              </Col>
              <Col md="3">
                <SignBox
                  title="Dibuat"
                  value={formData.submitterName}
                  readOnly
                />
              </Col>
            </Row>
            <Card>
              <CardHeader>
                <Link
                  to="/ideabox/dashboard"
                  className="btn btn-secondary btn-sm float-right"
                >
                  <span className="icon-close"></span> Close
                </Link>
              </CardHeader>
            </Card>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default ViewForm;
