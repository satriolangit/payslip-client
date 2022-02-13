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
import moment from "moment";
import axios from "axios";
import Alert from "react-s-alert";

import IdeaboxCounter from "./Components/IdeaboxCounter";
import SignBox from "./SignBox";
import AuthContext from "./../../../context/auth/authContext";
import IdeasheetCheckbox from "./Components/IdeasheetCheckbox";
import ImpactCheckbox from "./Components/ImpactCheckbox";
import { ApiUrl, AlertOptions } from "../../../setting";

const SubmitForm = (props) => {
  const authContext = useContext(AuthContext);
  const { user } = authContext;

  const [formData, setFormData] = useState({
    ideaType: "UMUM",
    ideaNumber: "",
    submittedBy: user !== null ? user.employee_id : "",
    submitterName: user !== null ? user.name : "",
    submittedAt: moment().format("YYYY-MM-DD"),
    tema: "",
    kaizenArea: "",
    isIdeasheet: 0,
    kaizenAmount: "",
    departmentId: user !== null ? user.departmentId : 0,
    impact: [],
    approvalRole: user.approval_role,
  });

  const [detailFormData, setDetailFormData] = useState({
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
    afterRank: 0,
    beforeImageFile: null,
    afterImageFile: null,
  });

  const [formComment, setFormComment] = useState({
    value: "",
    createdBy: user.employee_id,
  });

  const [formType, setFormType] = useState("UMUM");
  const [previewBeforeImage, setPreviewBeforeImage] = useState(null);
  const [previewAfterImage, setPreviewAfterImage] = useState(null);
  const [totalIdeasheet, setTotalIdeasheet] = useState(0);
  const [submit, setSubmit] = useState(false);

  React.useEffect(() => {
    fetchNumber();
    fetchTotalIdeasheet();
  }, []);

  const fetchTotalIdeasheet = async () => {
    try {
      const url =
        ApiUrl +
        "/ideabox/closedIdeaCount?year=" +
        moment().format("YYYY") +
        "&employeeId=" +
        user.employee_id;
      const res = await axios.get(url);
      const result = res.data.data;

      setTotalIdeasheet(result);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchNumber = async () => {
    try {
      const url = ApiUrl + "/ideabox/number";
      const res = await axios.get(url);
      const number = res.data.data;

      setFormData({ ...formData, ideaNumber: number });
    } catch (err) {
      console.log(err);
    }
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDetailFormChange = (e) =>
    setDetailFormData({ ...detailFormData, [e.target.name]: e.target.value });

  const handleFormTypeChange = (e) => {
    setFormType(e.target.value);
    setFormData({ ...formData, ideaType: e.target.value });
    renderDetail();
  };

  const handleIdeasheetCheckChange = (e) => {
    setFormData({ ...formData, isIdeasheet: e });
  };

  const handleImpactChange = (e) => {
    setFormData({ ...formData, impact: e });
  };

  const handleCommentChange = (e) => {
    setFormComment({ ...formComment, value: e.target.value });
  };

  const handleUploadBeforeImage = (e) => {
    const file = e.target.files[0];
    const imageFile = URL.createObjectURL(file);

    setDetailFormData({
      ...detailFormData,
      beforeImage: file.name,
      beforeImageFile: file,
    });
    setPreviewBeforeImage(imageFile);
  };

  const handleUploadAfterImage = (e) => {
    const file = e.target.files[0];
    const imageFile = URL.createObjectURL(file);

    setDetailFormData({
      ...detailFormData,
      afterImage: file.name,
      afterImageFile: file,
    });
    setPreviewAfterImage(imageFile);
  };

  const isValidForm = () => {
    let result = true;
    const { submitterName, tema, departmentId, ideaType } = formData;
    const {
      beforeSummary,
      beforeKapan,
      beforeDimana,
      beforeSiapa,
      beforeApa,
      beforeBagaimana,
      beforeIncident,
      beforeSituation,
      afterSummary,
      afterRank,
      beforeImageFile,
      afterImageFile,
    } = detailFormData;

    if (submitterName.trim().length === 0) {
      Alert.warning("Nama pemberi ide harus diisi.", AlertOptions);
      result = false;
    }

    if (departmentId === 0) {
      Alert.warning("Departmen harus dipilih.", AlertOptions);
      result = false;
    }

    if (tema.trim().length === 0) {
      Alert.warning("Tema ide harus diisi.", AlertOptions);
      result = false;
    }

    if (beforeSummary.trim().length <= 0 || afterSummary.trim().length <= 0) {
      Alert.warning("Sebelum dan sesudah harus diisi.", AlertOptions);
      result = false;
    }

    if (beforeKapan.trim().length <= 0 && ideaType !== "UMUM") {
      Alert.warning("Kapan harus diisi.", AlertOptions);
      result = false;
    }

    if (beforeDimana.trim().length <= 0 && ideaType !== "UMUM") {
      Alert.warning("Dimana harus diisi.", AlertOptions);
      result = false;
    }

    if (beforeSiapa.trim().length <= 0 && ideaType !== "UMUM") {
      Alert.warning("Siapa harus diisi.", AlertOptions);
      result = false;
    }

    if (beforeApa.trim().length <= 0 && ideaType !== "UMUM") {
      Alert.warning("Apa harus diisi.", AlertOptions);
      result = false;
    }

    if (beforeBagaimana.trim().length <= 0 && ideaType !== "UMUM") {
      Alert.warning("Bagaimana harus diisi.", AlertOptions);
      result = false;
    }

    if (beforeIncident.trim().length <= 0 && ideaType !== "UMUM") {
      Alert.warning("Apa yang terjadi harus diisi.", AlertOptions);
      result = false;
    }

    if (beforeSituation.trim().length <= 0 && ideaType !== "UMUM") {
      Alert.warning("Situasi harus diisi.", AlertOptions);
      result = false;
    }

    if (afterRank <= 0 && ideaType !== "UMUM") {
      Alert.warning("Rank harus diisi.", AlertOptions);
      result = false;
    }

    if (beforeImageFile === null || afterImageFile === null) {
      Alert.warning("Gambar ide harus dilampirkan.", AlertOptions);
      result = false;
    }

    return result;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(formData, detailFormData, formComment);

    const url = ApiUrl + "/ideabox/submit";
    const ideasheet = {
      master: formData,
      detail: detailFormData,
      comment: formComment,
    };

    try {
      let form = new FormData();
      form.append("data", JSON.stringify(ideasheet));
      form.append("beforeImage", detailFormData.beforeImageFile);
      form.append("afterImage", detailFormData.afterImageFile);

      if (isValidForm()) {
        const result = await axios.post(url, form, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        console.log(result);

        if (result.data.result === "FAIL") {
          Alert.error(result.data.message, AlertOptions);
        } else {
          Alert.info("Ideasheet sudah terkirim", AlertOptions);
          setSubmit(true);
          props.history.push("/ideabox/dashboard");
        }
      }
    } catch (error) {
      console.log(error);
      Alert.error(error.response.data.message, AlertOptions);
    }
  };

  const handleClearForm = () => {
    setFormData(...formData, {
      ideaType: "UMUM",
      ideaNumber: "",
      submittedBy: user.employee_id,
      submitterName: user.name,
      submittedAt: moment().format("YYYY-MM-DD"),
      tema: "",
      kaizenArea: "",
      isIdeasheet: 0,
      kaizenAmount: "",
      departmentId: 0,
      impact: [],
    });

    setDetailFormData(...detailFormData, {
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
      afterRank: 0,
      beforeImageFile: null,
      afterImageFile: null,
    });

    setFormComment(...formComment, {
      value: "",
      createdBy: user.employee_id,
    });
  };

  const renderDetail = () => {
    if (formType === "UMUM") {
      return renderDetailUmum();
    } else {
      return renderDetailKyt();
    }
  };

  const showBeforeImage = () => {
    if (previewBeforeImage !== null) {
      return (
        <img
          src={previewBeforeImage}
          className="img-thumbnail survey-attachment"
          alt="beforeImage"
        />
      );
    }
  };

  const showAfterImage = () => {
    if (previewAfterImage !== null) {
      return (
        <img
          src={previewAfterImage}
          className="img-thumbnail survey-attachment"
          alt="afterImage"
        />
      );
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
                  value={detailFormData.beforeSummary}
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
                  value={detailFormData.afterSummary}
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
                  accept="jpg, jpeg, png, gif, bmp"
                  onChange={handleUploadBeforeImage}
                />
                {showBeforeImage()}
              </FormGroup>
            </Col>
            <Col md="6">
              <FormGroup>
                <Label>Image</Label>
                <Input
                  name="afterImage"
                  type="file"
                  accept="jpg, jpeg, png, gif, bmp"
                  onChange={handleUploadAfterImage}
                />
                {showAfterImage()}
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
                  value={detailFormData.beforeSummary}
                />
              </FormGroup>
              <FormGroup>
                <Label>Kapan</Label>
                <Input
                  name="beforeKapan"
                  type="text"
                  onChange={handleDetailFormChange}
                  value={detailFormData.beforeKapan}
                />
              </FormGroup>
              <FormGroup>
                <Label>Dimana</Label>
                <Input
                  name="beforeDimana"
                  type="text"
                  onChange={handleDetailFormChange}
                  value={detailFormData.beforeDimana}
                />
              </FormGroup>
              <FormGroup>
                <Label>Siapa</Label>
                <Input
                  name="beforeSiapa"
                  type="text"
                  onChange={handleDetailFormChange}
                  value={detailFormData.beforeSiapa}
                />
              </FormGroup>
              <FormGroup>
                <Label>Apa</Label>
                <Input
                  name="beforeApa"
                  type="text"
                  onChange={handleDetailFormChange}
                  value={detailFormData.beforeApa}
                />
              </FormGroup>
              <FormGroup>
                <Label>Bagaimana</Label>
                <Input
                  name="beforeBagaimana"
                  type="text"
                  onChange={handleDetailFormChange}
                  value={detailFormData.beforeBagaimana}
                />
              </FormGroup>
              <FormGroup>
                <Label>Apa yang terjadi</Label>
                <Input
                  name="beforeIncident"
                  type="text"
                  onChange={handleDetailFormChange}
                  value={detailFormData.beforeIncident}
                />
              </FormGroup>
              <FormGroup>
                <Label>
                  Bagaimana hal ini bisa menjadi masalah (situasi) ?
                </Label>
                <Input
                  name="beforeSituation"
                  type="text"
                  onChange={handleDetailFormChange}
                  value={detailFormData.beforeSituation}
                />
              </FormGroup>
              <FormGroup>
                <Input
                  name="beforeImage"
                  type="file"
                  accept="jpg, jpeg, png, gif, bmp"
                  onChange={handleUploadBeforeImage}
                />
                {showBeforeImage()}
              </FormGroup>
            </Col>
            <Col md="6">
              <FormGroup>
                <Label>After</Label>
                <Input
                  name="afterSummary"
                  type="textarea"
                  onChange={handleDetailFormChange}
                  value={detailFormData.afterSummary}
                />
              </FormGroup>
              <FormGroup>
                <Label>Image</Label>
                <Input
                  name="afterImage"
                  type="file"
                  accept="jpg, jpeg, png, gif, bmp"
                  onChange={handleUploadAfterImage}
                />
                {showAfterImage()}
              </FormGroup>
              <FormGroup tag="fieldset">
                <legend>Rank</legend>
                <FormGroup check>
                  <Input
                    name="afterRank"
                    type="radio"
                    value="3"
                    onChange={handleDetailFormChange}
                  />
                  {"Rank 3 "}
                  <Label check>Frekuensi Bertambah</Label>
                </FormGroup>
                <FormGroup check>
                  <Input
                    name="afterRank"
                    type="radio"
                    value="2"
                    onChange={handleDetailFormChange}
                  />
                  {"Rank 2 "}
                  <Label check>Terjadi Sewaktu-waktu</Label>
                </FormGroup>

                <FormGroup check>
                  <Input
                    name="afterRank"
                    type="radio"
                    value="1"
                    onChange={handleDetailFormChange}
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
          <IdeaboxCounter value={totalIdeasheet} />
          <Form onSubmit={handleSubmit}>
            <Card>
              <CardHeader>
                <Link
                  to="/ideabox/dashboard"
                  className="btn btn-secondary btn-sm float-right"
                >
                  <span className="icon-close"></span> Close
                </Link>
                <Button type="submit" size="sm" color="primary float-right">
                  <i className="fa fa-dot-circle-o"></i> Save
                </Button>
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
                        onChange={handleFormChange}
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
                        onChange={handleFormChange}
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
                        type="select"
                        onChange={handleFormChange}
                        value={formData.departmentId}
                      >
                        <option value="1">HR</option>
                        <option value="2">GA</option>
                        <option value="3">PC</option>
                        <option value="4">SAL</option>
                        <option value="5">FA</option>
                        <option value="6">QA</option>
                        <option value="7">IT</option>
                        <option value="8">PROD</option>
                        <option value="9">TEC</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label>Area Kaizen</Label>
                      <Input
                        type="text"
                        name="kaizenArea"
                        value={formData.kaizenArea}
                        onChange={handleFormChange}
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
                        onChange={handleFormChange}
                      />
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
                      <Input
                        type="text"
                        name="tema"
                        value={formData.tema}
                        onChange={handleFormChange}
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
                        onChange={handleFormChange}
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
                    onChange={handleIdeasheetCheckChange}
                  />
                </FormGroup>
                <FormGroup tag="fieldset">
                  <legend>Isi pengaruhnya (Kalau ada)</legend>
                  <ImpactCheckbox
                    value={formData.impact}
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
                    onChange={handleFormChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>
                    Permintaan atau komentar dari pimpinan kerja pembuat
                    ideasheet
                  </Label>
                  <Input
                    type="textarea"
                    name="ideboxComment"
                    onChange={handleCommentChange}
                  />
                </FormGroup>
              </CardBody>
            </Card>
            <Row>
              <Col md="3">
                <SignBox title="Diterima" value="" />
              </Col>
              <Col md="3">
                <SignBox title="Disetujui" value="" />
              </Col>
              <Col md="3">
                <SignBox title="Diperiksa" value="" />
              </Col>
              <Col md="3">
                <SignBox title="Dibuat" value={user.name} />
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
                <Button
                  type="submit"
                  size="sm"
                  color="primary float-right"
                  disabled={submit}
                >
                  <i className="fa fa-dot-circle-o"></i> Save
                </Button>
              </CardHeader>
            </Card>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default SubmitForm;
