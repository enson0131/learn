import React from "react";
import { CloudOutlined, LoadingOutlined } from "@ant-design/icons";
import "./index.css";

const AnimationUpload2 = () => {
  return (
    <div className="container">
      <CloudOutlined className="bg" />
      <LoadingOutlined spin className="syncOutlined" />
    </div>
  );
};

export default AnimationUpload2;
