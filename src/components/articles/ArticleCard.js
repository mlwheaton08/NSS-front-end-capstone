import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import "./ArticleCard.css"

export const ArticleCard = ({ category, subCategory, article, fetchFavorites, fetchReadLater }) => {
    const localProjectUser = localStorage.getItem("capstone_user");
    const projectUserObject = JSON.parse(localProjectUser);

    const navigate = useNavigate()

    const [isFavorite, setIsFavorite] = useState(true)
    const [isReadLater, setIsReadLater] = useState(true)

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

    const checkIsReadLater = async () => {
        const response = await fetch(`http://localhost:8088/readLater?userId=${projectUserObject.id}&articleId=${article.id}`)
        const responseJSON = await response.json()
        const responseLength = await responseJSON.length
        if (responseLength === 0) {
            setIsReadLater(false)
        } else {
            setIsReadLater(true)
        }
    }

    useEffect(
        () => {
            checkIsFavorite()
            checkIsReadLater()
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

    const addToReadLater = async () => {
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
            await fetch ('http://localhost:8088/readLater', options)
        }
        await sendData()
        checkIsReadLater()
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

    const removeFromReadLater = async () => {
        const findReadLater = async () => {
            const response = await fetch(`http://localhost:8088/readLater?userId=${projectUserObject.id}&articleId=${article.id}`)
            const responseJSON = await response.json()
            return responseJSON[0].id
        }
        const readLaterId = await findReadLater()

        const deleteReadLater = async () => {
            await fetch(`http://localhost:8088/readLater/${readLaterId}`, {
            method: "DELETE"
            })
        }
        await deleteReadLater()
        await checkIsReadLater()
        fetchReadLater()
    }

    
    return <>
            <div className="articleCard">
                <div className="articleHeader">
                    <span className="articleCategory">
                        <Link to={`/browse/${category.id}/0/no_search/1`} onClick={() => {
                            navigate(`/browse/${category.id}/0/no_search/1`)
                            window.location.reload(false)
                        }}>{category.name}</Link>
                        {
                            subCategory.name !== "No subcategory"
                                ? <span> - 
                                    <Link to={`/browse/${category.id}/${subCategory.id}/no_search/1`} onClick={() => {
                                        navigate(`/browse/${category.id}/${subCategory.id}/no_search/1`)
                                        window.location.reload(false)
                                    }}>{subCategory.name}</Link>
                                </span>
                                : ""
                        }
                    </span>
                    {
                        isFavorite
                            ? <button id="btn btn_removeFavorite" onClick={() => removeFromFavorites()}>Remove Favorite</button>
                            : <button id="btn btn_favorite" onClick={() => addToFavorites()}>Favorite</button>
                    }
                    {
                        isReadLater
                            ? <button id="btn btn_removeReadLater" onClick={() => removeFromReadLater()}>Remove from Read Later</button>
                            : <button id="btn btn_readLater" onClick={() => addToReadLater()}>Add to Read Later</button>
                    }
                </div>

                <Link to={`/article/${article.title}`}>
                    <h3 className="articleTitle">{article?.title}</h3>
                    <p className="articleTeaserText">{article?.teaserText}</p>
                </Link>
            </div>
    </>
}