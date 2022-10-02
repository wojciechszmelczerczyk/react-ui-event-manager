import events from "../fixtures/events.json";
import { config } from "dotenv";

config();

beforeEach(() => {
  cy.visit("http://localhost:5000/createEvent");

  localStorage.setItem("at", process.env.REACT_APP_JWT);
});

describe("create event", () => {
  it("when title and date of event are provided correctly, should redirect to main calendar page", () => {
    cy.get("[data-cy='eventTitleInput']").type(events[0].eventTitle);

    cy.get("[data-cy='createEventBtn']").click();

    cy.location().should((loc) => {
      expect(loc.href).to.eq("http://localhost:5000/");
    });
  });

  it("when title of event not provided, should prompt an error", () => {
    cy.get("[data-cy='createEventBtn']").click();
    cy.get("[data-cy='eventError']").should(
      "contain",
      "Event title has to be provided"
    );
  });

  it("when date of event not provided, should prompt an error", () => {
    cy.get("[data-cy='eventTitleInput']").type(events[0].eventTitle);

    cy.get(".react-datetime-picker__clear-button").click({ multiple: true });

    cy.get("[data-cy='createEventBtn']").click();

    cy.get("[data-cy='eventError']").should(
      "contain",
      "Event start date has to be provided"
    );
  });
});
