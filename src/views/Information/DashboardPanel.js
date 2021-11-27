import React, { useEffect, useState, Fragment } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import moment from "moment";
import { Col, Card, CardHeader, CardBody } from "reactstrap";
import ReactHtmlParser from "react-html-parser";

import { ApiUrl } from "./../../setting";

const DashboardPanel = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    loadData();
    // eslint-disable-next-line
  }, []);

  const loadData = async () => {
    try {
      const res = await axios.get(ApiUrl + "/information/latest");
      console.log(res.data);
      setData(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const renderItems = () => {
    return data.map((item) => (
      <Fragment key={item.id}>
        <h6>
          <Link to={"/pages/information/" + item.id}>{item.title}</Link>
        </h6>
        <p>
          {renderText(item.text, item.id)}
          <span className="text-muted">
            <i className="fa fa-clock-o" />{" "}
            {moment(item.created_on).format("MMM DD YYYY, HH:mm")}
          </span>
        </p>
      </Fragment>
    ));
  };

  const renderText = (text, id) => {
    const clearedText = text.replace(/(<([^>]+)>)/gi, "");

    if (clearedText.length > 100) {
      return (
        <Fragment>
          {ReactHtmlParser(clearedText.substr(0, 100) + "...")}

          <Link to={"/pages/information/" + id}>
            <span className="label label-warning">more</span>
          </Link>

          <br />
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          {ReactHtmlParser(clearedText)} <br />
        </Fragment>
      );
    }
  };

  const handleRefresh = () => {
    loadData();
  };

  return (
    <Col xs="12" sm="6" lg="6">
      <Card>
        <CardHeader>
          <strong>Informasi</strong>
          <div className="card-header-actions">
            <Link to="/pages/information/" className="card-header-action btn">
              <i className="fa fa-bookmark"></i>
            </Link>
            <a
              href="#!"
              className="card-header-action btn"
              onClick={handleRefresh}
            >
              <i className="fa fa-refresh"></i>
            </a>
          </div>
        </CardHeader>
        <CardBody>{renderItems()}</CardBody>
      </Card>
    </Col>
  );
};

export default DashboardPanel;
