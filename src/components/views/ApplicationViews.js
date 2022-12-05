import { Outlet, Route, Routes } from "react-router-dom";
import { Article } from "../articles/Article";
import { Browse } from "../browse/Browse";
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

                    <Outlet />
                </>
            }>
            
            <Route path="/" element={ <Home/> } />
            <Route path="browse/:pageNumber" element={ <Browse/> } />
            <Route path="article/:articleTitle" element={ <Article/> } />
				
            </Route>
        </Routes>
    )
};