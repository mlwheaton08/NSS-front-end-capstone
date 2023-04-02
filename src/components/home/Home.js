import { useEffect, useState } from "react"
import { ArticleCard } from "../articles/ArticleCard"
import "./Home.css"
import { NSFWterms } from "./NSFWterms"
import { HomeParagraphOptions } from "./HomeParagraphOptions"

export const Home = () => {
    const localProjectUser = localStorage.getItem("capstone_user");
    const projectUserObject = JSON.parse(localProjectUser);

    const excludedTerms = NSFWterms()
    const paragraphOptions = HomeParagraphOptions()

    const [user, setUser] = useState()
    const [randomCategory, setRandomCategory] = useState("")
    const [randomSubCategory, setRandomSubCategory] = useState("")
    const [randomArticle, setRandomArticle] = useState("")

    const getUser = async () => {
        const response = await fetch(`http://localhost:8088/users/${projectUserObject.id}`)
        const responseJSON = await response.json()
        setUser(responseJSON)
    }
    
    useEffect(
        () => {
            getUser()
        },
        []
    )

    const fetchRandomCategory = async () => {
        if (user) {
            const response = await fetch('http://localhost:8088/categories')
            const responseJSON = await response.json()
            const randomIndex = Math.floor(Math.random() * responseJSON.length)
    
            if (user.familyBrowsing && responseJSON[randomIndex].id === 14) {
                console.log(`Cannot use ${responseJSON[randomIndex].name} category. Id ${responseJSON[randomIndex].id}`)
                fetchRandomCategory()
            } else {
                setRandomCategory(responseJSON[randomIndex])
            }
        }
    }

    useEffect(
        () => {
            fetchRandomCategory()
        },
        [user]
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
            if (articles[randomIndex].title.toLowerCase().includes(term) || articles[randomIndex].teaserText.toLowerCase().includes(term)) {
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
            if (user.familyBrowsing) {
                familyFriendly(articles, randomIndex)
            } else {
                setRandomArticle(articles[randomIndex])
            }
        }
    }

    const fetchRandomParagraph = () => {
        const randomIndex = Math.floor(Math.random() * paragraphOptions.length)
        return paragraphOptions[randomIndex]
    }

    useEffect(
        () => {
            fetchRandomArticle()
        },
        [randomCategory, randomSubCategory]
    )


    return <div id="home">

        <section id="hero">
            <h1 id="title">Aimless - mobile</h1>
        </section>

        <section className="home-paragraph-container">
            <p>{fetchRandomParagraph()}</p>
        </section>

        <section className="random-card">
            <ArticleCard
                location={"home"}
                category={randomCategory}
                subCategory={randomSubCategory}
                article={randomArticle}
            />
        </section>

        <section className="btn-random-fetch-container">
            <button className="btn-random-fetch" id="next-button" onClick={() => fetchRandomCategory()}>
                Find me a different article
            </button>
            <div className="btn-category-container">
                <button id="keep-category-button" onClick={() =>fetchRandomSubCategory()}>Keep Category</button>
                {
                    randomSubCategory.name === "No subcategory"
                    ? ""
                    : <button  id="keep-subcategory-button" onClick={() => fetchRandomArticle()}>Keep SubCategory</button>
                }
            </div>
        </section>
    </div>
}