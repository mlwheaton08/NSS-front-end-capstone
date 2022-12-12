import { useEffect, useState } from "react"
import { ArticleCard } from "../articles/ArticleCard"
import "./Home.css"

export const Home = () => {
    const [randomCategory, setRandomCategory] = useState({})
    const [randomSubCategory, setRandomSubCategory] = useState({})
    const [randomArticle, setRandomArticle] = useState({})

    const fetchRandomCategory = async () => {
        const catResponse = await fetch('http://localhost:8088/categories')
        const catResponseJSON = await catResponse.json()
        const randomIndex = Math.floor(Math.random() * catResponseJSON.length)
        setRandomCategory(catResponseJSON[randomIndex])
    }

    useEffect(
        () => {
            fetchRandomCategory()
        },
        []
    )

    const fetchRandomSubCategory = async () => {
        const subCatResponse = await fetch(`http://localhost:8088/categories/${randomCategory.id}?_embed=subCategories`)
        const subCatResponseJSON = await subCatResponse.json()
        const subCategories = await subCatResponseJSON.subCategories
        const randomIndex = Math.floor(Math.random() * subCategories.length)
        setRandomSubCategory(subCategories[randomIndex])
    }

    useEffect(
        () => {
            fetchRandomSubCategory()
        },
        [randomCategory]
    )

    const fetchRandomArticle = async () => {
        let url = `http://localhost:8088/subCategories/${randomSubCategory.id}?_embed=articles`
        if (randomSubCategory.name === "No subcategory") {
            url =  `http://localhost:8088/categories/${randomCategory.id}?_embed=articles`
        }

        const articleResponse = await fetch(url)
        const articleResponseJSON = await articleResponse.json()
        const articles = await articleResponseJSON.articles
        const randomIndex = Math.floor(Math.random() * articles.length)
        setRandomArticle(articles[randomIndex])
    }

    useEffect(
        () => {
            fetchRandomArticle()
        },
        [randomCategory, randomSubCategory]
    )


    return <div className="home">
        <ArticleCard
            category={randomCategory}
            subCategory={randomSubCategory}
            article={randomArticle}
        />

        <div className="btn-random-fetch">
            {
                randomSubCategory.name === "No subcategory"
                ? <button onClick={() =>fetchRandomSubCategory()}>Keep Category</button>
                : <>
                    <button onClick={() => fetchRandomArticle()}>Keep Category</button>
                    <button onClick={() => fetchRandomArticle()}>Keep SubCategory</button>
                </>
            }
            <button onClick={() => fetchRandomCategory()}>Next</button>
        </div>
    </div>
}