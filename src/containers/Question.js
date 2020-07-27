import React, { useState, useEffect } from "react";
import McqCard from "../components/questionCards/McqCard";
import VidCard from "../components/questionCards/VidCard";
import data from "../data.json";
import Result from "./Result";
import Explanation from "../components/Explanation/Explanation";
import moment from "moment";

export default function Question() {
  let { quiz } = data;
  let subject = "subject1";
  let chapter = "chapter1";
  let selectedChapter = quiz[subject].chapters[chapter];
  let questions = [...selectedChapter["questions"]];

  // set initial question state
  let [quesData, setQuesData] = useState({
    currentIndex: 0,
    currentQuestion: [],
    showNext: true,
    showPrev: false,
    showSubmit: false,
    currentChapter: selectedChapter["title"]
  });

  //set initial clock
  const [timeLeft, setTimeLeft] = useState("00:00");

  function finishTestOnTimerEnd() {
    let endTime = moment().add(selectedChapter["time"], "minutes");
    let intervalId = setInterval(() => {
      const timeLeft = endTime.diff(moment()) / 1000; // get difference between now and timestamp
      const minutes = parseInt(timeLeft / 60);
      const seconds = parseInt(timeLeft % 60);
      setTimeLeft(
        `${minutes}:${seconds}`
      );

      if (minutes <= 0 && seconds <= 0) {
        clearInterval(intervalId);
        setSubmitted(true);
      }
    }, 1000);
  }

  useEffect(function () {
    finishTestOnTimerEnd();
  }, []);

  // Set initial answers set in state
  let [answers, setAnswers] = useState([]);

  // set is submitted to false initially
  let [isSubmitted, setSubmitted] = useState(false);

  // set initial answers count
  let [count, setCount] = useState(0);
  useEffect(() => {
    if (Array.isArray(questions) && questions.length)
      setQuesData((prevState) => ({
        ...prevState,
        currentQuestion: questions[quesData.currentIndex],
      }));
    setActionState();
  }, [quesData.currentIndex]);

  // functions to handle next and previous state on click
  function handleNextClick() {
    setQuesData((prevState) => ({
      ...prevState,
      currentIndex: prevState.currentIndex + 1,
    }));
  }
  function handlePrevClick() {
    setQuesData((prevState) => ({
      ...prevState,
      currentIndex: prevState.currentIndex - 1,
    }));
  }

  function setActionState() {
    if (quesData.currentIndex > 0) {
      setQuesData((prevState) => ({
        ...prevState,
        showPrev: true,
      }));
    } else {
      setQuesData((prevState) => ({
        ...prevState,
        showPrev: false,
      }));
    }
    if (quesData.currentIndex === questions.length - 1) {
      setQuesData((prevState) => ({
        ...prevState,
        showSubmit: true,
        showNext: false,
      }));
    } else {
      setQuesData((prevState) => ({
        ...prevState,
        showSubmit: false,
        showNext: true,
      }));
    }
  }

  // handle radio input change and add answer to answers collection
  function handleInputChange(e) {
    let val = e.target.value;
    setAnswers((prevState) => {
      let newArray = [...prevState];
      newArray[quesData.currentIndex] = val;
      return newArray;
    });
  }

  function handleSubmit() {
    if (answers.length) {
      let totalCount = 0;
      questions.forEach((question, index) => {
        if (question.answer === answers[index]) totalCount++;
      });
      setCount(totalCount);
      setSubmitted(true);
    }
  }

  // Render question cards accordingly
  if (isSubmitted) {
    return (
      <>
        <Result count={count} total={questions.length} />
        <Explanation questions={questions} />
      </>
    );
  } else {
    if (quesData.currentQuestion && quesData.currentQuestion.type === "vid") {
      return (
        <>
          <VidCard
            handleNextClick={handleNextClick}
            handlePrevClick={handlePrevClick}
            quesData={quesData}
            quesCount={questions.length}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            answers={answers}
            timeLeft={timeLeft}
          />
          <p className="ques-count">
            Question {quesData.currentIndex + 1} / {questions.length}
          </p>
        </>
      );
    } else if (
      quesData.currentQuestion &&
      quesData.currentQuestion.type === "text"
    ) {
      return (
        <>
          <McqCard
            handleNextClick={handleNextClick}
            handlePrevClick={handlePrevClick}
            quesData={quesData}
            quesCount={questions.length}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            answers={answers}
            timeLeft={timeLeft}
          />
          <p className="ques-count">
            Question {quesData.currentIndex + 1} / {questions.length}
          </p>
        </>
      );
    } else {
      return <p>No questions available.</p>;
    }
  }
}
