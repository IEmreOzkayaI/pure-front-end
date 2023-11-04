import PropTypes from "prop-types";
import DragBar from "../shared/DragBar/DragBar";
import styles from "./AnswerPlayGround.module.scss";
import AnswerOutput from "../AnswerOutput/AnswerOutput";
import AnswerInput from "../AnswerInput/AnswerInput";

const AnswerPlayGround = (props) => {
	const {handleDrag, rightSideHeight} = props;

	return (
		<div className={styles.right_side}>
			<div className={styles.right_side_content} id='right_side'>
				<AnswerInput rightSideHeight = {rightSideHeight}/>
				<DragBar handleDrag={handleDrag} className={["vertical"]} />
				<AnswerOutput />
			</div>
		</div>
	);
};

export default AnswerPlayGround;

AnswerPlayGround.propTypes = {
	handleDrag: PropTypes.func,
	rightSideHeight: PropTypes.number,
};
