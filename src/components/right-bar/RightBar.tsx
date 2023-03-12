/** @format */

import { Avatar } from "primereact/avatar";
import { Image } from "primereact/image";
import { useNavigate } from "react-router-dom";
import { Users } from "../../data/dummy-data";
import OnlineFriends from "../online-friends/OnlineFriends";
import { shuffleArray } from "../../utils/util";

import classes from "./right-bar.module.css";
import { adsArray } from "../../utils/ad-images-util";

const RightBar = () => {
	const navigate = useNavigate();

	const showAd = (data: string[]) => {
		const arr = shuffleArray(data);
		return arr[0];
	};

	return (
		<div
			className={`${classes.rightBar} flex flex-column card shadow-1 border-round-sm mt-3 mr-0 md:mr-2 `}
		>
			<div className="flex my-3 text-sm">
				<Avatar className="mr-3 ml-3 bg-primary-reverse" size="large">
					<Image src="/assets/gift.png" />
				</Avatar>
				<span className="text-600 mr-3">
					<b className="text-800">Jerry</b> and{" "}
					<b className="text-800">four other cosocials</b> celebrate their
					birthday today
				</span>
			</div>
			<div>
				<img
					src={showAd(adsArray)}
					className="ml-3 border-round-lg"
					width="85%"
					height="300px"
					alt=""
				/>
			</div>
			<div className="ml-3 text-sm">
				<h3>Cosocials Online:</h3>
				<ul>
					{Users.map(user => (
						<OnlineFriends
							key={user.id}
							name={user.username}
							imageSrc={user.profilePicture}
							onClick={() => {
								navigate(`/profile/${user.id}`);
							}}
						/>
					))}
				</ul>
			</div>
		</div>
	);
};

export default RightBar;
