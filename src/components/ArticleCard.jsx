import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link, useNavigate } from "react-router-dom";
import LikeButton from "./LikeButton";

const ArticleCard = ({ article, setArticle }) => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex flex-row w-full mt-5 mb-5">
        <div className="mr-10">
          <img src={article.article_img_url} className="article-image" />
          <LikeButton postWithVotes={article} setFunction={setArticle} />
        </div>
        <div>
          <h3 className="font-mono font-semibold">{article.title}</h3>
          <p
            onClick={() => {
              navigate(`/articles/${article.article_id}`);
            }}
            className="font-mono text-red-900"
          >
            {article.topic}
          </p>
          <p className="font-mono">{article.created_at.slice(0, 10)}</p>
          <p className="font-mono">{article.comment_count} comments</p>
        </div>
      </div>
      <hr></hr>
    </div>
  );
};
export default ArticleCard;
