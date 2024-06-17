import * as React from "react";
import Divider from "@mui/material/Divider";

const Header = () => {
  return (
    <div className=" mb-10">
      <h1 className=" font-mono text-[70px] text-red-700">nc news</h1>
      <div
        className="grid grid-cols-5
      ]"
      >
        <hr className=" border-red-400 border-4 col-span-4 mr-10"></hr>
        <p className="grid col-span-1">MENU</p>
      </div>
    </div>
  );
};

export default Header;
