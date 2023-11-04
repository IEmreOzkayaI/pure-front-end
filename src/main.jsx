import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Pricing from "./components/pages/pricing/Pricing.jsx";
import Signup from "./components/pages/signup/Signup.jsx";
import Login from "./components/pages/login/Login.jsx";
import store from "./redux/store.js";
import { Provider } from "react-redux";
import Confirm from "./components/pages/ConfirmPage/Confirm.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: (
      <div style={{ fontSize: "4em", textAlign: "center" }}>
        Oops, there is an error!
      </div>
    ),
  },
  {
    path: "pricing",
    element: <Pricing />,
  },
  {
    path: "signup",
    element: <Signup />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "confirm/:confirm_url_token",
    element: <Confirm />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
