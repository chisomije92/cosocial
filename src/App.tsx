/** @format */
import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from "react-router-dom";
import { useLayoutEffect, useState } from "react";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "./App.css";

import Home, { loader as homePostsLoader } from "./pages/home/Home";
import RootLayout from "./pages/root-layout/RootLayout";
import ProfilePage from "./pages/profile-page/ProfilePage";
import NotificationsPage from "./pages/notifications-page/NotificationsPage";
import MessagesPage from "./pages/messages-page/MessagesPage";
import ErrorPage from "./pages/error-page/ErrorPage";
import BookmarkPage from "./pages/bookmarks-page/BookmarkPage";
import LoginPage from "./pages/login-page.tsx/LoginPage";
import SignUpPage from "./pages/sign-up-page/SignUpPage";
import SinglePostPage, {
	loader as singlePostLoader,
} from "./pages/single-post-page/SinglePostPage";
import ExplorePage, {
	loader as explorePostsLoader,
} from "./pages/explore-page/ExplorePage";
import ChatPage from "./pages/messages-page/chat-page/ChatPage";

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

	const router = createBrowserRouter(
		createRoutesFromElements(
			<Route path="/" errorElement={<ErrorPage />} element={<RootLayout />}>
				<Route index element={<Home />} loader={homePostsLoader} />
				<Route path="/profile" element={<ProfilePage />} />
				<Route path="/notifications" element={<NotificationsPage />} />
				<Route path="/messages" element={<MessagesPage />} />

				<Route path="/messages/:id" element={<ChatPage />} />
				<Route path="/bookmarks" element={<BookmarkPage />} />
				<Route path="/sign-up" element={<SignUpPage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route
					path="/post/:id"
					element={<SinglePostPage />}
					loader={singlePostLoader}
				/>
				<Route
					path="/explore"
					element={<ExplorePage />}
					loader={explorePostsLoader}
				/>
			</Route>
		)
	);

	return (
		<>
			<RouterProvider router={router} />
		</>
	);
}

export default App;
