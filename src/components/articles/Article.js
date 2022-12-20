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
    const [displayComments, setDisplayComments] = useState(false)

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
        const reverseArray = await sortedComments.reverse()
        setComments(reverseArray)
    }

    useEffect(
        () => {
            fetchComments()
        },
        [articleLocal]
    )

    const showOrHideComments = () => {
        if (displayComments) {
            return "comments-container visible"
        } else {
            return "comments-container hidden"
        }
    }

    const blurArticle = () => {
        if (displayComments) {
            return "article text blur"
        } else {
            return "article text"
        }
    }

    useEffect (
        () => {
            showOrHideComments()
            blurArticle()
        },
        [displayComments]
    )
    
 
    return <div className="article">
            <section className="comments-section">
                <svg className="icon comments" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" onClick={() => setDisplayComments(!displayComments)}>
                    <path d="M512 240c0 114.9-114.6 208-256 208c-37.1 0-72.3-6.4-104.1-17.9c-11.9 8.7-31.3 20.6-54.3 30.6C73.6 471.1 44.7 480 16 480c-6.5 0-12.3-3.9-14.8-9.9c-2.5-6-1.1-12.8 3.4-17.4l0 0 0 0 0 0 0 0 .3-.3c.3-.3 .7-.7 1.3-1.4c1.1-1.2 2.8-3.1 4.9-5.7c4.1-5 9.6-12.4 15.2-21.6c10-16.6 19.5-38.4 21.4-62.9C17.7 326.8 0 285.1 0 240C0 125.1 114.6 32 256 32s256 93.1 256 208z"/>
                </svg>
                <div id="comments-container" className={showOrHideComments()}>
                    <header id="comments-header">Comments</header>
                    <CommentForm
                        userId={projectUserObject.id}
                        articleId={articleLocal.id}
                        fetchComments={fetchComments}
                    />
                    {
                        comments.map(comment => {
                            return <Comment
                                key={`comment--${comment.id}`}
                                comment={comment}
                                fetchComments={fetchComments}
                            />
                        })
                    }
                </div>
            </section>
        <div className={blurArticle()}>
            <h1>{articleTitle}</h1>
            <article dangerouslySetInnerHTML={{__html: articleText}}></article>
        </div>
    </div>
}