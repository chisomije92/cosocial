/** @format */

import React from "react";
import classes from "./side-bar.module.css";
import RssFeedIcon from "@mui/icons-material/RssFeed";
import ChatIcon from "@mui/icons-material/Chat";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import GroupsIcon from "@mui/icons-material/Groups";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import HelpIcon from "@mui/icons-material/Help";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import EventIcon from "@mui/icons-material/Event";
import SchoolIcon from "@mui/icons-material/School";
import { Button } from "primereact/button";
import { Image } from "primereact/image";

export default function SideBar() {
	return (
		<div className={`${classes.sideBar} h-screen overflow-y-scroll`}>
			<div className="p-3 ">
				<ul className="list-none p-0 m-0">
					<li className="mb-4">
						<RssFeedIcon className="-mb-1" />
						<span className="ml-3">Feed</span>
					</li>
					<li className="mb-4">
						<ChatIcon className="-mb-1" />
						<span className="ml-1 sm:ml-3">Chats</span>
					</li>
					<li className="mb-4">
						<GroupsIcon className="-mb-1" />
						<span className="ml-1 sm:ml-3">Groups</span>
					</li>
					<li className="mb-4">
						<PlayCircleFilledIcon className="-mb-1" />
						<span className="ml-1 sm:ml-3">Video</span>
					</li>
					<li className="mb-4">
						<BookmarkIcon className="-mb-1" />
						<span className="ml-0 sm:ml-3">Bookmarks</span>
					</li>
					<li className="mb-4">
						<EventIcon className="-mb-1" />
						<span className="ml-0 sm:ml-3">Event</span>
					</li>
					<li className="mb-4">
						<WorkOutlineIcon className="-mb-1" />
						<span className="ml-1 sm:ml-3">Jobs</span>
					</li>
					<li className="mb-4">
						<SchoolIcon className="-mb-1" />
						<span className="ml-1 sm:ml-3">Courses</span>
					</li>
					<li className="mb-4">
						<HelpIcon className="-mb-1" />
						<span className="ml-1 sm:ml-3">Questions</span>
					</li>
				</ul>
				<Button className="surface-300 text-black-alpha-90 font-semibold border-0 border-round-sm px-6">
					Show More
				</Button>
				<hr className="my-2 mx-0" />
				<ul className={`list-none ${classes.friendList} `}>
					<li className="-ml-5 flex">
						<img
							src="/assets/person/2.jpeg"
							alt=""
							width="30"
							height="30"
							className="border-circle"
						/>
						<span className="inline-block ml-2 mt-1">Jane Doe</span>
					</li>
					<li className="-ml-5 flex">
						<img
							src="/assets/person/2.jpeg"
							alt=""
							width="30"
							height="30"
							className="border-circle"
						/>
						<span className="inline-block ml-2 mt-1">Jane Doe</span>
					</li>
					<li className="-ml-5 flex">
						<img
							src="/assets/person/2.jpeg"
							alt=""
							width="30"
							height="30"
							className="border-circle"
						/>
						<span className="inline-block ml-2 mt-1">Jane Doe</span>
					</li>
					<li className="-ml-5 flex">
						<img
							src="/assets/person/2.jpeg"
							alt=""
							width="30"
							height="30"
							className="border-circle"
						/>
						<span className="inline-block ml-2 mt-1">Jane Doe</span>
					</li>
					<li className="-ml-5 flex">
						<img
							src="/assets/person/2.jpeg"
							alt=""
							width="30"
							height="30"
							className="border-circle"
						/>
						<span className="inline-block ml-2 mt-1">Jane Doe</span>
					</li>
					<li className="-ml-5 flex">
						<img
							src="/assets/person/2.jpeg"
							alt=""
							width="30"
							height="30"
							className="border-circle"
						/>
						<span className="inline-block ml-2 mt-1">Jane Doe</span>
					</li>
					<li className="-ml-5 flex">
						<img
							src="/assets/person/2.jpeg"
							alt=""
							width="30"
							height="30"
							className="border-circle"
						/>
						<span className="inline-block ml-2 mt-1">Jane Doe</span>
					</li>
					<li className="-ml-5 flex">
						<img
							src="/assets/person/2.jpeg"
							alt=""
							width="30"
							height="30"
							className="border-circle"
						/>
						<span className="inline-block ml-2 mt-1">Jane Doe</span>
					</li>

					<li className="-ml-5 flex">
						<img
							src="/assets/person/2.jpeg"
							alt=""
							width="30"
							height="30"
							className="border-circle"
						/>
						<span className="inline-block ml-2 mt-1">Jane Doe</span>
					</li>
					<li className="-ml-5 flex">
						<img
							src="/assets/person/2.jpeg"
							alt=""
							width="30"
							height="30"
							className="border-circle"
						/>
						<span className="inline-block ml-2 mt-1">Jane Doe</span>
					</li>
					<li className="-ml-5 flex">
						<img
							src="/assets/person/2.jpeg"
							alt=""
							width="30"
							height="30"
							className="border-circle"
						/>
						<span className="inline-block ml-2 mt-1">Jane Doe</span>
					</li>
					<li className="-ml-5 flex">
						<img
							src="/assets/person/2.jpeg"
							alt=""
							width="30"
							height="30"
							className="border-circle"
						/>
						<span className="inline-block ml-2 mt-1">Jane Doe</span>
					</li>
					<li className="-ml-5 flex">
						<img
							src="/assets/person/2.jpeg"
							alt=""
							width="30"
							height="30"
							className="border-circle"
						/>
						<span className="inline-block ml-2 mt-1">Jane Doe</span>
					</li>
				</ul>
			</div>
		</div>
	);
}
