import {memo} from "react";

import PropTypes from "prop-types";
import styles from "./QuestionPlayGround.module.scss";
import {useSelector} from "react-redux";
import ReactMarkdown from 'react-markdown';

const QuestionPlayGround = memo(
    (props) => {
        const {leftSideWidth} = props;
        const currentQuestion = useSelector((state) => state.interviewManagement.currentQuestion);

        return (
            <div className={styles.left_side} style={{width: `${leftSideWidth}%`}}>

                <div className={styles.left_side_content}>
                    {
                        currentQuestion?.type === 'Algorithm' && (
                            <div>
                                {currentQuestion?.question.description.scenario}<br/><br/>
                                {currentQuestion?.question.description.question}
                            </div>)

                    }
                    {
                        currentQuestion?.type !== 'Algorithm' && (<span>
                            {currentQuestion?.question.description}
                        </span>
                        )
                    }

                </div>
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

