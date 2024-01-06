import AnimatedRoutes from "./components/AnimatedRoutes.jsx";
import "./global.scss";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {userFetch} from "./redux/toolkit/userSlice.js";

const App = () => {
	const dispatch = useDispatch();
	const logInInfo = useSelector(state => state.logIn.logInInfo);

	useEffect(() => {
		if (logInInfo !== null) {
			dispatch(userFetch());
		}
	}, [logInInfo]);

	return <AnimatedRoutes />;
};

export default App;
