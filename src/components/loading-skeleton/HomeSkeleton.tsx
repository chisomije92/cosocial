/** @format */

import React from "react";
import FeedsSkeleton from "./FeedsSkeleton";
import RightBarSkeleton from "./RightBarSkeleton";
import SideBarSkeleton from "./SideBarSkeleton";

const HomeSkeleton = () => {
	return (
		<>
			<SideBarSkeleton />
			<FeedsSkeleton />
			<RightBarSkeleton />
		</>
	);
};

export default HomeSkeleton;
