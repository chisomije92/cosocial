/** @format */

import { useEffect, useRef } from "react";
import useLocalStorage from "use-local-storage";
import { DarkModeSwitch } from "react-toggle-dark-mode";

import { Menubar } from "primereact/menubar";
import classes from "./NavBar.module.css";
import { Avatar } from "primereact/avatar";
import cosocialImg from "../../images/CO-1.png";
import { OverlayPanel } from "primereact/overlaypanel";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/auth/useAuth";
import { urlImgString } from "../../utils/constants/constants";

const NavBar = () => {
	const { authUser, logout, userId, currentUser } = useAuth();
	const [theme, setTheme] = useLocalStorage<any>(
		"theme",
		"lara-light-indigo.css"
	);

	const logOut = () => {
		logout();
	};

	const op = useRef<any>(null);

	const navLinkCssClasses = ({ isActive }: { isActive: boolean }): string => {
		return `text-white no-underline m-3 text-xl ${
			isActive ? "opacity-90" : ""
		}`;
	};

	const iconLinksCssClasses = ({ isActive }: { isActive: boolean }): string => {
		return `text-white ${isActive ? "opacity-90" : ""}`;
	};

	useEffect(() => {
		let themeLink: HTMLLinkElement = document.getElementById(
			"app-theme"
		) as HTMLLinkElement;
		themeLink.href = theme;
	}, [theme]);

	const isThemeDark = theme === "bootstrap4-dark-blue.css";

	const changeThemeOnClick = () => {
		let themeLink: HTMLLinkElement = document.getElementById(
			"app-theme"
		) as HTMLLinkElement;
		themeLink.href = theme;
		if (isThemeDark) {
			themeLink.href = "lara-light-indigo.css";
			setTheme("lara-light-indigo.css");
		} else {
			themeLink.href = "bootstrap4-dark-blue.css";
			setTheme("bootstrap4-dark-blue.css");
		}
	};

	const items = [
		{
			template: (
				<>
					<NavLink to="" className={navLinkCssClasses}>
						Home
					</NavLink>
				</>
			),
		},
		{
			template: (
				<>
					<NavLink to="explore" className={navLinkCssClasses}>
						Explore
					</NavLink>
				</>
			),
		},
		{
			template: (
				<>
					<div className={`mx-3 text-xl ${classes.templateDiv}`}>Pro</div>
				</>
			),
		},
	];

	const notAuthenticatedItems = [
		{
			template: <div className="hidden"></div>,
		},
	];

	const start = (
		<div className={`mr-8 ml-2 ${classes.logoContainer} flex`}>
			<div className="flex justify-content-between">
				<div>
					<img alt="logo" src={cosocialImg} height="40"></img>
				</div>
				<div className={`-mt-2 ${classes.brandName}`}>
					<h3>COSOCIAL</h3>
				</div>
			</div>
		</div>
	);

	const end = (
		<div className="flex justify-content-start align-content-center">
			<DarkModeSwitch
				className="mr-4"
				checked={isThemeDark}
				onChange={changeThemeOnClick}
				size={30}
				sunColor={"rgb(254, 254, 11)"}
			/>
			<div className={`${classes.endDiv} flex justify-content-between mt-2 `}>
				<NavLink to="notifications" className={iconLinksCssClasses}>
					<i
						className="pi pi-bell  p-overlay-badge mx-2"
						style={{ fontSize: "1.3rem", cursor: "pointer" }}
					>
						{currentUser ? (
							currentUser.notifications?.some((n: any) => !n.read) && (
								<i
									className={`pi pi-circle-fill ${
										!isThemeDark ? "text-red-500" : "text-green-500"
									} absolute -ml-2 -mt-1`}
									style={{ fontSize: "0.5rem", cursor: "pointer" }}
								></i>
							)
						) : (
							<></>
						)}
					</i>
				</NavLink>

				<NavLink to="messages" className={iconLinksCssClasses}>
					<i
						className="pi pi-envelope p-overlay-badge mx-2"
						style={{ fontSize: "1.3rem", cursor: "pointer" }}
					>
						<i
							className={`pi pi-circle-fill ${
								!isThemeDark ? "text-red-500" : "text-green-500"
							} absolute -ml-1 -mt-1`}
							style={{ fontSize: "0.5rem", cursor: "pointer" }}
						></i>
					</i>
				</NavLink>

				<span></span>
				<div
					className={`${classes.avatarImgContainer} flex flex-column ml-4 -mt-3 cursor-pointer`}
					onClick={e => op.current.toggle(e)}
				>
					<Avatar
						image={
							currentUser ? `${urlImgString}${currentUser.profilePicture}` : ""
						}
						shape="circle"
						className="mx-auto"
					/>
					<div className="text-sm">
						{currentUser ? currentUser.username : ""}
					</div>
				</div>

				<OverlayPanel ref={op} className="mt-1 mr-2">
					<Link
						to={`profile`}
						className={`flex text-blue-400 ${classes.actions} font-medium cursor-pointer no-underline`}
						onClick={() => op.current.hide()}
					>
						<span className="text-sm">Profile</span>{" "}
						<i className="pi pi-user ml-2 text-sm"></i>
					</Link>

					<hr className="h-1 min-w-full $ -ml-3 -mr-3" />
					<div
						className={`flex text-red-500 ${classes.actions} font-medium cursor-pointer`}
						onClick={() => {
							logOut();
							op.current.hide();
						}}
					>
						<span className="-mt-1">Logout</span>
						<code>&nbsp;</code>
						<i className="pi pi-power-off "></i>
					</div>
				</OverlayPanel>
			</div>
		</div>
	);

	return (
		<nav className={`${classes.container}`}>
			<Menubar
				className={`${!authUser && classes.menuBar} ${
					!isThemeDark ? "bg-blue-900" : ""
				} text-white h-5rem min-w-min`}
				start={start}
				model={userId ? items : notAuthenticatedItems}
				end={
					userId ? (
						end
					) : (
						<div className="flex justify-content-center gap-2 text-xl font-bold">
							<span>Explore</span>
							<span>and</span>
							<span>Connect</span>
						</div>
					)
				}
			/>
		</nav>
	);
};

export default NavBar;
