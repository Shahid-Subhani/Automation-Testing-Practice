/// <reference types="cypress" />

describe('Visit Book store and perform actions', ()=>{
    Cypress.on('uncaught:exception', (err,runnable) => {
        return false
    });
    beforeEach(()=>{
        cy.intercept('GET', 'https://oajs.openx.net/esp*', { statusCode: 200 }).as('blockedRequest');
        cy.intercept('https://b1-wndc1.zemanta.com/**', { statusCode: 200 }).as('blockedScript');
        cy.intercept('POST', 'https://events.backtrace.io/api/**', { statusCode: 200 }).as('backtrace');
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
        cy.visit('https://demoqa.com/login', {
            timeout: 90000 // 1:30 minutes
        
        });
        cy.contains('Book Store Application').click({force:true});
    })
    it('Register, login, search and logout', ()=>{
        // attempt to login without credentials
        cy.get('button[id="login"]').click();
        // Register a new user
        cy.contains('button', 'New User').click();
        cy.get('[placeholder="First Name"]').type('QA Automation');
        cy.get('[placeholder="Last Name"]').type('Engineering');
        cy.get('[placeholder="UserName"]').type('QATesting');
        cy.get('[placeholder="Password"]').type('Testingautomation#09');
        cy.contains('button', 'Register').click();
        cy.wait(2000);
        // go back to login page and login with credentials 
        cy.get('button[id="gotologin"]').click();
        cy.get('[placeholder="UserName"]').type('QATesting');
        cy.get('[type="password"]').type('Testingautomation#09');
        // wait 5 secs and go to bookStore
        cy.get('button[id="login"]').click();
        cy.wait(5000);
        cy.contains('button', 'Go To Book Store').click();
        cy.contains('Book Store').click();
        cy.get(':nth-child(6) > .element-list > .menu-list > #item-2 > .text').click();
        // search every book and then clear
        cy.get('[placeholder="Type to search"]').type('Git Pocket Guide').clear().type('Learning JavaScript Design Patterns')
        .clear().type('Designing Evolvable Web APIs with ASP.NET').clear().type('Speaking JavaScript').clear()
        .type('JS').clear().type('Programming JavaScript').clear().type('Understanding ECMAScript 6').clear();
        // click on profile and logout
        cy.contains('span', 'Profile').click();
        cy.contains('Log out').click();
    });
});

