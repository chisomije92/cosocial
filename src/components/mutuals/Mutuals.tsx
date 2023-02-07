/** @format */

import React, { FC } from "react";
import { Chip } from "primereact/chip";

const Mutuals: FC<{
	name: string;
	imageSrc: string;
}> = ({ name, imageSrc }) => {
	return (
		<li className="-ml-5 flex">
			<Chip label={name} image={imageSrc} className="bg-primary-reverse" />
		</li>
	);
};

export default Mutuals;
