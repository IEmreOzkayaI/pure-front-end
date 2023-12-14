import {useState} from "react";
import styles from "./InterviewContent.module.scss";

import QuestionPlayGround from "../QuestionPlayGround/QuestionPlayGround";
import AnswerPlayGround from "../AnswerPlayGround/AnswerPlayGround";
import DragBar from "../shared/DragBar/DragBar";
import {useDrag} from "../../hooks/useDrag.jsx";

const InterviewContent = () => {
    const { width: leftSideWidth, height: rightSideHeight, handleHorizontalDrag, handleVerticalDrag } = useDrag(49, 70);
    console.log(rightSideHeight)
    return (
        <div id='content' className={styles.interview_content}>
            <QuestionPlayGround leftSideWidth={leftSideWidth}/>
            <DragBar handleDrag={handleHorizontalDrag} className={["horizontal"]}/>
            <AnswerPlayGround handleDrag={handleVerticalDrag} rightSideHeight={rightSideHeight}/>
        </div>
    );
};

export default InterviewContent;



