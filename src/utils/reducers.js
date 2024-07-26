const topicsReducer = (topics, action) => {
  switch (action.type) {
    case "initialDataFetched": {
      return action.data;
    }
    case "added": {
      return [...topics, action.data];
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
};

export default topicsReducer;
