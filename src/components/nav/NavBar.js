import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
    const navigate = useNavigate()

    return (
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/">HOME</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/browse/0/0/no_search/1" onClick={() => {
                    navigate("/browse/0/0/no_search/1")
                    window.location.reload(false)
                }}>BROWSE</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/profile">ME</Link>
            </li>
        </ul>
    )
}