/** @format */

import ChatBox from "../../components/chatbox/ChatBox";
import Feeds from "../../components/feeds/Feeds";
import Followers from "../../components/followers/Followers";
import Messages from "../../components/messages/Messages";
import NavBar from "../../components/nav-bar/NavBar";
import Notifications from "../../components/notifications/Notifications";
import Profile from "../../components/profile/Profile";
import RightBar from "../../components/right-bar/RightBar";
import SearchFriend from "../../components/search-friend/SearchFriend";
import SideBar from "../../components/side-bar/SideBar";

export default function Home() {
	return (
		<>
			<NavBar />
			<div className="flex w-full">
				{/*<SideBar />*/}
				<SearchFriend />
				{/*<Feeds />*/}
				{/*<Profile />*/}
				<Messages />
				{/*<Notifications />
				<RightBar />*/}
				{/*<Followers />*/}
				<ChatBox />
			</div>
		</>
	);
}
