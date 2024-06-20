import { useEffect, useState } from "react";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
export default function ArticleSidebar({ children }) {
  const [expanded, setExpanded] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleWindowResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);

    console.log(windowWidth);
    // Return a function from the effect that removes the event listener
    if (windowWidth < 430) {
      // Width of Samsung Galazy S20 Ultra
      setExpanded(false);
    } else {
      setExpanded(true);
    }
    return () => window.removeEventListener("resize", handleWindowResize);
  }, [window.innerWidth]);

  return (
    <div>
      {expanded ? null : (
        <button
          type="button"
          onClick={() => {
            setExpanded(true);
          }}
        >
          <KeyboardArrowRightIcon />
        </button>
      )}
      {expanded ? (
        <div>
          <button
            type="button"
            onClick={() => {
              setExpanded(false);
            }}
          >
            <KeyboardArrowLeftIcon />
          </button>
          <menu name="Topics">
             
          </menu>
        </div>
      ) : null}
    </div>
  );
}
