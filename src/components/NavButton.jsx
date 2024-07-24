const NavButton = ({ buttonText, handleClick }) => {
  return (
    <div>
      <button
        data-cy="button"
        type="button"
        onClick={handleClick}
        className=" p-2 bg-red-50 rounded-full"
      >
        {buttonText}
      </button>
    </div>
  );
};

export default NavButton;
