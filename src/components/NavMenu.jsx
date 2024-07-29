import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";
import AddIcon from "@mui/icons-material/Add";
import FaceIcon from "@mui/icons-material/Face";
import LoginIcon from "@mui/icons-material/Login";
import NavButton from "./NavButton";
const NavMenu = () => {
  const { userDetails } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <div>
      {userDetails.username ? (
        <div className="flex">
          <NavButton
            buttonText={"Post Article"}
            icon={<AddIcon />}
            handleClick={() => {
              navigate("/articles/post");
            }}
            id="post"
          />
          <NavButton
            buttonText={"My Account"}
            icon={<FaceIcon />}
            handleClick={() => {
              navigate("/account");
            }}
            id="account"
          />
        </div>
      ) : (
        <NavButton
          buttonText={"Log In"}
          icon={<LoginIcon />}
          handleClick={() => {
            navigate("/login");
          }}
          id={"login"}
        />
      )}
    </div>
  );
};
export default NavMenu;
