import PropTypes from "prop-types";
import styles from "./DragBar.module.scss";
const DragBar = (props) => {
	const {handleDrag} = props;
	let className = props.className?.map((className) => {
		return styles[className];
	});

	className?.push(styles.button);

	return (
		<div {...props} className={className?.join(" ")} >
			<img onMouseDown={handleDrag} className={styles.border_image} src='https://img.icons8.com/external-royyan-wijaya-detailed-outline-royyan-wijaya/24/external-move-animation-royyan-wijaya-detailed-outline-royyan-wijaya-3.png' alt='' />
		</div>
	);
};

DragBar.propTypes = {
	handleDrag: PropTypes.func,
    className: PropTypes.arrayOf(PropTypes.string),
};

export default DragBar;
