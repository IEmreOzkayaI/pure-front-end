import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import CompanyDashboard from "../../components/companyDashboard/index.jsx";
import IndividualDashboard from "../../components/individualDashboard/index.jsx";
import {encryptAndStore} from "../../utils/localStorageManagement.js";
import styles from "./Dashboard.module.scss";
import AdminDashboard from "../../components/adminDashboard/index.jsx";

const Dashboard = () => {
	const userInfo = useSelector((state) => state.user.userInfo);
	const [clickCount, setClickCount] = useState(0);

	console.log("user info", userInfo);

	useEffect(() => {
		if (userInfo !== null) {
			encryptAndStore("user_role", userInfo.role);
		}
	}, [userInfo]);

	const handleClick = () => {
		setClickCount((prevCount) => prevCount + 1);
	};
	return (
		<div className={styles.dashboard_container} onClick={handleClick}>
			<div className={styles.dashboard}>
				{userInfo?.role === "Admin_User" && <AdminDashboard />}
				{userInfo?.role === "Individual_User" && <IndividualDashboard clickCount={clickCount} />}
				{userInfo?.role === "Company_User" && <CompanyDashboard clickCount={clickCount} />}
			</div>
		</div>
	);
};

export default Dashboard;
