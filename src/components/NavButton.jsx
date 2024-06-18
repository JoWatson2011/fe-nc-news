const NavButton = ({ buttonText }) => {
  return (
    <button
      data-cy="button"
      type="button"
      className=" p-2 bg-red-50 pd- rounded-full"
    >
      {buttonText}
    </button>
  );
};

export default NavButton;
