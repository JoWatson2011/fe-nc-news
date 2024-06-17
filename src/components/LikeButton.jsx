const LikeButton = ({ article }) => {
  return (
    <button className="w-12 h-12 font-bold text-white bg-orange-800 rounded-full">
      {article.votes}
    </button>
  );
};
export default LikeButton;
