const LikeButton = ({ likes }) => {
  return (
    <button className="px-4 py-2 font-bold text-white bg-orange-800 rounded-full">
      {likes}
    </button>
  );
};
export default LikeButton;
