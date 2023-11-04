import {memo,useEffect,useState} from "react";

import Test from "../questions/Test/Test";
import Diagram from "../questions/Diagram/Diagram";
import Document from "../questions/Document/Document";
import Algorithm from "../questions/Algorithm/Algorithm";

import PropTypes from "prop-types";
import styles from "./QuestionPlayGround.module.scss";

const QuestionPlayGround = memo(
	(props) => {
		const {currentQuestion, leftSideWidth} = props;
		const [questionType, setQuestionType] = useState();

        useEffect(() => {
            const questionTypeMap = {
                diagram: <Diagram />,
                test: <Test />,
                algorithm: <Algorithm />,
                document: <Document />,
            };
        
            const questionTypeKey = Object.keys(currentQuestion.question)[0];
            const component = questionTypeMap[questionTypeKey] || null;
        
            setQuestionType(component);
        }, [currentQuestion]);

		return (
			<div className={styles.left_side} style={{width: `${leftSideWidth}%`}}>
				<div className={styles.left_side_content}>{questionType}</div>
			</div>
		);
	},

	(prevProps, nextProps) => {return prevProps.currentQuestion === nextProps.currentQuestion && prevProps.leftSideWidth === nextProps.leftSideWidth;}
);

// displayName add must because of memo and eslint
QuestionPlayGround.displayName = "QuestionPlayGround";

QuestionPlayGround.propTypes = {
	currentQuestion: PropTypes.object,
	leftSideWidth: PropTypes.number,
};

export default QuestionPlayGround;

