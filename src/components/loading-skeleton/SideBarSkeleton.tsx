/** @format */

import { Skeleton } from "primereact/skeleton";
import React from "react";
import classes from "../side-bar/side-bar.module.css";

const SideBarSkeleton = () => {
	const sampleArr = [1, 2, 3, 4, 5, 6, 7];
	const userArr = [1, 2, 3];
	return (
		<div className={`${classes.sideBar} h-screen `}>
			<div className="p-3 ">
				<ul className="list-none p-0 m-0">
					{sampleArr.map(v => (
						<li className="mb-4 flex gap-3" key={v}>
							<Skeleton size="1.7rem" shape="circle"></Skeleton>
							<Skeleton width="5rem" height="1.7rem"></Skeleton>
						</li>
					))}
				</ul>
				<hr className="my-2 mx-0" />
				<ul className={`list-none ${classes.friendList} `}>
					{userArr.map(v => (
						<li className="-ml-5 flex gap-1" key={v}>
							<Skeleton size="2rem" shape="circle"></Skeleton>
							<Skeleton width="5rem" height="2rem"></Skeleton>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default SideBarSkeleton;
