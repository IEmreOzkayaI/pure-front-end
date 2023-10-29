import React, {useEffect, useRef, useState} from "react";
import {confirmFetch} from "../../../redux/toolkit/confirmSlice";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";

export default function Confirm() {
	const dispatch = useDispatch();
	const authInfo = useSelector((state) => state.auth.authInfo);
	const confirmInfo = useSelector((state) => state.confirm.confirmInfo);
	const {confirm_url_token} = useParams();
	const [digits, setDigits] = useState(["", "", "", "", "", ""]);
	const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)];
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
		const confirm = {confirm_credential: digitsCombined, confirm_token: confirm_url_token};
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
        justifyContent: "center",
				alignItems: "center",
				height: "100vh",
			}}>
			<div style={{width:"10%" , display:"flex" ,justifyContent:"space-between"}}>
				{digits.map((digit, index) => (
					<input
						key={index}
						type='text'
						value={digit}
						onChange={(e) => handleChange(e, index)}
						ref={inputRefs[index]}
						style={{
							width: "50px",
							height: "80px",
							marginBottom: "5px",
							textAlign: "center",
              borderRadius:"5px",
              fontSize:"20px"
						}}
					/>
				))}
			</div>
			<button onClick={handleVerify} style={{background:"black" , color:"#fff" , borderRadius:"5px" , width:"150px",height:"50px" , fontSize:"20px" , marginTop:"20px"}}>Doğrula</button>
		</div>
	);
}
