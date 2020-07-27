import React from "react";
import { Card, Typography, Divider, Row, Col } from "antd";

export default function Explanation({ questions }) {
  const { Title, Text } = Typography;
  return (
    <Card className="explanation-card">
      <Title level={4}>Explanation</Title>
      <Divider />
      <Row>
        {questions &&
          questions.map((question, index) => (
            <Col className="mb-10" key={index}>
              <Text strong>Q. {question.question}</Text>
              <br />
              <Text strong>A. {question.answer}</Text>
              <br />
              <Text>Explanation: {question.explanation}</Text>
            </Col>
          ))}
      </Row>
    </Card>
  );
}
