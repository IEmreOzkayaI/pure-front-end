import styles from "./InterviewNavigation.module.scss";
import PropTypes from "prop-types";
import {useSelector} from "react-redux";

const InterviewNavigation = (props) => {
    const {handleSelectedQuestion} = props;
    const questionList = useSelector((state) => state.interviewManagement.questions);
    const currentQuestion = useSelector((state) => state.interviewManagement.currentQuestion);


    return (
        <div className={styles.interview_navigation}>
            <svg
                width="29"
                height="17"
                viewBox="0 0 29 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                onClick={() => {
                    if (currentQuestion.number - 1 >= 0)
                        handleSelectedQuestion(currentQuestion.number - 1)
                }}
            >
                <path d="M1 16L14.5 1L28 16" stroke="white" strokeWidth="0.75"/>
            </svg>

            <ul className={styles.interview_navigation_list}>
                {questionList?.map((question, index) => (
                    <li
                        key={index}
                        className={`${styles.interview_navigation_list_item} ${
                            currentQuestion.number === index ? styles.selected : ""
                        }`}
                        onClick={() => handleSelectedQuestion(index)}
                    >
                        {index + 1}
                    </li>
                ))}
            </ul>

            <svg
                width="31"
                height="19"
                viewBox="0 0 31 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                onClick={() => {
                    if (currentQuestion.number + 1 < questionList.length)
                        handleSelectedQuestion(currentQuestion.number + 1)
                }}
            >
                <path d="M2 1L15.5 16L29 1" stroke="white" strokeWidth="3"/>
            </svg>
        </div>
    );
};

export default InterviewNavigation;

InterviewNavigation.propTypes = {
    handleInterview: PropTypes.func,
    handleSelectedQuestion: PropTypes.func,
    questionList: PropTypes.arrayOf(PropTypes.object),
};
