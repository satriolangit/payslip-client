import React, { useState, useContext } from "react";
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

import IdeaboxCounter from "./IdeaboxCounter";
import SignBox from "./SignBox";
import AuthContext from "./../../../context/auth/authContext";

const SubmitForm = () => {
  const authContext = useContext(AuthContext);
  const { user } = authContext;

  const [formData, setFormData] = useState({
    ideaType: "UMUM",
    ideaNumber: "",
    submittedBy: user.employee_id,
    submittedAt: Date.now(),
    tema: "",
    kaizenArea: "",
    isIdeasheet: 0,
    kaizenAmount: "",
    departmentId: 0,
  });

  const [detailFormData, setDetailFormData] = useState({
    beforeSummary: "",
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

  const [formComment, setFormComment] = useState("");
  const [impact, setImpact] = useState([]);
  const [formType, setFormType] = useState("");

  const handleFormChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleDetailFormChange = (e) =>
    setFormData({ ...detailFormData, [e.target.name]: e.target.value });

  const handleFormTypeChange = (e) => {
    console.log(e.target.value);
    setFormType(e.target.value);
    renderDetail();
  };

  const handleImpactChange = (e) => {
    const checked = e.target.checked;
    if (checked) {
      setImpact([...impact, e.target.value]);
    } else {
      setImpact(impact.filter((i) => i !== e.target.value));
    }
  };

  const handleSubmit = async () => {
    alert("handle submit");
  };

  const renderDetail = () => {
    if (formType === "UMUM") {
      return renderDetailUmum();
    } else {
      return renderDetailKyt();
    }
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
                  onChange={handleDetailFormChange}
                />
              </FormGroup>
            </Col>
            <Col md="6">
              <FormGroup>
                <Label>After</Label>
                <Input
                  name="afterSummary"
                  type="textarea"
                  onChange={handleDetailFormChange}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col md="6">
              <FormGroup>
                <Label>Image</Label>
                <Input
                  name="beforeImage"
                  type="file"
                  onChange={handleDetailFormChange}
                />
              </FormGroup>
            </Col>
            <Col md="6">
              <FormGroup>
                <Label>Image</Label>
                <Input
                  name="afterImage"
                  type="file"
                  onChange={handleDetailFormChange}
                />
              </FormGroup>
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
                  onChange={handleDetailFormChange}
                />
              </FormGroup>
              <FormGroup>
                <Label>Kapan</Label>
                <Input
                  name="beforeKapan"
                  type="text"
                  onChange={handleDetailFormChange}
                />
              </FormGroup>
              <FormGroup>
                <Label>Dimana</Label>
                <Input
                  name="beforeDimana"
                  type="text"
                  onChange={handleDetailFormChange}
                />
              </FormGroup>
              <FormGroup>
                <Label>Siapa</Label>
                <Input
                  name="beforeSiapa"
                  type="text"
                  onChange={handleDetailFormChange}
                />
              </FormGroup>
              <FormGroup>
                <Label>Bagaimana</Label>
                <Input
                  name="beforeBagaimana"
                  type="text"
                  onChange={handleDetailFormChange}
                />
              </FormGroup>
              <FormGroup>
                <Label>Apa yang terjadi</Label>
                <Input
                  name="beforeIncident"
                  type="text"
                  onChange={handleDetailFormChange}
                />
              </FormGroup>
              <FormGroup>
                <Label>Bagaimana hal ini bisa menjadi masalah ?</Label>
                <Input
                  name="beforeSituation"
                  type="text"
                  onChange={handleDetailFormChange}
                />
              </FormGroup>
              <FormGroup>
                <Input
                  name="beforeImage"
                  type="file"
                  onChange={handleDetailFormChange}
                />
              </FormGroup>
            </Col>
            <Col md="6">
              <FormGroup>
                <Label>After</Label>
                <Input
                  name="afterSummary"
                  type="textarea"
                  onChange={handleDetailFormChange}
                />
              </FormGroup>
              <FormGroup>
                <Label>Image</Label>
                <Input
                  name="afterImage"
                  type="file"
                  onChange={handleDetailFormChange}
                />
              </FormGroup>
              <FormGroup tag="fieldset">
                <legend>Rank</legend>
                <FormGroup check>
                  <Input
                    name="afterRank"
                    type="radio"
                    value="1"
                    onChange={handleDetailFormChange}
                  />
                  {"Rank 1"}
                  <Label check>Frekuensi Bertambah</Label>
                </FormGroup>
                <FormGroup check>
                  <Input
                    name="afterRank"
                    type="radio"
                    value="2"
                    onChange={handleDetailFormChange}
                  />
                  {"Rank 2"}
                  <Label check>Terjadi Sewaktu-waktu</Label>
                </FormGroup>
                <FormGroup check>
                  <Input
                    name="afterRank"
                    type="radio"
                    value="3"
                    onChange={handleDetailFormChange}
                  />
                  {"Rank 3"}
                  <Label check>Jarang Terjadi</Label>
                </FormGroup>
              </FormGroup>
            </Col>
          </Row>
        </CardBody>
      </Card>
    );
  };

  const masterImpact = [
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

  const renderImpactCheckboxes = () => {
    return masterImpact.map((item, i) => {
      return (
        <FormGroup check key={i}>
          <Input
            type="checkbox"
            name="ideaboxImpact"
            value={item.id}
            onChange={handleImpactChange}
          />{" "}
          <Label check>{item.description}</Label>
        </FormGroup>
      );
    });
  };

  return (
    <div className="animated fadeIn">
      <Row>
        <Col md="12">
          <Form onSubmit={handleSubmit}>
            <Card>
              <CardHeader>
                <IdeaboxCounter value={25} />
                <Link
                  to="/ideabox/dashboard"
                  className="btn btn-secondary btn-sm float-right"
                >
                  <span className="icon-close"></span> Close
                </Link>
                <Button type="submit" size="sm" color="primary float-right">
                  <i className="fa fa-dot-circle-o"></i> Send
                </Button>
              </CardHeader>
              <CardBody>
                <Row form>
                  <Col md="6">
                    <FormGroup>
                      <Label>Nama</Label>
                      <Input type="text" name="submitterName" />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label>NIK</Label>
                      <Input type="text" name="submittedBy" />
                    </FormGroup>
                  </Col>
                </Row>
                <Row form>
                  <Col md="6">
                    <FormGroup>
                      <Label>Departemen</Label>
                      <Input name="department" type="select">
                        <option value="HR">HR</option>
                        <option value="GA">GA</option>
                        <option value="PC">PC</option>
                        <option value="SAL">SAL</option>
                        <option value="FA">FA</option>
                        <option value="QA">QA</option>
                        <option value="IT">IT</option>
                        <option value="TEC">TEC</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label>Area Kaizen</Label>
                      <Input type="text" name="kaizenArea" />
                    </FormGroup>
                  </Col>
                </Row>
                <Row form>
                  <Col md="6">
                    <FormGroup>
                      <Label>Tanggal</Label>
                      <Input name="submitDate" type="text" />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label>Jenis Idea</Label>
                      <Input
                        name="ideaboxType"
                        type="select"
                        onChange={handleFormTypeChange}
                      >
                        <option value="UMUM">UMUM</option>
                        <option value="Q-KYT">Q-KYT</option>
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
                <Row form>
                  <Col md="6">
                    <FormGroup>
                      <Label>Tema</Label>
                      <Input type="text" name="tema" />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label>No. Urut</Label>
                      <Input type="text" name="ideaNumber" />
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
                  <FormGroup check>
                    <Input type="checkbox" name="isIdeasheet" />{" "}
                    <Label check>Sudah</Label>
                  </FormGroup>
                  <FormGroup check>
                    <Input type="checkbox" name="isIdeasheet" />{" "}
                    <Label check>Belum</Label>
                  </FormGroup>
                </FormGroup>
                <FormGroup tag="fieldset">
                  <legend>Isi pengaruhnya (Kalau ada)</legend>
                  {renderImpactCheckboxes()}
                </FormGroup>
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                <FormGroup>
                  <Label>Nilai Kaizen Jika dirupiahkan</Label>
                  <Input type="text" name="kaizenAmount" />
                </FormGroup>
                <FormGroup>
                  <Label>
                    Permintaan atau komentar dari pimpinan kerja pembuat
                    ideasheet
                  </Label>
                  <Input type="textarea" name="ideboxComment" />
                </FormGroup>
              </CardBody>
            </Card>
            <Col md="3">
              <SignBox title="Dibuat" value={user.name} />
              <SignBox title="Diperiksa" value="" />
              <SignBox title="Disetujui" value="" />
              <SignBox title="Diterima" value="" />
            </Col>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default SubmitForm;
