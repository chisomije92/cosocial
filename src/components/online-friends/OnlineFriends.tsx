/** @format */

import { Chip } from "primereact/chip";
import React, { FC } from "react";

const OnlineFriends: FC<{
	name: string;
	imageSrc: string;
}> = ({ name, imageSrc }) => {
	return (
		<li className="-ml-5 flex relative mb-3">
			<Chip
				label={name}
				image={imageSrc}
				className="bg-primary-reverse font-bold"
			/>
			<i
				className="pi pi-circle-fill absolute text-green-300 border-2"
				style={{
					fontSize: "0.8rem",
					cursor: "pointer",
					position: "absolute",
					right: "376px",
					bottom: "25px",
					borderRadius: "60%",
					borderColor: "white",
				}}
			></i>
		</li>
	);
};

export default OnlineFriends;
