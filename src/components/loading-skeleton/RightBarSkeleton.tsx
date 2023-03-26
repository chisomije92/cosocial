/** @format */

import { Skeleton } from "primereact/skeleton";
import React from "react";
import classes from "../right-bar/right-bar.module.css";

const RightBarSkeleton = () => {
	return (
		<div
			className={`${classes.rightBar} flex flex-column card shadow-1 border-round-sm mt-3 mr-0 md:mr-2 `}
		>
			<div className="flex my-3 text-sm gap-2">
				<Skeleton width="3rem" height="3rem" className="ml-2"></Skeleton>
				<Skeleton width="13rem" height="1.5rem"></Skeleton>
			</div>
			<div className="ml-2">
				<Skeleton width="85%" height="300px"></Skeleton>
			</div>
			<div className="ml-3 text-sm">
				<h3>Cosocials Online:</h3>
				<ul className="list-none flex flex-column gap-1">
					<li className="-ml-5 flex gap-1 mr-1">
						<Skeleton size="2rem" shape="circle"></Skeleton>
						<Skeleton width="5rem" height="2rem"></Skeleton>
					</li>
					<li className="-ml-5 flex gap-1 mr-1">
						<Skeleton size="2rem" shape="circle"></Skeleton>
						<Skeleton width="5rem" height="2rem"></Skeleton>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default RightBarSkeleton;
