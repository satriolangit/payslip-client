import React from "react";
import { Card, CardHeader, Col, Row, Button, CardBody } from "reactstrap";
import axios from "axios";

import { ApiUrl, IdeaboxFileUrl } from "../../../setting";
import Ideasheet from "./Ideasheet";

const Page = ({ match, history }) => {
  const [data, setData] = React.useState({
    master: null,
    detail: null,
    comment: [],
    impact: [],
  });

  const [documentWidth, setDocumentWidth] = React.useState(800);

  const fetchData = async () => {
    try {
      const id = match.params.id;
      const url = `${ApiUrl}/ideabox/pdf/${id}`;

      const res = await axios.get(url);
      const result = res.data.data;

      //console.log("fetch data", url, result);

      const { master, detail, comment, impact } = result;
      //console.log(master);

      setData({
        ...data,
        master: master,
        detail: detail,
        comment: comment,
        impact: impact,
      });
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    fetchData();
    const width = document.getElementById("pdfContainer").clientWidth;
    setDocumentWidth(width - 50);
  }, []);

  return (
    <div>
      <Row>
        <Col md="12">
          <Card id="pdfContainer">
            <CardHeader>
              <Row>
                <Col md="12">
                  <Button
                    className="btn btn-secondary btn-sm float-right"
                    onClick={() => history.goBack()}
                  >
                    <span className="icon-close"></span> Close
                  </Button>
                </Col>
              </Row>
            </CardHeader>
            <CardBody>
              <Ideasheet data={data} width={documentWidth} />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Page;
