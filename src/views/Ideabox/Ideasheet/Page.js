import React from "react";
import { Card, CardHeader, Col, Row, Button, CardBody } from "reactstrap";
import axios from "axios";

import { ApiUrl, IdeaboxFileUrl } from "../../../setting";
//import Ideasheet from "./Ideasheet";

const Page = ({ match, history }) => {
  const [data, setData] = React.useState({
    master: null,
    detail: null,
    comment: [],
    impact: [],
  });

  const [masterData, setMasterData] = React.useState({
    ideaboxId: 0,
    ideaNumber: "",
    ideaType: "",
    submittedBy: "",
    submittedAt: "",
    submitterName: "",
    tema: "",
    kaizenArea: "",
    kaizenAmount: "",
    departmentId: 1,
    reviewerName: "",
    approverName: "",
    receiverName: "",
    status: "",
    isIdeasheet: 0,
    departmentName: "",
  });

  const [detailData, setDetailData] = React.useState({
    id: 0,
    ideaboxId: 0,
    beforeSummary: "",
    beforeImage: "",
    beforeKapan: "",
    beforeDimana: "",
    beforeSiapa: "",
    beforeApa: " ",
    beforeBagaimana: "",
    beforeIncident: "",
    beforeSituation: "",
    afterSummary: "",
    afterImage: "",
    afterRank: 1,
  });

  const [commentData, setCommentData] = React.useState([]);
  const [impactData, setImpactData] = React.useState([]);

  React.useEffect(() => {
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
          comment: [...comment, comment],
          impact: [...impact, impact],
        });

        // setMasterData(master);
        // setDetailData(detail);
        // setImpactData(impact);
        // setCommentData(comment);

        // console.log("data :", masterData, detailData, impactData, commentData);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();

    //console.log("DATA :", data);
  }, []);

  return (
    <div>
      <Row>
        <Col md="12">
          <Card>
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
            <CardBody></CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Page;
