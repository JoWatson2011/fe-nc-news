const NavButton = ({ buttonText, handleClick, icon }) => {
  return (
    <div>
      <button
        data-cy="button"
        type="button"
        onClick={handleClick}
        className=" p-2 bg-red-50 rounded-full text-nowrap"
      >
        {icon ? icon : null}
        {buttonText}
      </button>
    </div>
  );
};

export default NavButton;
