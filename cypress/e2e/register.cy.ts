import user from "../fixtures/user.json";

describe("register form", () => {
  it("when credentials of user are correct, redirect to login form page", () => {
    cy.register(user);
  });
});
