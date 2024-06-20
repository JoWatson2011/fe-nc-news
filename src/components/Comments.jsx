import { useState, useEffect } from "react";
import { getRequest } from "../utils/api";
import CommentCard from "./CommentCards";
import Loading from "./Loading";
import Collapsible from "./Collabsible";
import NavButton from "./NavButton";
import PostCommentBox from "./PostCommentBox";

const Comments = ({ article_id }) => {
  const [comments, setComments] = useState([]);
  const [commentsLoading, setCommentsLoading] = useState(true);
  const [postSuccessful, setPostSuccessful] = useState(false);
  const [deleteSuccessful, setDeleteSuccessful] = useState(false);

  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    getRequest(`/api/articles/${article_id}/comments`, {
      params: { article_id },
    }).then(({ comments }) => {
      setComments(comments);
      setCommentsLoading(false);
    });
  }, [postSuccessful, deleteSuccessful]);

  useEffect(() => {
    if (postSuccessful) {
      setComments((currComments) => {
        const newArr = [...currComments];
        newArr.push(newComment);
        return newArr;
      });
    }
  }, [postSuccessful]);

  return (
    <div>
      <h3>Comments</h3>
      <PostCommentBox
        postSuccessful={postSuccessful}
        setPostSuccessful={setPostSuccessful}
        newComment={newComment}
        setNewComment={setNewComment}
      />

      {commentsLoading ? <Loading /> : null}
      <div id="comment-cards">
        {comments.slice(0, 3).map((comment) => {
          return (
            <CommentCard
              key={comment.comment_id}
              comment={comment}
              setComments={setComments}
              setDeleteSuccessful={setDeleteSuccessful}
            />
          );
        })}
        {comments.length > 3 ? (
          <Collapsible contentDescriptor={" all comments"}>
            {comments.slice(3).map((comment) => {
              return (
                <CommentCard
                  key={comment.comment_id}
                  comment={comment}
                  setComments={setComments}
                  setDeleteSuccessful={setDeleteSuccessful}
                />
              );
            })}
          </Collapsible>
        ) : null}
      </div>
    </div>
  );
};

export default Comments;
