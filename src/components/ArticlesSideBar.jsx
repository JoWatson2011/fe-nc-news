import { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { TopicsContext } from "../contexts/TopicsContext";
import Loading from "./Loading";

export default function ArticleSidebar({ currentTopic }) {
  const { topics, awaitingTopics } = useContext(TopicsContext);

  const [expanded, setExpanded] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [menuStyle, setMenuStyle] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);

      setWindowWidth((prevWidth) => {
        if (window.innerWidth <= 431) {
          setExpanded(false);
          setMenuStyle("fixed z-1 -translate-y-5 bg-red-600/90 min-w-[160px] h-full  p-3 rounded-r-[20px]");
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
            {windowWidth <= 431 ? (
              <CloseIcon onClick={() => setExpanded(false)} />
            ) : null}
            <h4 className="mb-4 font-bold mt-4">Topics</h4>
            {awaitingTopics ? (
              <Loading />
            ) : (
              <ul>
                {topics.map((topic) => {
                  const topicSelectedClass =
                    currentTopic === topic.slug ? "font-bold" : "";
                  return (
                    <Link
                      to={`/articles?topic=${topic.slug}`}
                      reloadDocument="true"
                      key={topic.slug}
                    >
                      <li className={topicSelectedClass} key={topic.slug}>
                        {topic.slug}
                      </li>
                    </Link>
                  );
                })}
              </ul>
            )}
          </section>
        </div>
      ) : (
        <div className="m-3 fixed  -translate-y-11 z-1 ">
          <MenuIcon
            onClick={() => setExpanded(true)}
            className="border border-white rounded-full bg-white"
          />
        </div>
      )}
    </div>
  );
}
