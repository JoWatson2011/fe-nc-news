import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

const ArticleCard = ({ article, setArticle }) => {
  return (
    <Card
      sx={{ maxWidth: 345 }}
      className=" hover:shadow-xl"
      onClick={() => {
        setArticle(article.article_id);
      }}
    >
      <CardMedia
        sx={{ height: 140 }}
        image={article.article_img_url}
        title={article.title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {article.title}
        </Typography>
        <Typography
          gutterBottom
          variant="p"
          component="div"
          className=" text-red-900 text-right"
        >
          {article.topic[0].toUpperCase() + article.topic.slice(1)}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">+1</Button>
        <Link to={`/articles/${article.article_id}`}>
          <Button size="small">Read More</Button>
        </Link>
      </CardActions>
    </Card>
  );
};
export default ArticleCard;
