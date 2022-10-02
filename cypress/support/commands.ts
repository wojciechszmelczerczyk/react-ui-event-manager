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
      login(user: IUser): Chainable<void>;
      //   drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
      //   dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
      //   visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
      register(user: IUser): Chainable<void>;
    }
  }
}

export {};
