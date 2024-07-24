import { Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";
import NavButton from "./NavButton";
const NavMenu = () => {
  const { user } = useContext(UserContext);

  return (
    <div>
      {user ? (
        <Link to="/account">
          <NavButton buttonText={"My Account"} />
        </Link>
      ) : (
        <Link to="login">
          <NavButton buttonText={"Log In"} />
        </Link>
      )}
    </div>
  );
};
export default NavMenu;
