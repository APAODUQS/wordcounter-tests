Feature: Counter functionality

  Scenario: Successful counter
    Given the user navigates to the url: "https://wordcounter.net/"
    And the user types in the textbox field: "Something like lumu lumu"
    When the counter validate text
    Then the application returns the text has 4 words and 24 characters
    And the keyword 1 density for the word "lumu" is "2 (50%)"
    And the keyword 2 density for the word "something" is "1 (25%)"
    And the keyword 3 density for the word "like" is "1 (25%)"