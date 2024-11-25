describe('Login Feature - search.permission.io', () => {
  const baseUrl = 'https://search.permission.io';

  beforeEach(() => {
    cy.visit(baseUrl);
    // Navigate to the login section or click login button to open the login modal
    cy.get('.h-auto > .sticky > .relative > .flex > .inline-flex:nth-child(3)').click();
  });

  /**
   * Login Tests
   */
  it('Validates successful login with valid credentials', () => {
    cy.get('#username').type('thang.jay@gmail.com');
    cy.get('#password').type('P4ssw0rd');

    // Pause for manual ReCaptcha solving
    cy.pause(); // Solve ReCaptcha manually and then click login button

    cy.get('#kc-login').click();
    cy.url().should('include', '/dashboard'); // Update with actual dashboard URL
  });

  it('Tests login failure with incorrect credentials', () => {
    cy.get('#username').type('invalidUsername');
    cy.get('#password').type('invalidPassword');

    cy.get('#kc-login').click();
    cy.get('.error-message').should('contain', 'Invalid credentials'); // Update based on actual error message
  });

  it('Tests account lockout after multiple failed login attempts', () => {
    for (let i = 0; i < 5; i++) {
      cy.get('#username').type('invalidUsername');
      cy.get('#password').type('invalidPassword');
      cy.get('#kc-login').click();
    }
    cy.get('.error-message').should('contain', 'Account locked'); // Update based on actual lockout message
  });

  /**
   * Form Validation Tests
   */
  it('Validates required fields display error messages', () => {
    cy.get('#kc-login').click(); // Submit form without filling anything
    cy.get('#username-error').should('contain', 'Username is required'); // Update selector and message
    cy.get('#password-error').should('contain', 'Password is required'); // Update selector and message
  });

  it('Checks validation for invalid email format', () => {
    cy.get('#username').type('invalid-email');
    cy.get('#password').type('somepassword');
    cy.get('#kc-login').click();
    cy.get('#username-error').should('contain', 'Enter a valid email address'); // Update selector and message
  });

  /**
   * UI Element Checks
   */
  it('Verifies visibility and functionality of UI elements', () => {
    // Check username and password fields are visible
    cy.get('#username').should('be.visible');
    cy.get('#password').should('be.visible');

    // Check login button is enabled
    cy.get('#kc-login').should('be.enabled');

    // Check for forgotten password link
    cy.get('.forgot-password-link').should('be.visible').and('contain', 'Forgot your password?');
    cy.get('.forgot-password-link').click();
    cy.url().should('include', '/forgot-password'); // Update URL as needed
    cy.go('back'); // Navigate back to the login page

    // Check that ReCaptcha iframe is present
    cy.get('iframe[title="reCAPTCHA"]').should('exist');
  });
});
