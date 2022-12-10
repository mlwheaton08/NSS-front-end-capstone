import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { ArticleCard } from "../articles/ArticleCard"

export const Browse = ({searchTermState }) => {
    const {pageNumber} = useParams()
    const [page, setPage] = useState(parseInt(pageNumber))
    const [articles, setArticles] = useState([])
    const navigate = useNavigate()

    const fetchArticles = async () => {
        if (searchTermState) {
            const response = await fetch(`http://localhost:8088/articles?q=${searchTermState}&_page=${page}&_limit=20&_expand=category&_expand=subCategory`)
            const responseJSON = await response.json()
            setArticles(responseJSON)
        } else {
            const response = await fetch(`http://localhost:8088/articles?_page=${page}&_limit=20&_expand=category&_expand=subCategory`)
            const responseJSON = await response.json()
            setArticles(responseJSON)
        }
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


    return <>
        <div>
            <button onClick={() => {
                navigate("/browse/1")
                setPage(1)
                fetchArticles()
                }
            }>Search</button>
        </div>
        
        <h1>Browse</h1>
        {
            page === 1
            ? ""
            : <Link to={`/browse/${page - 1}`} onClick={() => setPage(page - 1)}>Page {page - 1}</Link>
        }
        <Link to={`/browse/${page + 1}`} onClick={() => setPage(page + 1)}>Page {page + 1}</Link>

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

    </>
}