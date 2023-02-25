# meet-app

## Objective

To build a serveless, progressive web application (PWA) with React using test-driven developemt (TDD) technique. The application uses the Google Calender API to fetch upcoming events.

## The 5 W's

- WHO: users of the meet application
- WHAT: a PWA with the ability to work offline and a serverless backend developed using TDD technique
- WHEN: users will be able to use the app whenever they want to view upcoming events for a specific city
- WHERE: the serverless function is hosted by a AWS and the app itself is also hosted online making shareable and installable. It can be used even when the user is offline. It is a responsive app.
- WHY: Serverless is the next generation of clous infrastructute, PWA provides great user experience and TDD technique ensure quality code and adequate test coverage

## Key Features

- filter events by city
- show/hide event details
- specify number f events
- use app when offline
- add an app shortcut to hime screen
- view a chart showing the number of upcoming evets by city

## User stories and scenarios

- User story:
  As a user, I should be able to filter events by city, so that I can see the full list of events that take place in that city.
- Scenario:
  Given the list of events has been loaded
  When the user filters the events by city
  Then the events shown will only take place in that city

- User story:
  As a user, I should be able to see the default state of a collapsed event element, so that I can see the full list of events without too many details.
- Scenario:
  Given the list of events has been loaded
  When the user views it
  Then the event element will be collapsed by default

- User story:
  As a user, I should be able to expand an event, so that I can see its details.
- Scenario:
  Given the list of events has been loaded
  When the user clicks on an event
  Then the event will expanded to show its details

- User story:
  As a user, I should be able to collapse an event, so that the details are hidden.
- Scenario:
  Given the event element has been expanded
  When the user clicks on the event element
  Then the event element will be collapsed

- User story:
  As a user, I should be able to view the default number of events (32), so that the amount of events shown is not overwhelming.
- Scenario:
  Given that the list of collapsed event has been loaded
  When user view it
  Then only the default 32 events will be shown

- User story:
  As a user, I should be able to change the number of events shown, so that I can view as many events at once as I want to.
- Scenario:
  Given that the list of collapsed event has been loaded
  When the user changes the number of events that are shown
  Then the number of events that will be shown is the number the user chose

- User story:
  As a user, I should be able to be able to view cached data when there is no internet, so that I can use the app offline.
- Scenario:
  Given that there was no internet
  When the user uses the app
  Then the cached data will be shown in the app

- User story:
  As a user, I should be able to see an error when I change the settings while being offline, so that I know that the app needs to be online to view other events.
- Scenario:
  Given that there was no internet
  When the users changes the settings in the app
  Then an error message will be shown

- User story:
  As a user, I should be able to view a chart with the number of upcoming events in each city, so that I get a good quick overview of the events everywhere.
- Scenario:
  Given that the app has been opened to the specific view
  When the user views it
  Then a chart with the number of upcoming events in each city will be shown

## Technical requirements

- The app must be a React application
- The app must be built using the TDD technique.
- The app must use the Google Calendar API and OAuth2 authentication flow.
- The app must use serverless functions (AWS lambda is preferred) for the authorization server
  instead of using a traditional server.
- The app’s code must be hosted in a Git repository on GitHub.
- The app must work on the latest versions of Chrome, Firefox, Safari, Edge, and Opera, as well
  as on IE11.
- The app must display well on all screen sizes (including mobile and tablet) widths of 1920px
  and 320px.
- The app must pass Lighthouse’s PWA checklist.
- The app must work offline or in slow network conditions with the help of a service worker.
- Users may be able to install the app on desktop and add the app to their home screen on
  mobile.
- The app must be deployed on GitHub Pages.
- The API call must use React axios and async/await.
- The app must implement an alert system using an OOP approach to show information to the
  user.
- The app must make use of data visualization (recharts preferred).
- The app must be covered by tests with a coverage rate >= 90%.
- The app must be monitored using an online monitoring tool
