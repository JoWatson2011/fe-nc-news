const NavButton = ({ buttonText, handleClick }) => {
  return (
    <div>
      <button
        data-cy="button"
        type="button"
        onClick={handleClick}
        className=" p-2 bg-red-50 rounded-full mb-10 ml-20"
      >
        {buttonText}
      </button>
    </div>
  );
};

export default NavButton;
