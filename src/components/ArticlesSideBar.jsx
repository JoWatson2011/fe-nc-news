import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

export default function ArticleSidebar({ topics, currentTopic }) {
  const [expanded, setExpanded] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleWindowResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);

    if (windowWidth < 430) {
      // Width of Samsung Galazy S20 Ultra
      setExpanded(false);
    } else {
      setExpanded(true);
    }
    return () => window.removeEventListener("resize", handleWindowResize);
  }, [window.innerWidth]);

  return (
    <div className="ml-10">
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
        <div className="border border-box rounded">
          <button
            type="button"
            onClick={() => {
              setExpanded(false);
            }}
          >
            <KeyboardArrowLeftIcon />
          </button>
          <menu name="Topics"></menu>

          <section className=" p-8">
            <h4 className="mb-4 font-bold mt-4">Topics</h4>
            <hr></hr>
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
      ) : null}
    </div>
  );
}
