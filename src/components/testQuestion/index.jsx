import React, { useState, useEffect } from "react";
import styles from "./style.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentQuestion,
  setQuestions,
} from "../../redux/toolkit/interviewManagementSlice";

// Small component to render each choice
const ChoiceItem = ({ choice, index, isSelected, handleSelect }) => (
  <div
    key={index}
    className={`${styles.test__content__choices__item} ${
      isSelected ? styles.test__content__choices__item__selected : ""
    }`}
    onClick={() => handleSelect(index)}
  >
    <input
      type="radio"
      name="choice"
      value={index}
      checked={isSelected}
      readOnly
    />
    {choice}
  </div>
);

const TestQuestion = () => {
  const dispatch = useDispatch();
  const currentQuestion = useSelector((state) => state.interviewManagement.currentQuestion);
  const questions = useSelector((state) => state.interviewManagement.questions);
  const [selectedChoices, setSelectedChoices] = useState({});
  const defaultChoices = ["A", "B", "C", "D"];

  useEffect(() => {
    // Check if the current question has been answered before
    if (currentQuestion?.user_answer) {
      const selectedAnswerIndex = defaultChoices.indexOf(currentQuestion.user_answer);
      setSelectedChoices({
        ...selectedChoices,
        [currentQuestion.question._id]: selectedAnswerIndex,
      });
    }
  }, [currentQuestion]);

  const handleAnswer = (index) => {
    const questionId = currentQuestion.question._id;
    const updatedSelectedChoices = {
      ...selectedChoices,
      [questionId]: index,
    };
    setSelectedChoices(updatedSelectedChoices);

    const updatedQuestions = questions.map((question) =>
      question.question._id === questionId
        ? { ...question, user_answer: defaultChoices[index] }
        : question
    );
    dispatch(setQuestions(updatedQuestions));
  };

  return (
    <div className={styles.test}>
      <div className={styles.test__content}>
        <div className={styles.test__content__header}>
          {currentQuestion?.question.question}
        </div>
        <div className={styles.test__content__choices}>
          {currentQuestion?.question.choices.map((choice, index) => (
            <ChoiceItem
              key={index}
              choice={choice}
              index={index}
              isSelected={selectedChoices[currentQuestion.question._id] === index}
              handleSelect={handleAnswer}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestQuestion;
