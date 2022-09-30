# Event Manager App UI

## Description

UI for Event Manager App

## Table of contents

- [Technologies](#technologies)
- [Usage](#usage)
- [Client routing](#client-routing)
- [Tests](#tests)

## Technologies

- `react`
- `tailwindcss`

## Usage

### Clone repository

```sh
git clone https://github.com/wojciechszmelczerczyk/react-ui-event-manager.git
```

### Navigate to proejct folder

```sh
cd /react-ui-event-manager
```

### Install dependencies

```sh
npm i
```

### Run React server

```sh
npm run start
```

## Client routing

| Endpoint    | Authenticated |     Component     | Description   |
| :---------- | :-----------: | :---------------: | ------------- |
| `/`         |      \*       | CalendarComponent | User calendar |
| `/register` |       -       | RegisterComponent | Register form |
| `/login`    |       -       |  LoginComponent   | Login form    |

## Tests

### To run tests

```
npm run e2e
```

### Register custom function

Fill all inputs and submit

```javascript
Cypress.Commands.add("register", (user) => {
  if (user.firstName.length > 0) {
    cy.get("[data-cy='firstNameInput']").type(user.firstName);
  }

  cy.get("[data-cy='lastNameInput']").type(user.lastName);
  cy.get("[data-cy='emailInput']").type(user.email);
  cy.get("[data-cy='passwordInput']").type(user.password);
  cy.get("[data-cy='formBtn']").click();
});
```

### Register form

<details>
<summary>when credentials of user are correct, redirect to login form page</summary>

```javascript
it("when credentials of user are correct, redirect to login form page", () => {
  cy.register(users[0]);

  cy.location().should((loc) => {
    expect(loc.href).to.eq("http://localhost:5000/login");
  });
});
```

</details>

<details>
<summary>when clicked link in form, should redirect to login form</summary>

```javascript
it("when clicked link in form, should redirect to login form", () => {
  cy.get("[data-cy='linkToForm']").click();

  cy.location().should((loc) => {
    expect(loc.href).to.eq("http://localhost:5000/login");
  });
});
```

</details>

<details>
<summary>when no first name is provided, error div should contain a specific error</summary>

```javascript
it("when no first name is provided, error div should contain a specific error", () => {
  cy.register(users[1]);

  cy.get("[data-cy='errMsg']").should("contain", "Please enter a first name");
});
```

</details>

<details>
<summary>when provided email doesn't match email regex, error div should contain a specific error</summary>

```javascript
it("when provided email doesn't match email regex, error div should contain a specific error", () => {
  cy.register(users[2]);

  cy.get("[data-cy='errMsg']").should("contain", "Please enter a valid email");
});
```

</details>
