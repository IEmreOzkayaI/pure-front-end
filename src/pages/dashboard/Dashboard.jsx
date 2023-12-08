import {Link} from "react-router-dom";
import Button from "../../components/shared/Button/Button";
import styles from "./Dashboard.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {userFetch} from "../../redux/toolkit/userSlice.js";

const Dashboard = () => {

    const dispatch = useDispatch();
    const userInfo = useSelector(state => state.user.userInfo);
    const [user, setUser] = useState({});

    useEffect(() => {
        dispatch(userFetch());
    }, []);

    useEffect(() => {
        userInfo !== null && setUser(userInfo);
    }, [userInfo]);


    return (
        <div className={styles.dashboard_container}>
            Dashboard
            <Link to='/'>
                <Button className={["dark"]} style={{marginTop: "2rem"}}>Turn Back</Button>
            </Link>
            {JSON.stringify(user)}
        </div>
    );
};

export default Dashboard;
