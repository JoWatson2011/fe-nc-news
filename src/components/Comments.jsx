import { useState, useEffect } from "react";
import { getRequest } from "../utils/api";
import CommentCard from "./CommentCards";
import Loading from "./Loading";
const Comments = ({ article_id }) => {
  const [comments, setComments] = useState([]);
  const [commentsLoading, setCommentsLoading] = useState(true);
  useEffect(() => {
    getRequest(`/api/articles/${article_id}/comments`, {
      params: { article_id },
    }).then(({ comments }) => {
      setComments(comments);
      setCommentsLoading(false);
    });
  }, []);

  return (
    <div>
      <h3>Comments</h3>
      {commentsLoading ? <Loading /> : null}
      <div id="comment-cards">
        {comments.map((comment) => {
          return <CommentCard comment={comment} />;
        })}
      </div>
    </div>
  );
};

export default Comments;
