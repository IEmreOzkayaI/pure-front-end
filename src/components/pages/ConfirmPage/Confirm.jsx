import React, { useEffect, useRef, useState } from "react";
import { confirmFetch } from "../../../redux/toolkit/confirmSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Confirm() {
  const dispatch = useDispatch();
  const authInfo = useSelector((state) => state.auth.authInfo);
  const confirmInfo = useSelector((state) => state.confirm.confirmInfo);
  console.log(document.cookie);
  const [digits, setDigits] = useState(["", "", "", "", "", ""]);
  const inputRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];

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
    const confirm = { body: digits, confirm_token: authInfo.confirm_token };
    dispatch(confirmFetch(confirm));
  };

  useEffect(() => {
    console.log("confirmInfo", confirmInfo);
  }, [confirmInfo]);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100vh",
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
            width: "30px",
            height: "30px",
            marginBottom: "5px",
            textAlign: "center",
          }}
        />
      ))}
      <button onClick={handleVerify}>Doğrula</button>
    </div>
  );
}
