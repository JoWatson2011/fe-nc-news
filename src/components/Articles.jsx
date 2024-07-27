import { getRequest } from "../utils/api";
import { useContext, useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import ArticleCard from "./ArticleCard";
import Loading from "./Loading";
import ArticlesSideBar from "./ArticlesSideBar";
import ErrorComponent from "./ErrorComponent";
import ArticlesListOptions from "./ArticlesListOptions";
import { TopicsContext } from "../contexts/TopicsContext";
import Pagination from "@mui/material/Pagination";

const Articles = ({
  listArticles,
  setlistArticles,
  isLoading,
  setIsLoading,
}) => {
  const { topics, awaitingTopics } = useContext(TopicsContext);

  const [searchParams, setSearchParams] = useSearchParams();
  const [currentTopic, setCurrentTopic] = useState(searchParams.get("topic"));
  const [currentTopicDescription, setCurrentTopicDescription] = useState("");
  const [sortBy, setSortBy] = useState(searchParams.get("sort_by"));
  const [order, setOrder] = useState(searchParams.get("order"));
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalArticleCount, setTotalArticleCount] = useState(0);

  useEffect(() => {
    let getRequestURL = "/api/articles?";
    getRequestURL += currentTopic ? `topic=${currentTopic}` : "";

    getRequestURL += currentTopic && sortBy ? "&" : "";

    getRequestURL += sortBy ? `sort_by=${sortBy}` : "";
    getRequestURL += order && sortBy ? `&order=${order}` : "";
    getRequestURL += `&p=${page}`;

    console.log(page);
    getRequest(getRequestURL).then((body) => {
      const { articles, total_count } = body;
      setTotalArticleCount(total_count);
      setlistArticles(articles);
      setIsLoading(false);
    });
  }, [sortBy, order, page]);

  useEffect(() => {
    if (currentTopic && !awaitingTopics) {
      const currentTopicApi = topics.filter((apiTopic) => {
        return apiTopic.slug === currentTopic;
      });
      setCurrentTopicDescription(currentTopicApi[0].description);
    }
  }, [currentTopic]);

  return (
    <div className="flex">
      <ArticlesSideBar currentTopic={currentTopic} />
      <div>
        <div className="m-10">
          <div>
            <h2 className=" font-mono text-[30px] ml-6">
              <Link to="/articles" reloadDocument="true">
                Articles
              </Link>
              {error ? null : (
                <span className=" text-red-700">
                  {" "}
                  {currentTopic ? `/ ${currentTopic}` : ""}{" "}
                </span>
              )}
            </h2>
            {currentTopic ? (
              <h3 className="ml-10 mb-10 font-mono">
                {currentTopicDescription}
              </h3>
            ) : null}
          </div>
        </div>

        {error ? (
          <ErrorComponent error={error} />
        ) : (
          <div className="flex flex-col ml-3">
            <div className="ml-10">
              <ArticlesListOptions
                setSortBy={setSortBy}
                setOrder={setOrder}
                currentTopic={currentTopic}
              />
            </div>
            {isLoading ? <Loading /> : null}
            {listArticles.map((article) => {
              return (
                <ArticleCard
                  article={article}
                  setArticle={setlistArticles}
                  key={article.article_id}
                />
              );
            })}
          </div>
        )}
        <Pagination
          count={Math.ceil(totalArticleCount / 10)}
          onChange={(e, page) => {
            e.preventDefault();
            setPage(page);
          }}
        />
      </div>
    </div>
  );
};
export default Articles;
