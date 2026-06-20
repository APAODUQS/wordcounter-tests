# wordcounter-tests

This is an automation framework to test the application [WordCounter](https://wordcounter.net/). The application counts words and characters on a text, also help people to improve word choice and writing style.
Here you can see 2 frameworks building with Playwright library, first one integrating with Cucumber and second one implemented with Playwright Test Runner.

## Documentation

If you want to know more about Playwright and Playwright/Test please visit: [Playwright Docs](https://playwright.dev/docs/intro)

## Installation

1.  You need to have **Node.js version 20** installed or above and **npm version greather than 8.0.0**. If you are working in macOS it requires 11 (Big Sur) or above. We are using the playwright library for executing tests, then you have to install the library and the supported browsers:

```bash
Install playwright
npm i -D @playwright/test
# install supported browsers
npx playwright install
```

2. Clone this repository
   `git clone https://github.com/APAODUQS/wordcounter-tests.git`

3. Move to the folder:
   `cd *-counter`

4. Install dependencies
   `npm install `

5. Run all tests locally
   `npm run test `

If you dont get any issues at this point you are ready to use the Automation Framework

## Usage

This is an small test example:

```typescript:
// Import interfaces from playwright test
import { expect } from '@playwright/test'

// Use the test keyword to indicate you are creating a test and a proper description
// Pass the fixture you want to work in, in this case is a page that come from Playwright but you can create your own fixtures
test('basic test', async ({ page }) => {
  // Start: Navigation to a specific URL
  await page.goto('https://playwright.dev/')
  // Arrange: Find locators
  const title = page.locator('.navbar__inner .navbar__title')
  // Assert: Test validation
  await expect.soft(title, 'Some error message').toHaveText('Playwright')
})
```

## Execute the tests

This project includes a number of configurations to set up and run the tests:

1. The `playwright.config.ts` file includes the global configuration for Playwright.

2. Set the environment variables and create an .env file or export the variables from command line, example:

```
TEXT="The text that I want to analize"
```

4. For executing tests:

```bash
npm run test
```

5. Other ways to run the tests:

```bash
# To run specific test files, specify the route of the tests:
npx playwright test tests/TEST_CLASS.spec.ts --config=playwright.config.ts

# Run a set of test files
npx playwright test tests/TEST_CLASS_1/ tests/TEST_CLASS_2/

# Run files that have KEY_1 or KEY_2 in the file name
npx playwright test KEY_1 KEY_2

# Run the test with the title
npx playwright test -g "SOME_TITLE"

# Run tests in headed browsers
npx playwright test --headed

# Run tests in a particular configuration (project)
npx playwright test --project PROJECT
# Or contains multiple projects:
npx playwright test --project PROJECT1 PROJECT2

# Run in debug mode with Playwright Inspector
npx playwright test --debug

# Run only the tests that contains a tag:
npx playwright test --grep @YOUR_TAG
# Or contains multiple tag:
npx playwright test --grep "@TAG1|@TAG2"

# Or if you want the opposite, you can skip the tests with a certain tag:
npx playwright test --grep-invert @YOUR_TAG_SKIP
```

If you need help, you can execute:

```bash
npx playwright test --help
```

## Test Results

### Reporters

The easiest way to try out built-in reporters is to pass --reporter command line option.

```bash
# List reporter is default (except on CI where the dot reporter is default). It prints a line for each test being run.
npx playwright test --reporter=list
# Line reporter uses a single line to report last finished test, and prints failures when they occur.
npx playwright test --reporter=line
# HTML reporter produces a self-contained folder that contains report for the test run that can be served as a web page.
npx playwright test --reporter=html
# JSON reporter produces an object with all information about the test run and you need to set the PLAYWRIGHT_JSON_OUTPUT_NAME environment variable.
PLAYWRIGHT_JSON_OUTPUT_NAME=results.json npx playwright test --reporter=json
# JUnit reporter produces a JUnit-style xml report and you need to set the PLAYWRIGHT_JUNIT_OUTPUT_NAME environment variable.
PLAYWRIGHT_JUNIT_OUTPUT_NAME=results.xml npx playwright test --reporter=junit
```

When you generate an HTML report, you can execute the command for reviewing it:

```bash
npx playwright show-report my-report
```

### Trace viewer

To see a trace zip file, specify the route of the trace:
`npx playwright show-trace test-results/TRACE_RESULT_DIR/trace.zip`

With this trace you can see:

- The list of actions Playwright performed on the left hand side. When you select an action you can see:
  - Action snapshots.
  - Action log.
  - Source code location.
  - Network log for this action in the properties pane.
  - Rendered DOM snapshots associated with each action.
- Screenshots: When tracing with the screenshots option turned on, each trace records screencast and renders it as a film strip and you can hover over it to see a magnified image
- Snapshots​ When tracing with the snapshots option turned on, Playwright captures a set of complete DOM snapshots for each action.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

Keep in mind we use Playwright as a base library, which forcing us to use await several times, we know promises can work too, but we use them for specific cases like expecting for some service requests or similar, but in an underlying way the framework is already doing that for us.

### Branching Model

1. Please create branches always from main branch and tied them to an specific Jira ticket, this is the way we can trace better about what your changes are about.
2. If the branch is related to a Feature for the framework always start with the Feature keyword, if it is Hotfix it will also start with Hotfix keyword
3. Every request requires two approvals, one should be from one member of the testing team.
4. Ondemand pipeline will be associated to each pull request to guarantee one successfull build before merge

An example of the current flow will be something like this:

- Create branch and do your changes

```bash
git checkout main
git checkout -b feature_branch
git add .
git commit -m "yourmessage"
git push
```

- Create the pull request and get reviews
- Fix comments and conflicts

```bash
git add .
git commit -m "fixingcomments"
```

- Merge and delete branch

```bash
git checkout main
git merge feature_branch
git branch -d feature_branch
```

## Execute analysis for the code style

You have to set some rules about the code style in the file `.prettierrc`, or you can use the default rules. From those rules, you can verify your code style executing:
`npm run prettier:check`
In this way you can see any error or warning. For fixing those errors and warnings that can be fixed autocally, you can execute:
`npm run prettier:write`.


# Run text analyzer
1. Go to analyzer directory:
```
cd analyzer
```
2. Run the analyzer executing:
```
npm run analyze
``` 
When you run this command you have to copy, paste or types the text you want to analyze.
3. Also you are able to set previously the text to analyze setting:
``` 
npm run analyze -- "something text lumu lumu lumu"
``` 
4. You also are able to set an specific file to analyze:
``` 
npm run analyze -- example.txt
``` 
5. Finally you will get the analysis report in the terminal like this:
``` 
--- Analysis Result ---
5 words
29 characters 

lumu: 3 -  60%
something: 1 -  20%
text: 1 -  20%
``` 