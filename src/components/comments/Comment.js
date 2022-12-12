import { CommentEdit } from "./CommentEdit"
import "./Comment.css"

export const Comment = ({ comment, fetchComments }) => {

    const currentComment = comment;
    const fetchAllComments = fetchComments;

    const formatDate = (date) => {
        return date.toLocaleDateString("en-us", { weekday:"long", year:"numeric", month:"short", day:"numeric", hour:"numeric", minute:"numeric"})
    }


    return <>
        <div className="comment">
            <header className="commentHeader">
                <span>{comment.user.fullName}</span>
                <span>{formatDate(new Date(comment.timePosted))}</span>
            </header>

            <p id={comment.id}>{ comment.text}</p>
            <CommentEdit comment={currentComment} fetchComments={fetchAllComments} />
        </div>
    </>
}