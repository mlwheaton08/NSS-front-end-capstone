import { useState } from "react"

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


    return (
        <form className="commentForm">
            <fieldset>
                <input
                    required autoFocus
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
            </fieldset>

            <button
                onClick={(clickEvent) => postComment(clickEvent)}
                className="btn submitComment">
                Comment
            </button>
        </form>
    )
}