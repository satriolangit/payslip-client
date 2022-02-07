import React from "react";
import Ideasheet from "./views/Ideabox/Ideasheet/Ideasheet";
import {
  master,
  detail,
  comment,
  impact,
} from "./views/Ideabox/Ideasheet/store";

export default function Pdf() {
  const data = {
    master,
    detail,
    comment,
    impact,
  };

  console.log(data);

  return <Ideasheet data={data} />;
}
