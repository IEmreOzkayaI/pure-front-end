import {useState} from "react";
import pureLogo from "/pure-logo.svg";
import "./App.css";
import {Card} from "@mui/material";

function App() {
	return (
		<>
			<div>
				<a href='#' target='_blank'>
					<img src={pureLogo} className='logo react' alt='React logo' />
				</a>
			</div>
			<h1>Will Be Here Soon ! </h1>
			<p className='read-the-docs'>© PURE 2023 | All Rights Reserved</p>
		</>
	);
}

export default App;
