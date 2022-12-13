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


    return <>
        <div>
            <button onClick={() => enterSearch()}>Search</button>
        </div>
        
        <h1>Browse</h1>
        <div className="btn btn-pages">
            <span className="btn btn-previous-page">
                {
                    page === 1
                    ? <span>--</span>
                    : <Link to={`/browse/${getSearchURL()}/${page - 1}`} onClick={() => setPage(page - 1)}>⬅️</Link>
                }
            </span>
            <span id="page-number">Page {page}</span>
            <span className="btn btn-next-page">
                {
                    articles.length < 20
                    ? <span>--</span>
                    : <Link to={`/browse/${getSearchURL()}/${page + 1}`} onClick={() => setPage(page + 1)}>➡️</Link>
                }
            </span>
        </div>

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

        {
            articles.length < 2
            ? ""
            : <div className="btn btn-pages">
                <span className="btn btn-previous-page">
                    {
                        page === 1
                        ? <span>--</span>
                        : <Link to={`/browse/${getSearchURL()}/${page - 1}`}
                            onClick={() => {
                                window.scrollTo(0, 0)
                                setPage(page - 1)
                            }}>⬅️</Link>
                    }
                </span>
                <span id="page-number">Page {page}</span>
                <span className="btn btn-next-page">
                    {
                        articles.length < 20
                        ? <span>--</span>
                        : <Link to={`/browse/${getSearchURL()}/${page + 1}`}
                            onClick={() => {
                                window.scrollTo(0, 0)
                                setPage(page + 1)
                            }}>➡️</Link>
                    }
                </span>
            </div>
        }

    </>
}