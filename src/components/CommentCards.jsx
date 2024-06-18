import LikeButton from "./LikeButton";

function CommentCard({ comment, setComments }) {
  return (
    <div className=" m-10 grid grid-rows-2 grid-cols-3 border-s-black border p-2">
      <h4 className=" font-bold">{comment.author}</h4>
      <p className=" italic" data-cy="date">
        {comment.created_at.slice(0, 10)}
      </p>
      <LikeButton
        className=" row-span-2"
        postWithVotes={comment}
        setFunction={setComments}
      />
      <p className=" col-span-2" data-cy="body">
        {comment.body}
      </p>
    </div>
  );
}

export default CommentCard;
