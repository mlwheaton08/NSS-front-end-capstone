import { useEffect, useState } from "react"
import { ArticleCard } from "../articles/ArticleCard"

export const Browse = () => {

    const [pageNumber, setPageNumber] = useState(1)

    const nextPage = () => {
        const num = pageNumber
        setPageNumber(num += 1)
    }

    const previousPage = () => {
        const num = pageNumber
        setPageNumber(num -= 1)
    }

    useEffect(
        () => {
            fetchArticles()
        },
        [pageNumber]
    )

    const [articles, setArticles] = useState([])

    const fetchArticles = async () => {
        const response = await fetch(`http://localhost:8088/articles?_page=${pageNumber}&_limit=20&_expand=category&_expand=subCategory`)
        const responseJSON = await response.json()
        setArticles(responseJSON)
    }

    useEffect(
        () => {
            fetchArticles()
        },
        []
    )

    return <>
        
        <h1>Browse Page</h1>
        {
            pageNumber === 1
            ? ""
            : <button onClick={() => previousPage()}>Page {pageNumber - 1}</button>
        }
        <button onClick={() => nextPage()}>Page {pageNumber + 1}</button>

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