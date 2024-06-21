import { useEffect } from "react";
import { useParams, useNavigate ,Link } from "react-router-dom";
import { getRequest } from "../utils/api";
import LikeButton from "./LikeButton";
import Comments from "./Comments";
import NavButton from "./NavButton";
import { Nav } from "react-bootstrap";
const Article = ({ article, setArticle }) => {
  const navigate = useNavigate();
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
      <LikeButton postWithVotes={article} setFunction={setArticle} />
      <p className=" text-red-900">
        Posted on {article.created_at} by {article.author}
      </p>
      <img src={article.article_img_url} />
      <br />
      <p>{article.body}</p>
      <br />
      <hr className="border-black" />
      {/* <Link to={`/articles?topic=${article.topic}`} className="italic"> */}
      <NavButton
        buttonText={`More articles about ${article.topic}`}
        handleClick={() => {
          navigate(`/articles?topic=${article.topic}`);
        }}
      />

      {/* </Link> */}
      <br />
      <br />
      <Comments article_id={article_id} />
    </div>
  );
};
export default Article;
