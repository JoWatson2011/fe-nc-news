import { createContext, useEffect, useState } from "react";
import { getRequest } from "../utils/api";
export const TopicsContext = createContext();

export const TopicsProvider = ({ children }) => {
  const [topics, setTopics] = useState([]);
  const [awaitingTopics, setAwaitingTopics] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { topics } = await getRequest("/api/topics/");
        setTopics(topics);
      } catch (err) {
        setError(err);
      } finally {
        setAwaitingTopics(false);
      }
    };

    fetchData();
  }, []);

  return (
    <TopicsContext.Provider value={{ topics, setTopics, awaitingTopics }}>
      {children}
    </TopicsContext.Provider>
  );
};
