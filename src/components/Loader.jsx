import React from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

function Loader() {
  return (
    <div className="loader">
      <Spin indicator={<LoadingOutlined spin />} size="large" />
    </div>
  );
}

export default Loader;
