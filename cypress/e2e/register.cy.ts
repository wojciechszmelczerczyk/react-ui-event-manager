import users from "../fixtures/users.json";

beforeEach(() => cy.visit("http://localhost:5000/"));

describe("register", () => {
  it("when credentials of user are correct, redirect to login form page", () => {
    cy.register(users[0]);

    cy.location().should((loc) => {
      expect(loc.href).to.eq("http://localhost:5000/login");
    });
  });

  it("when clicked link in form, should redirect to login form", () => {
    cy.get("[data-cy='linkToForm']").click();

    cy.location().should((loc) => {
      expect(loc.href).to.eq("http://localhost:5000/login");
    });
  });

  it("when no first name is provided, error div should contain a specific error", () => {
    cy.register(users[1]);

    cy.get("[data-cy='errMsg']").should("contain", "Please enter a first name");
  });

  it("when provided email doesn't match email regex, error div should contain a specific error", () => {
    cy.register(users[2]);

    cy.get("[data-cy='errMsg']").should(
      "contain",
      "Please enter a valid email"
    );
  });
});
