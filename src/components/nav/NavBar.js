import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./NavBar.css";
import { SubNavBar } from "./SubNavBar";

export const NavBar = () => {
	const location = useLocation()
	const [showSubNav, setShowSubNav] = useState(false)

  	const navigate = useNavigate();

	const isLocationHome = () => {
		if (location.pathname === "/") {
			return " selected"
		} else {
			return ""
		}
	}

	const locationStartsWith = (loc, path) => {
		if (loc.pathname.startsWith(path)) {
			return " selected"
		} else {
			return ""
		}
	}

	const subnavToggleClass = () => {
		if (showSubNav) {
			return " selected"
		} else {
			return ""
		}
	}

	const subNavPathButSubNavHidden = () => {
		const subNavPaths = ["/favorites", "/read_later", "/preferences"]
		let foundPath = ""
		for (const path of subNavPaths) {
			if (location.pathname.startsWith(path)) {
				foundPath = path
				break
			}
		}
		if (foundPath && !showSubNav) {
			switch (foundPath) {
				case "/favorites":
					return " subnav-path-subnav-hidden favorites"
				case "/read_later":
					return " subnav-path-subnav-hidden read-later"
				case "/preferences":
					return " subnav-path-subnav-hidden preferences"
				default:
					return foundPath
			}
		} else {
			return ""
		}
	}

	useEffect(
		() => {
			console.log(location.pathname)
		},
		[location]
	)


  	return <>
		<section className={`navbar${subNavPathButSubNavHidden()}`}>
			<svg className={`icon nav-home${isLocationHome()}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" onClick={() => {
				navigate("/")
			}}>
				<path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z" />
			</svg>
			<svg className={`icon nav-browse${locationStartsWith(location, "/browse")}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" onClick={() => {
				navigate("/browse/0/0/no_search/1")
			}}>
				<path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352c79.5 0 144-64.5 144-144s-64.5-144-144-144S64 128.5 64 208s64.5 144 144 144z"/>
			</svg>
			<svg className={`icon nav-more${subnavToggleClass()}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" onClick={() => {
				setShowSubNav(!showSubNav)
			}}>
				<path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"/>
			</svg>
		</section>

		{
			showSubNav
				? <SubNavBar
					location={location}
					locationStartsWith={locationStartsWith}
				/>
				: ""
		}
  	</>;
};
