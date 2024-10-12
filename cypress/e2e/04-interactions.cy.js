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
        cy.get('#demo-tabpane-grid > div > div > div:nth-child(1)').click();
        cy.get('#demo-tabpane-grid > div > div > div:nth-child(2)').click();
        cy.get('#demo-tabpane-grid > div > div > div:nth-child(3)').click();
        cy.get('#demo-tabpane-grid > div > div > div:nth-child(4)').click();
        cy.get('#demo-tabpane-grid > div > div > div:nth-child(5)').click();
        cy.get('#demo-tabpane-grid > div > div > div:nth-child(6)').click();
        cy.get('#demo-tabpane-grid > div > div > div:nth-child(7)').click();
        cy.get('#demo-tabpane-grid > div > div > div:nth-child(8)').click();
        cy.get('#demo-tabpane-grid > div > div > div:nth-child(9)').click();
        cy.get('#demo-tab-list').click();
        cy.xpath('//*[@id="demo-tabpane-list"]/div/div[1]').click();
        cy.xpath('//*[@id="demo-tabpane-list"]/div/div[2]').click();
        cy.xpath('//*[@id="demo-tabpane-list"]/div/div[3]').click();
        cy.xpath('//*[@id="demo-tabpane-list"]/div/div[4]').click();
        cy.xpath('//*[@id="demo-tabpane-list"]/div/div[5]').click();
        cy.xpath('//*[@id="demo-tabpane-list"]/div/div[6]').click();
    })
    it('Selectable', ()=>{
        cy.contains('span', 'Selectable').click();
        cy.get('#demo-tab-grid').click();
        cy.xpath('//*[@id="row1"]/li[1]').click();
        cy.xpath('//*[@id="row1"]/li[2]').click();
        cy.xpath('//*[@id="row1"]/li[3]').click();
        cy.xpath('//*[@id="row3"]/li[1]').click();
        cy.xpath('//*[@id="row3"]/li[2]').click();
        cy.xpath('//*[@id="row3"]/li[3]').click();
        cy.xpath('//*[@id="row2"]/li[3]').click();
        cy.xpath('//*[@id="row2"]/li[2]').click();
        cy.xpath('//*[@id="row2"]/li[1]').click();
        cy.get('#demo-tab-list').click();
        cy.xpath('//*[@id="verticalListContainer"]/li[1]').click();
        cy.xpath('//*[@id="verticalListContainer"]/li[4]').click();
        cy.xpath('//*[@id="verticalListContainer"]/li[2]').click();
        cy.xpath('//*[@id="verticalListContainer"]/li[3]').click();
    })
})