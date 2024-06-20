import { useContext } from "react";
import LikeButton from "./LikeButton";
import { UserContext } from "../contexts/UserContext";
import { deleteRequest } from "../utils/api";

function CommentCard({ comment, setComments, setDeleteSuccessful }) {
  const { user } = useContext(UserContext);

  const handleDeleteComment = (e) => {
    const comment_id = e.target.value;
    deleteRequest(`/api/comments/${comment_id}`, {
      params: { comment_id },
    }).then(() => {
      setDeleteSuccessful((currValue) => {
        return currValue + 1;
      });
      setComments((currComments) => {
        console.log(comment_id, "deleted!");
        const newArr = [...currComments];
        return newArr.filter((comment) => {
          comment.comment_id != comment_id;
        });
      });
    });
  };

  return (
    <div className=" grid grid-rows-2 grid-cols-3 border-s-black border p-2 rounded">
      <h4 className=" font-bold">{comment.author}</h4>
      <p className=" italic" data-cy="date">
        {comment.created_at.slice(0, 10)}
      </p>
      <LikeButton postWithVotes={comment} setFunction={setComments} />

      <p className=" col-span-2" data-cy="body">
        {comment.body}
      </p>
      {user === comment.author ? (
        <button
          type="button"
          onClick={handleDeleteComment}
          className=" hover:bg-red-900 rounded-full border"
          value={comment.comment_id}
        >
          Delete comment
        </button>
      ) : null}
    </div>
  );
}

export default CommentCard;
