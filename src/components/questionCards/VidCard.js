import React from "react";
import { Card, Button, Typography, Radio, Row, Divider } from "antd";
import { ArrowRightOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import Videojs from "../video/Video";

const { Title } = Typography;
export default function VidCard(props) {
  let {
    handleNextClick,
    handlePrevClick,
    quesData,
    handleInputChange,
    answers,
    handleSubmit,
    timeLeft
  } = props;
  const videoJsOptions = {
    autoplay: true,
    playbackRates: [0.5, 1, 1.25, 1.5, 2],
    width: 1000,
    height: 400,
    controls: true,
    sources: [
      {
        src: quesData.currentQuestion.src,
        type: "video/mp4",
      },
    ],
  };
  const radioStyle = {
    display: "block",
    height: "30px",
    lineHeight: "30px",
  };
  return (
    <Card
      title={<Title level={4}>{quesData.currentChapter}</Title>}
      extra={<p>{timeLeft} left</p>}
      style={{ width: "80%", margin: "auto" }}
      actions={[
        quesData.showSubmit && (
          <Button
            type="primary"
            shape="round"
            size="medium"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        ),
        quesData.showNext && (
          <Button
            type="default"
            shape="circle"
            icon={<ArrowRightOutlined />}
            size="medium"
            onClick={handleNextClick}
          />
        ),
        quesData.showPrev && (
          <Button
            type="default"
            shape="circle"
            icon={<ArrowLeftOutlined />}
            size="medium"
            onClick={handlePrevClick}
          />
        ),
      ]}
      className="custom-card"
    >
      <Row className="mb-10">
        <Videojs {...videoJsOptions} />
      </Row>
      <Divider />
      <Row>
        <Radio.Group
          onChange={handleInputChange}
          value={answers[quesData.currentIndex]}
        >
          {quesData.currentQuestion.options.map((option, index) => (
            <Radio style={radioStyle} value={option} key={index}>
              {option}
            </Radio>
          ))}
        </Radio.Group>
      </Row>
    </Card>
  );
}
