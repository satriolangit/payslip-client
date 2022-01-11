import React from "react";
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
import Alert from "react-s-alert";
import moment from "moment";

import SignBox from "./SignBox";
import IdeasheetCheckbox from "./Components/IdeasheetCheckbox";
import ImpactCheckbox from "./Components/ImpactCheckbox";
import { ApiUrl, IdeaboxFileUrl, AlertOptions } from "../../../setting";
import AuthContext from "./../../../context/auth/authContext";
import IdeaboxCounter from "./Components/IdeaboxCounter";

const EditForm = ({ match, history }) => {
  const authContext = React.useContext(AuthContext);
  const { user } = authContext;

  const [formData, setFormData] = React.useState({
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
    reviewedBy: "",
    reviewerName: "",
    approvedBy: "",
    approverName: "",
    acceptedBy: "",
    receiverName: "",
    status: "",
    isIdeasheet: 0,
    departmentName: "",
  });

  const [formDetailData, setFormDetailData] = React.useState({
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
    afterRank: 0,
    beforeImageFile: null,
    afterImageFile: null,
  });

  const [impactData, setImpactData] = React.useState([]);
  const [commentData, setCommentData] = React.useState({
    id: 0,
    comment: "",
    createdBy: "",
  });

  const [totalIdeasheet, setTotalIdeasheet] = React.useState(0);

  React.useEffect(() => {
    fetchTotalIdeasheet();
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const id = match.params.id;
      const url = `${ApiUrl}/ideabox/edit/${id}?employee=${user.employee_id}`;

      const res = await axios.get(url);
      const result = res.data.data;

      const { master, detail, comment, impacts } = result;
      console.log(result);

      setImpactData(impacts);
      setFormData(master);
      setFormDetailData({ ...formDetailData, ...detail });
      setCommentData(comment);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchTotalIdeasheet = async () => {
    try {
      const url =
        ApiUrl + "/ideabox/closedIdeaCount/" + moment().format("YYYY");
      const res = await axios.get(url);
      const result = res.data.data;

      setTotalIdeasheet(result);
    } catch (err) {
      console.log(err);
    }
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormDetailChange = (e) =>
    setFormDetailData({ ...formDetailData, [e.target.name]: e.target.value });

  const handleUploadBeforeImage = (e) => {
    const file = e.target.files[0];
    const imageFile = URL.createObjectURL(file);

    setFormDetailData({
      ...formDetailData,
      beforeImage: file.name,
      beforeImageFile: imageFile,
    });
  };

  const handleUploadAfterImage = (e) => {
    const file = e.target.files[0];
    const imageFile = URL.createObjectURL(file);

    setFormDetailData({
      ...formDetailData,
      afterImage: file.name,
      afterImageFile: imageFile,
    });
  };

  const handleIdeasheetCheckChange = (e) => {
    setFormData({ ...formData, isIdeasheet: e });
  };

  const handleImpactChange = (e) => {
    setImpactData(e);
  };

  const handleCommentChange = (e) => {
    setCommentData({ ...commentData, comment: e.target.value });
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
      beforeImage,
      afterImage,
    } = formDetailData;

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

    if (beforeImage === "" || afterImage === "") {
      Alert.warning("Gambar ide harus dilampirkan.", AlertOptions);
      result = false;
    }

    return result;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(formData, formDetailData, commentData, impactData);

    const ideasheet = {
      master: formData,
      detail: formDetailData,
      comment: commentData,
      impact: impactData,
    };

    try {
      const url = ApiUrl + "/ideabox/edit/";

      let form = new FormData();
      form.append("data", JSON.stringify(ideasheet));

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
        }
      }
    } catch (error) {
      console.log(error);
      //Alert.error(error.response.data.message, AlertOptions);
    }
  };

  const renderDetail = () => {
    if (formData.ideaType === "UMUM") {
      return renderDetailUmum();
    } else {
      return renderDetailKyt();
    }
  };

  const renderDetailUmum = () => {
    const { beforeSummary, afterSummary } = formDetailData;

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
                  onChange={handleFormDetailChange}
                  value={beforeSummary}
                />
              </FormGroup>
            </Col>
            <Col md="6">
              <FormGroup>
                <Label>After</Label>
                <Input
                  name="afterSummary"
                  type="textarea"
                  onChange={handleFormDetailChange}
                  value={afterSummary}
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
                  accept="image/*|MIME_type"
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
                  accept="image/*|MIME_type"
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
    const {
      beforeSummary,
      beforeKapan,
      beforeDimana,
      beforeApa,
      beforeSiapa,
      beforeBagaimana,
      beforeIncident,
      beforeSituation,
      afterSummary,
    } = formDetailData;

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
                  onChange={handleFormDetailChange}
                  value={beforeSummary}
                />
              </FormGroup>
              <FormGroup>
                <Label>Kapan</Label>
                <Input
                  name="beforeKapan"
                  type="text"
                  onChange={handleFormDetailChange}
                  value={beforeKapan}
                />
              </FormGroup>
              <FormGroup>
                <Label>Dimana</Label>
                <Input
                  name="beforeDimana"
                  type="text"
                  onChange={handleFormDetailChange}
                  value={beforeDimana}
                />
              </FormGroup>
              <FormGroup>
                <Label>Siapa</Label>
                <Input
                  name="beforeSiapa"
                  type="text"
                  onChange={handleFormDetailChange}
                  value={beforeSiapa}
                />
              </FormGroup>
              <FormGroup>
                <Label>Apa</Label>
                <Input
                  name="beforeApa"
                  type="text"
                  onChange={handleFormDetailChange}
                  value={beforeApa}
                />
              </FormGroup>
              <FormGroup>
                <Label>Bagaimana</Label>
                <Input
                  name="beforeBagaimana"
                  type="text"
                  onChange={handleFormDetailChange}
                  value={beforeBagaimana}
                />
              </FormGroup>
              <FormGroup>
                <Label>Apa yang terjadi</Label>
                <Input
                  name="beforeIncident"
                  type="text"
                  onChange={handleFormDetailChange}
                  value={beforeIncident}
                />
              </FormGroup>
              <FormGroup>
                <Label>Bagaimana hal ini bisa menjadi masalah ?</Label>
                <Input
                  name="beforeSituation"
                  type="text"
                  onChange={handleFormDetailChange}
                  value={beforeSituation}
                />
              </FormGroup>
              <FormGroup>
                <Input
                  name="beforeImage"
                  type="file"
                  accept="image/*|MIME_type"
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
                  onChange={handleFormDetailChange}
                  value={afterSummary}
                />
              </FormGroup>
              <FormGroup>
                <Label>Image</Label>
                <Input
                  name="afterImage"
                  type="file"
                  accept="image/*|MIME_type"
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
                    value="1"
                    onChange={handleFormDetailChange}
                  />
                  {"Rank 1"}
                  <Label check>Frekuensi Bertambah</Label>
                </FormGroup>
                <FormGroup check>
                  <Input
                    name="afterRank"
                    type="radio"
                    value="2"
                    onChange={handleFormDetailChange}
                  />
                  {"Rank 2"}
                  <Label check>Terjadi Sewaktu-waktu</Label>
                </FormGroup>
                <FormGroup check>
                  <Input
                    name="afterRank"
                    type="radio"
                    value="3"
                    onChange={handleFormDetailChange}
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

  const showBeforeImage = () => {
    const { beforeImage, beforeImageFile } = formDetailData;

    if (beforeImageFile !== null) {
      return (
        <img
          src={beforeImageFile}
          className="img-thumbnail survey-attachment"
          alt="beforeImage"
        />
      );
    } else {
      const url = `${IdeaboxFileUrl}${beforeImage}`;
      return (
        <img
          src={url}
          className="img-thumbnail survey-attachment"
          alt="beforeImage"
          readOnly
        />
      );
    }
  };

  const showAfterImage = () => {
    const { afterImage, afterImageFile } = formDetailData;

    if (afterImageFile !== null) {
      return (
        <img
          src={afterImageFile}
          className="img-thumbnail survey-attachment"
          alt="afterImage"
        />
      );
    } else {
      const url = `${IdeaboxFileUrl}${afterImage}`;
      return (
        <img
          src={url}
          className="img-thumbnail survey-attachment"
          alt="afterImage"
        />
      );
    }
  };

  return (
    <div>
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
                        readOnly
                      />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label>Jenis Idea</Label>
                      <Input
                        name="ideaType"
                        type="select"
                        onChange={handleFormChange}
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
                <SignBox title="Diterima" value={formData.receiverName} />
              </Col>
              <Col md="3">
                <SignBox title="Disetujui" value={formData.approverName} />
              </Col>
              <Col md="3">
                <SignBox title="Diperiksa" value={formData.reviewerName} />
              </Col>
              <Col md="3">
                <SignBox title="Dibuat" value={formData.submitterName} />
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
                <Button type="submit" size="sm" color="primary float-right">
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

export default EditForm;
