import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import ReplayIcon from "@mui/icons-material/Replay";
import PublishIcon from "@mui/icons-material/Publish";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TopicsContext } from "../contexts/TopicsContext";
import { TopicsDispatchContext } from "../contexts/TopicsContext";
import { UserContext } from "../contexts/UserContext";
import { postRequest } from "../utils/api";
import Loading from "./Loading";

const PostArticle = () => {
  const { topics, awaitingTopics } = useContext(TopicsContext);
  const dispatch = useContext(TopicsDispatchContext);
  const { user } = useContext(UserContext);

  const navigate = useNavigate();

  const [selectedTopic, setSelectedTopic] = useState("");
  const [newTopic, setNewTopic] = useState("");
  const [newTopicDescription, setNewTopicDescription] = useState("");
  const [articleTitle, setArticleTitle] = useState("");
  const [articleBody, setArticleBody] = useState("");
  const [articleImg, setArticleImg] = useState("");
  const [articlePosted, setArticlePosted] = useState("No");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTopic) {
      postRequest("/api/topics/", {
        slug: newTopic,
        description: newTopicDescription,
      }).then(({ topic }) => {
        dispatch({ type: "added", data: topic });
        setSelectedTopic(topic.slug);
      });
    }

    const postRequestParams = {
      title: articleTitle,
      topic: selectedTopic,
      author: user,
      body: articleBody,
      article_img_url: articleImg,
    };

    postRequest("/api/articles", postRequestParams)
      .then(({ article }) => {
        setArticlePosted("success");
        setTimeout(() => {
          setSelectedTopic("");
          setNewTopic("");
          setArticleTitle("");
          setArticleBody("");
          setArticleImg("");
          navigate(`/articles/${article.article_id}`);
        }, 3000);
      })
      .catch(() => {
        setArticlePosted("error");
      });
  };
  const handleReset = (e) => {
    e.preventDefault();
    setSelectedTopic("");
    setNewTopic("");
    setArticleTitle("");
    setArticleBody("");
    setArticleImg("");
  };
  return (
    <main>
      <h2 className=" font-mono text-[30px] ml-6">Post an article</h2>
      <h3 className="ml-6">
        {" "}
        You are logged in as{" "}
        <Link to="/account" className="text-red-700">
          {user}
        </Link>
      </h3>
      <div className="m-auto w-[80%] flex flex-col">
        <Button
          variant="outlined"
          startIcon={<ReplayIcon />}
          onClick={handleReset}
          className="place-self-end"
        >
          Reset
        </Button>
        <form onSubmit={handleSubmit}>
          {awaitingTopics ? (
            <Loading />
          ) : (
            <div>
              <Select
                label="Select Topic"
                value={selectedTopic}
                onChange={(e) => setSelectedTopic(e.target.value)}
                placeholder="Select a topic"
                className="w-[70%]"
              >
                {[...topics, { slug: "Create new topic..." }].map((topic) => {
                  return (
                    <MenuItem key={topic.slug} value={topic.slug}>
                      {topic.slug}
                    </MenuItem>
                  );
                })}
              </Select>
              {selectedTopic === "Create new topic..." ? (
                <div className="flex justify-stretch w-[70%]">
                  <TextField
                    label="New topic name"
                    value={newTopic}
                    onChange={(e) => {
                      setNewTopic(e.target.value);
                    }}
                    className="w-full"
                  />
                  <TextField
                    label="Describe your new topic"
                    value={newTopicDescription}
                    margin="normal"
                    onChange={(e) => {
                      setNewTopicDescription(e.target.value);
                    }}
                    className="w-full"
                  />
                </div>
              ) : null}
            </div>
          )}

          <TextField
            label="Title"
            value={articleTitle}
            onChange={(e) => setArticleTitle(e.target.value)}
            margin="normal"
            className="w-full"
          />
          <TextField
            label="Body"
            multiline
            rows={4}
            value={articleBody}
            onChange={(e) => setArticleBody(e.target.value)}
            margin="normal"
            className="w-full"
          />
          <TextField
            label="Article Image (URL)"
            value={articleImg}
            onChange={(e) => setArticleImg(e.target.value)}
            margin="normal"
            className="w-full"
          />
          <Button type="submit" variant="outlined" startIcon={<PublishIcon />}>
            Post Article
          </Button>
        </form>
        {articlePosted === "success" ? (
          <p className="text-green-700">
            Article Posted! Navigating to new article...
          </p>
        ) : null}
        {articlePosted === "error" ? (
          <p className="text-red-700">
            Error posting article. Please try again later.
          </p>
        ) : null}
      </div>
    </main>
  );
};
export default PostArticle;
