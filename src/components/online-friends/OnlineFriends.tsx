/** @format */

import { Chip } from "primereact/chip";
import React, { FC } from "react";

interface OnlineFriendsProp {
	name: string;
	imageSrc: string;
	onClick: () => void;
}
const OnlineFriends: FC<OnlineFriendsProp> = ({ name, imageSrc, onClick }) => {
	return (
		<li className="-ml-5 flex mb-3 cursor-pointer" onClick={onClick}>
			<Chip
				label={name}
				image={imageSrc}
				className="bg-primary-reverse font-bold"
			/>
			<div
				style={{
					position: "absolute",
					transform: "translate(20px, 20px)",
				}}
			>
				<i
					className="pi pi-circle-fill  text-green-300 border-2"
					style={{
						fontSize: "0.8rem",
						cursor: "pointer",
						borderRadius: "60%",
						borderColor: "white",
					}}
				></i>
			</div>
		</li>
	);
};

export default OnlineFriends;
