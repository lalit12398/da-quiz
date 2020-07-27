import React from "react";
import { Card, Typography } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";

export default function Failure() {
  const { Title } = Typography;
  return (
    <Card className="result-card">
      <CloseCircleOutlined className="fail-icon" />
      <Title level={4}>Failed</Title>
    </Card>
  );
}
