import { useEffect, useState } from "react"
import { ArticleCard } from "../articles/ArticleCard";

export const Favorites = () => {
    const localProjectUser = localStorage.getItem("capstone_user");
    const projectUserObject = JSON.parse(localProjectUser);

    const [favoriteArticles, setFavoriteArticles] = useState([])

    useEffect(
        () => {
            const fetchFavorites = async () => {
                const response = await fetch(`http://localhost:8088/favorites?userId=${projectUserObject.id}&_expand=article&_expand=category&_expand=subCategory`)
                const responseJSON = await response.json()
                setFavoriteArticles(responseJSON)
            }
            fetchFavorites()
        },
        []
    )

    return <>
        <h1>Favorites Page</h1>

        {
            favoriteArticles.map(favorite => {
                return <ArticleCard
                    key={`favorite--${favorite.id}`}
                    category={favorite.category}
                    subCategory={favorite.subCategory}
                    article={favorite.article}
                />
            })
        }
    </>
}