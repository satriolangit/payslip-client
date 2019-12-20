import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Button,
  Form,
  FormGroup,
  Label,
  CardFooter,
  Input,
  FormText
} from "reactstrap";
import Alert from "react-s-alert";
import { ApiUrl, JsonContentType, AlertOptions } from "../../setting";

const Edit = ({ match, history }) => {
  const [data, setData] = useState({
    id: "",
    title: "",
    text: "",
    created_by: "",
    created_on: Date.now(),
    updated_by: "",
    updated_on: Date.now()
  });

  const { title, text } = data;
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  useEffect(() => {
    if (match.params.id !== "0") {
      loadData();
    }
    // eslint-disable-next-line
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();

    console.log("handleSubmit");

    if (match.params.id !== "0") {
      update();
    } else {
      add();
    }
  };

  const add = async () => {
    const formData = {
      title,
      text
    };

    try {
      const url = ApiUrl + "/information/";
      await axios.post(url, formData, JsonContentType);
      history.push("/admin/information");
    } catch (err) {
      Alert.error(err, AlertOptions);
    }
  };

  const update = async () => {
    const formData = {
      title,
      text,
      id: match.params.id
    };

    try {
      const url = ApiUrl + "/information/update";
      await axios.post(url, formData, JsonContentType);
      history.push("/admin/information");
    } catch (err) {
      console.log(err);
      Alert.error(err, AlertOptions);
    }
  };

  const loadData = async () => {
    if (match.params.id !== "0") {
      try {
        const url = ApiUrl + "/information/item/" + match.params.id;
        const res = await axios.get(url);
        const information = res.data.data[0];

        setData(information);

        const text = information.text;
        const contentBlock = htmlToDraft(text);

        if (contentBlock) {
          const contentState = ContentState.createFromBlockArray(
            contentBlock.contentBlocks
          );
          const editorState = EditorState.createWithContent(contentState);

          setEditorState(editorState);
        }
      } catch (err) {
        console.log(err);
        Alert.error(err, AlertOptions);
      }
    }
  };

  const onChange = e => setData({ ...data, [e.target.name]: e.target.value });

  const handleClearForm = e => {
    e.preventDefault();

    setData({ ...data, title: "", text: "" });
  };

  const onEditorStateChange = editorState => {
    setEditorState(editorState);

    const text = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    setData({ ...data, text });
  };

  const handleUploadImage = async file => {
    const url = ApiUrl + "/upload";
    const data = new FormData();
    data.append("file", file);

    try {
      const res = await axios.post(url, data);
      console.log(res);

      return new Promise((resolve, reject) => {
        const imageUrl = res.data.imageUrl;
        resolve({ data: { link: imageUrl } });
      });
    } catch (error) {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }
  };

  const toolbar = {
    image: {
      urlEnabled: true,
      uploadEnabled: true,
      alignmentEnabled: true,
      uploadCallback: handleUploadImage,
      previewImage: true,
      inputAccept: "image/gif,image/jpeg,image/jpg,image/png,image/svg",
      alt: { present: false, mandatory: false },
      defaultSize: {
        height: "auto",
        width: "100%"
      }
    }
  };

  return (
    <div className="animated fadeIn">
      <Row>
        <Col lg="12" sm="12" xs="12">
          <Form onSubmit={handleSubmit}>
            <Card>
              <CardHeader>
                <strong>{match.params.id === "0" ? "Add" : "Edit"}</strong>{" "}
                Informasi
                <Link
                  to="/admin/information"
                  className="btn btn-secondary btn-sm float-right"
                >
                  <span className="icon-close"></span> Close
                </Link>
              </CardHeader>
              <CardBody>
                <FormGroup row>
                  <Col md="3">
                    <Label>Title</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input
                      type="text"
                      name="title"
                      value={title}
                      onChange={onChange}
                    />
                    <FormText color="muted">Title informasi</FormText>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label>Text</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Editor
                      editorState={editorState}
                      toolbarClassName="toolbarClassName"
                      wrapperClassName="wrapperClassName"
                      editorClassName="editorClassName"
                      onEditorStateChange={onEditorStateChange}
                      toolbar={toolbar}
                    />
                    <FormText color="muted">Text informasi</FormText>
                  </Col>
                </FormGroup>
              </CardBody>
              <CardFooter>
                <Button type="submit" size="sm" color="primary">
                  <i className="fa fa-dot-circle-o"></i> Submit
                </Button>
                <Button
                  type="reset"
                  size="sm"
                  color="danger"
                  onClick={handleClearForm}
                >
                  <i className="fa fa-ban"></i> Reset
                </Button>
              </CardFooter>
            </Card>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default Edit;
