/** @format */

import React from "react";
import Bookmarks from "../../components/bookmarks/Bookmarks";
import RightBar from "../../components/right-bar/RightBar";
import SideBar from "../../components/side-bar/SideBar";

const BookmarkPage = () => {
	return (
		<>
			<SideBar />
			<Bookmarks />
			<RightBar />
		</>
	);
};

export default BookmarkPage;
