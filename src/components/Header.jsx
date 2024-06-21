import { Link } from "react-router-dom";
import NavMenu from "./NavMenu";

const Header = () => {
  
  return (
    <div className=" mb-10">
      <Link to="/">
        <h1 className=" font-mono text-[70px] text-red-700">nc news</h1>
      </Link>
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
