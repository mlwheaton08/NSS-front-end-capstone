import { useEffect, useState } from "react"
import { ArticleCard } from "../articles/ArticleCard"

export const Home = () => {
    // const [articles, setArticles] = useState([])
    
    const [randomCategory, setRandomCategory] = useState({})
    const [randomSubCategory, setRandomSubCategory] = useState({})
    const [randomArticle, setRandomArticle] = useState({})

    const fetchRandomCategory = async () => {
        const catResponse = await fetch('http://localhost:8088/categories')
        const catResponseJSON = await catResponse.json()
        const randomIndex = Math.floor(Math.random() * catResponseJSON.length)
        setRandomCategory(catResponseJSON[randomIndex])
        console.log(`random category: ${catResponseJSON[randomIndex].name}`)
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
        let parent = randomSubCategory
        if (!randomSubCategory) {
            parent = randomCategory
        }

        const articleResponse = await fetch(`http://localhost:8088/subCategories/${parent.id}?_embed=articles`)
        const articleResponseJSON = await articleResponse.json()
        const articles = articleResponseJSON.articles
        const randomIndex = Math.floor(Math.random() * articles.length)
        setRandomArticle(articles[randomIndex])
        console.log(`random article: ${articles[randomIndex].title}`)
        
    }

    useEffect(
        () => {
            fetchRandomArticle()
        },
        [randomSubCategory]
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
                <button onClick={() => fetchRandomSubCategory()}>Keep Category</button>
                <button onClick={() => fetchRandomArticle()}>Keep SubCategory</button>
            </>
            : <button onClick={() => fetchRandomArticle()}>Keep Category</button>
        }
    </>
}