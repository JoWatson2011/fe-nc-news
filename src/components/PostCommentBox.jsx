import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { postRequest } from "../utils/api";
const PostCommentBox = ({
  postSuccessful,
  setPostSuccessful,
  newComment,
  setNewComment,
}) => {
  const { article_id } = useParams();

  const { user } = useContext(UserContext);

  const [commentFocus, setCommentFocus] = useState(false);
  const [commentBoxSize, setCommentBoxSize] = useState("1");
  const [commentBoxStyle, setCommentBoxStyle] = useState(
    "p-1 border border-gray-700 rounded-full"
  );

  useEffect(() => {
    if (commentFocus) {
      setCommentBoxSize("4");
      setCommentBoxStyle("p-1 border border-black rounded");
    } else {
      setCommentBoxSize("1");
      setCommentBoxStyle("p-1 border border-gray-700 rounded-full");
    }
  }, [commentFocus]);

  const handlePostComment = (e) => {
    e.preventDefault();

    postRequest(`/api/articles/${article_id}/comments`, {
      body: newComment,
      article_id: article_id,
      username: user,
      params: { article_id },
    })
      .then(() => {
        setPostSuccessful(true);
      })
      .then(() => {
        setNewComment("");
      })
      .catch((err) => {
        console.log(err);
        setPostSuccessful(false);
      });
  };

  return (
    <form className="grid grid-cols-1 m-10" onSubmit={handlePostComment}>
      <label className="grid grid-cols-1">
        Post a comment
        <textarea
          rows={commentBoxSize}
          cols="50"
          placeholder="Add a comment"
          onFocus={() => {
            setCommentFocus(true);
          }}
          onBlur={() => {
            setCommentFocus(false);
          }}
          className={commentBoxStyle}
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
      </label>
      <button
        type="submit"
        onFocus={() => {
          setCommentFocus(true);
        }}
        onBlur={() => {
          setCommentFocus(false);
        }}
        className=" m-2 p-2 bg-red-50 rounded-full"
      >
        Post Comment
      </button>
      {postSuccessful ? <p>Comment posted</p> : null}
    </form>
  );
};
export default PostCommentBox;
