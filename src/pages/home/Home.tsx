/** @format */

import React, { useState, useEffect } from "react";
import useLocalStorage from "use-local-storage";

import Feeds from "../../components/feeds/Feeds";
import NavBar from "../../components/nav-bar/NavBar";
import RightBar from "../../components/right-bar/RightBar";
import SideBar from "../../components/side-bar/SideBar";
import DarkTheme from "../../components/theme-components/DarkTheme";
import LightTheme from "../../components/theme-components/LightTheme";

export default function Home() {
	//const [isDark, setIsDark] = useLocalStorage<boolean>("isDark", false);
	//const [isDarkTheme, setDarkTheme] = useLocalStorage<any>("darkTheme", false);

	//const toggleTheme = () => {
	//	setDarkTheme((prevValue: boolean) => !prevValue);
	//};
	const [isDark, setIsDark] = useState<boolean>(true);

	const toggleTheme = () => {
		setIsDark((prevValue: boolean) => {
			console.log(isDark);
			//const storedTheme = JSON.stringify()
			localStorage.setItem("isDark", `${isDark}`);
			return !prevValue;
		});
	};

	//useEffect(() => {});

	return (
		<>
			{isDark && (
				<DarkTheme className="App">
					<>
						{/*<button
							style={{
								background: "red",
							}}
							onClick={toggleTheme}
						>
							Change
						</button>*/}
						<NavBar />
						<div className="flex w-full">
							<SideBar />
							<Feeds />
							<RightBar />
						</div>
					</>
				</DarkTheme>
			)}

			{!isDark && (
				<LightTheme className="App">
					<>
						<button
							style={{
								background: "red",
							}}
							onClick={toggleTheme}
						>
							Change
						</button>
						<NavBar />

						<div className="flex w-full">
							<SideBar />
							<Feeds />
							<RightBar />
						</div>
					</>
				</LightTheme>
			)}
		</>
	);
}
