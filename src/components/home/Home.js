import { useEffect, useState } from "react"
import { ArticleCard } from "../articles/ArticleCard"
import "./Home.css"
import { NSFWterms } from "./NSFWterms"

export const Home = () => {
    const localProjectUser = localStorage.getItem("capstone_user");
    const projectUserObject = JSON.parse(localProjectUser);

    const excludedTerms = NSFWterms()

    const [user, setUser] = useState()
    const [randomCategory, setRandomCategory] = useState("")
    const [randomSubCategory, setRandomSubCategory] = useState("")
    const [randomArticle, setRandomArticle] = useState("")

    const getUser = async () => {
        const response = await fetch(`http://localhost:8088/users/${projectUserObject.id}`)
        const responseJSON = await response.json()
        setUser(responseJSON)
    }

    const fetchRandomCategory = async () => {
        const response = await fetch('http://localhost:8088/categories')
        const responseJSON = await response.json()
        const randomIndex = Math.floor(Math.random() * responseJSON.length)
        setRandomCategory(responseJSON[randomIndex])
    }

    useEffect(
        () => {
            getUser()
            fetchRandomCategory()
        },
        []
    )

    const fetchRandomSubCategory = async () => {
        if (randomCategory) {
            const response = await fetch(`http://localhost:8088/categories/${randomCategory.id}?_embed=subCategories`)
            const responseJSON = await response.json()
            const subCategories = await responseJSON.subCategories
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

    const familyFriendly = (articles, randomIndex) => {
        for (const term of excludedTerms) {
            if (articles[randomIndex].title.includes(term) || articles[randomIndex].teaserText.includes(term)) {
                console.log(`Cannot use article. Contained term ${excludedTerms.indexOf(term)}`)
                fetchRandomArticle()
            } else {
                setRandomArticle(articles[randomIndex])
            }
        }
    }

    const fetchRandomArticle = async () => {
        if (randomSubCategory) {
            let url = `http://localhost:8088/subCategories/${randomSubCategory.id}?_embed=articles`
            if (randomSubCategory.name === "No subcategory") {
                url =  `http://localhost:8088/categories/${randomCategory.id}?_embed=articles`
            }
    
            const response = await fetch(url)
            const responseJSON = await response.json()
            const articles = await responseJSON.articles
            const randomIndex = Math.floor(Math.random() * articles.length)
            if (user.familyBrowsing == true) {
                familyFriendly(articles, randomIndex)
            } else {
                setRandomArticle(articles[randomIndex])
            }
        }
    }

    useEffect(
        () => {
            fetchRandomArticle()
        },
        [randomCategory, randomSubCategory]
    )


    return <div className="home">

        <div id="random-card">
            <ArticleCard
                category={randomCategory}
                subCategory={randomSubCategory}
                article={randomArticle}
            />
        </div>

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