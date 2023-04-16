import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import PT from "prop-types";
import axios from "axios";
import { articlesUrl } from "./App";
import { token } from "./App";

export default function Articles(props) {
  const {
    getArticles,
    articles,
    deleteArticle,
    setCurrentArticle,
    setCurrentArticleId,
  } = props;
  // ✨ where are my props? Destructure them here

  // ✨ implement conditional logic: if no token exists
  // we should render a Navigate to login screen (React Router v.6)

  useEffect(() => {
    console.log("i fire once");
    getArticles();
    // ✨ grab the articles here, on first render only
  }, []);

  const editArticle = (id, title, text, topic) => {
    setCurrentArticle({
      article_id: id,
      title: title,
      text: text,
      topic: topic,
    });
  };

  return (
    // ✨ fix the JSX: replace `Function.prototype` with actual functions
    // and use the articles prop to generate articles
    <div className="articles">
      <h2>Articles</h2>
      {!articles.length
        ? "No articles yet"
        : articles.map((art) => {
            return (
              <div className="article" key={art.article_id}>
                <div>
                  <h3>{art.title}</h3>
                  <p>{art.text}</p>
                  <p>Topic: {art.topic}</p>
                </div>
                <div>
                  <button
                    disabled={false}
                    onClick={() =>
                      editArticle(
                        art.article_id,
                        art.title,
                        art.text,
                        art.topic
                      )
                    }
                  >
                    Edit
                  </button>
                  <button
                    disabled={false}
                    onClick={() => deleteArticle(art.article_id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
    </div>
  );
}

// 🔥 No touchy: Articles expects the following props exactly:
Articles.propTypes = {
  articles: PT.arrayOf(
    PT.shape({
      // the array can be empty
      article_id: PT.number.isRequired,
      title: PT.string.isRequired,
      text: PT.string.isRequired,
      topic: PT.string.isRequired,
    })
  ).isRequired,
  getArticles: PT.func.isRequired,
  deleteArticle: PT.func.isRequired,
  setCurrentArticleId: PT.func.isRequired,
  currentArticleId: PT.number, // can be undefined or null
};
