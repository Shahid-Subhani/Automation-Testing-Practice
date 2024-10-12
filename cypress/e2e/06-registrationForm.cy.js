/// <reference types="cypress" />
    const mockedCode = 'CDC5';
describe('Visit Website Selenium training page', ()=>{
    Cypress.on('uncaught:exception', (err,runnable) =>{
        return false   
    })
    
    it('Go To Registration and Form Fill Up', ()=>{
      cy.visit('https://www.toolsqa.com/selenium-training/');
      cy.get('[href="#enroll-form"]').click({multiple:true});
      cy.get('[name="firstName"]').type('Automation');
      cy.get('[name="lastName"]').type('Engineering');
      cy.get('#email').type('automationTesting@example.com');
      cy.get('#mobile').type('6788066092');
      cy.get('#country').select('Australia');
      cy.get('#city').type('Greater Brisbane');
      cy.get('#message').type('Hello World! Welcome to QA Automation. Thank you');
    //   mocked code applied
      cy.get('img.upcoming__registration--captcha', { timeout: 10000 }).should('be.visible');       
      cy.get('#code', { timeout: 10000 }).should('be.visible').type(mockedCode, {force: true});
      cy.contains('Send').click(); 

    });
});