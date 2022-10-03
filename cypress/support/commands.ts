import { IUser } from "../../src/interfaces/User";

/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
Cypress.Commands.add("login", (user) => {
  if (user.email.length > 0) {
    cy.get("[data-cy='emailInput']").type(user.email);
  }

  cy.get("[data-cy='passwordInput']").type(user.password);
  cy.get("[data-cy='formBtn']").click();
});

Cypress.Commands.add("register", (user) => {
  if (user.firstName.length > 0) {
    cy.get("[data-cy='firstNameInput']").type(user.firstName);
  }

  cy.get("[data-cy='lastNameInput']").type(user.lastName);
  cy.get("[data-cy='emailInput']").type(user.email);
  cy.get("[data-cy='passwordInput']").type(user.password);
  cy.get("[data-cy='formBtn']").click();
});

Cypress.Commands.add("createEvent", (event) => {
  cy.get("[data-cy='calendarAddEventBtn']").click();

  cy.get("[data-cy='eventTitleInput']").type(event.eventTitle);

  cy.get("[data-cy='createEventBtn']").click();

  cy.get(".rbc-event-content").contains(event.eventTitle).click();
});

//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
declare global {
  namespace Cypress {
    interface Chainable {
      register(user: IUser): Chainable<void>;
      login(user: IUser): Chainable<void>;
      createEvent(event: any): Chainable<void>;
      //   drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
      //   dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
      //   visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
    }
  }
}

export {};
