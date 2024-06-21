const NavButton = ({ buttonText, handleClick }) => {
  // const navigate = useNavigate();

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
