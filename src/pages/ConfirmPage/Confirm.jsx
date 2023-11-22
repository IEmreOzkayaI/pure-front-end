import { useEffect, useRef, useState } from "react";
import { confirmFetch, reConfirmFetch } from "../../redux/toolkit/confirmSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";

export default function Confirm() {
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const [searchParams] = useSearchParams();
  const user = searchParams.get("user");
  const confirmInfo = useSelector((state) => state.confirm.confirmInfo);
  const confirmError = useSelector((state) => state.confirm.confirmError);

  const { confirm_url_token } = useParams();
  const [digits, setDigits] = useState(["", "", "", "", "", ""]);
  const inputRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];

  const getInitialTime = () => {
    const storedTime = localStorage.getItem("timerStartTime");
    return storedTime ? parseInt(storedTime, 10) : null;
  };

  const setInitialTime = () => {
    const currentTime = Math.floor(Date.now() / 1000);
    localStorage.setItem("timerStartTime", currentTime);
    return currentTime;
  };

  const initialTime = getInitialTime() || setInitialTime();

  const [timer, setTimer] = useState(
    300 - (Math.floor(Date.now() / 1000) - initialTime)
  );

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prevTimer) => {
        const newTimer = prevTimer - 1;
        if (newTimer === 0) {
          alert("Time is up!");
          // Handle any additional actions after the timer reaches 0
          return 0;
        }
        return newTimer; // Ensure the timer doesn't go below 0
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, []);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}`;
  };

  const handleChange = (e, index) => {
    const value = e.target.value;

    if (/^\d*$/.test(value) && value.length <= 1) {
      const newDigits = [...digits];
      newDigits[index] = value;
      setDigits(newDigits);

      if (value === "" || value.length === 0) {
        if (index > 0) {
          inputRefs[index - 1].current.focus();
        }
      } else {
        if (index < 5) {
          inputRefs[index + 1].current.focus();
        }
      }
    }
  };

  const handleVerify = () => {
    const digitsCombined = digits.join("");
    const confirm = {
      confirm_credential: digitsCombined,
      confirm_token: confirm_url_token,
      user: user === "Company_User" ? "company" : "user",
    };
    dispatch(confirmFetch({ confirm, navigateTo }));
  };

  useEffect(() => {
    console.log("confirmInfo", confirmInfo);
  }, [confirmInfo]);

  useEffect(() => {
    const display = document.querySelector("#timer");
    display.textContent = formatTime(timer);
  }, [timer]);

  const resetTimer = () => {
    const currentTime = Math.floor(Date.now() / 1000);
    localStorage.setItem("timerStartTime", currentTime);
    setTimer(300);
  };

  const handleTekrarAl = () => {
    const digitsCombined = digits.join("");
    const confirm = {
      confirm_credential: digitsCombined,
      confirm_token: confirm_url_token,
      user: user === "Company_User" ? "company" : "user",
    };
    dispatch(reConfirmFetch({ confirm }));
    resetTimer();
  };

  return (
    <motion.div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div
        id="timer"
        style={{ marginBottom: "2rem", fontSize: "5rem", fontWeight: "bold" }}
      >
        {formatTime(timer)}
      </div>
      <div>
        {confirmError?.message === "User Verification Error" && (
          <div style={{ color: "red", fontSize: "48px" }}>
            Kod yanlis tekrar girin
          </div>
        )}
      </div>
      <div
        style={{
          width: "10%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {digits.map((digit, index) => (
          <input
            key={index}
            type="text"
            value={digit}
            onChange={(e) => handleChange(e, index)}
            ref={inputRefs[index]}
            style={{
              width: "50px",
              height: "80px",
              marginBottom: "5px",
              textAlign: "center",
              borderRadius: "5px",
              fontSize: "20px",
            }}
          />
        ))}
      </div>
      <button
        onClick={handleVerify}
        style={{
          background: "black",
          color: "#fff",
          borderRadius: "5px",
          width: "150px",
          height: "50px",
          fontSize: "20px",
          marginTop: "20px",
        }}
      >
        Doğrula
      </button>
      <button
        onClick={handleTekrarAl}
        style={{
          textDecoration: "underline",
          color: "black",
          width: "150px",
          height: "50px",
          fontSize: "20px",
          marginTop: "20px",
          border: "none",
        }}
      >
        Tekrar Al
      </button>
    </motion.div>
  );
}
