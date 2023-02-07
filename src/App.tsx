/** @format */

import { useLayoutEffect, useState } from "react";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "./App.css";

import Home from "./pages/home/Home";

function App() {
	const [loading, setLoading] = useState<boolean>(true);

	useLayoutEffect(() => {
		const timer = setTimeout(() => {
			setLoading(false);
		}, 200);
		return () => {
			clearTimeout(timer);
		};
	}, []);

	return (
		<>
			{loading && <div />}
			{!loading && (
				<>
					<Home />
				</>
			)}
		</>
	);
}

export default App;
