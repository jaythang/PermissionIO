# Automated Test Scripts for search.permission.io

## Overview
This project contains automated test scripts for validating critical functionalities of the web application using Cypress. The test scripts include:
- **Login Feature**: Validating successful login, incorrect credentials, and account lockout after multiple failed login attempts.
- **Form Validation**: Checking required fields, error messages for invalid inputs, and submission success.
- **UI Element Checks**: Ensuring UI elements like buttons, links, and dynamic content are working as expected.

## Prerequisites
Before setting up Cypress, ensure you have the following installed on your system:
- **Node.js** (v14 or higher): Download and install it from [Node.js](https://nodejs.org/).
- **npm** or **yarn**: Comes bundled with Node.js.

## Setup Instructions

### 1. Clone the Repository
Clone the project to your local machine:
```bash
git clone https://github.com/your-repo.git
cd your-repo
### 2. Install Cypress and Dependencies
Install Cypress and any additional dependencies specified in the package.json:
npm install
If Cypress is not included in package.json, install it manually:
npm install cypress --save-dev
3. Initialize Cypress
To initialize Cypress and set up the default folder structure:
npx cypress open
This creates the following default folder structure:
project-directory/
├── cypress/
│   ├── e2e/         # Where your test scripts go
│   ├── fixtures/    # Test data in JSON format
│   ├── support/     # Helper functions and custom commands
│   ├── videos/      # (Optional) Recorded videos of test runs
│   ├── screenshots/ # (Optional) Screenshots on test failures
├── cypress.config.js # Cypress configuration file
├── package.json      # Project dependencies and scripts

4. Configure Cypress (cypress.config.js)
The cypress.config.js file allows you to customize the behavior of Cypress. Here’s an example configuration:
const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://search.permission.io', // Default base URL
    viewportWidth: 1280,
    viewportHeight: 720,
    video: true, // Record videos of test runs
    retries: {
      runMode: 2, // Retry tests twice during `cypress run`
      openMode: 0, // No retries during `cypress open`
    },
    setupNodeEvents(on, config) {
      // You can implement custom plugins here.
      return config;
    },
  },
});

5. Create Test Scripts
Place your test scripts in the cypress/e2e directory. For example:
cypress/e2e/login.cy.js
6. Run Tests
To execute tests, use one of the following methods:

Open Cypress Test Runner
npx cypress open

This opens the Cypress Test Runner, where you can select and run individual test files.

Run Tests in Headless Mode

npx cypress run
This runs all tests in headless mode and generates a test report.
7. Generate Test Reports (Optional)
To generate detailed test reports, install the cypress-mochawesome-reporter:

npm install cypress-mochawesome-reporter --save-dev
Update your cypress.config.js to include the reporter:
javascript

const { defineConfig } = require('cypress');
const mochawesome = require('cypress-mochawesome-reporter/plugin');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      mochawesome(on);
    },
    reporter: 'cypress-mochawesome-reporter',
    reporterOptions: {
      reportDir: 'cypress/reports',
      overwrite: false,
      html: true,
      json: true,
    },
  },
});
Run Cypress tests and generate the report:

npx cypress run
Find the report in the cypress/reports folder.




