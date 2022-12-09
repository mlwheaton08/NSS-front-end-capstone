import { useEffect, useState } from "react"

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


    return (
        comment.userId !== projectUserObject.id
            ? ""
            : !editing
                ? <button onClick={() => setEditing(true)}>Edit</button>
                : <form className="commentForm editComment">
                    <fieldset>
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
                    </fieldset>
    
                    <button
                        className="btn commentEdit"
                        onClick={(clickEvent) => saveCommentChanges(clickEvent)}>
                        Save Changes
                    </button>
                    <button
                        className="btn commentDiscardChanges"
                        onClick={() => fetchComments()}>
                        Discard Changes
                    </button>
                </form>
    )
}