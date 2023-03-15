/** @format */

import React from "react";
import Post from "../post/Post";

const NoPosts = () => {
	return (
		<Post
			post={{
				image: "/assets/connection.jpg",
				description:
					"Share and connect with loved ones. Share your thoughts, opinions and memories. Be seen and heard",
				createdAt: "2023-01-15T15:09:17.354+00:00",
				likes: new Array(1000),

				linkedUser: {
					profilePicture: "/assets/cosocial-logo.png",
					email: "Cosocial@cosocial.com",
					username: "Cosocial",
				},
			}}
		/>
	);
};

export default NoPosts;
