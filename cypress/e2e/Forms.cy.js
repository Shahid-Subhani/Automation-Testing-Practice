/// <reference types="cypress" />

describe('Forms', ()=>{
    Cypress.on('uncaught:exception', (Error, Runnable) =>{
        // returning false here prevents cypress from failing test
        return false
    })
    it('Practice Form', ()=>{
        cy.intercept('GET', 'https://oajs.openx.net/esp*', { statusCode: 200 }).as('blockedRequest');
            cy.visit('https://demoqa.com/', {
                timeout: 90000 // 1:30 minutes
            
            });
            
            cy.intercept('POST', 'https://events.backtrace.io/api/**', { statusCode: 200 }).as('backtrace');
            cy.scrollTo('0%', '10%');
            cy.contains('Forms').click();
            cy.contains('span', 'Practice Form').click();
            cy.get('[placeholder="First Name"]').type('Automation');
            cy.get('[placeholder="Last Name"]').type('testing');
            cy.get('[placeholder="name@example.com"]').type('automationTesting@outlook.com');
            cy.contains('label', 'Male').click();
            cy.get('[placeholder="Mobile Number"]').type('6788066092');
            cy.get('#dateOfBirthInput').click();
            cy.get('.react-datepicker__year-select').select('2000');
            cy.get('.react-datepicker__month-select').select('January');
            cy.get('.react-datepicker__day--015').click();
            cy.get('#subjectsInput').type('English{enter}').type('Computer Science{enter}');
            cy.contains('label', 'Sports').click( {force: true});
            cy.contains('label', 'Reading').click( {force: true});
            cy.contains('label', 'Music').click( {force: true});
            cy.get('[class="form-file-label"]').click();
            cy.get('[placeholder="Current Address"]').type('123 Harry Poter St');
            cy.xpath('//*[@id="state"]/div/div[2]/div').type('NCR{enter}').click();
            cy.xpath('//*[@id="city"]/div/div[2]/div').type('Delhi{enter}');
            cy.contains('button', 'Submit').click();
    })
})