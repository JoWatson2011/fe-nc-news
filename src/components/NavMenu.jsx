import { Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";
import AddIcon from "@mui/icons-material/Add";
import FaceIcon from "@mui/icons-material/Face";
import LoginIcon from "@mui/icons-material/Login";
import NavButton from "./NavButton";
const NavMenu = () => {
  const { userDetails } = useContext(UserContext);

  return (
    <div>
      {userDetails.username ? (
        <div className="flex">
          <Link to="/articles/post">
            <NavButton buttonText={"Post Article"} icon={<AddIcon />} />
          </Link>
          <Link to="/account">
            <NavButton buttonText={"My Account"} icon={<FaceIcon />} />
          </Link>
        </div>
      ) : (
        <Link to="login">
          <NavButton buttonText={"Log In"} icon={<LoginIcon />} />
        </Link>
      )}
    </div>
  );
};
export default NavMenu;
