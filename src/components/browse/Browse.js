import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { ArticleCard } from "../articles/ArticleCard"
import "./Browse.css"
import { ArticleSearchForm } from "./ArticleSearchForm"

export const Browse = () => {
    const {categoryId} = useParams()
    const {subCategoryId} = useParams()
    const {search} = useParams()

    const [searchTerms, setSearchTerms] = useState({
        categoryId: categoryId,
        subCategoryId: subCategoryId,
        search: search
    })

    const {pageNumber} = useParams()
    const [page, setPage] = useState(parseInt(pageNumber))
    const [articles, setArticles] = useState([])
    const navigate = useNavigate()

    const getAPI = () => {
        let API = `http://localhost:8088/articles?_page=${page}&_limit=20&_expand=category&_expand=subCategory`
        if (searchTerms.categoryId && parseInt(searchTerms.categoryId) !== 0) {
            API += `&categoryId=${searchTerms.categoryId}`
        }
        if (searchTerms.subCategoryId && parseInt(searchTerms.subCategoryId) !== 0) {
            API += `&subCategoryId=${searchTerms.subCategoryId}`
        }
        if (searchTerms.search && searchTerms.search !== "no_search") {
            API += `&q=${searchTerms.search}`
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
        let cat = searchTerms.categoryId
        let subCat = searchTerms.subCategoryId
        let search = searchTerms.search
        if (!searchTerms.categoryId) {
            cat = 0
        }
        if (!searchTerms.subCategoryId) {
            subCat = 0
        }
        if (!searchTerms.search) {
            search = "no_search"
        }
        return `${cat}/${subCat}/${search}`
    }

    const setInitialSearchTerms = () => {
        const initialSearchTerms = {
            categoryId: "",
            subCategoryId: "",
            search: ""
        }

        setSearchTerms(initialSearchTerms)
    }

    useEffect(
        () => {
            setInitialSearchTerms()
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

    const getSearchSectionClass = () => {
        if (!searchTerms.categoryId
            || parseInt(searchTerms.categoryId) === 0
            || parseInt(searchTerms.categoryId) === 2
            || parseInt(searchTerms.categoryId) === 12
            || parseInt(searchTerms.categoryId) === 14) {
            return ""
        } else {
            return " subcat"
        }
    }


    return <div id="browse">

        <section className={`header-browse${getSearchSectionClass()}`}>

            <ArticleSearchForm
                searchTermState={searchTerms}
                setSearchTerms={setSearchTerms}
                enterSearch={enterSearch}
            />
        
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
        </section>

        <div className={`article-cards${getSearchSectionClass()}`}>
            {
                articles.map(article => {
                    return <ArticleCard
                    location={"browse"}
                    key={`article--${article.id}`}
                    category={article.category}
                    subCategory={article.subCategory}
                    article={article}
                    />
                })
            }
        </div>
    </div>
}