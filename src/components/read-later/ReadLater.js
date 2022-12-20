import { useEffect, useState } from "react"
import { ArticleCard } from "../articles/ArticleCard";
import "./ReadLater.css"

export const ReadLater = () => {
    const localProjectUser = localStorage.getItem("capstone_user");
    const projectUserObject = JSON.parse(localProjectUser);

    const [readLaterArticles, setReadLaterArticles] = useState([])

    const fetchReadLater = async () => {
        const response = await fetch(`http://localhost:8088/readLater?userId=${projectUserObject.id}&_expand=article&_expand=category&_expand=subCategory`)
        const responseJSON = await response.json()
        setReadLaterArticles(responseJSON)
    }

    useEffect(
        () => {
            fetchReadLater()
        },
        []
    )

    return <main>
        <h2>Here's what you've saved for later</h2>

        {
            readLaterArticles.map(article => {
                return <ArticleCard
                    key={`readLater--${article.id}`}
                    category={article.category}
                    subCategory={article.subCategory}
                    article={article.article}
                    fetchReadLater={fetchReadLater}
                />
            })
        }
    </main>
}