import { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import PublicIcon from "@mui/icons-material/Public";
import { TopicsContext } from "../contexts/TopicsContext";
import Loading from "./Loading";
import NavButton from "./NavButton";

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
          setMenuStyle(
            "fixed z-1 top-0 bg-red-600/90 min-w-[160px] h-full  p-3 rounded-r-[20px]"
          );
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
    <>
      {expanded ? (
        <div id="exapnded-nav" className=" h-full border-r">
          <section className={menuStyle}>
            {windowWidth <= 431 ? (
              <CloseIcon onClick={() => setExpanded(false)} />
            ) : null}
            <div className="flex flex-col max-w-[120px] space-y-4">
              <NavButton
                buttonText={"Trending"}
                handleClick={() => navigate("/")}
                icon={<TrendingUpIcon />}
                id="/"
              />
              <NavButton
                buttonText={"All Articles"}
                handleClick={() => navigate("/articles")}
                icon={<PublicIcon />}
                id="articles"
              />
            </div>
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
                        {topic.slug.slice(0, 1).toUpperCase() +
                          topic.slug.slice(1)}
                      </li>
                    </Link>
                  );
                })}
              </ul>
            )}
          </section>
        </div>
      ) : (
        <MenuIcon
          onClick={() => setExpanded(true)}
          className=" fixed top-5 left-0 z-10 border border-white rounded-full bg-white m-3"
        />
      )}
    </>
  );
}
