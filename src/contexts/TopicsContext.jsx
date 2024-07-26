import { createContext, useEffect, useState, useReducer } from "react";
import { getRequest } from "../utils/api";
import topicsReducer from "../utils/reducers";
export const TopicsContext = createContext();
export const TopicsDispatchContext = createContext();

export const TopicsProvider = ({ children }) => {
  const [awaitingTopics, setAwaitingTopics] = useState(true);
  const [topics, dispatch] = useReducer(topicsReducer, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { topics } = await getRequest("/api/topics/");
        dispatch({ type: "initialDataFetched", data: topics });
      } catch (err) {
        console.log(err);
      } finally {
        setAwaitingTopics(false);
      }
    };

    fetchData();
  }, []);

  return (
    <TopicsContext.Provider value={{ topics, awaitingTopics }}>
      <TopicsDispatchContext.Provider value={dispatch}>
        {children}
      </TopicsDispatchContext.Provider>
    </TopicsContext.Provider>
  );
};
