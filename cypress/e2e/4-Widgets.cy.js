    /// <reference types="cypress" />

    describe('Widgets', ()=>{
        Cypress.on('uncaught:exception', (Error, Runnable) => {
            return false
        })
        beforeEach(()=>{
            // intercepting network requests
            cy.intercept('GET', 'https://oajs.openx.net/esp*', { statusCode: 200 }).as('blockedRequest');
            cy.intercept('POST', 'https://events.backtrace.io/api/**', { statusCode: 200 }).as('backtrace');
            cy.intercept('https://b1-wndc1.zemanta.com/**', { statusCode: 200 }).as('blockedScript');
            // visiting the demo page
            cy.visit('https://demoqa.com/', {timeout: 90000}); // 1:30 minutes
            // scroll and click on the widget page
            cy.scrollTo('0%', '10%');
            cy.contains('Widgets').should('be.visible').click();
            // optionally wait for the intercepted request
            cy.wait('@blockedRequest').its('response.statusCode').should('eq', 200);        
        })
        it('Accordian', ()=>{
            // click on Accordian section
            cy.contains('span', 'Accordian').click();
            // clicks on section headings
            cy.get('#section1Heading').click();
            cy.wait(2000);
            cy.get('#section2Heading').click();
            cy.wait(2000);
            cy.get('#section3Heading').click();

        })
        it('Auto Complete', ()=>{
            // get Auto complete section
            cy.contains('span', 'Auto Complete').click();
            // only type single alphabet to check autoComplete working
            cy.get('#autoCompleteMultipleContainer').type('b{enter}').type('i{enter}')
            .type('r{enter}');
            // select a single color
            cy.xpath('//*[@id="autoCompleteSingleContainer"]/div/div[1]') .type('red{enter}');
        })
        it('Date Picker', ()=>{
            // click with forceTrue on date picker
            cy.contains('span', 'Date Picker').click({force: true});
            // using xpath for datePickerInput
            cy.xpath('//*[@id="datePickerMonthYearInput"]').click();
            // select November/05/1990
            cy.get('.react-datepicker__year-select').select('1990');
            cy.get('.react-datepicker__month-select').select('November');
            // .first to choose the first one there were multiple 05
            cy.get('.react-datepicker__day--005').first().click();
            // date and time 
            cy.xpath('//*[@id="dateAndTimePickerInput"]').click();
            // select date November/15/2019 and time 11:30
            cy.get('.react-datepicker__year-dropdown-container').click();
            cy.get('.react-datepicker__year-dropdown').contains('2019').click();
            cy.get('.react-datepicker__month-dropdown-container').click();
            cy.get('.react-datepicker__month-dropdown').contains('November').click();
            cy.get('.react-datepicker__day--015').click();
            cy.get('.react-datepicker__time-list-item').contains('23:30').click();
        })
        it('Slider', ()=>{
            // open slider section
            cy.contains('span', 'Slider').click();
            // slide to 100
            cy.get('#sliderContainer > div.col-9 > span > input').as('Slider');
            cy.get('.range-slider').invoke('val', 100).trigger('change');
            cy.wait(5000);      
        })
        it.only('Progress bar', ()=>{
            // click on progress bar section
            cy.contains('span', 'Progress Bar').click();
            // start progress and stop after 5 seconds
            cy.contains('button', 'Start').click();
            cy.wait(5000)
            cy.contains('button', 'Stop').click();
            // wait for 1 second and start again
            cy.wait(1000)
            cy.get('#startStopButton').click();
            cy.wait(10000);
            // let it complete and reset
            cy.contains('button', 'Reset').click();
        })
        it('Tabs', ()=>{
            cy.contains('span', 'Tabs').click();
            // click on What Tab , Origin Tab , and Use Tab, More Tab is disabled
            cy.get('#demo-tab-what').click();
            cy.get('#demo-tab-origin').click();
            cy.get('#demo-tab-use').click();
        })
        it('Tool Tips', ()=>{
            // this is hover section
            cy.contains('span', 'Tool Tips').click();
            // hover on any posibility
            cy.get('#toolTipButton').trigger('mouseover');
            cy.get('#toolTipTextField').trigger('mouseover');
            cy.contains('Contrary').trigger('mouseover');
            cy.contains('1.10.32').trigger('mouseover');
        })
        it('Menu', ()=>{
            // get to menu section and click on main item 1
            cy.contains('span', 'Menu').click();
            cy.contains('Main Item 1').click();
            // hover on main item 2 then wait
            cy.contains('Main Item 2').trigger('mouseover').wait(1000);
            // invoke show the unlisted selector and assert to be visible 
            cy.get('ul').invoke('show').should('be.visible');
            // then hover on subSubList and wait then click both items
            cy.contains('SUB SUB LIST »').should('be.visible')
            .trigger('mouseover').wait(1000);
            cy.contains('Sub Sub Item 1').click({force:true});
            cy.contains('Sub Sub Item 2').click({force:true});
            cy.contains('Main Item 3').click();
        })
        it('Select Menu', ()=>{
            cy.contains('span', 'Select Menu').click();
            // click on select option and wait to dropdown and select an option
            cy.contains('Select Option').click();
            cy.wait(500);
            cy.contains('A root option').click();
            // in selectOne choose Prof.
            cy.contains('Select Title').click();
            cy.contains('Prof.').click({force:true});
            // old style menu select a color
            cy.get('#oldSelectMenu').select('Indigo');
            // multiSelectDropDown choose multiple possibilities
            cy.xpath('//*[@id="selectMenuContainer"]/div[7]/div/div/div/div[2]/div').click().type('Blue{enter}').type('Green{enter}')
            .type('Black{enter}').type('Red{enter}');;
            // click on all standardMuliSelect
            cy.contains('Saab').click();
            cy.contains('Opel').click();
            cy.contains('Volvo').click();
            cy.contains('Audi').click();
        });
    });