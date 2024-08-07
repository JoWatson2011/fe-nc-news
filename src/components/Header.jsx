import { Link } from "react-router-dom";
import NavMenu from "./NavMenu";
import GitHubIcon from "@mui/icons-material/GitHub";

const Header = () => {
  return (
    <header className="flex flex-col">
      <p className="text-gray-400 text-right px-2">
        This website was built by Jo Watson as a portfolio project.{" "}
        <a
          href="https://github.com/JoWatson2011/fe-nc-news"
          className="underline hover:text-gray-700"
        >
          Source code here
          <GitHubIcon className="ml-1" />
        </a>
      </p>
      <div>
        <Link to="/">
          <div className="flex items-center">
            <img
              src="https://github.com/JoWatson2011/fe-nc-news/blob/main/assets/logo.png?raw=true"
              className="h-[65px] ml-5 mr-3"
            />
            <h1 className=" text-[65px] font-mono text-red-600">nc news</h1>
          </div>
        </Link>
        <div className="flex items-center">
          <hr className=" border-grey-400 border col-span-4 mr-3 grow"></hr>
          <NavMenu />
        </div>
      </div>
    </header>
  );
};

export default Header;
