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

| Endpoint       | Authenticated |      Component       | Description       |
| :------------- | :-----------: | :------------------: | ----------------- |
| `/`            |      \*       |  CalendarComponent   | User calendar     |
| `/createEvent` |      \*       | CreateEventComponent | Create event form |
| `/register`    |       -       |  RegisterComponent   | Register form     |
| `/login`       |       -       |    LoginComponent    | Login form        |

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

### Login form

<details>
<summary>when credentials of user are correct, redirect to main page</summary>

```javascript
it("when credentials of user are correct, redirect to main page", () => {
  cy.login(users[3]);

  cy.location().should((loc) => {
    expect(loc.href).to.eq("http://localhost:5000/");
  });
});
```

</details>

<details>
<summary>when clicked link in form, should redirect to register form</summary>

```javascript
it("when clicked link in form, should redirect to register form", () => {
  cy.get("[data-cy='linkToForm']").click();

  cy.location().should((loc) => {
    expect(loc.href).to.eq("http://localhost:5000/register");
  });
});
```

</details>

<details>
<summary>when no first name is provided, error div should contain a specific error</summary>

```javascript
it("when no first name is provided, error div should contain a specific error", () => {
  cy.login(users[1]);

  cy.get("[data-cy='errMsg']").should(
    "contain",
    "Provide correct email. User with this email doesn't exist"
  );
});
```

</details>

<details>
<summary>when no first name is provided, error div should contain a specific error</summary>

```javascript
it("when no first name is provided, error div should contain a specific error", () => {
  cy.login(users[4]);

  cy.get("[data-cy='errMsg']").should("contain", "Please enter an email");
});
```

</details>
