# nc news

[**nc news**](https://jowatson-portfolio-nc-news.netlify.app) is a social news
aggregation, web content reating and discussion website. Users can post articles
and interact with posted articles by adding comments and upvoting/downvoting.


It has been built with **react**, styled with **tailwind** and hosted with
**netlify**:
[https://jowatson-portfolio-nc-news.netlify.app](https://jowatson-portfolio-nc-news.netlify.app)

Details of the back-end can be found
[here](https://github.com/JoWatson2011/nc-news)

#### Features to Add

- ~~Pagination of articles and comments~~ _PR #24_
- ~~Post an article~~ _PR #22_
- ~~Change which user you are logged in as~~
- View details of logged in user's account

### Install & run locally

1. Clone the repository:

```bash
 git clone https://github.com/JoWatson2011/fe-nc-news
```

2. Install dependencies:

```bash
 npm install
```

3.  Run the launch script:

```bash
npm run dev
```

Note: this has been built and tested with node v21.6.1

### Development notes

Prior to building the app, I planned it out using a wireframe and a component
tree. I considered which api endpoints would need to be accessed from each
component and how to responsibly set state and pass down data on props.
![ReactState](https://github.com/JoWatson2011/fe-nc-news/blob/main/assets/plan-state.png?raw=true)
![ComponentTree](https://github.com/JoWatson2011/fe-nc-news/blob/main/assets/plan-component-tree.png?raw=true)



---

This portfolio project was created as part of a Digital Skills Bootcamp in
Software Engineering provided by [Northcoders](https://northcoders.com/)
