/** @format */

import React from "react";
import Feeds from "../../components/feeds/Feeds";
import NavBar from "../../components/nav-bar/NavBar";
import RightBar from "../../components/right-bar/RightBar";
import SideBar from "../../components/side-bar/SideBar";
import DarkTheme from "../../components/theme-components/DarkTheme";
import LightTheme from "../../components/theme-components/LightTheme";

export default function Home() {
	return (
		<LightTheme className="App">
			<>
				<NavBar />
				<div className="flex w-full">
					<SideBar />
					<Feeds />
					<RightBar />
				</div>
			</>
		</LightTheme>
		//<DarkTheme className="App">
		//	<NavBar />
		//</DarkTheme>
	);
}
