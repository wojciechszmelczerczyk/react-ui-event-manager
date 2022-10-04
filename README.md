# Event Manager App UI

## Description

UI for Event Manager App

## Table of contents

- [Technologies](#technologies)
- [Usage](#usage)
- [Client routing](#client-routing)
- [Context](#context)
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

## Context

Tracking state of global changes.

```javascript
export const AuthCtx = createContext({
  authenticated: false,
  setAuthenticated: (auth: boolean) => {},
});
```

ex.

```javascript
const newUser = await login({ firstName, lastName, email, password });

if (newUser) {
  // update auth context after successful login
  setAuthenticated(true);
}
```

## Tests

### To run tests

```
npm run e2e
```

### Remarks

- Please make sure fourth user (i.e users[3]) in `fixtures` directory exist in database, otherwise ui test for login will fail.

- Please after register spec tests delete in database last added user (i.e users[2]) in `fixtures` directory since no afterAll hook was implemented.

### Register custom function

<details>
<summary>Fill all inputs and submit
</summary>

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

</details>
<br />

### Login custom function

<details>
<summary>Fill all inputs and submit
</summary>

```javascript
Cypress.Commands.add("login", (user) => {
  if (user.email.length > 0) {
    cy.get("[data-cy='emailInput']").type(user.email);
  }

  cy.get("[data-cy='passwordInput']").type(user.password);
  cy.get("[data-cy='formBtn']").click();
});
```

</details>

<br />

### Create event custom function

<details>
<summary>fill title input, submit, event should appear in callendar</summary>

```javascript
Cypress.Commands.add("createEvent", (event) => {
  cy.get("[data-cy='calendarAddEventBtn']").click();

  cy.get("[data-cy='eventTitleInput']").type(event.eventTitle);

  cy.get("[data-cy='createEventBtn']").click();

  cy.get(".rbc-event-content").contains(event.eventTitle).click();
});
```

</details>

<br />

### `Register form`

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
<summary>when no first name is provided, div should contain error message</summary>

```javascript
it("when no first name is provided, div should contain error message", () => {
  cy.register(users[1]);

  cy.get("[data-cy='errMsg']").should("contain", "Please enter a first name");
});
```

</details>

<details>
<summary>when provided email doesn't match email regex, div should contain error message</summary>

```javascript
it("when provided email doesn't match email regex, div should contain error message", () => {
  cy.register(users[2]);

  cy.get("[data-cy='errMsg']").should("contain", "Please enter a valid email");
});
```

</details>
<br />

### `Login form`

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
<summary>when provided email is incorrect, div should contain error message</summary>

```javascript
it("when provided email is incorrect, div should contain error message", () => {
  cy.login(users[1]);

  cy.get("[data-cy='errMsg']").should(
    "contain",
    "Provide correct email. User with this email doesn't exist"
  );
});
```

</details>

<details>
<summary>when no email is provided, div should contain error message</summary>

```javascript
it("when no email is provided, div should contain error message", () => {
  cy.login(users[4]);

  cy.get("[data-cy='errMsg']").should("contain", "Please enter an email");
});
```

</details>
<br />

### `Create Event`

<details>
<summary>when title and date of event are provided correctly, should redirect to main calendar page</summary>

```javascript
 it("when title and date of event are provided correctly, should redirect to main calendar page", () => {
    cy.get("[data-cy='eventTitleInput']").type(events[0].eventTitle);

    cy.get("[data-cy='createEventBtn']").click();

    cy.location().should((loc) => {
      expect(loc.href).to.eq("http://localhost:5000/");
    });
```

</details>

<details>
<summary>when title of event not provided, div should contain error message</summary>

```javascript
it("when title of event not provided, div should contain error message", () => {
  cy.get("[data-cy='createEventBtn']").click();
  cy.get("[data-cy='eventError']").should(
    "contain",
    "Event title has to be provided"
  );
});
```

</details>

<details>
<summary>when date of event not provided, div should contain error message</summary>

```javascript
it("when date of event not provided, div should contain error message", () => {
  cy.get("[data-cy='eventTitleInput']").type(events[0].eventTitle);

  cy.get(".react-datetime-picker__clear-button").click({ multiple: true });

  cy.get("[data-cy='createEventBtn']").click();

  cy.get("[data-cy='eventError']").should(
    "contain",
    "Event start date has to be provided"
  );
});
```

</details>
<br />

### `Calendar`

<details>
<summary>when add event button clicked, should redirect to create event form</summary>

```javascript
it("when add event button clicked, should redirect to create event form", () => {
    cy.get("[data-cy='calendarAddEventBtn']").click();

    cy.location().should((loc) => {
      expect(loc.href).to.eq("http://localhost:5000/createEvent");
    });
```

</details>

<details>
<summary>when event clicked, event details popup should appear</summary>

```javascript
it("when event clicked, event details popup should appear", () => {
  cy.createEvent(events[2]);

  cy.get("[data-cy='eventDetailsPopup']").should("exist");
});
```

</details>

<details>
<summary>when event details prompt open and click close symbol, should disappear</summary>

```javascript
it("when event details prompt open and click close symbol, should disappear", () => {
  // click add event button on main calendar
  cy.createEvent(events[2]);

  cy.get("[data-cy='closeEventPrompt']").click();

  cy.get("[data-cy='eventDetailsPopup']").should("not.exist");
});
```

</details>

<details>
<summary>when event details prompt open and click trash icon, delete dialog should appear</summary>

```javascript
it("when event details prompt open and click trash icon, delete dialog should appear", () => {
  cy.createEvent(events[2]);

  cy.get("[data-cy='deleteEvent']").click();

  cy.get("[data-cy='deleteDialog']").should("exist");
});
```

</details>
