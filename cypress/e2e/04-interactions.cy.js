/// <reference types="cypress" />

describe('Interactions', ()=>{
    Cypress.on('uncaught:exception', (err,runnable) =>{
        return false
    })
    beforeEach(()=>{
        cy.intercept('GET', 'https://oajs.openx.net/esp*', { statusCode: 200 }).as('blockedRequest');
        cy.visit('https://demoqa.com/', {
            timeout: 90000 // 1:30 minutes
        });
        cy.contains('Interactions').click()

    })
    it('Sortable',()=>{
        cy.contains('span', 'Sortable').click();
        cy.get('#demo-tab-grid').click();
        cy.get('create-grid').contains('one').click();

    })
})