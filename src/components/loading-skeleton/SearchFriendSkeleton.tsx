/** @format */

import { Skeleton } from "primereact/skeleton";
import React from "react";
import classes from "../search-friend/search-friend.module.css";

const SearchFriendSkeleton = () => {
	return (
		<div className={`${classes.container} mx-2 mt-2 flex flex-column gap-1`}>
			<div className="flex flex-column align-items-center mt-4 gap-1">
				<Skeleton width="40%" height="1rem" className=""></Skeleton>
				<Skeleton width="60%" height="0.1rem"></Skeleton>
			</div>

			<div className="">
				<ul className="list-none flex flex-column gap-1">
					<li className="flex gap-1 mr-1">
						<Skeleton size="1.8rem" shape="circle"></Skeleton>
						<Skeleton width="50%" height="2rem"></Skeleton>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default SearchFriendSkeleton;
