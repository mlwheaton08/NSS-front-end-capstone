import { useEffect, useState } from "react"
import { ArticleCard } from "../articles/ArticleCard";
import "./Favorites.css"

export const Favorites = () => {
    const localProjectUser = localStorage.getItem("capstone_user");
    const projectUserObject = JSON.parse(localProjectUser);

    const [favoriteArticles, setFavoriteArticles] = useState([])

    const fetchFavorites = async () => {
        const response = await fetch(`http://localhost:8088/favorites?userId=${projectUserObject.id}&_expand=article&_expand=category&_expand=subCategory`)
        const responseJSON = await response.json()
        setFavoriteArticles(responseJSON)
    }

    useEffect(
        () => {
            fetchFavorites()
        },
        []
    )

    return <main>
        <h2>Favorites</h2>

        {
            favoriteArticles.map(favorite => {
                return <ArticleCard
                    key={`favorite--${favorite.id}`}
                    location={"browse"}
                    category={favorite.category}
                    subCategory={favorite.subCategory}
                    article={favorite.article}
                    fetchFavorites={fetchFavorites}
                />
            })
        }
    </main>
}