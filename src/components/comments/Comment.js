import { CommentEdit } from "./CommentEdit"

export const Comment = ({ comment, fetchComments }) => {

    const currentComment = comment;
    const fetchAllComments = fetchComments;

    const formatDate = (date) => {
        return date.toLocaleDateString("en-us", { weekday:"long", year:"numeric", month:"short", day:"numeric", hour:"numeric", minute:"numeric"})
    }


    return <>
        <header id={comment.id}>{comment.text}</header>
        
        <CommentEdit comment={currentComment} fetchComments={fetchAllComments} />

        <p>{formatDate(new Date(comment.timePosted))}</p>
        <p>- {comment.user.fullName}</p>
    </>
}