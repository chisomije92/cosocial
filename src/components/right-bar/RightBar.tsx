/** @format */

import { Avatar } from "primereact/avatar";
import { Chip } from "primereact/chip";
import { Image } from "primereact/image";
import { Users } from "../../data/dummy-data";
import OnlineFriends from "../online-friends/OnlineFriends";
import classes from "./right-bar.module.css";

export default function RightBar() {
	return (
		<div
			className={`${classes.rightBar} flex flex-column card shadow-1 border-round-sm mt-3 mr-2 `}
		>
			<div className="flex my-3">
				<Avatar className="mr-3 ml-3 bg-primary-reverse" size="large">
					<Image src="/assets/gift.png" />
				</Avatar>
				<span className="text-600 mr-3">
					<b className="text-800">Jerry</b> and{" "}
					<b className="text-800">four other cosocials</b> celebrate their
					birthday today
				</span>
			</div>

			<img
				src="/assets/ad.png"
				className="ml-3 mr-3 border-round-lg"
				width="400"
				alt=""
			/>
			<div className="ml-3">
				<h3>Cosocials Online:</h3>
				<ul>
					{Users.map(user => (
						<OnlineFriends
							key={user.id}
							name={user.username}
							imageSrc={user.profilePicture}
						/>
					))}
				</ul>
			</div>
		</div>
	);
}
