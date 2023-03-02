/** @format */

import React from "react";
import classes from "./side-bar.module.css";

import ChatIcon from "@mui/icons-material/Chat";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import GroupsIcon from "@mui/icons-material/Groups";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import HelpIcon from "@mui/icons-material/Help";

import PersonIcon from "@mui/icons-material/Person";
import ExploreIcon from "@mui/icons-material/Explore";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import Mutuals from "../mutuals/Mutuals";
import { Users } from "../../data/dummy-data";
import { NavLink, useNavigate } from "react-router-dom";

export default function SideBar() {
	const navigate = useNavigate();
	const navLinkCssClasses = ({ isActive }: { isActive: boolean }): string => {
		return `text-color no-underline text-lg ${isActive ? "opacity-70" : ""}`;
	};
	return (
		<div className={`${classes.sideBar} h-screen `}>
			<div className="p-3 ">
				<ul className="list-none p-0 m-0">
					<li className="mb-4 flex">
						<NavLink to="/explore" className={navLinkCssClasses}>
							<ExploreIcon className="-mb-1" />
							<span className="ml-3">Explore</span>
						</NavLink>
					</li>
					<li className="mb-4 flex">
						<NavLink to="/messages" className={navLinkCssClasses}>
							<ChatIcon className="-mb-1" />
							<span className="ml-3">Chats</span>
						</NavLink>
					</li>
					<li className="mb-4 flex">
						<NavLink to="/profile" className={navLinkCssClasses}>
							<PersonIcon className="-mb-1" />
							<span className="ml-3">Profile</span>
						</NavLink>
					</li>
					<li className="mb-4 flex">
						<NavLink to="/bookmarks" className={navLinkCssClasses}>
							<BookmarkIcon className="-mb-1" />
							<span className="ml-3">Bookmarks</span>
						</NavLink>
					</li>
					<li className="mb-4 flex">
						<NavLink to="/notifications" className={navLinkCssClasses}>
							<NotificationsNoneIcon className="-mb-1" />
							<span className="ml-3">Notifications</span>
						</NavLink>
					</li>
					<li className="mb-4 flex">
						<GroupsIcon className="-mb-1" />
						<span className="ml-3">Groups</span>
					</li>

					<li className="mb-4 flex">
						<PlayCircleFilledIcon className="-mb-1" />
						<span className="ml-3">Video</span>
					</li>
					<li className="mb-4 flex">
						<HelpIcon className="-mb-1" />
						<span className="ml-3 sm:ml-3 hidden md:block">Questions</span>
					</li>
				</ul>
				<hr className="my-2 mx-0" />
				<ul className={`list-none ${classes.friendList} `}>
					{Users.slice(2, 8).map(user => (
						<Mutuals
							key={user.id}
							name={user.username}
							imageSrc={user.profilePicture}
							onClick={() => {
								navigate(`/profile/${user.id}`);
							}}
						/>
					))}
				</ul>
			</div>
		</div>
	);
}
