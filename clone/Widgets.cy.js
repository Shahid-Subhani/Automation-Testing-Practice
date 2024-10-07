/// <reference types="cypress" />

describe('Widgets', ()=>{
    Cypress.on('uncaught:exception', (Error, Runnable) => {
        return false
    })
    beforeEach(()=>{
        cy.intercept('GET', 'https://oajs.openx.net/esp*', { statusCode: 200 }).as('blockedRequest');
            cy.visit('https://demoqa.com/', {
                timeout: 90000 // 1:30 minutes
            
            });
            
            cy.intercept('POST', 'https://events.backtrace.io/api/**', { statusCode: 200 }).as('backtrace');
            cy.scrollTo('0%', '10%');
            cy.contains('Widgets').click();
    })
    it('Widgets = Accordian', ()=>{
        
        cy.contains('span', 'Accordian').click();
        cy.get('#section1Heading').click();
        cy.wait(2000);
        cy.get('#section2Heading').click();
        cy.wait(2000);
        cy.get('#section3Heading').click();

    })
    it('Auto Complete', ()=>{
        cy.contains('span', 'Auto Complete').click();
        cy.get('#autoCompleteMultipleContainer').type('blue', 'black', 'green')
    })
})