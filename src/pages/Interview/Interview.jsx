import { useState } from "react";
import styles from "./Interview.module.scss";
import InterviewNavigation from "../../components/interviewNavigation/InterviewNavigation";
import InterviewContent from "../../components/interviewContent/interviewContent";
import { useRef } from "react";
import { motion } from "framer-motion";

const Interview = () => {
  const interview = useRef(dummyData).current;
  const [currentQuestion, setCurrentQuestion] = useState({
    number: 1,
    question: interview.questions[0],
  });

  const handleSelectedQuestion = (index) => {
    const newQuestion = {
      number: index + 1,
      question: interview.questions[index],
    };
    setCurrentQuestion(newQuestion);
  };

  const handleInterview = () => {
    alert("Interview is finished");
  };

  return (
    <motion.div
      className={styles.interview}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <InterviewNavigation
        handleSelectedQuestion={handleSelectedQuestion}
        handleInterview={handleInterview}
        questionList={interview.questions}
      />
      <InterviewContent currentQuestion={currentQuestion} />
    </motion.div>
  );
};

export default Interview;

const dummyData = {
  questions: [
    {
      diagram: {
        question: "Diagram sorusu",
      },
    },
    {
      test: {
        question: ["Test sorusu 1", "Test sorusu 2", "Test sorusu 3"],
      },
    },
    {
      algorithm: {
        question: "Kod sorusu",
      },
    },
    {
      document: {
        question: "Döküman sorusu",
      },
    },
  ],
  answers: [
    {
      diagram: {
        answer: "Diagram cevabı",
      },
    },
    {
      test: {
        answer: ["Test cevabı 1", "Test cevabı 2", "Test cevabı 3"],
      },
    },
    {
      algorithm: {
        answer: "Kod cevabı",
      },
    },
    {
      document: {
        answer: "Döküman cevabı",
      },
    },
  ],
};
