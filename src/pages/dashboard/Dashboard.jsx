import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CompanyDashboard from "../../components/companyDashboard/index.jsx";
import IndividualDashboard from "../../components/individualDashboard/index.jsx";
import { encryptAndStore } from "../../utils/localStorageManagement.js";
import styles from "./Dashboard.module.scss";

const Dashboard = () => {
  const userInfo = useSelector((state) => state.user.userInfo);
  const logOutInfo = useSelector((state) => state.logOutSlice?.logOutInfo);
  const [clickCount, setClickCount] = useState(0);

  useEffect(() => {
    if (userInfo !== null) {
      encryptAndStore("user_role", userInfo.role);
    }
  }, [userInfo]);

  useEffect(() => {
    if (logOutInfo !== null) {
      setUser({});
    }
  }, [logOutInfo]);

  const handleClick = () => {
    setClickCount((prevCount) => prevCount + 1);
  };
  return (
    <div className={styles.dashboard_container} onClick={handleClick}>
      <div className={styles.dashboard}>
        {userInfo.role === "Admin_User" && <div>Admin</div>}
        {userInfo.role === "Individual_User" && (
          <IndividualDashboard clickCount={clickCount} />
        )}
        {userInfo.role === "Company_User" && (
          <CompanyDashboard clickCount={clickCount} />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
