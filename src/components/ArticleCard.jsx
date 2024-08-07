import { Link, useNavigate } from "react-router-dom";
import LikeButton from "./LikeButton";

const ArticleCard = ({ article, setArticle }) => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex flex-row w-full mt-5 mb-5">
        <div className="mr-10">
          <img
            onClick={() => {
              navigate(`/articles/${article.article_id}`);
            }}
            src={article.article_img_url}
            className="w-[120px] h-[80px] rounded-[20px]"
          />
          <LikeButton postWithVotes={article} setFunction={setArticle} />
        </div>
        <div>
          <h3
            className="font-mono font-semibold"
            onClick={() => {
              navigate(`/articles/${article.article_id}`);
            }}
          >
            {article.title}
          </h3>
          <Link to={`/articles?topic=${article.topic}`} reloadDocument="true">
            <p className="font-mono text-red-900">{article.topic}</p>
          </Link>
          <p className="font-mono">{article.created_at.slice(0, 10)}</p>
          <p className="font-mono">{article.comment_count} comments</p>
        </div>
      </div>
      <hr></hr>
    </div>
  );
};
export default ArticleCard;
