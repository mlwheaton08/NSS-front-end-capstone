export const Comment = ({ comment }) => {

    return <>
        <h4>{comment.text}</h4>
        <p>- {comment.user.fullName}</p>
    </>
}