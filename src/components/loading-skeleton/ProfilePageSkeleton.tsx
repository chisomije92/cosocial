/** @format */

import React from "react";
import ProfileSkeleton from "./ProfileSkeleton";
import RightBarSkeleton from "./RightBarSkeleton";
import SearchFriendSkeleton from "./SearchFriendSkeleton";
import SideBarSkeleton from "./SideBarSkeleton";

const ProfilePageSkeleton = () => {
	return (
		<>
			<SideBarSkeleton />
			<ProfileSkeleton />
			<SearchFriendSkeleton />
		</>
	);
};

export default ProfilePageSkeleton;
