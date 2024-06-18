import { useState, useEffect } from "react";
import { getRequest } from "../utils/api";
import CommentCard from "./CommentCards";
const Comments = ({ article_id }) => {
  const [comments, setComments] = useState([]);
  useEffect(() => {
    getRequest(`/api/articles/${article_id}/comments`, {
      params: { article_id },
    }).then(({ comments }) => {
      setComments(comments);
    });
  });

  return (
    <div>
      <h3>Comments</h3>
      {comments.map((comment) => {
        return <CommentCard comment={comment} />;
      })}
    </div>
  );
};

export default Comments;
