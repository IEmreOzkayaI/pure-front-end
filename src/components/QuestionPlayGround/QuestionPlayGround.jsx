import {memo} from "react";

import PropTypes from "prop-types";
import styles from "./QuestionPlayGround.module.scss";
import {useSelector} from "react-redux";

const QuestionPlayGround = memo(
    (props) => {
        const {leftSideWidth} = props;
        const currentQuestion = useSelector((state) => state.interviewManagement.currentQuestion);

        return (
            <div className={styles.left_side} style={{width: `${leftSideWidth}%`}}>
                <div className={styles.left_side_content}>{currentQuestion?.question}</div>
            </div>
        );
    },

    (prevProps, nextProps) => {
        return prevProps.leftSideWidth === nextProps.leftSideWidth;
    }
);

// displayName add must because of memo and eslint
QuestionPlayGround.displayName = "QuestionPlayGround";

QuestionPlayGround.propTypes = {
    currentQuestion: PropTypes.object,
    leftSideWidth: PropTypes.number,
};

export default QuestionPlayGround;

