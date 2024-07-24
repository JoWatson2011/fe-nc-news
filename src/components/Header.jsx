import { Link } from "react-router-dom";
import NavMenu from "./NavMenu";

const Header = () => {
  return (
    <div>
      <div className="flex items-center">
        <img src="../../assets/logo.png" className="h-[65px] ml-5 mr-3" />
        <Link to="/">
          <h1 className=" text-[65px] font-mono text-red-600">nc news</h1>
        </Link>
      </div>
      <div className="grid grid-cols-5 items-center">
        <hr className=" border-grey-400 border col-span-4 mr-3"></hr>
        <NavMenu />
      </div>
    </div>
  );
};

export default Header;
