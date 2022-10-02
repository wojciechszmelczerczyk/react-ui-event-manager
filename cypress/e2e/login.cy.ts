import users from "../fixtures/users.json";

beforeEach(() => cy.visit("http://localhost:5000/login"));

describe("login", () => {
  it("when credentials of user are correct, redirect to main page", () => {
    cy.login(users[3]);

    cy.location().should((loc) => {
      expect(loc.href).to.eq("http://localhost:5000/");
    });
  });

  it("when clicked link in form, should redirect to register form", () => {
    cy.get("[data-cy='linkToForm']").click();

    cy.location().should((loc) => {
      expect(loc.href).to.eq("http://localhost:5000/register");
    });
  });

  it("when no first name is provided, div should contain error message", () => {
    cy.login(users[1]);

    cy.get("[data-cy='errMsg']").should(
      "contain",
      "Provide correct email. User with this email doesn't exist"
    );
  });

  it("when no first name is provided, div should contain error message", () => {
    cy.login(users[4]);

    cy.get("[data-cy='errMsg']").should("contain", "Please enter an email");
  });
});
