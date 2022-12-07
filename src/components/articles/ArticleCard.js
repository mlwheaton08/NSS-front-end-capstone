import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import "./ArticleCard.css"

export const ArticleCard = ({ category, subCategory, article, fetchFavorites }) => {
    const localProjectUser = localStorage.getItem("capstone_user");
    const projectUserObject = JSON.parse(localProjectUser);

    const [isFavorite, setIsFavorite] = useState(true)

    const checkIsFavorite = async () => {
        const response = await fetch(`http://localhost:8088/favorites?userId=${projectUserObject.id}&articleId=${article.id}`)
        const responseJSON = await response.json()
        const responseLength = await responseJSON.length
        if (responseLength === 0) {
            setIsFavorite(false)
        } else {
            setIsFavorite(true)
        }
    }

    useEffect(
        () => {
            checkIsFavorite()
        },
        []
    )

    const addToFavorites = async () => {
        const articleToSendToAPI = {
            userId: projectUserObject.id,
            articleId: article.id,
            categoryId: category.id,
            subCategoryId: subCategory.id
        }

        const sendData = async () => {
            const options = {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(articleToSendToAPI)
            }
            await fetch ('http://localhost:8088/favorites', options)
        }
        await sendData()
        checkIsFavorite()
    }

    const removeFromFavorites = async () => {
        const findFavorite = async () => {
            const response = await fetch(`http://localhost:8088/favorites?userId=${projectUserObject.id}&articleId=${article.id}`)
            const responseJSON = await response.json()
            return responseJSON[0].id
        }
        const favoriteId = await findFavorite()

        const deleteFavorite = async () => {
            await fetch(`http://localhost:8088/favorites/${favoriteId}`, {
            method: "DELETE"
            })
        }
        await deleteFavorite()
        await checkIsFavorite()
        fetchFavorites()
    }

    
    return <>
            <div className="articleCard">
                <div className="articleHeader">
                    <span className="articleCategory">{category.name}
                        {
                            subCategory.name !== "No subcategory" ? " - " + subCategory.name : ""
                        }
                    </span>
                    {
                        isFavorite
                            ? <button id="btn btn_removeFavorite" onClick={() => removeFromFavorites()}>Remove Favorite</button>
                            : <button id="btn btn_favorite" onClick={() => addToFavorites()}>Favorite</button>
                    }
                </div>

                <Link to={`/article/${article.title}`}>
                    <h3 className="articleTitle">{article?.title}</h3>
                    <p className="articleTeaserText">{article?.teaserText}</p>
                </Link>
            </div>
    </>
}