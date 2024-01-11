import {Link} from "react-router-dom";
import Button from "../../components/shared/Button/Button";
import styles from "./Dashboard.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {clearUserInfo, userFetch} from "../../redux/toolkit/userSlice.js";
import Cookies from "js-cookie";
import {deleteItem, encryptAndStore} from "../../utils/localStorageManagement.js";
import {clearLogInInfo} from "../../redux/toolkit/logInSlice.js";

const Dashboard = () => {

    const dispatch = useDispatch();
    const userInfo = useSelector(state => state.user.userInfo);
    const logOutInfo = useSelector(state => state.logOutSlice?.logOutInfo);
    const [user, setUser] = useState({});
    const [clickCount, setClickCount] = useState(0);

    useEffect(() => {
        if (userInfo !== null) {
            setUser(userInfo)
            console.log("page refreshed this is user ", userInfo)
            encryptAndStore('user_role', userInfo.role)
        }
    }, [userInfo]);

    useEffect(() => {
        if (logOutInfo !== null) {
            setUser({})
        }
    }, [logOutInfo]);

    const handleClick = () => {
        setClickCount(prevCount => prevCount + 1);
    }
    return (
        <div className={styles.dashboard_container} onClick={handleClick}>
            {userInfo.role === "Admin_User" && <div>Admin</div>}
            {userInfo.role === "Individual_User" &&
                <div className={styles.dashboard}>
                    {clickCount < 5 &&
                        <div>
                            Hello Welcome To Individual User Dashboard , We are now developing this page. <br/>
                            But If you want to demo interview screen you can click the "interview" field above. <br/>
                        </div>
                    }

                    {clickCount >= 5 && JSON.stringify(user, null, 2)}
                </div>
            }
            {userInfo.role === "Company_User" &&
                <div className={styles.dashboard}>
                    {clickCount < 5 &&
                        <div>
                            Hello Welcome To Company Dashboard , We are now developing this page. <br/>
                            But If you want to demo interview screen you can click the "interview" field above. <br/>
                        </div>
                    }

                    {clickCount >= 5 && JSON.stringify(user, null, 2)}
                </div>
            }


        </div>
    );
};

export default Dashboard;
