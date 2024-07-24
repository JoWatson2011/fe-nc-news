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
        <NavMenu />
      </div>
      <hr className=" border-grey-400 border col-span-4"></hr>
    </div>
  );
};

export default Header;
