import { Link } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {

    return (
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/">HOME</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/browse/1">BROWSE</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/profile">ME</Link>
            </li>
        </ul>
    )
}