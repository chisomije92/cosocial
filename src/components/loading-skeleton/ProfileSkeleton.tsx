/** @format */

import { Card } from "primereact/card";
import { Image } from "primereact/image";
import { Skeleton } from "primereact/skeleton";
import React from "react";
import classes from "../profile/profile.module.css";
import PostSkeleton from "./PostSkeleton";

const ProfileSkeleton = () => {
	const sampleArr = [1, 2, 3];
	return (
		<div className={`${classes.profile} mx-3 mt-2`}>
			<Card className="flex flex-column  justify-content-center align-items-center card mt-2 surface-50">
				<div className={`${classes.imgContainer}`}>
					<Image
						src="/assets/person/transparent-avatar.png"
						alt=""
						height="260"
						width="100%"
						preview
					/>
				</div>
				<div className="flex flex-column align-items-center mx-3">
					<Skeleton width="3rem" className="my-1"></Skeleton>
					<Skeleton width="5rem" className="my-1"></Skeleton>
					<Skeleton width="10rem" className="my-1"></Skeleton>
				</div>
				<div className="flex gap-3 justify-content-around my-1 ">
					<span className="flex gap-2 cursor-pointer">
						<Skeleton width="2.5rem"></Skeleton>
						<Skeleton width="1rem"></Skeleton>
					</span>
					<span className="flex gap-2 cursor-pointer">
						<Skeleton width="3.5rem"></Skeleton>
						<Skeleton width="1rem"></Skeleton>
					</span>
					<span className="flex gap-2 cursor-pointer">
						<Skeleton width="3.5rem"></Skeleton>
						<Skeleton width="1rem"></Skeleton>
					</span>
				</div>
				<div className="flex flex-column align-items-center gap-2">
					<div className="flex gap-1">
						<Skeleton width="1.3rem"></Skeleton>
						<Skeleton width="2.5rem"></Skeleton>
					</div>
					<Skeleton width="5.7rem" height="2.5rem"></Skeleton>
				</div>
			</Card>
			<div>
				{sampleArr.map(v => (
					<PostSkeleton key={v} />
				))}
			</div>
		</div>
	);
};

export default ProfileSkeleton;
