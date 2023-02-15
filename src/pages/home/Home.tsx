/** @format */

import { useLoaderData } from "react-router-dom";
import Feeds from "../../components/feeds/Feeds";

import RightBar from "../../components/right-bar/RightBar";

import SideBar from "../../components/side-bar/SideBar";
import { Posts } from "../../data/dummy-data";

export default function Home() {
	const loadedPosts: any = useLoaderData();
	return (
		<>
			<SideBar />
			<Feeds posts={loadedPosts} />
			<RightBar />
		</>
	);
}

export function loader() {
	const loadedPosts = Posts;
	return loadedPosts;
}
