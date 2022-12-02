import { useEffect, useState } from "react"

export const Home = () => {
    const [articles, setArticles] = useState([])
    const [randomArticle, setRandomArticle] = useState({})

    // ------ FETCH ARTICLES ------------------------
    const fetchArticles = async () => {
        const response = await fetch('http://localhost:8088/articles')
        const responseJSON = await response.json()
        setArticles(responseJSON)
        // console.log(responseJSON)
    }
    
    useEffect(
        () => {
            fetchArticles()
        },
        []
    )

    // ---------- GET RANDOM ARTICLE ------------------
    const getRandomArticle = () => {
        const randomIndex = Math.floor(Math.random() * articles.length)
        setRandomArticle(articles[randomIndex])
        console.log('random index: ' + randomIndex)
    }

    useEffect(
        () => {
            getRandomArticle()
        },
        [articles]
    )

    // ------- THIS IS ONLY HERE TO CONSOLE.LOG AFTER RANDOM ARTICLE IS SET. WHEN IN OTHER USE EFFECT, IT CONSOLE LOGS TOO EARLY AND SHOWS UNDEFINED
    useEffect(
        () => {
            console.log(randomArticle?.title + ' : ' + randomArticle?.teasertext)
        },
        [randomArticle]
    )


    return <>
    <h1>Hello, this is the homepage.</h1>
    {
        <h3>title: {randomArticle?.title} : {randomArticle?.teasertext}</h3>
    }
    <button onClick={() => getRandomArticle()}>Next</button>
    </>
    // button onclick setRandomArticle
}