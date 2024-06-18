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
        <hr className=" border-red-700 border-2 col-span-4 mr-10"></hr>
        <p className="grid col-span-1 text-red-700">MENU</p>
      </div>
    </div>
  );
};

export default Header;
