import PropTypes from "prop-types";
import styles from "./style.module.scss";
import {useSelector} from "react-redux";

const IndividualDashboard = (props) => {
	const {clickCount} = props;

	const userInfo = useSelector((state) => state.user.userInfo);

	return (
		<div className={styles.individual__dashboard__container}>
			{clickCount < 5 && (
				<div>
					Hello Welcome To Individual User Dashboard , We are now developing this page. <br />
				</div>
			)}

			{clickCount >= 5 && JSON.stringify(userInfo, null, 2)}
		</div>
	);
};

IndividualDashboard.propTypes = {
	clickCount: PropTypes.number,
};

export default IndividualDashboard;
