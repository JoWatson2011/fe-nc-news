import React from "react";
import LikeButton from "../../src/components/LikeButton";

describe("<LikeButton />", () => {
  it("renders", () => {
    cy.mount(<LikeButton />);
  });
});
