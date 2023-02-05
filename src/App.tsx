/** @format */

import React from "react";
//import "primereact/resources/themes/lara-light-indigo/theme.css";
//import "primereact/resources/themes/bootstrap4-dark-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "./App.css";

import NavBar from "./components/nav-bar/NavBar";
import LightTheme from "./components/theme-components/LightTheme";
import DarkTheme from "./components/theme-components/DarkTheme";
import { InputText } from "primereact/inputtext";
import Home from "./pages/home/Home";

function App() {
	return (
		//<div className={`App`}>
		//	<NavBar />
		//</div>
		//<LightTheme className="App">
		//	<>
		//		<NavBar />
		//		{/*<InputText className="input" />*/}
		//	</>
		//</LightTheme>
		//<DarkTheme className="App">
		//	<NavBar />
		//</DarkTheme>
		<>
			<Home />
		</>
	);
}

export default App;
