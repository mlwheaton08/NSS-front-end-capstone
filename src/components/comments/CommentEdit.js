import { useEffect, useState } from "react"
import "./CommentEdit.css"

export const CommentEdit = ({ comment, fetchComments }) => {

    const localProjectUser = localStorage.getItem("capstone_user");
    const projectUserObject = JSON.parse(localProjectUser);

    const [commentNew, updateCommentNew] = useState({
        text: ""
    })
    const [editing, setEditing] = useState(false)

    useEffect(
        () => {
            updateCommentNew(comment)
        },
        []
    )

    const saveCommentChanges = async (event) => {
        event.preventDefault()

        const commentToSendToAPI = {
            userId: comment.userId,
            articleId: comment.articleId,
            text: commentNew.text,
            timePosted: comment.timePosted
        }

        const sendData = async () => {
            const options = {
              method: "PUT",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(commentToSendToAPI)
            }
            await fetch (`http://localhost:8088/comments/${comment.id}`, options)
        }
        await sendData()
        setEditing(false)
        fetchComments()
    }

    const deleteComment = async () => {
        await fetch(`http://localhost:8088/comments/${comment.id}`, {
            method: "DELETE"
        })
        fetchComments()
    }


    return (
        comment.userId !== projectUserObject.id
            ? ""
            : !editing
                ? <section className="comment-edit-btn-container">
                    <button className="btn-edit edit-comment" onClick={() => setEditing(true)}>Edit</button>
                    <button className="btn-edit delete" onClick={() => deleteComment()}>Delete</button>
                </section>
                : <form className="commentForm editComment">
                    <input
                        required autoFocus
                        type="text"
                        value={commentNew.text}
                        onChange={
                            (evt) => {
                                const copy = {...commentNew}
                                copy.text = evt.target.value
                                updateCommentNew(copy)
                            }
                        } />
                    <section className="comment-edit-btn-container">
                        <button
                            className="btn-edit save-changes"
                            onClick={(clickEvent) => saveCommentChanges(clickEvent)}>
                            Save Changes
                        </button>
                        <button
                            className="btn-edit discard-changes"
                            onClick={() => fetchComments()}>
                            Discard Changes
                        </button>
                        <button className="btn-edit delete" onClick={() => deleteComment()}>Delete Comment</button>
                    </section>
                </form>
    )
}