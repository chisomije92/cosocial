/** @format */

import React, { useEffect, useState } from "react";
//import "primereact/resources/themes/lara-light-indigo/theme.css";
//import "primereact/resources/themes/bootstrap4-dark-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "./App.css";
import useLocalStorage from "use-local-storage";

import NavBar from "./components/nav-bar/NavBar";
//import LightTheme from "./components/theme-components/LightTheme";
//import DarkTheme from "./components/theme-components/DarkTheme";
//import { InputText } from "primereact/inputtext";
import Home from "./pages/home/Home";

function App() {
	const [loading, setLoading] = useState<boolean>(true);
	const [theme, setTheme] = useLocalStorage<any>(
		"theme",
		"bootstrap4-dark-blue.css"
		//"lara-light-indigo.css"
	);

	useEffect(() => {
		const timer = setTimeout(() => {
			setLoading(false);
		}, 300);

		let themeLink: HTMLLinkElement = document.getElementById(
			"app-theme"
		) as HTMLLinkElement;
		themeLink.href = theme;
		return () => {
			clearTimeout(timer);
		};
	}, [theme]);

	const changeTheme = () => {
		let themeLink: HTMLLinkElement = document.getElementById(
			"app-theme"
		) as HTMLLinkElement;
		themeLink.href = theme;
		if (theme === "bootstrap4-dark-blue.css") {
			themeLink.href = "lara-light-indigo.css";
			setTheme("lara-light-indigo.css");
		} else {
			themeLink.href = "bootstrap4-dark-blue.css";
			setTheme("bootstrap4-dark-blue.css");
		}
	};
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
			{loading && <div />}
			{!loading && (
				<>
					<NavBar />
					<button
						style={{
							background: "red",
						}}
						onClick={() => {
							changeTheme();
						}}
					>
						Change
					</button>
				</>
			)}
			{/*<Home />*/}
		</>
	);
}

export default App;
