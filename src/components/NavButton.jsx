import { useLocation } from "react-router-dom";

const NavButton = ({ buttonText, handleClick, icon, id }) => {
  const { pathname } = useLocation();

  const regex = new RegExp(`${id}$`);
  const urlMatches = !!pathname.match(regex);

  let buttonStyling = "p-2 rounded-full text-nowrap hover:bg-red-200";
  buttonStyling += urlMatches ? " bg-red-200 text-semibold" : " bg-red-50";

  return (
    <button
      id={id}
      data-cy="button"
      type="button"
      onClick={handleClick}
      className={buttonStyling}
    >
      {icon ? icon : null}
      {buttonText}
    </button>
  );
};

export default NavButton;
