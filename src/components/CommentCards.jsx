import Card from "react-bootstrap/Card";
import LikeButton from "./LikeButton";

function CommentCard({ comment }) {
  return (
    <Card>
      <Card.Header as="h4">{comment.author}</Card.Header>
      <Card.Body className=" grid grid-rows-1">
        <LikeButton currentVotes={comment.votes} />
        <Card.Text data-cy="date">{comment.created_at.slice(0, 10)}</Card.Text>
        <Card.Text data-cy="body">{comment.body}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default CommentCard;
