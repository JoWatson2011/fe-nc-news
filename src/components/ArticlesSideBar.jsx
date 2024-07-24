import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

export default function ArticleSidebar({ topics, currentTopic }) {
  const [expanded, setExpanded] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [menuStyle, setMenuStyle] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);

      setWindowWidth((prevWidth) => {
        console.log("prevWidth:", prevWidth);
        if (window.innerWidth < 430) {
          setExpanded(false);
          setMenuStyle("fixed z-1 bg-red-600/90 min-w-[160px] h-full  p-6");
        } else {
          setExpanded(true);
          setMenuStyle("min-w-[165px] p-3 ml-2");
        }
        return window.innerWidth;
      });
    };

    handleWindowResize();
    window.addEventListener("resize", handleWindowResize);

    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return (
    <div>
      {expanded ? (
        <div className=" h-full border-r ">
          <section className={menuStyle}>
            {windowWidth < 430 ? (
              <CloseIcon onClick={() => setExpanded(false)} />
            ) : null}
            <h4 className="mb-4 font-bold mt-4">Topics</h4>
            <ul>
              {topics.map((topic) => {
                const topicSelectedClass =
                  currentTopic === topic.slug ? "font-bold text-red-700" : "";
                return (
                  <Link
                    to={`/articles?topic=${topic.slug}`}
                    reloadDocument="true"
                  >
                    <li className={topicSelectedClass}>{topic.slug}</li>
                  </Link>
                );
              })}
            </ul>
          </section>
        </div>
      ) : (
        <MenuIcon onClick={() => setExpanded(true)} />
      )}
    </div>
  );
}
