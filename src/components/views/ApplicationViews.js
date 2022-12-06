import { Outlet, Route, Routes } from "react-router-dom";
import { Article } from "../articles/Article";
import { Browse } from "../browse/Browse";
import { Favorites } from "../favorites/Favorites";
import { Home } from "../home/Home";

export const ApplicationViews = () => {

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
            <Route path="favorites" element={ <Favorites/> } />
            <Route path="article/:articleTitle" element={ <Article/> } />
				
            </Route>
        </Routes>
    )
};