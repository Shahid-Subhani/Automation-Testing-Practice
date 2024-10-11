    /// <reference types="cypress" />

    describe('Alerts, Frame & Windows', () => {
        Cypress.on('uncaught:exception', (err, runnable) => {
            return false;
        });

        beforeEach(() => {
            cy.intercept('GET', 'https://oajs.openx.net/esp*', { statusCode: 200 }).as('blockedRequest');
            cy.visit('https://demoqa.com/', {
                timeout: 90000 // 1:30 minutes
            });
            cy.scrollTo('0%', '10%');
            cy.contains('Elements').click();
        });

        it('Browser Windows', () => {
            cy.contains('span', 'Alerts, Frame & Windows').click();
            cy.contains('span', 'Browser Windows').click();
            // click button to open new tab 
            cy.xpath('//*[@id="tabButton"]').invoke('removeAttr', 'target').click();
            // click button to open new window
            cy.xpath('//*[@id="windowButton"]').invoke('removeAttr', 'target').click();
            // click button to get new window
            cy.get('[id="messageWindowButton"]').click();
        });

        it('Alerts', () => {
            cy.contains('span', 'Alerts, Frame & Windows').click();
            cy.get(':nth-child(3) > .element-list > .menu-list > #item-1').click({ force: true });
            cy.wait(5000);
            cy.get('#alertButton').click();
            cy.get('#timerAlertButton').click();
            cy.wait(7000);
            cy.get('#confirmButton').click();
            cy.window().then((win) => {
                cy.stub(win, 'prompt').returns('Testing input'); // Mock prompt input
            });
            cy.get('#promtButton').click(); 

        });

        it('Modal Dialogs', () => {
            cy.contains('span', 'Modal Dialogs').click({ force: true });
            cy.contains('button', 'Small modal').click();
            cy.wait(3000);
            cy.contains('button', 'Close').click();
            cy.contains('button', 'Large modal').click();
            cy.wait(3000);
            cy.contains('button', 'Close').click();
        });
    });
