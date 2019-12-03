import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import moment from "moment";
import ReactHtmlParser from "react-html-parser";
import { Row, Col, Card, CardHeader, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
import { ApiUrl } from "../../../setting";

const Announcement = props => {
  const [data, setData] = useState([]);

  useEffect(() => {
    let isSubscribed = true;
    if (isSubscribed) loadData();
    return () => (isSubscribed = false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRefresh = () => {
    loadData();
  };

  const loadData = async () => {
    try {
      let url = ApiUrl + "/announcement/";
      if (props.match.params.id) url = url + "item/" + props.match.params.id;
      if (props.match.params.id === "today")
        url = ApiUrl + "/announcement/today";

      const res = await axios.get(url);
      setData(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const renderItems = () => {
    return data.map(item => (
      <Fragment key={item.id}>
        <Link to={"/pages/announcement/" + item.id}>
          <h3>{item.title}</h3>
        </Link>
        {ReactHtmlParser(item.text)}
        <div>
          <span className="badge badge-success">
            Posted {moment(item.created_on).format("MMMM DD YYYY, HH:mm:ss")}
          </span>
        </div>
        <hr />
      </Fragment>
    ));
  };

  return (
    <div className="animated fadeIn">
      <Row>
        <Col lg="12" sm="12" xs="12">
          <Card>
            <CardHeader>
              <strong>Pengumuman</strong>
              <div className="card-header-actions">
                <a
                  href="#!"
                  onClick={handleRefresh}
                  className="card-header-action btn"
                >
                  <span className="fa fa-refresh"></span>
                </a>
              </div>
            </CardHeader>
            <CardBody>{renderItems()}</CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Announcement;
