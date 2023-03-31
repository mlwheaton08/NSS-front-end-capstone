import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import "./ArticleCard.css"

export const ArticleCard = ({ location, category, subCategory, article, fetchFavorites, fetchReadLater }) => {
    const localProjectUser = localStorage.getItem("capstone_user");
    const projectUserObject = JSON.parse(localProjectUser);

    const navigate = useNavigate()

    const [isFavorite, setIsFavorite] = useState(false)
    const [isReadLater, setIsReadLater] = useState(false)

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

    const classStyle = (x) => {
        if (x) {
            return "true"
        } else {
            return "false"
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

    const subcatDisplay = (subcatName) => {
        if (subcatName) {
            if (subcatName.includes(" - General")) {
                return "General"
            } else if (subcatName.includes("Music - ")) {
                return subcatName.replace("Music - ", "")
            } else if (subcatName.includes("Musical Works - ")) {
                return subcatName.replace("Musical Works - ", "")
            } else {
                return subcatName
            }
        }
    }

    
    return <>
        <div className={`article-card ${location}`}>
            <div className={`header ${location}`}>
                <span className="category-container">
                    <Link className="category" to={`/browse/${category.id}/0/no_search/1`} onClick={() => {
                        navigate(`/browse/${category.id}/0/no_search/1`)
                        window.location.reload(false)
                        }}>{category.name}
                    </Link>
                    {
                        subCategory.name !== "No subcategory"
                            ? <Link className="subcategory" to={`/browse/${category.id}/${subCategory.id}/no_search/1`} onClick={() => {
                                    navigate(`/browse/${category.id}/${subCategory.id}/no_search/1`)
                                    window.location.reload(false)
                                }}>{subcatDisplay(subCategory.name)}
                            </Link>
                            : ""
                    }
                </span>

                <svg className={`icon favorite ${classStyle(isFavorite)}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" onClick={() => {
                        if (!isFavorite) {
                            addToFavorites()
                        } else {
                            removeFromFavorites()
                        }
                    }}>
                    <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/>
                </svg>

                <svg className={`icon read-later ${classStyle(isReadLater)}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" onClick={() => {
                        if (!isReadLater) {
                            addToReadLater()
                        } else {
                            removeFromReadLater()
                        }
                    }}>
                    <path d="M256 0a256 256 0 1 1 0 512A256 256 0 1 1 256 0zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"/>
                </svg>
            </div>

            {/* <Link className="article-face" to={`/article/${article.title}`}> */}
            <section className="title-container" onClick={() => navigate(`/article/${article.title}`)}>
                <h3 className={`title ${location}`}>{article?.title}</h3>
                <p className="teaser-text">{article?.teaserText}</p>
            </section>
            {/* </Link> */}
        </div>
    </>
}