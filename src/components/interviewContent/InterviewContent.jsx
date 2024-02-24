import {useState} from "react";
import styles from "./InterviewContent.module.scss";

import QuestionPlayGround from "../QuestionPlayGround/QuestionPlayGround";
import AnswerPlayGround from "../AnswerPlayGround/AnswerPlayGround";
import DragBar from "../shared/DragBar/DragBar";
import {useDrag} from "../../hooks/useDrag.jsx";
import { useSelector } from "react-redux";
import TestQuestion from "../testQuestion"

const InterviewContent = ({edges,nodes,setEdges,setNodes}) => {
    const { width: leftSideWidth, height: rightSideHeight, handleHorizontalDrag, handleVerticalDrag } = useDrag(46, 75);
    const currentQuestion = useSelector((state) => state.interviewManagement.currentQuestion);

    return (
      <div id="content" className={styles.interview_content}>

      {
        currentQuestion?.type !== "Test" && <>
            <QuestionPlayGround leftSideWidth={leftSideWidth} />
            <DragBar handleDrag={handleHorizontalDrag} className={["horizontal"]} />
            <AnswerPlayGround
              handleDrag={handleVerticalDrag}
              rightSideHeight={rightSideHeight}
              edges={edges}
              nodes={nodes}
              setEdges={setEdges}
              setNodes={setNodes}
            />
          </>
      }
        {currentQuestion?.type === "Test" && <TestQuestion />}

      </div>
    );
};

export default InterviewContent;
