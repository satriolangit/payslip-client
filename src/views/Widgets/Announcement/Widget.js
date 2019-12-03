import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Col, Card, CardBody } from "reactstrap";
import axios from "axios";

import { ApiUrl } from "../../../setting";
import useInterval from "./../../../utils/useInterval";

const Widget = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    let isSubscribed = true;
    if (isSubscribed) loadData();
    return () => (isSubscribed = false);
    // eslint-disable-next-line
  }, []);

  useInterval(() => {
    // Your custom logic here
    loadData();
  }, 5000);

  const loadData = async () => {
    try {
      const res = await axios.get(ApiUrl + "/announcement/today");
      setData(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Col xs="12" sm="6" lg="3">
      <Card>
        <CardBody>
          <Link
            to="/pages/announcement/today"
            className="tile tile-info tile-valign"
          >
            {data.length}
            <div className="informer informer-default">Announcement today</div>
            <div className="informer informer-default dir-br">
              <span className="fa fa-bell" />
            </div>
          </Link>
        </CardBody>
      </Card>
    </Col>
  );
};

export default Widget;
