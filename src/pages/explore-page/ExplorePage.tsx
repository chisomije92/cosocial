/** @format */

import React from "react";
import { useLoaderData } from "react-router-dom";
import Feeds from "../../components/feeds/Feeds";
import RightBar from "../../components/right-bar/RightBar";
import SideBar from "../../components/side-bar/SideBar";
import { Posts } from "../../data/dummy-data";

const ExplorePage = () => {
	function shuffleArray(array: any) {
		for (var i = array.length - 1; i > 0; i--) {
			var j = Math.floor(Math.random() * (i + 1));
			var temp = array[i];
			array[i] = array[j];
			array[j] = temp;
		}
		return array;
	}
	const loadedPosts: any = useLoaderData();
	const shuffledPosts = shuffleArray(loadedPosts);
	return (
		<>
			<SideBar />
			<Feeds posts={shuffledPosts} />
			<RightBar />
		</>
	);
};

export function loader() {
	const loadedPosts = Posts;

	return loadedPosts;
}
export default ExplorePage;
