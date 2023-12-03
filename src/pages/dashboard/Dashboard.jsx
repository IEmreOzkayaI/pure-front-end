import { Link } from "react-router-dom";
import Button from "../../components/shared/Button/Button";
import styles from "./Dashboard.module.scss";
const Dashboard = () => {
	return (
		<div className={styles.dashboard_container}>
			Dashboard
			<Link to='/'>
			<Button className={["dark"]} style={{marginTop:"2rem"}}>Turn Back</Button>
			</Link>
		</div>
	);
};

export default Dashboard;
