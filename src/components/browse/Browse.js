import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { ArticleCard } from "../articles/ArticleCard"
import "./Browse.css"

export const Browse = ({ searchTermState }) => {
    const {pageNumber} = useParams()
    const [page, setPage] = useState(parseInt(pageNumber))
    const [articles, setArticles] = useState([])
    const navigate = useNavigate()

    const getAPI = () => {
        let API = `http://localhost:8088/articles?_page=${page}&_limit=20&_expand=category&_expand=subCategory`
        if (searchTermState.categoryId && parseInt(searchTermState.categoryId) !== 0) {
            API += `&categoryId=${searchTermState.categoryId}`
        }
        if (searchTermState.subCategoryId && parseInt(searchTermState.subCategoryId) !== 0) {
            API += `&subCategoryId=${searchTermState.subCategoryId}`
        }
        if (searchTermState.search && searchTermState.search !== "no_search") {
            API += `&q=${searchTermState.search}`
        }
        return API
    }

    const fetchArticles = async () => {
        const API = getAPI()
        const response = await fetch(API)
        const responseJSON = await response.json()
        setArticles(responseJSON)
    }

    const getSearchURL = () => {
        let cat = searchTermState.categoryId
        let subCat = searchTermState.subCategoryId
        let search = searchTermState.search
        if (!searchTermState.categoryId) {
            cat = 0
        }
        if (!searchTermState.subCategoryId) {
            subCat = 0
        }
        if (!searchTermState.search) {
            search = "no_search"
        }
        return `${cat}/${subCat}/${search}`
    }

    useEffect(
        () => {
            setPage(parseInt(pageNumber))
            fetchArticles()
        },
        []
    )

    useEffect(
        () => {
            fetchArticles()
        },
        [page]
    )

    const enterSearch = () => {
        navigate(`/browse/${getSearchURL()}/1`)
        setPage(1)
        fetchArticles()
    }


    return <div id="browse">

        <button id="search-button" onClick={() => enterSearch()}>
            <span>Search</span>
            <span>
                <svg id="search-arrow-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/>
                </svg>
            </span>
        </button>
        
        <div className="page-turn-buttons">
            <span>
                {
                    page === 1
                    ? <svg className="page-turn left false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l370.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128z"/>
                    </svg>
                    : <svg className="page-turn left true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" onClick={() => {
                            setPage(page - 1)
                            navigate(`/browse/${getSearchURL()}/${page - 1}`)
                            }}>
                        <path d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l370.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128z"/>
                    </svg>
                }
            </span>
            <span id="page-number">Page {page}</span>
            <span>
                {
                    articles.length < 20
                    ? <svg className="page-turn right false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l370.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128z"/>
                    </svg>
                    : <svg className="page-turn right true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" onClick={() => {
                            setPage(page + 1)
                            navigate(`/browse/${getSearchURL()}/${page + 1}`)
                            }}>
                        <path d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l370.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128z"/>
                    </svg>
                }
            </span>
        </div>

        <div className="article-cards">
            {
                articles.map(article => {
                    return <ArticleCard
                        key={`article--${article.id}`}
                        category={article.category}
                        subCategory={article.subCategory}
                        article={article}
                    />
                })
            }
        </div>

        <div className="page-turn-buttons bottom">
            <span>
                {
                    page === 1
                    ? <svg className="page-turn left false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l370.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128z"/>
                    </svg>
                    : <svg className="page-turn left true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" onClick={() => {
                            setPage(page - 1)
                            navigate(`/browse/${getSearchURL()}/${page - 1}`)
                            }}>
                        <path d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l370.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128z"/>
                    </svg>
                }
            </span>
            <span id="page-number">Page {page}</span>
            <span>
                {
                    articles.length < 20
                    ? <svg className="page-turn right false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l370.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128z"/>
                    </svg>
                    : <svg className="page-turn right true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" onClick={() => {
                            setPage(page + 1)
                            navigate(`/browse/${getSearchURL()}/${page + 1}`)
                            }}>
                        <path d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l370.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128z"/>
                    </svg>
                }
            </span>
        </div>

    </div>
}