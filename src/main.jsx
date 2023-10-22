import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Pricing from "./components/pages/pricing/Pricing.jsx";
import Signup from "./components/pages/signup/Signup.jsx";
import Login from "./components/pages/login/Login.jsx";

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
    element: <Signup user="user" />,
  },
  {
    path: "login",
    element: <Login user="company" />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
