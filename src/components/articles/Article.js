import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export const Article = () => {
    const {articleTitle} = useParams()
    const [articleText, setArticleText] = useState("")

    useEffect(
        () => {
            const fetchWiki = async () => {
            const API = `https://en.wikipedia.org/w/api.php?action=parse&format=json&page=${articleTitle}&redirects=1&prop=text&formatversion=2`
            const response = await fetch(API)
            const responseJSON = await response.json()
            const text = responseJSON.parse.text
            // console.log(text)
            // make lines below a global function bc will want to use it on every page to remove references (i assume every page does? if not, need conditional)
            // can work on other global functions to remove table of contents (maybe? might be a good stretch goal to have a working table of contents),
            // classes, etc. but that is not priority currently
            // maybe i should remove anchor tags. unless i want the links to go somewhere? idk, probably not for mvp tho
            const referencesIndex = text.search('<h2><span class="mw-headline" id="References">')
            console.log(referencesIndex)
            const sliceReferences = text.slice(0, referencesIndex - 1)
            setArticleText(sliceReferences)
            console.log(sliceReferences)
        }
        fetchWiki()
        },
        []
    )

    console.log(articleTitle)


    // return <h1>{articleTitle}</h1>
    return <div className="Container" dangerouslySetInnerHTML={{__html: articleText}}></div>
}