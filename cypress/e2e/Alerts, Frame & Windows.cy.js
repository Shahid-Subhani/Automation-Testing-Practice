/// <reference types="cypress" />

describe('Alerts, Frame & Windows', ()=>{
    Cypress.on('uncaught:exception', (Error, Runnable) =>{
        return false;
    });

    beforeEach(()=>{
        cy.intercept('GET', 'https://oajs.openx.net/esp*', { statusCode: 200 }).as('blockedRequest');
        cy.visit('https://demoqa.com/', {
            timeout: 90000 // 1:30 minutes
        });
        cy.intercept('POST', 'https://events.backtrace.io/api/**', { statusCode: 200 }).as('backtrace');
        cy.scrollTo('0%', '10%');
        cy.contains('Elements').click();
    });

    it('Browser Windows', ()=>{
        cy.contains('span', 'Alerts, Frame & Windows').click();
        cy.contains('span', 'Browser Windows').click();
        cy.xpath('//*[@id="tabButton"]').invoke('removeAttr', 'sample').click();
        cy.pause();
        cy.xpath('//*[@id="windowButton"]').invoke('removeAttr', 'target').click();
        cy.pause();
        cy.get('[id="messageWindowButton"]').click();
    });

    it('Alerts', ()=>{
        cy.contains('span', 'Windows').click();
        cy.get(':nth-child(3) > .element-list > .menu-list > #item-1').click({force: true});
        cy.wait(5000);
        cy.get('#alertButton').click();
        cy.get('#timerAlertButton').click();
        cy.wait(7000);
        cy.get('#confirmButton').click();
        cy.get('#promtButton').click();
    });

    it('Frames', ()=>{
        cy.contains('span', 'Windows').click();
        cy.contains('span', 'Frames').click();

        const getIframeDocument = (iframeSelector) => {
            return cy
              .get(iframeSelector)
              .should('exist');
        };

        const getIframeBody = (iframeSelector) => {
            return getIframeDocument(iframeSelector)
              .should('not.be.undefined')
              .then(cy.wrap);
        };

        // Example: Interact with an element inside the first iframe
        getIframeBody('iframe:first').find('selector-for-element').click();

        // Example: Interact with an element inside the second iframe
        getIframeBody('iframe:last').find('selector-for-element').type('text');

        // Switch back to the parent frame
        cy.get('selector-in-parent-frame').click();

        // Add the assertion here
        cy.wrap({ foo: 'bar' }).its('quux').should('not.exist');
    });
    it.only('', ()=> {
        cy.contains('span', 'Windows').click();
        cy.contains('span', 'Nested Frames').click();
        

    })
});
