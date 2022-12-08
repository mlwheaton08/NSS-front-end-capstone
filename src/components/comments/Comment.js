export const Comment = ({ comment }) => {

    const formatDate = (date) => {
        return date.toLocaleDateString("en-us", { weekday:"long", year:"numeric", month:"short", day:"numeric", hour:"numeric", minute:"numeric"})
    }

    return <>
        <h4>{comment.text}</h4>
        <p>{formatDate(new Date(comment.timePosted))}</p>
        <p>- {comment.user.fullName}</p>
    </>
}