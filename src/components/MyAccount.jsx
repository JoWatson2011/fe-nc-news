import Button from "@mui/material/Button";
import { useContext, useEffect, useState } from "react";
import { UserDispatchContext, UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { getRequest } from "../utils/api";
import ArticleCard from "./ArticleCard";

const MyAccount = () => {
  const dispatch = useContext(UserDispatchContext);
  const { userDetails } = useContext(UserContext);
  const navigate = useNavigate();

  const [userArticles, setUserArticles] = useState([]);

  if (!userDetails.username) navigate("/login");

  useEffect(() => {
    getRequest("/api/articles").then(({ articles }) => {
      const userArticles = articles.filter(
        (article) => article.author === userDetails.username
      );
      setUserArticles(userArticles);
    });
  }, []);

  return (
    <main className="flex flex-col w-full place-items-center space-y-5">
      <Button
        sx={{
          borderRadius: "30px",
          color: "darkred",
          border: "1px solid darkred",
        }}
        onClick={() => {
          dispatch({ type: "logout" });
          navigate("/");
        }}
      >
        Log Out
      </Button>
      <div className="flex flex-col items-center">
        <img
          src={userDetails.avatar_url}
          className="rounded-full border-2 border-red-800 h-[70px] mr-5"
        />
        <h2 className="text-[30px] font-mono ">{userDetails.name}</h2>
      </div>

      <div>
        <h3 className="text-[20px] font-mono ">Your articles</h3>
        <section className=" border border-grey p-5 rounded-[20px]">
          {userArticles.map((article) => {
            return <ArticleCard article={article} key={article.article_id} />;
          })}
        </section>
      </div>
    </main>
  );
};

export default MyAccount;
