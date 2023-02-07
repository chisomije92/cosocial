/** @format */

import { Avatar } from "primereact/avatar";
import { Chip } from "primereact/chip";
import { Image } from "primereact/image";
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
					<li className="-ml-5 flex relative mb-3">
						<Chip
							label="Amy Elsner"
							image="/assets/person/2.jpeg"
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
					<li className="-ml-5 mb-3 flex relative">
						<Chip
							label="Amy Elsner"
							image="/assets/person/2.jpeg"
							className="bg-primary-reverse font-bold"
						/>
						<i
							className="pi pi-circle-fill absolute text-green-300 border-2"
							style={{
								fontSize: "0.8rem",
								cursor: "pointer",
								position: "absolute",
								right: "23.4rem",
								bottom: "1.5rem",
								borderRadius: "60%",
								borderColor: "white",
							}}
						></i>
					</li>
					<li className="-ml-5 mb-3 flex relative">
						<Chip
							label="Amy Elsner"
							image="/assets/person/2.jpeg"
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
				</ul>
			</div>
		</div>
	);
}
