import { useEffect, useRef, useState } from "react";
import { confirmFetch } from "../../redux/toolkit/confirmSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Confirm() {
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
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
  console.log("COOKIE", document.cookie);

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
    console.log(digitsCombined);
    const confirm = {
      confirm_credential: digitsCombined,
      confirm_token: confirm_url_token,
    };
    dispatch(confirmFetch({ confirm, navigateTo }));
  };

  useEffect(() => {
    console.log("confirmInfo", confirmInfo);
  }, [confirmInfo]);

  function startTimer(duration, display) {
    let timer = duration;
    let minutes, seconds;

    const countdown = setInterval(function () {
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      display.textContent = minutes + ":" + seconds;

      if (--timer < 0) {
        clearInterval(countdown);
        alert("Süre doldu!");
      }
    }, 1000);
  }

  window.onload = function () {
    const fiveMinutes = 5 * 60; // 5 dakika saniye cinsinden
    const display = document.querySelector("#timer");
    startTimer(fiveMinutes, display);
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
        00:00
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
        onClick={handleVerify}
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
