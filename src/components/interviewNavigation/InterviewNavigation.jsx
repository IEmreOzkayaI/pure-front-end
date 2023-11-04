import styles from "./InterviewNavigation.module.scss";
import Button from "../../components/shared/Button/Button";
import PropTypes from "prop-types";

const InterviewNavigation = (props) => {
	console.log("InterviewNavigationa girdi");

	const {handleInterview, handleSelectedQuestion, questionList} = props;

	return (
		<div className={styles.navigation}>
			<ul className={styles.navigation_list}>
				{questionList?.map((question, index) => (
					<li key={index} className={styles.navigation_item} onClick={() => handleSelectedQuestion(index)}>
						{index + 1}
					</li>
				))}
			</ul>

			<Button className={["black"]} onClick={() => handleInterview()}>
				Sonlandır
			</Button>
		</div>
	);
};

export default InterviewNavigation;

InterviewNavigation.propTypes = {
	handleInterview: PropTypes.func,
	handleSelectedQuestion: PropTypes.func,
	questionList: PropTypes.arrayOf(PropTypes.object),
};
