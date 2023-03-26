/** @format */

import React from "react";
import classes from "../feeds/feeds.module.css";
import PostSkeleton from "./PostSkeleton";
import Share from "../share/Share";

const FeedsSkeleton = () => {
	const sampleArr = [1, 2, 3];
	return (
		<>
			<div className={`${classes.feeds}`}>
				<div className="p-4 flex flex-column">
					<Share currentUser={{}} />
					{sampleArr.map(v => (
						<PostSkeleton key={v} />
					))}
				</div>
			</div>
		</>
	);
};

export default FeedsSkeleton;
