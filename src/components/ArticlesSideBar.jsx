import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

export default function ArticleSidebar({
  setSortBy,
  setOrder,
  topics,
  currentTopic,
}) {
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
    const sortOrderValues = {
      newest: { sort_by: "created_at", order: "desc" },
      oldest: { sort_by: "created_at", order: "asc" },
      mostComments: { sort_by: "comment_count", order: "desc" },
      leastComments: { sort_by: "comment_count", order: "asc" },
      mostVotes: { sort_by: "votes", order: "desc" },
      leastVotes: { sort_by: "votes", order: "asc" },
    };
    const { sort_by, order } = sortOrderValues[e.target.value];

    setSortBy(sort_by);
    setOrder(order);

    const navigateURL = currentTopic
      ? `/articles?topic=${currentTopic}&sort_by=${sort_by}&order=${order}`
      : `/articles?sort_by=${sort_by}&order=${order}`;
    navigate(navigateURL);
  };

  return (
    <div className=" ml-10">
      {expanded ? (
        <button
          type="button"
          onClick={() => {
            setExpanded(false);
          }}
          name="close-articles-sidebar"
          // className="border pt-10 "
        >
          <span className="flex gap-1 font-mono italic">
            Collapse <KeyboardArrowLeftIcon />
          </span>
        </button>
      ) : (
        <button
          type="button"
          onClick={() => {
            setExpanded(true);
          }}
          name="open-articles-sidebar"
          className="grid grid-cols-2 gap-1 "
        >
          <span className="flex gap-1 font-mono italic">
            Menu <KeyboardArrowRightIcon />
          </span>
        </button>
      )}
      {expanded ? (
        <div //className=" pt-10 border border-box rounded border-green-500 !important"
          className="menubox"
        >
          <section className=" ">
            <label className="mb-4 font-bold mt-4" htmlFor="sort-by">
              Sort By
            </label>
            <hr></hr>
            <select
              id="sort-by"
              onChange={handleSortChange}
              className=" pl-14 pr-14 rounded-full border border-gray-700"
            >
              <option value={"newest"}>Newest</option>
              <option value={"oldest"}>Oldest</option>
              <option value={"mostComments"}>Most Comments</option>
              <option value={"leastComments"}>Least Comments</option>
              <option value={"mostVotes"}>Most Votes</option>
              <option value={"leastVotes"}>Most Votes</option>
            </select>
          </section>
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
