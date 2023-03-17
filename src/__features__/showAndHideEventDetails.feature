Feature: Show and Hide Event Details

  Scenario: An event is collapsed by default
    Given that the list of events has been loaded
    When the users views the list and performs no action
    Then all event details should be collapsed

  Scenario: User can expand an event to see the details
    Given that the user has selected an event
    When the user clicks on the Show Details button
    Then the event details will be expanded and displayed

  Scenario: User can collapse the event details
    Given that a user does not want to view the expanded details anymore
    When the user clicks the Hide Details button
    Then the event details should be collapsed