import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { ArticleCard } from "../articles/ArticleCard"

export const Browse = () => {
    const {pageNumber} = useParams()
    const [page, setPage] = useState(parseInt(pageNumber))
    const [articles, setArticles] = useState([])

    const fetchArticles = async () => {
        console.log(page)
        const response = await fetch(`http://localhost:8088/articles?_page=${page}&_limit=20&_expand=category&_expand=subCategory`)
        const responseJSON = await response.json()
        setArticles(responseJSON)
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
        
        <h1>Browse Page</h1>
        {
            page === 1
            ? ""
            : <Link to={`/browse/${page - 1}`} onClick={() => setPage(page - 1)}>Page {page - 1}</Link>
        }
        <Link to={`/browse/${page + 1}`} onClick={() => setPage(page + 1)}>Page {page + 1}</Link>

        <article className="browseArticles">
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
        </article>

    </>
}