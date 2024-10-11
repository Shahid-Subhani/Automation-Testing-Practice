/// <reference types="cypress" />

describe('Elements', ()=>{
    Cypress.on('uncaught:exception', (err, runnable) => {
        if (err.message.includes('Script error.')) {
          return false;  // Ignore the error and don't fail the test
        }
        return true;  // Otherwise, fail the test
      });
    beforeEach(() => {
        cy.intercept('GET', 'https://oajs.openx.net/esp*', { statusCode: 200 }).as('blockedRequest');
        cy.intercept('https://b1-wndc1.zemanta.com/**', { statusCode: 200 }).as('blockedScript');
        cy.intercept('POST', 'https://events.backtrace.io/api/**', { statusCode: 200 }).as('backtrace');
        cy.visit('https://demoqa.com/', {
            timeout: 90000 // 1:30 minutes
        
        });
        // scroll to Elements section
        cy.scrollTo('0%', '10%');
        cy.contains('Elements').click();
    });
    it('Text Box', ()=>{
        //here in text box section fill the details and submited
        cy.contains('span', 'Text Box').click();
        cy.get('[placeholder="Full Name"]').type('QA testing');
        cy.get('[type="email"]').type('qatesting@gmail.com');
        cy.get('[placeholder="Current Address"]').type('123 Newyork ln, Manhattan, NY 12345');
        cy.get('[id="permanentAddress"]').type('5601 Gergie ln, York, PA 23265');
        cy.contains('button', 'Submit').click();
    })
    it('Check box', ()=>{
        //Expand the home folder 
        cy.contains('span', 'Check Box').click();
        cy.get('[aria-label="Expand all"]').click();
        //select all folders one by one
        cy.contains('span', 'Desktop').click();
        cy.contains('span', 'Documents').click();
        cy.contains('span', 'Downloads').click();
        // then collapse and unselect
        cy.get('[aria-label="Collapse all"]').click();
        cy.contains('span', 'Home').click();
    })
    it('Radio Button', ()=>{
        // radio buttons checks
        cy.contains('span', 'Radio Button').click();
        cy.get('.col-md-6 > :nth-child(3) > :nth-child(2)').click();
        cy.get(':nth-child(3) > :nth-child(3)').click();
    })
    it('Web Tables', ()=>{
        cy.contains('span', 'Web Tables').click();
        // click add button then submit to check the necessary sections
        cy.contains('button', 'Add').click();
        cy.contains('button', 'Submit').click();
        // fill out form and submit
        cy.get('[placeholder="First Name"]').type('automation');
        cy.get('[placeholder="Last Name"]').type('testing');
        cy.get('[id="userEmail"]').type('automationTesting@practice.com');
        cy.contains('label', 'Age').get('[placeholder="Age"]').type('99');
        cy.get('[placeholder="Salary"]').type('9999999999');
        cy.get('[placeholder="Department"]').type('Software QA Automation');
        cy.contains('button', 'Submit').click();
        // select edit remove email and type different then submit
        cy.xpath ('//div[@class="action-buttons"]/span[@id="edit-record-1"]').should('be.visible').click();
        cy.get('[id="userEmail"]').clear().type('Testing@example.com');
        cy.contains('button', 'Submit').click();
        // search with last name and email
        cy.get('[placeholder="Type to search"]').type('Cantrell');
        cy.get('[id="searchBox"]').clear();
        cy.get('[placeholder="Type to search"]').type('kierra@example.com');
        cy.get('[id="searchBox"]').clear();
        // delete record except 1 (Testing automation)
        cy.get('[id="delete-record-3"]').click();
        cy.get('[id="delete-record-2"]').click();
        cy.get('[id="delete-record-1"]').click();
        // at the end of page rows section set to 50 rows
        cy.xpath('//div[@class="-pageJump"]/input').clear();
        cy.contains('10 rows').click('bottom', { force: true });
        cy.get('select').select('50 rows');
    })
    it('Buttons', ()=>{
        cy.contains('span', 'Buttons').click();
        // double click button
        cy.contains('button', 'Double Click Me').dblclick();
        // right click on button
        cy.contains('button', 'Right Click Me').rightclick();
        // click me button with left click
        // cy.contains('button', 'Click Me').click({force: true});     
    })
    it('Links', ()=>{
        cy.contains('span', 'Links').click();
        // click on home link and invoke used to prevent opening in NewTab
        cy.contains('a', 'Home').invoke('removeAttr', 'target').click();
        cy.contains('Elements').click();
        cy.contains('span', 'Links').click();
        // click on home with dynamicLink (changes every time)
        cy.get('[id="dynamicLink"]').invoke('removeAttr', 'target').click();
        cy.contains('Elements').click();
        cy.contains('span', 'Links').click();
        // following links with API Call
        // Created link status 201
        cy.contains('a', 'Created').click();
        // No Content status 204
        cy.contains('a', 'No Content').click();
        // staus 301 and status text Moved Permanently
        cy.contains('a', 'Moved').click();
        // staus 400 and status text Bad Request
        cy.contains('a', 'Bad Request').click();
        // staus 401 and status text Unauthorized
        cy.contains('a', 'Unauthorized').click();
        // staus 403 and status text Forbidden
        cy.contains('a', 'Forbidden').click();
        // staus 404 and status text Not Found
        cy.contains('a', 'Not Found').click();
    })
    // it('Broken Links - Images', ()=>{
    //     cy.contains('span', 'Broken Links - Images').click();
    //     //open valid link but there is CORS Script error occurs in cypress but manually this link works
    //     cy.get('[href="http://demoqa.com"]').invoke('removeAttr', 'target').click();
    //     cy.contains('Click Here for Broken Link').click();
    // })
    it('Upload & Download', ()=>{
        cy.contains('span', 'Upload and Download').click();
        // click download and a sample file will be downloaded 
        cy.contains('a', 'Download').click();
        // choose file for upload
        cy.xpath('//div[@class="form-file"]/input[@id="uploadFile"]').click();
        
    })
    it('Dynamic Properties', ()=>{
        cy.contains('span', 'Dynamic Properties').click();
        // color changed 
        cy.contains('button', 'Color Change').click();
        cy.wait(6000)
        // button enabled after 5 
        cy.contains('button', 'Will enable 5 seconds').click({force: true});
        cy.wait(5000)
        // button visible after 5 seconds
        cy.contains('button', 'Visible After 5 Seconds').should('contain', 'Visible After 5 Seconds').click();
    });
});