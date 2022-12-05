import { useEffect, useState } from "react"
import { ArticleCard } from "../articles/ArticleCard"

export const Browse = () => {

    let [pageNumber, setPageNumber] = useState(1)

    const nextPage = () => {
        setPageNumber(pageNumber += 1)
    }

    const previousPage = () => {
        setPageNumber(pageNumber -= 1)
    }

    const [articles, setArticles] = useState([])

    const fetchArticles = async () => {
        console.log(pageNumber)
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

    useEffect(
        () => {
            fetchArticles()
        },
        [pageNumber]
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