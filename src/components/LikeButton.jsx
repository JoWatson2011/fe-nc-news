import { patchRequest } from "../utils/api";
const LikeButton = ({ postWithVotes, setFunction }) => {
  let displayText = postWithVotes.votes;

  const postType = Object.keys(postWithVotes).includes("comment_id")
    ? "comment"
    : "article";
  const postId = postWithVotes[`${postType}_id`];

  const patchVote = (postId, value) => {
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

    const patchUrl =
      postType === "comment"
        ? `/api/comments/${postId}`
        : `/api/articles/${postId}`;

    patchRequest(patchUrl, { votes: postWithVotes.votes + value }).then(() => {
      console.log("patch request for " + postType + postId);
    });
  };

  return (
    <div className="flex gap-x-2 items-center">
      <button
        className="w-8 h-8 font-bold text-white bg-orange-800 rounded-full  hover:bg-red-500 active:bg-red-300"
        onClick={() => {
          patchVote(postId, -1);
        }}
      >
        -1
      </button>
      <p className=" text-xl font-bold">{displayText}</p>
      <button
        className="w-8 h-8 font-bold text-white bg-green-950 rounded-full  hover:bg-green-700 active:bg-green-300"
        onClick={() => {
          patchVote(postId, 1);
        }}
      >
        +1
      </button>
    </div>
  );
};
export default LikeButton;
