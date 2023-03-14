/** @format */

import React from "react";
import { useLoaderData } from "react-router-dom";
import Feeds from "../../components/feeds/Feeds";
import RightBar from "../../components/right-bar/RightBar";
import SideBar from "../../components/side-bar/SideBar";
import { Posts } from "../../data/dummy-data";
import { shuffleArray } from "../../utils/util";

const ExplorePage = () => {
	const loadedPosts: any = useLoaderData();
	const shuffledPosts = shuffleArray(loadedPosts);
	return (
		<>
			<SideBar />
			<Feeds posts={shuffledPosts} user={{}} />
			<RightBar />
		</>
	);
};

export function loader() {
	const loadedPosts = Posts;

	return loadedPosts;
}
export default ExplorePage;
