/** @format */

import React, { FC } from "react";
import { Chip } from "primereact/chip";

const Mutuals: FC<{
	name: string;
	imageSrc: string;
	onClick: () => void;
}> = ({ name, imageSrc, onClick }) => {
	return (
		<li className="-ml-5 flex">
			<Chip
				label={name}
				image={imageSrc}
				className="bg-primary-reverse"
				onClick={onClick}
			/>
		</li>
	);
};

export default Mutuals;
