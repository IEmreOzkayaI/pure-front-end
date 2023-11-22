import { Route, Routes } from "react-router-dom";
import App from "../App";
import Pricing from "../pages/pricing/Pricing";
import SignUp from "../pages/signUp/SignUp";
import Login from "../pages/login/Login";
import Confirm from "../pages/ConfirmPage/Confirm";
import Interview from "../pages/Interview/Interview";
import InterviewSignUp from "../pages/InterviewSignUp/InterviewSignUp";
import { useLocation } from "react-router-dom/dist";
import { AnimatePresence } from "framer-motion";

const defaultErrorElement = (
  <div style={{ fontSize: "4em", textAlign: "center" }}>
    Oops, there is an error!
  </div>
);

export default function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<App />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="signUp" element={<SignUp />} />
        <Route path="login" element={<Login />} />
        <Route path="confirm/:confirm_url_token" element={<Confirm />} />
        <Route path="interview" element={<Interview />}>
          <Route path="signUp" element={<InterviewSignUp />} />
          <Route path="playground" element={<Interview />} />
        </Route>
        <Route path="*" element={defaultErrorElement} />
      </Routes>
    </AnimatePresence>
  );
}
