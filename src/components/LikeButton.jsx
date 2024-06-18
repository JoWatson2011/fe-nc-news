import { useEffect } from "react";
const LikeButton = ({ postWithVotes, setFunction }) => {
  let displayText = postWithVotes.votes;
	
}

  return (
    <div className="flex gap-x-2 items-center">
      <button className="w-8 h-8 font-bold text-white bg-orange-800 rounded-full  hover:bg-red-500 active:bg-red-300">
        -1
      </button>
      <p className=" text-xl font-bold">{displayText}</p>
      <button className="w-8 h-8 font-bold text-white bg-green-950 rounded-full  hover:bg-green-700 active:bg-green-300">
        +1
      </button>
    </div>
  );
};
export default LikeButton;
