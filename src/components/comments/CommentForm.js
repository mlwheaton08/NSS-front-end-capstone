import { useState } from "react"
import "./CommentForm.css"

export const CommentForm = ({ userId, articleId, fetchComments }) => {

    const [comment, updateComment] = useState({
        text: ""
    })

    const postComment = async (event) => {
        event.preventDefault()

        const commentToSendToAPI = {
            userId: userId,
            articleId: articleId,
            text: comment.text,
            timePosted: Date.now()
        }

        const sendData = async () => {
            const options = {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(commentToSendToAPI)
            }
            await fetch (`http://localhost:8088/comments`, options)
        }
        await sendData()
        updateComment({text: ""})
        fetchComments()
    }

    const checkSearchInput = () => {
        if (comment.text === "") {
            return "icon submit"
        } else {
            return "icon submit ready"
        }
    }


    return (
        <form className="comment-form">
            <input className="comment-form input"
                required
                type="text"
                placeholder="Comment here..."
                value={comment.text}
                onChange={
                    (evt) => {
                        const copy = {...comment}
                        copy.text = evt.target.value
                        updateComment(copy)
                    }
                } />
            <svg className={checkSearchInput()} viewBox="0 0 448 512" onClick={(clickEvent) => {
                if (comment.text !== "") {
                    postComment(clickEvent)
                }
            }}>
                <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/>
            </svg>
        </form>
    )
}