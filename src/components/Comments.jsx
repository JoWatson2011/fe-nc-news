import { useState, useEffect } from "react";
import { getRequest } from "../utils/api";
import CommentCard from "./CommentCards";
import Loading from "./Loading";
import Collapsible from "./Collabsible";
import NavButton from "./NavButton";
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
        {comments.slice(0, 3).map((comment) => {
          return <CommentCard comment={comment} setComments={setComments} />;
        })}
        {comments.length > 3 ? (
          <Collapsible contentDescriptor={" all comments"}>
            {comments.slice(3).map((comment) => {
              return (
                <CommentCard comment={comment} setComments={setComments} />
              );
            })}
          </Collapsible>
        ) : null}
      </div>
    </div>
  );
};

export default Comments;
