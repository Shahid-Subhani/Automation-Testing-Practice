/// <reference types="cypress" />

describe('Visit Website', ()=>{
    Cypress.on('uncaught:exception', (_err, _runnable) => {
        // Returning false here prevents Cypress from failing the test
        return false
    });
    beforeEach(() => {
        cy.intercept('GET', 'https://oajs.openx.net/esp*', { statusCode: 200 }).as('blockedRequest');
        cy.visit('https://demoqa.com/', {
            timeout: 90000 // 1:30 minutes
        
        });
        
        cy.intercept('POST', 'https://events.backtrace.io/api/**', { statusCode: 200 }).as('backtrace');
        cy.scrollTo('0%', '10%');
        cy.contains('Elements').click();
    });
    it('Elements-Text Box', ()=>{
        //get the text box button in Elements and fill the details and submited to execute
        cy.contains('span', 'Text Box').click();
        cy.get('[placeholder="Full Name"]').type('QA testing');
        cy.get('[type="email"]').type('qatesting@gmail.com');
        cy.get('[placeholder="Current Address"]').type('123 Newyork ln, Manhattan, NY 12345');
        cy.get('[id="permanentAddress"]').type('5601 Gergie ln, York, PA 23265');
        cy.contains('button', 'Submit').click();
    })
    it('Element-Check box', ()=>{
        //get the check box Expand the home folder selected all folder one by one collapse the folder and unselected
        cy.contains('span', 'Check Box').click();
        cy.get('[aria-label="Expand all"]').click();
        cy.contains('span', 'Desktop').click();
        cy.contains('span', 'Documents').click();
        cy.contains('span', 'Downloads').click();
        cy.get('[aria-label="Collapse all"]').click();
        cy.contains('span', 'Home').click();
    })
    it('Elements-Radio Button', ()=>{
        cy.contains('span', 'Radio Button').click();
        cy.get('.col-md-6 > :nth-child(3) > :nth-child(2)').click();
        cy.get(':nth-child(3) > :nth-child(3)').click();
    })
    it('Elements-Web Tables', ()=>{
        cy.contains('span', 'Web Tables').click();
        cy.contains('button', 'Add').click();
        cy.contains('button', 'Submit').click();
        cy.get('[placeholder="First Name"]').type('automation');
        cy.get('[placeholder="Last Name"]').type('testing');
        cy.get('[id="userEmail"]').type('automationTesting@practice.com');
        cy.contains('label', 'Age').get('[placeholder="Age"]').type('99');
        cy.get('[placeholder="Salary"]').type('9999999999');
        cy.get('[placeholder="Department"]').type('Software QA Automation');
        cy.contains('button', 'Submit').click();
        cy.xpath ('//div[@class="action-buttons"]/span[@id="edit-record-1"]').should('be.visible').click();
        cy.get('[id="userEmail"]').clear().type('Testing@example.com');
        cy.contains('button', 'Submit').click();
        cy.get('[placeholder="Type to search"]').type('Cantrell');
        cy.get('[id="searchBox"]').clear();
        cy.get('[placeholder="Type to search"]').type('kierra@example.com');
        cy.get('[id="searchBox"]').clear();
        cy.get('[id="delete-record-3"]').click();
        cy.get('[id="delete-record-2"]').click();
        cy.get('[id="delete-record-1"]').click();
        cy.xpath('//div[@class="-pageJump"]/input').clear();
        cy.contains('10 rows').click('bottom', { force: true });
        cy.get('select').select('50 rows');
    })
    it('Elements - Buttons', ()=>{
        cy.contains('span', 'Buttons').click();
        // cy.xpath('//div[@class="mt-4"]/button[@id="pLQRR"]').click();
        cy.contains('button', 'Right Click Me').rightclick();
        cy.contains('button', 'Double Click Me').dblclick();
        // cy.contains('button', 'Click Me').click({force: true});
        
    })
    it('Elements - Links', ()=>{
        cy.contains('span', 'Links').click();
        cy.contains('a', 'Home').invoke('removeAttr', 'target').click();
        cy.contains('Elements').click();
        cy.contains('span', 'Links').click();
        cy.get('[id="dynamicLink"]').invoke('removeAttr', 'target').click();
        cy.contains('Elements').click();
        cy.contains('span', 'Links').click();
        cy.contains('a', 'Created').click();
        cy.contains('a', 'No Content').click();
        cy.contains('a', 'Moved').click();
        cy.contains('a', 'Bad Request').click();
        cy.contains('a', 'Unauthorized').click();
        cy.contains('a', 'Forbidden').click();
        cy.contains('a', 'Not Found').click();
    })
    // it.only('Elements - Broken Links - Images', ()=>{
        // cy.contains('span', 'Broken Links - Images').click();
        // cy.contains('a', 'Click Here for Valid Link').click();
        // cy.get('[href="http://demoqa.com"]').invoke('removeAttr', 'target').click();
        // cy.contains('span', 'Elements').click();
        // cy.contains('span', 'Broken Links - Images').click();
        // cy.contains('a', 'Click Here for Broken Link').invoke('removeAttr', 'target').click();
        // cy.get('[href="http://the-internet.herokuapp.com/status_codes/500"]', {
        //     timeout: 90000 // 1:30 minutes
        
        // }).invoke('removeAttr', 'target').click();
        // // cy.contains('a', 'here').click();
        // cy.contains('a', '200');
        // cy.contains('a', 'here').click();
        // cy.contains('a', '301');
        // cy.contains('a', 'here').click();
        // cy.contains('a', '404');
        // cy.contains('a', 'here').click();
        // cy.contains('a', '500');
        
    // })
    it('Elements - Upload & Download', ()=>{
        cy.contains('span', 'Upload and Download').click();
        cy.contains('a', 'Download').click();
        cy.xpath('//div[@class="form-file"]/input[@id="uploadFile"]').click();
        
    })
    it('Elements - Dynamic Properties', ()=>{
        cy.contains('span', 'Dynamic Properties').click();
        cy.contains('button', 'Color Change').click();
        cy.contains('button', 'Will enable 5 seconds').click({force: true});
        cy.contains('button', 'Visible After 5 Seconds',{ timeout: 10000 }).should('contain', 'Visible After 5 Seconds').click();

    })
})