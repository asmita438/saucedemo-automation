# SauceDemo Automated Test Suite

This project contains automated tests for the [SauceDemo](https://www.saucedemo.com/) website using Playwright with TypeScript, following the Page Object Model design pattern.

## Features

- Page Object Model implementation for clean test structure
- Fixture-based test data management
- Test coverage for key user flows:
  - Login functionality
  - Product browsing and sorting
  - Shopping cart operations
  - Checkout process
- Cross-browser testing support (Chrome, Firefox, Safari)
- Mobile device testing
- Parallel test execution
- Screenshot and video capture on failure

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Setup

1. Clone this repository:
   ```
   git clone https://github.com/asmita438/saucedemo-automation
   cd saucedemo-test-suite
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Install browsers:
   ```
   npx playwright install
   ```

## Running Tests

Run all tests:
```
npm test
```

Run tests in headed mode (with browser visible):
```
npm run test:headed
```

Run tests with UI mode:
```
npm run test:ui
```

Run specific test suites:
```
npm run test:login
npm run test:inventory
npm run test:cart
npm run test:checkout
npm run test:fixture
```

Run tests in a specific browser:
```
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

Run a specific test file:
```
npm run test:file -- path/to/your/file.spec.ts
```

## Test Reports

After running tests, view the HTML report:
```
npm run report
```

## Project Structure

- `tests/` - Test specifications organized by feature
- `page-objects/` - Page Object Model classes
  - `Components/` - Reusable page components (header)
- `fixtures/` - Test data and custom fixtures
- `playwright.config.ts` - Playwright configuration

## Using Fixtures

This project uses Playwright fixtures for:

1. Test data management (`testData` fixture)
2. Common test setup like pre-authenticated states (`loggedInPage` fixture)

## CI/CD Integration

The project includes GitHub Actions workflow configuration for continuous integration.