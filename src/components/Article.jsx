import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getRequest } from "../utils/api";
import LikeButton from "./LikeButton";
import Comments from "./Comments";
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
    <div className="ml-10 mr-10 max-w-700">
      <h2 className="font-mono text-[40px]">{article.title}</h2>
      <LikeButton postWithVotes={article} setFunction = {setArticle}/>
      <p className=" text-red-900">
        Posted on {article.created_at} by {article.author}
      </p>
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
      <Comments article_id={article_id} />
    </div>
  );
};
export default Article;
