import { useEffect, useState } from "react"
import { ArticleCard } from "../articles/ArticleCard"

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
        if (subCatResponseJSON.subCategories.length === 0) {
            setRandomSubCategory("")
        } else {
            const subCategories = subCatResponseJSON.subCategories
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
        let url = `http://localhost:8088/subCategories/${randomSubCategory.id}?_embed=articles`
        if (!randomSubCategory) {
            url =  `http://localhost:8088/categories/${randomCategory.id}?_embed=articles`
        }

        const articleResponse = await fetch(url)
        const articleResponseJSON = await articleResponse.json()
        const articles = articleResponseJSON.articles
        const randomIndex = Math.floor(Math.random() * articles.length)
        setRandomArticle(articles[randomIndex])
    }

    useEffect(
        () => {
            fetchRandomArticle()
        },
        [randomCategory, randomSubCategory]
    )


    return <>

        <ArticleCard
            category={randomCategory}
            subCategory={randomSubCategory}
            article={randomArticle}
        />

        <button onClick={() => fetchRandomCategory()}>Next</button>
        {
            randomSubCategory
            ? <>
                <button onClick={() =>fetchRandomSubCategory()}>Keep Category</button>
                <button onClick={() => fetchRandomArticle()}>Keep SubCategory</button>
            </>
            : <button onClick={() => fetchRandomArticle()}>Keep Category</button>
        }
    </>
}