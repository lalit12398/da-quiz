import React from "react";
import { Card, Typography } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";

export default function Success() {
  const { Title } = Typography;

  return (
    <Card className="result-card">
      <CheckCircleOutlined className="pass-icon" />
      <Title level={4}>Passed</Title>
    </Card>
  );
}
