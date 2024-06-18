const NavButton = ({ buttonText, handleClick }) => {
  return (
    <button
      data-cy="button"
      type="button"
      onClick={handleClick}
      className=" p-2 bg-red-50 pd- rounded-full"
    >
      {buttonText}
    </button>
  );
};

export default NavButton;
