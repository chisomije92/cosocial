/** @format */

import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { FileUpload } from "primereact/fileupload";
import React, { useState } from "react";
import { Button } from "primereact/button";

const EditProfile = () => {
	const [email, setEmail] = useState<string>("");
	const [username, setUsername] = useState<string>("");
	const [image, setImage] = useState<string>("");
	const [desc, setDesc] = useState<string>("");
	const allValuesEmpty = () => {
		return email === "" && username === "" && image === "" && desc === "";
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const values = {
			username,
			image,
			desc,
			email,
		};
		console.log(values);
	};

	return (
		<Card className="w-11 m-auto">
			<form className="flex flex-column gap-2" onSubmit={handleSubmit}>
				<FileUpload
					mode="basic"
					url="/api/upload"
					accept="image/*"
					maxFileSize={1000000}
					className="w-7"
					onSelect={e => {
						setImage(e.files[0].name);
					}}
					chooseLabel="Update Picture"
				/>
				<InputText
					placeholder="Edit email"
					type="email"
					value={email}
					onChange={e => setEmail(e.target.value)}
				/>
				<InputText
					placeholder="Edit username"
					type="texts"
					value={username}
					onChange={e => setUsername(e.target.value)}
				/>
				<InputTextarea
					placeholder="Edit description"
					value={desc}
					onChange={e => setDesc(e.target.value)}
					autoResize
				/>
				<Button label="Update" type="submit" disabled={allValuesEmpty()} />
			</form>
		</Card>
	);
};

export default EditProfile;
