import { useNavigate } from "react-router-dom";

export default function ArticlesListOptions({ setSortBy, setOrder }) {
  const navigate = useNavigate();

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
    <div>
      <label className="font-bold pr-4" htmlFor="sort-by">
        Sort By
      </label>
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
    </div>
  );
}
