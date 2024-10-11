/// <reference types="cypress" />

describe('Visit Book store and perform actions', ()=>{
    Cypress.on('uncaught:exception', (err,runnable) => {
        return false
    });
    beforeEach(()=>{
        cy.intercept('GET', 'https://oajs.openx.net/esp*', { statusCode: 200 }).as('blockedRequest');
        cy.intercept('https://b1-wndc1.zemanta.com/**', { statusCode: 200 }).as('blockedScript');
        cy.intercept('POST', 'https://events.backtrace.io/api/**', { statusCode: 200 }).as('backtrace');
        cy.visit('https://demoqa.com/login', {
            timeout: 90000 // 1:30 minutes
        
        });
        
        // scroll to Elements section
        cy.scrollTo('0%', '10%');
        cy.contains('Book Store Application').click({force:true});
    })
    it('Login', ()=>{
        cy.intercept('POST', 'https://www.google.com/recaptcha/api2/userverify*', {
            statusCode: 200,
            body: { success: true }, // Mock a successful reCAPTCHA response
        }).as('captchaValidation');

        // Intercept the registration API call
        cy.intercept('POST', '/api/register', {
            statusCode: 201,
            body: {
                success: true,
                message: 'Registration successful!',
            },
        }).as('registerRequest');
        
        // attempt to login without credentials
        cy.get('button[id="login"]').click();
        // Register a new user
        cy.contains('button', 'New User').click();
        cy.get('[placeholder="First Name"]').type('QA Automation');
        cy.get('[placeholder="Last Name"]').type('Engineering');
        cy.get('[placeholder="UserName"]').type('QATesting');
        cy.get('[placeholder="Password"]').type('Testingautomation#09');
        cy.pause()
        cy.contains('button', 'Register').click();
        
    })
})

