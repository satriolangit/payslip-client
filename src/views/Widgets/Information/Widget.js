import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Col, Card, CardBody } from "reactstrap";
import axios from "axios";
import { ApiUrl } from "../../../setting";
import useInterval from "./../../../utils/useInterval";

const Widget = () => {
  const [data, setData] = useState([]);

  useInterval(() => {
    loadData();
  }, 5000);

  useEffect(() => {
    loadData();
    // eslint-disable-next-line
  }, []);

  const loadData = async () => {
    try {
      const res = await axios.get(ApiUrl + "/information/today");
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
            to="/pages/information/today"
            className="tile tile-warning tile-valign"
          >
            {data.length}
            <div className="informer informer-default">Information today</div>
            <div className="informer informer-default dir-br">
              <span className="fa fa-bookmark" />
            </div>
          </Link>
        </CardBody>
      </Card>
    </Col>
  );
};

export default Widget;
