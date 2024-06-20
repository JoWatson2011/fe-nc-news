import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

export default function ArticleSidebar({ setSortBy, topics, currentTopic }) {
  const [expanded, setExpanded] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const navigate = useNavigate();

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

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    const navigateURL = currentTopic
      ? `/articles?topic=${currentTopic}&${e.target.value}`
      : `/articles?${e.target.value}`;
    navigate(navigateURL);
  };

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

          <section className=" ">
            <h4 className="mb-4 font-bold mt-4">Sort By</h4>
            <hr></hr>
            <div className="grid grid-cols-2 grid-rows-6">
              <input
                type="radio"
                name="sort-by"
                id="newest"
                key="newest"
                value="sort_by=created_at&order=desc"
                onChange={handleSortChange}
              />
              <label htmlFor="newest">Newest</label>
              <input
                type="radio"
                name="sort-by"
                id="oldest"
                key="oldest"
                value="sort_by=created_at&order=asc"
                onChange={handleSortChange}
              />
              <label htmlFor="oldest">Oldest</label>
              <input
                type="radio"
                name="sort-by"
                id="most-comments"
                key="most-comments"
                value="sort_by=comment_count&order=desc"
                onChange={handleSortChange}
              />
              <label htmlFor="most-comments">Most comments</label>
              <input
                type="radio"
                name="sort-by"
                id="least-comments"
                key="least-comments"
                value="sort_by=comment_count&order=asc"
                onChange={handleSortChange}
              />
              <label htmlFor="least-comments">Least comments</label>
              <input
                type="radio"
                name="sort-by"
                id="most-votes"
                key="most-votes"
                value="sort_by=votes&order=desc"
                onChange={handleSortChange}
              />
              <label htmlFor="most-votes">Most votes</label>
              <input
                type="radio"
                name="sort-by"
                id="least-votes"
                key="least-votes"
                value="sort_by=votes&order=asc"
                onChange={handleSortChange}
              />
              <label htmlFor="least-votes">Least votes</label>
            </div>
          </section>
        </div>
      ) : null}
    </div>
  );
}
