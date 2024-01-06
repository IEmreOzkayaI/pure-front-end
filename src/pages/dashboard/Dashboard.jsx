import {Link} from "react-router-dom";
import Button from "../../components/shared/Button/Button";
import styles from "./Dashboard.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {userFetch} from "../../redux/toolkit/userSlice.js";

const Dashboard = () => {

    const dispatch = useDispatch();
    const userInfo = useSelector(state => state.user.userInfo);
    const logOutInfo = useSelector(state => state.logOut?.logOutInfo);
    const [user, setUser] = useState({});
    const [clickCount, setClickCount] = useState(0);

    useEffect(() => {
        userInfo !== null && setUser(userInfo);
    }, [userInfo]);

    useEffect(() => {
        logOutInfo !== null && setUser({});
    }, [logOutInfo]);

    const handleClick = () => {
        setClickCount(prevCount => prevCount + 1);
    }
    return (
        <div className={styles.dashboard_container} onClick={handleClick}>
            <div className={styles.dashboard}>
                {clickCount < 5 &&
                    <div>
                        Hello , We are now developing this page. <br/>
                        But If you want to demo interview screen you can click the "interview" field above. <br/>
                    </div>
                }

                {clickCount >= 5 && JSON.stringify(user, null, 2)}
            </div>

        </div>
    );
};

export default Dashboard;
