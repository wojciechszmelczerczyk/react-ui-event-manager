import { config } from "dotenv";
import events from "../fixtures/events.json";
import users from "../fixtures/users.json";

config();

beforeEach(() => {
  cy.visit("http://localhost:5000/login");
  cy.login(users[3]);
});

describe("main calendar", () => {
  it("when add event button clicked, should redirect to create event form", () => {
    cy.get("[data-cy='calendarAddEventBtn']").click();

    cy.location().should((loc) => {
      expect(loc.href).to.eq("http://localhost:5000/createEvent");
    });
  });

  it("when event clicked, event details popup should appear", () => {
    cy.createEvent(events[2]);

    cy.get("[data-cy='eventDetailsPopup']").should("exist");
  });

  it("when event details prompt open and click close symbol, should disappear", () => {
    // click add event button on main calendar
    cy.createEvent(events[2]);

    cy.get("[data-cy='closeEventPrompt']").click();

    cy.get("[data-cy='eventDetailsPopup']").should("not.exist");
  });

  it("when event details prompt open and click trash icon, delete dialog should appear", () => {
    cy.createEvent(events[2]);

    cy.get("[data-cy='deleteEvent']").click();

    cy.get("[data-cy='deleteDialog']").should("exist");
  });
});
