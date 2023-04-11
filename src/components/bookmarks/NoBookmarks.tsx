/** @format */

import React, { FC } from "react";
import classes from "./bookmarks.module.css";
import Post from "../post/Post";

const NoBookmarks: FC<{
	posts?: any;
}> = ({ posts }) => {
	return (
		<div className={`${classes.noBookmarks} mx-3`}>
			{/*{posts.map((p: any) => (
				<Post post={p} key={1} />
			))}*/}
			<Post
				post={{
					//_id: 1,
					image: "/assets/bookmarks.jpg",
					description:
						"Share and connect with loved ones. Share your thoughts, opinions and memories. Be seen and heard",
					createdAt: "2023-01-15T15:09:17.354+00:00",
					likes: new Array(1000),
					comments: [],
					linkedUser: {
						profilePicture: "/assets/cosocial-logo.png",
						email: "Cosocial@cosocial.com",
						username: "Cosocial",
					},
				}}
			/>
		</div>
	);
};

export default NoBookmarks;
