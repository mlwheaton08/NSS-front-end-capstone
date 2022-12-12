import { Outlet, Route, Routes } from "react-router-dom";
import { Article } from "../articles/Article";
import { ArticleContainer } from "../browse/ArticleContainer";
import { Favorites } from "../favorites/Favorites";
import { Home } from "../home/Home";
import "./ApplicationViews.css"

export const ApplicationViews = () => {

    return (
        <Routes>
            <Route path="/" element={
                <>
                    <div className="hero">
                        <h1 id="title">Aimless</h1>
                        <h3 id="subtitle">Learn about random shit.</h3>
                    </div>

                    <Outlet />
                </>
            }>
            
            <Route path="/" element={ <Home /> } />
            <Route path="browse/:pageNumber" element={ <ArticleContainer /> } />
            <Route path="favorites" element={ <Favorites /> } />
            <Route path="article/:articleTitle" element={ <Article /> } />
				
            </Route>
        </Routes>
    )
};