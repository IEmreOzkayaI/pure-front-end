import { useEffect, useState } from "react";
import styles from "./Interview.module.scss";
import InterviewNavigation from "../../components/interviewNavigation/InterviewNavigation";
import InterviewContent from "../../components/interviewContent/InterviewContent";
import { motion } from "framer-motion";

import {
  setCurrentQuestion,
  setQuestionAmount,
  setQuestions,
  setRemainingTime,
} from "../../redux/toolkit/interviewManagementSlice.js";
import { useDispatch, useSelector } from "react-redux";
import InterviewHeader from "../../components/interviewHeader/InterviewHeader.jsx";
import Redirect from "../../components/shared/Redirect/Redirect.jsx";
import systemWarning from "../../systemWarning.js";
import { useResponsiveBlock } from "../../hooks/useResponsiveBlock.jsx";
import { interviewSignaturedFetch } from "../../redux/toolkit/interviewSignaturedSlice.js";
import { useParams } from "react-router-dom";

const Interview = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const responsiveBlock = useResponsiveBlock();
  const interviewInfo = useSelector(
    (state) => state.interviewSignatured?.interviewSignaturedInfo
  );
  const questionList = useSelector((state) => state.interviewManagement.questions);
  const [edges, setEdges] = useState([]);
  const [nodes, setNodes] = useState([]);
  const storedInterview =JSON.parse(localStorage.getItem("storedInterview"));

  // Sayfa yenilendiğinde yerel depolama alanından questionList'i al
  useEffect(() => {
    if (storedInterview) {
      dispatch(setQuestions(storedInterview?.questions));
      dispatch(setCurrentQuestion(storedInterview?.questions[0]));
      dispatch(setRemainingTime(storedInterview?.interview_time));
      dispatch(setQuestionAmount(storedInterview?.question_amount));
    } else {
      dispatch(interviewSignaturedFetch(params.interview_signature));
    }
  }, [dispatch]);

  // interviewInfo güncellendiğinde questionList ve diğer ilgili bilgileri güncelle
  useEffect(() => {
    if (interviewInfo) {
      dispatch(setQuestions(interviewInfo?.data.questions));
      dispatch(setCurrentQuestion(interviewInfo?.data.questions[0]));
      dispatch(setRemainingTime(interviewInfo?.data.interview_time));
      dispatch(setQuestionAmount(interviewInfo?.data.question_amount));
      localStorage.setItem("storedInterview", JSON.stringify(interviewInfo.data));
    }
  }, [interviewInfo, dispatch]);

  const handleSelectedQuestion = (index) => {
    dispatch(setCurrentQuestion(questionList[index]));
  };

  return (
    <motion.div
      className={styles.interview_container}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {responsiveBlock && (
        <div className={styles.interview}>
          <InterviewHeader />
          <div className={styles.interview_down}>
            <InterviewNavigation
              handleSelectedQuestion={handleSelectedQuestion}
              setEdges={setEdges}
              setNodes={setNodes}
            />
            <InterviewContent
              edges={edges}
              nodes={nodes}
              setEdges={setEdges}
              setNodes={setNodes}
            />
          </div>
        </div>
      )}
      {!responsiveBlock && <Redirect text={systemWarning.no_responsive_design} />}
    </motion.div>
  );
};

export default Interview;
