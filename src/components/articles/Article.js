import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Comment } from "../comments/Comment"
import { CommentForm } from "../comments/CommentForm"
import "./Article.css"

export const Article = () => {
    const localProjectUser = localStorage.getItem("capstone_user");
    const projectUserObject = JSON.parse(localProjectUser);

    const {articleTitle} = useParams()
    const [articleText, setArticleText] = useState("")
    const [articleLocal, setArticleLocal] = useState({})
    const [comments, setComments] = useState([])

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
            const sliceReferences = text.slice(0, referencesIndex - 1)
            setArticleText(sliceReferences)
        }
        fetchWiki()
        },
        []
    )

    useEffect(
        () => {
            const fetchArticleLocal = async () => {
                const response = await fetch(`http://localhost:8088/articles?title=${articleTitle}&_embed=comments`)
                const responseJSON = await response.json()
                setArticleLocal(responseJSON[0])
            }
            fetchArticleLocal()
        },
        []
    )

    const fetchComments = async () => {
        const response = await fetch(`http://localhost:8088/comments?articleId=${articleLocal.id}&_expand=user`)
        const responseJSON = await response.json()
        const sortedComments = await responseJSON.sort()
        setComments(sortedComments)
    }

    useEffect(
        () => {
            fetchComments()
        },
        [articleLocal]
    )
    
 
    return <div className="article">
        <h1>{articleTitle}</h1>
        <aside className="commentsContainer">
            <h3>COMMENTS</h3>
            {
                comments.map(comment => {
                    return <Comment
                        key={`comment--${comment.id}`}
                        comment={comment}
                        fetchComments={fetchComments}
                    />
                })
            }
            <>
                <CommentForm
                    userId={projectUserObject.id}
                    articleId={articleLocal.id}
                    fetchComments={fetchComments}
                />
            </>
        </aside>
        <div className="Container" dangerouslySetInnerHTML={{__html: articleText}}></div>
    </div>
}