/** @format */

import { Suspense } from "react";
import { Await, defer, useLoaderData } from "react-router-dom";
import Feeds from "../../components/feeds/Feeds";

import RightBar from "../../components/right-bar/RightBar";

import SideBar from "../../components/side-bar/SideBar";
import { Posts } from "../../data/dummy-data";

export default function Home() {
	//const { loadedPosts }: any = useLoaderData();
	const loadedPosts = useLoaderData();
	//console.log(loadedPosts);
	return (
		<>
			{/*<Suspense fallback={<p>Loading</p>}>
				<Await
					resolve={loadedPosts}
					children={data => (
						<>
							<SideBar />
							<Feeds posts={data} />
							<RightBar />
						</>
					)}
				/>
			</Suspense>*/}

			<SideBar />
			<Feeds posts={loadedPosts} />
			<RightBar />
		</>
	);
}

function loadPosts() {
	return new Promise(resolve =>
		setTimeout(() => {
			const loadedPosts = Posts;
			resolve(loadedPosts);
		}, 1000)
	);
}

export function loader() {
	const loadedPosts = Posts;
	return loadedPosts;

	//return defer({ loadedPosts: loadPosts() });
}
