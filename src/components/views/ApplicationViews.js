import { Outlet, Route, Routes } from "react-router-dom";
import { Home } from "../home/Home";

export const ApplicationViews = () => {
    // const localProjectUser = localStorage.getItem("capstone_user");
    // const projectUserObject = JSON.parse(localProjectUser);

    return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1>Aimless</h1>
                    <div>Learn about random shit.</div>
					<Home />

                    <Outlet />
                </>
            }>

				
            </Route>
        </Routes>
    )
};