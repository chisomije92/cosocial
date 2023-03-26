/** @format */

import React from "react";
import classes from "../post/post.module.css";
import { Skeleton } from "primereact/skeleton";

const PostSkeleton = () => {
	return (
		<>
			<div
				className={`card mt-3 ${classes.container} shadow-1 border-round-sm w-12 mx-auto flex flex-column`}
			>
				<div>
					<div className="flex justify-content-between gap-2 ml-3 mt-2 -mb-2">
						<div className="flex gap-2">
							<div className="flex gap-1 text-color">
								<Skeleton shape="circle" size="3rem"></Skeleton>
								<Skeleton width="3rem" height="1rem"></Skeleton>
								<Skeleton width="4rem" height="1rem"></Skeleton>
							</div>
						</div>
					</div>
				</div>
				<div className="ml-3 mt-3 text-700">
					<Skeleton width="8rem"></Skeleton>
				</div>

				<div className="flex justify-content-between gap-2 mb-3">
					<div className="flex mt-3 md:flex-row mx-3">
						<div className="mr-1">
							<Skeleton size="1.5rem" shape="circle"></Skeleton>
						</div>
						<div className="mr-1">
							<Skeleton size="1.5rem" shape="circle"></Skeleton>
						</div>
						<div className="mr-1">
							<Skeleton width="4rem"></Skeleton>
						</div>
					</div>

					<div className="flex justify-content-even opacity-60 mr-2 mt-3">
						<Skeleton width="4rem"></Skeleton>
					</div>
				</div>
			</div>
		</>
	);
};

export default PostSkeleton;
