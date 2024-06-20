import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getRequest } from "../utils/api";
import LikeButton from "./LikeButton";
import Comments from "./Comments";
import ErrorComponent from "./ErrorComponent";
const Article = ({ article, setArticle }) => {
  const [error, setError] = useState(null);

  const { article_id } = useParams();

  useEffect(() => {
    getRequest(`/api/articles/${article_id}`, { params: { article_id } })
      .then(({ article }) => {
        article.created_at = article.created_at.slice(0, 10);
        setArticle(article);
      })
      .catch((err) => {
        console.log(err);
        setError(err);
      });
  }, [article_id]);

  if (error) return <ErrorComponent error={error} />;

  return (
    <div className="ml-10 mr-10 max-w-700">
      <h2 className="font-mono text-[40px]">{article.title}</h2>
      <LikeButton postWithVotes={article} setFunction={setArticle} />
      <p className=" text-red-900">
        Posted on {article.created_at} by {article.author}
      </p>
      <img src={article.article_img_url} />
      <br />
      <p>{article.body}</p>
      <br />
      <hr className="border-black" />

      <Link to={`/articles?topic=${article.topic}`}>
        <p className="p-8 italic">
          More articles about
          <span className=" text-red-900 t"> {article.topic}</span>
        </p>
      </Link>
      <br />

      <Comments article_id={article_id} />
    </div>
  );
};
export default Article;
