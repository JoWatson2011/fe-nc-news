import { useContext, useEffect, useState, useRef } from "react";
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

  const [error, setError] = useState(null);

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
      setPostSuccessful(0);
    }
  }, [commentFocus]);

  const handlePostComment = (e) => {
    e.preventDefault();

    if (!newComment) {
      setError("Please enter a comment");
      return;
    }

    postRequest(`/api/articles/${article_id}/comments`, {
      body: newComment,
      article_id: article_id,
      username: user,
      params: { article_id },
    })
      .then(() => {
        setError(null);
        setPostSuccessful((currValue) => {
          return currValue + 1;
        });
      })
      .then(() => {
        setNewComment("");
      })
      .then(() => {
        setCommentFocus(false);
      })
      .catch((err) => {
        setError("Something went wrong, please try again");
        setPostSuccessful(0);
      });
  };

  return (
    <div>
      {postSuccessful ? <p>Comment posted</p> : null}
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
        {error ? <p>{error}</p> : null}
      </form>
    </div>
  );
};
export default PostCommentBox;
