import React from "react";
import {
  CloudOutlined,
  RocketOutlined,
  ArrowUpOutlined,
} from "@ant-design/icons";
import "./index.css";

const AnimationUpload = () => {
  return (
    <div className="container">
      <CloudOutlined className="bg" />
      <RocketOutlined className="arrow arrow-1" />
    </div>
  );
};

export default AnimationUpload;
