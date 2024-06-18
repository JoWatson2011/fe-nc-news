import { useState } from "react";
import NavButton from "./NavButton";
const Collapsible = ({ children, contentDescriptor }) => {
  const [isHidden, setIsHidden] = useState(true);

  const toggleIsHidden = () => {
    setIsHidden(!isHidden);
  };

  const button = (
    <NavButton
      buttonText={(isHidden ? "Show" : "Hide") + contentDescriptor}
      handleClick={toggleIsHidden}
    />
  );

  return (
    <div>
      {isHidden ? button : null}
      {isHidden ? null : children}
      {isHidden ? null : button}
    </div>
  );
};
export default Collapsible;
