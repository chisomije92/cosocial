/** @format */

import Feeds from "../../components/feeds/Feeds";
import Followers from "../../components/followers/Followers";
import NavBar from "../../components/nav-bar/NavBar";
import Profile from "../../components/profile/Profile";
import RightBar from "../../components/right-bar/RightBar";
import SideBar from "../../components/side-bar/SideBar";

export default function Home() {
	return (
		<>
			<NavBar />
			<div className="flex w-full">
				<SideBar />
				{/*<Feeds />*/}
				<Profile />
				{/*<RightBar />*/}
				<Followers />
			</div>
		</>
	);
}
