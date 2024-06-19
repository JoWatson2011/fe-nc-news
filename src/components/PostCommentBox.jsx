import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
const PostCommentBox = () => {
  const { user } = useContext(UserContext);
  const [commentFocus, setCommentFocus] = useState(false);
  const [newComment, setNewComment] = useState("");
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
        Post
      </button>
    </form>
  );
};
export default PostCommentBox;
