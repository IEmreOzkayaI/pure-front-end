import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Pricing from "./pages/pricing/Pricing.jsx";
import SignUp from "./pages/signUp/SignUp.jsx";
import Login from "./pages/login/Login.jsx";
import store from "./redux/store.js";
import {Provider} from "react-redux";
import Confirm from "./pages/ConfirmPage/Confirm.jsx";
import Interview from "./pages/Interview/Interview.jsx";
import InterviewSignUp from "./pages/InterviewSignUp/InterviewSignUp.jsx";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		errorElement: <div style={{fontSize: "4em", textAlign: "center"}}>Oops, there is an error!</div>,
	},
	{
		path: "pricing",
		element: <Pricing />,
		errorElement: <div style={{fontSize: "4em", textAlign: "center"}}>Oops, there is an error!</div>,
	},
	{
		path: "signUp",
		element: <SignUp />,
		errorElement: <div style={{fontSize: "4em", textAlign: "center"}}>Oops, there is an error!</div>,
	},
	{
		path: "login",
		element: <Login />,
		errorElement: <div style={{fontSize: "4em", textAlign: "center"}}>Oops, there is an error!</div>,
	},
	{
		path: "confirm/:confirm_url_token",
		element: <Confirm />,
		errorElement: <div style={{fontSize: "4em", textAlign: "center"}}>Oops, there is an error!</div>,
	},
	{
		path: "interview",
		errorElement: <div style={{fontSize: "4em", textAlign: "center"}}>Oops, there is an error!</div>,
		children: [
			{
				path: "signUp",
				element: <InterviewSignUp />,
				errorElement: <div style={{fontSize: "4em", textAlign: "center"}}>Oops, there is an error!</div>,
			},
			{
				path: "playground",
				element: <Interview />,
				errorElement: <div style={{fontSize: "4em", textAlign: "center"}}>Oops, there is an error!</div>,
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<Provider store={store}>
		<RouterProvider router={router} />
	</Provider>
);
