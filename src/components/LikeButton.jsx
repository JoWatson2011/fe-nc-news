import { patchRequest } from "../utils/api";
import { useState, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
const LikeButton = ({ postWithVotes, setFunction }) => {
  const { user } = useContext(UserContext);

  const [votesErr, setVotesErr] = useState(false);
  let displayText = postWithVotes.votes;

  const postType = Object.keys(postWithVotes).includes("comment_id")
    ? "comment"
    : "article";
  const postId = postWithVotes[`${postType}_id`];

  const patchVote = (postId, value) => {
    setVotesErr(false);

    const setVoteInState = (value) => {
      setFunction((currPosts) => {
        if (!Array.isArray(currPosts) & (postType === "article")) {
          return { ...currPosts, votes: currPosts.votes + value };
        }

        return currPosts.map((post) => {
          if (post[`${postType}_id`] === postId) {
            return { ...post, votes: post.votes + value };
          }
          return post;
        });
      });
    };

    setVoteInState(value);

    const patchUrl =
      postType === "comment"
        ? `/api/comments/${postId}`
        : `/api/articles/${postId}`;

    patchRequest(patchUrl, { votes: value }).catch((err) => {
      setVotesErr(true);
      setVoteInState(-value);
    });
  };

  return (
    <div>
      <div className="flex gap-x-2 place-items-center">
        <button
          className={`w-8 h-8 font-bold  rounded-full ${
            user != postWithVotes.author
              ? "  bg-orange-800 hover:bg-red-500 active:bg-red-300 text-white"
              : " bg-white text-white"
          }`}
          onClick={() => {
            if (user != postWithVotes.author) patchVote(postId, -1);
          }}
        >
          -1
        </button>
        <p className="w-10 h-10 p-1 rounded-full border text-l font-bold text-center leading-7">
          {displayText}
        </p>
        <button
          className={`w-8 h-8 font-bold  rounded-full ${
            user != postWithVotes.author
              ? " bg-green-950 hover:bg-green-700 active:bg-green-300 text-white"
              : " bg-white text-white"
          }`}
          onClick={() => {
            if (user != postWithVotes.author) patchVote(postId, 1);
          }}
        >
          +1
        </button>
      </div>
      {votesErr ? (
        <p className=" text-red-800">Oops, something went wrong...</p>
      ) : null}
    </div>
  );
};
export default LikeButton;
