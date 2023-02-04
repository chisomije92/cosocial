/** @format */

import React from "react";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import logo from "./logo.svg";
import "./App.css";
import NavBar from "./components/nav-bar/NavBar";

function App() {
	return (
		<div className="App">
			<NavBar />
		</div>
	);
}

export default App;
