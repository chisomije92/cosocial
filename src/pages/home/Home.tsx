/** @format */

import AuthForm from "../../components/Auth/AuthForm";
import LoginForm from "../../components/Auth/LoginForm";
import Bookmarks from "../../components/bookmarks/Bookmarks";
import ChatBox from "../../components/chatbox/ChatBox";
import Error from "../../components/error/Error";
import Feeds from "../../components/feeds/Feeds";
import Likes from "../../components/likes/Likes";
import Messages from "../../components/messages/Messages";
import NavBar from "../../components/nav-bar/NavBar";
import Notifications from "../../components/notifications/Notifications";
import Profile from "../../components/profile/Profile";
import RightBar from "../../components/right-bar/RightBar";
import SearchFriend from "../../components/search-friend/SearchFriend";
import SideBar from "../../components/side-bar/SideBar";
//import { useSearchParams } from "react-router-dom";

export default function Home() {
	//const [search, setSearch] = useSearchParams();
	//console.log(search.get("sort"));
	return (
		<>
			{/*<NavBar />
			<div className="flex w-full">*/}
			<SideBar />
			{/*<SearchFriend />*/}
			<Feeds />
			{/*<Bookmarks />*/}
			{/*<Profile />*/}
			{/*<Messages />*/}
			{/*<Notifications />*/}
			{/*<Likes />*/}
			<RightBar />
			{/*<Followers />*/}
			{/*<ChatBox />*/}
			{/*<AuthForm />*/}
			{/*<LoginForm />*/}
			{/*<Error />*/}
			{/*</div>*/}
		</>
	);
}
