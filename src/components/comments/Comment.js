import { CommentEdit } from "./CommentEdit"
import "./Comment.css"

export const Comment = ({ comment, fetchComments }) => {
    const localProjectUser = localStorage.getItem("capstone_user");
    const projectUserObject = JSON.parse(localProjectUser);

    const currentComment = comment;
    const fetchAllComments = fetchComments;

    const formatDate = (date) => {
        return date.toLocaleDateString("en-us", { weekday:"long", year:"numeric", month:"short", day:"numeric", hour:"numeric", minute:"numeric"})
    }

    const userDisplayStyle = () => {
        if (projectUserObject.id === comment.user.id) {
            return "comment user self"
        } else {
            return "comment user"
        }
    }


    return <>
        <div className="comment-container">
            <header className="comment header">
                <span className={userDisplayStyle()}>{comment.user.fullName}</span>
                <span className="comment date">{formatDate(new Date(comment.timePosted))}</span>
            </header>

            <p className="comment text" id={comment.id}>{ comment.text}</p>
            <CommentEdit comment={currentComment} fetchComments={fetchAllComments} />
        </div>
    </>
}