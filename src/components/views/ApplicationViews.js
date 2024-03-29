import { Outlet, Route, Routes } from "react-router-dom";
import { Article } from "../articles/Article";
import { Favorites } from "../favorites/Favorites";
import { Home } from "../home/Home";
import { Preferences } from "../preferences/Preferences";
import { Profile } from "../profile/Profile";
import { ReadLater } from "../read-later/ReadLater";
import "./ApplicationViews.css"
import { Browse } from "../browse/Browse";

export const ApplicationViews = () => {

    return (
        <Routes>
            <Route path="/" element={
                <>
                    {/* <div className="hero">
                        <h1 id="title">Aimless - mobile</h1>
                    </div> */}

                    <Outlet />
                </>
            }>
            <Route path="/" element={ <Home /> } />
            <Route path="browse/:categoryId/:subCategoryId/:search/:pageNumber" element={ <Browse /> } />
            <Route path="article/:articleTitle" element={ <Article /> } />
            <Route path="profile" element={ <Profile /> } />
            <Route path="favorites" element={ <Favorites /> } />
            <Route path="read_later" element={ <ReadLater /> } />
            <Route path="preferences" element={ <Preferences /> } />
				
            </Route>
        </Routes>
    )
};