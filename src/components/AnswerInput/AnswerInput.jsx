import styles from "./AnswerInput.module.scss";
import PropTypes from "prop-types";
import AceEditor from "../IDE/AceEditor.jsx";
import {useSelector} from "react-redux";

const AnswerInput = (props) => {
    const {rightSideHeight} = props;
    const currentQuestion = useSelector((state) => state.interviewManagement.currentQuestion);

    return (
        <div className={styles.right_side_content_up} style={{height: `${rightSideHeight}%`}}>
            {
                currentQuestion?.type === 'Algorithm' && (
                    <AceEditor/>
                )
            }
        </div>
    );
};

AnswerInput.propTypes = {
    rightSideHeight: PropTypes.number,
};

export default AnswerInput;
