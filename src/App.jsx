import AnimatedRoutes from "./components/AnimatedRoutes.jsx";
import "./global.scss";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {clearUserInfo, userFetch} from "./redux/toolkit/userSlice.js";
import Cookies from 'js-cookie';
import {decryptAndRetrieve, deleteItem} from "./utils/localStorageManagement.js";
import {clearLogInInfo} from "./redux/toolkit/logInSlice.js";

const App = () => {
	const dispatch = useDispatch();
	const logInInfo = useSelector(state => state.logIn.logInInfo);
	const logOutInfo = useSelector(state => state.logOutSlice?.logOutInfo);
	const cookieValue = Cookies.get('refresh_token_2')

	useEffect(() => {
		if (logInInfo !== null || decryptAndRetrieve('user_role')) {
			dispatch(userFetch());
		}
	}, [logInInfo]);

	useEffect(() => {
		if (logOutInfo !== null) {
			deleteItem('user_role');
			dispatch(clearLogInInfo());
			dispatch(clearUserInfo());
		}
	}, [logOutInfo]);

	return <AnimatedRoutes />;

};

export default App;
