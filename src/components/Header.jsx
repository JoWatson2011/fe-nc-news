import { Link } from "react-router-dom";
import NavMenu from "./NavMenu";

const Header = () => {
  return (
    <div className=" mb-10 ">
      <div className="flex items-center">
        <img src="../../assets/logo.png" className="logo" />
        <Link to="/">
          <h1 className="header">nc news</h1>
        </Link>
      </div>
      <div
        className="grid grid-cols-5 items-center
      ]"
      >
        <hr className=" border-red-700 border-2 col-span-4 mr-10"></hr>
        <NavMenu />
      </div>
    </div>
  );
};

export default Header;
