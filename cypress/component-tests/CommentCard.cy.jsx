import React from "react";
import CommentCard from "../../src/components/CommentCards";

describe("<CommentCard />", () => {
  it("renders", () => {
    const exampleComment = {
      body: "This is a bad article name",
      votes: 1,
      author: "butter_bridge",
      article_id: 6,
      created_at: "2020-10-11T15:23:00.000Z",
      comment_id: 16,
    };
    // see: https://on.cypress.io/mounting-react
    cy.mount(<CommentCard comment={exampleComment} />);
    cy.get(".w-12").should("have.text", exampleComment.votes);
    cy.get("h4").should("have.text", exampleComment.author);
    cy.get("[data-cy=date]").should(
      "have.text",
      exampleComment.created_at.slice(0, 10)
    );
    cy.get("[data-cy=body]").should("have.text", exampleComment.body);
  });
});
