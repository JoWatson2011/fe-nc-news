import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getRequest } from "../utils/api";
import LikeButton from "./LikeButton";
const Article = ({ article, setArticle }) => {
  const { article_id } = useParams();

  useEffect(() => {
    getRequest(`/api/articles/${article_id}`, { params: { article_id } })
      .then(({ article }) => {
        article.created_at = article.created_at.slice(0, 10);
        setArticle(article);
      })
      .catch((err) => console.log(err));
  }, [article_id]);

  return (
    <div className="ml-10 mr-10 ">
      <div className="grid grid-cols-5 grid-rows-2 mr-0 ">
        <h2 className="col-span-4 font-mono text-[40px]">{article.title}</h2>
        <LikeButton className="row-span-2 col-span-1" article={article} />
        <p className=" text-red-900 col-span-5">
          Posted on {article.created_at} by {article.author}
        </p>
      </div>
      <img src={article.article_img_url} />
      <br />
      <p>{article.body}</p>
      <br />
      <hr className="border-black" />
      <Link to={`/articles?topic=${article.topic}`} className="italic">
        More articles about
        <span className=" text-red-900 t"> {article.topic}</span>
      </Link>
      <br />
      <br />
    </div>
  );
};
export default Article;
