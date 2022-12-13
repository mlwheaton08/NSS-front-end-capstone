import { Link, useNavigate } from "react-router-dom"
import "./ProfileNav.css"

export const ProfileNav = () => {
    const navigate = useNavigate()

    return <>

        <ul className="profilenav">
            <li className="profilenav__item active">
                <Link className="profilenav__link" to="/profile">Profile</Link>
            </li>
            <li className="profilenav__item active">
                <Link className="profilenav__link" to="/favorites">Favorites</Link>
            </li>
            <li className="profilenav__item active">
                <Link className="profilenav__link" to="/read_later">Read Later</Link>
            </li>
            <li className="profilenav__item active">
                <Link className="profilenav__link" to="/preferences">Preferences</Link>
            </li>
            {
                localStorage.getItem("capstone_user")
                ? <li className="profilenav__item profilenav__logout">
                    <Link className="profilenav__link" to="" onClick={() => {
                        localStorage.removeItem("capstone_user")
                        navigate("/", {replace: true})
                    }}>Logout</Link>
                </li>
                : ""
            }
        </ul>
    </>
}