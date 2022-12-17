import { useEffect, useState } from "react"
import { ArticleCard } from "../articles/ArticleCard"
import "./Home.css"

export const Home = () => {
    const [randomCategory, setRandomCategory] = useState("")
    const [randomSubCategory, setRandomSubCategory] = useState("")
    const [randomArticle, setRandomArticle] = useState("")

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
        if (randomCategory) {
            const subCatResponse = await fetch(`http://localhost:8088/categories/${randomCategory.id}?_embed=subCategories`)
            const subCatResponseJSON = await subCatResponse.json()
            const subCategories = await subCatResponseJSON.subCategories
            const randomIndex = Math.floor(Math.random() * subCategories.length)
            setRandomSubCategory(subCategories[randomIndex])
        }
    }

    useEffect(
        () => {
            fetchRandomSubCategory()
        },
        [randomCategory]
    )

    const fetchRandomArticle = async () => {
        if (randomSubCategory) {
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

        <div className="btn-random-fetch-container">
            <div className="btn-category-container">
                <button className="btn-random-fetch" id="keep-category-button" onClick={() =>fetchRandomSubCategory()}>Keep Category</button>
                {
                    randomSubCategory.name === "No subcategory"
                    ? ""
                    : <button className="btn-random-fetch" id="keep-subcategory-button" onClick={() => fetchRandomArticle()}>Keep SubCategory</button>
                }
            </div>
            <button className="btn-random-fetch" id="next-button" onClick={() => fetchRandomCategory()}>
                Next
                <svg id="next-arrow-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/>
                </svg>
            </button>
        </div>
    </div>
}