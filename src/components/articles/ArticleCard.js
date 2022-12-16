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

    
    return <div className="article-card">
            <div className="article-card-header">
                <span className="article-card-category-container">
                    <Link className="article-card-category" to={`/browse/${category.id}/0/no_search/1`} onClick={() => {
                        navigate(`/browse/${category.id}/0/no_search/1`)
                        window.location.reload(false)
                    }}>{category.name}</Link>
                    {
                        subCategory.name !== "No subcategory"
                            ? <Link className="article-card-subcategory" to={`/browse/${category.id}/${subCategory.id}/no_search/1`} onClick={() => {
                                    navigate(`/browse/${category.id}/${subCategory.id}/no_search/1`)
                                    window.location.reload(false)
                                }}>{subCategory.name}
                            </Link>
                            : ""
                    }
                </span>
                {
                    isFavorite
                        ? <svg className="article-card-icon article-card-unfavorite" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" onClick={() => removeFromFavorites()}>
                            <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/>
                        </svg>
                        : <svg className="article-card-icon article-card-favorite" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" onClick={() => addToFavorites()}>
                            <path d="M287.9 0C297.1 0 305.5 5.25 309.5 13.52L378.1 154.8L531.4 177.5C540.4 178.8 547.8 185.1 550.7 193.7C553.5 202.4 551.2 211.9 544.8 218.2L433.6 328.4L459.9 483.9C461.4 492.9 457.7 502.1 450.2 507.4C442.8 512.7 432.1 513.4 424.9 509.1L287.9 435.9L150.1 509.1C142.9 513.4 133.1 512.7 125.6 507.4C118.2 502.1 114.5 492.9 115.1 483.9L142.2 328.4L31.11 218.2C24.65 211.9 22.36 202.4 25.2 193.7C28.03 185.1 35.5 178.8 44.49 177.5L197.7 154.8L266.3 13.52C270.4 5.249 278.7 0 287.9 0L287.9 0zM287.9 78.95L235.4 187.2C231.9 194.3 225.1 199.3 217.3 200.5L98.98 217.9L184.9 303C190.4 308.5 192.9 316.4 191.6 324.1L171.4 443.7L276.6 387.5C283.7 383.7 292.2 383.7 299.2 387.5L404.4 443.7L384.2 324.1C382.9 316.4 385.5 308.5 391 303L476.9 217.9L358.6 200.5C350.7 199.3 343.9 194.3 340.5 187.2L287.9 78.95z"/>
                        </svg>
                }
                {
                    isReadLater
                        ? <svg className="article-card-icon article-card-unread-later" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" onClick={() => removeFromReadLater()}>
                            <path d="M256 512C114.6 512 0 397.4 0 256S114.6 0 256 0S512 114.6 512 256s-114.6 256-256 256zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"/>
                        </svg>
                        : <svg className="article-card-icon article-card-read-later" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" onClick={() => addToReadLater()}>
                            <path d="M232 120C232 106.7 242.7 96 256 96C269.3 96 280 106.7 280 120V243.2L365.3 300C376.3 307.4 379.3 322.3 371.1 333.3C364.6 344.3 349.7 347.3 338.7 339.1L242.7 275.1C236 271.5 232 264 232 255.1L232 120zM256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0zM48 256C48 370.9 141.1 464 256 464C370.9 464 464 370.9 464 256C464 141.1 370.9 48 256 48C141.1 48 48 141.1 48 256z"/>
                        </svg>                 
                }
            </div>

            {/* <Link className="article-face" to={`/article/${article.title}`}> */}
            <section className="article-card-face" onClick={() => navigate(`/article/${article.title}`)}>
                <h3 className="article-card-title">{article?.title}</h3>
                <p className="article-card-teaser-text">{article?.teaserText}</p>
            </section>
            {/* </Link> */}
        </div>
}