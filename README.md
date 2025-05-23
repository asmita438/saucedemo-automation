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
   cd saucedemo-automation
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

**Note about UI Mode:** When using UI mode, you'll initially see a blank browser window. To view test execution:
1. Select a specific test case from the left panel
2. Click the "Run" button at the top
3. The browser content will then appear as the test executes
4. You can use the trace viewer to analyze test execution afterward

```

Run specific test suites:
```
npm run test:login
npm run test:inventory
npm run test:cart
npm run test:checkout

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

## Test Coverage
### Login Tests
- Should login successfully with valid credentials
- Should show error with invalid credentials
- Should show error for locked out user

### Inventory Page Tests
- Should display all inventory items
- Should add product to cart
- Should sort products by price (low to high)

### Cart Tests

- Should display correct items in cart
- Should remove item from cart
- Should navigate from cart to checkout

### Checkout Tests

- Should complete checkout process successfully
- Should show error with empty checkout information
- Should calculate correct total with tax

## CI/CD Integration

The project includes GitHub Actions workflow configuration for continuous integration.
