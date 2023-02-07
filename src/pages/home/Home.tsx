/** @format */

import Feeds from "../../components/feeds/Feeds";
import NavBar from "../../components/nav-bar/NavBar";
import RightBar from "../../components/right-bar/RightBar";
import SideBar from "../../components/side-bar/SideBar";

export default function Home() {
	return (
		<>
			<NavBar />
			<div className="flex w-full">
				<SideBar />
				<Feeds />
				<RightBar />
			</div>
		</>
	);
}
