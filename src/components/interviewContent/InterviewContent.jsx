import {useState} from "react";
import styles from "./InterviewContent.module.scss";

import QuestionPlayGround from "../QuestionPlayGround/QuestionPlayGround";
import AnswerPlayGround from "../AnswerPlayGround/AnswerPlayGround";
import DragBar from "../shared/DragBar/DragBar";

const InterviewContent = () => {
    const [leftSideWidth, setLeftSideWidth] = useState(49); // set initial width of left component
    const [rightSideHeight, setRightSideHeight] = useState(80); // set initial width of left component

    const handleHorizontalDrag = (e) => {
        e.preventDefault();

        document.getElementById("content").addEventListener("mousemove", handleHorizontalDragProgress);
        document.getElementById("content").addEventListener("mouseup", () => {
            document.getElementById("content").removeEventListener("mousemove", handleHorizontalDragProgress);
        });
    };

    const handleHorizontalDragProgress = (e) => {
        // listen dragging progress
        const container = document.getElementById("content"); // Select container
        const containerWidth = container.offsetWidth;
        const newPosition = ((e.clientX - 110) / containerWidth) * 100; // 200 width of the navbar
        setLeftSideWidth(newPosition);
    };

    const handleVerticalDrag = (e) => {
        e.preventDefault();
        document.getElementById("right_side").addEventListener("mousemove", handleVerticalDragProgress);
        document.getElementById("right_side").addEventListener("mouseup", () => {
            document.getElementById("right_side").removeEventListener("mousemove", handleVerticalDragProgress);
        });
    };

    const handleVerticalDragProgress = (e) => {
        // listen dragging progress
        const container = document.getElementById("right_side"); // Select container
        const containerHeight = container.offsetHeight;
        console.log("containerheight", containerHeight);
        console.log("e.clientY", e.clientY)
        const newPosition = ((e.clientY - 120) / containerHeight) * 100;
        setRightSideHeight(newPosition);
    };

    return (
        <div id='content' className={styles.interview_content}>
            <QuestionPlayGround leftSideWidth={leftSideWidth}/>
            <DragBar handleDrag={handleHorizontalDrag} className={["horizontal"]}/>
            <AnswerPlayGround handleDrag={handleVerticalDrag} rightSideHeight={rightSideHeight}/>
        </div>
    );
};

export default InterviewContent;



