/** @format */

import React from "react";
//import "primereact/resources/themes/lara-light-indigo/theme.css";
//import "primereact/resources/themes/bootstrap4-dark-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "./App.css";

import NavBar from "./components/nav-bar/NavBar";
import LightTheme from "./theme-components/LightTheme";
import DarkTheme from "./theme-components/DarkTheme";
import { InputText } from "primereact/inputtext";

function App() {
	return (
		//<div className={`App`}>
		//	<NavBar />
		//</div>
		<LightTheme className="App">
			<>
				<NavBar />
				{/*<InputText className="input" />*/}
			</>
		</LightTheme>
		//<DarkTheme className="App">
		//	<NavBar />
		//</DarkTheme>
	);
}

export default App;
