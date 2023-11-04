import styles from "./AnswerInput.module.scss";
import PropTypes from "prop-types";
const AnswerInput = (props) => {
	const {rightSideHeight} = props;

	return (
		<div className={styles.right_side_content_up} style={{height: `${rightSideHeight}%`}}>
			kodlama alanı
		</div>
	);
};

AnswerInput.propTypes = {
	rightSideHeight: PropTypes.number,
};

export default AnswerInput;
