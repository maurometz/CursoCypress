/// <reference types="cypress" />

describe('É o esperas', () => {

    before(() => {
        cy.visit('https://www.wcaquino.me/cypress/componentes.html')
    })

    beforeEach(() => {
        cy.reload()
    })

    it('Should wait element to be available', () => {
        cy.get('#novoCampo').should('not.exist')
        cy.get('#buttonDelay').click()
        cy.get('#novoCampo').should('not.exist')
        cy.get('#novoCampo').should('exist')
        cy.get('#novoCampo').type('funcioan')
    })

    it('Should retry', () => {
        cy.get('#buttonDelay').click()
        cy.get('#novoCampo')
            .should('not.exist')
            .should('exist')
    })

    it('Uso do find', () => {
        cy.get('#buttonListDOM').click()
        cy.get('#lista li')
            .find('span')
            .should('contain', 'Item 1')

        // cy.get('#lista li')
        //     .find('span')
        //     .should('contain', 'Item 2')

        cy.get('#lista li span')
            .should('contain', 'Item 2')
        })

    it.only('Uso do timeout', () => {
        // cy.get('#buttonDelay').click()
        // cy.get('#novoCampo').should('exist')

        // cy.get('#buttonListDOM').click()
        // cy.wait(5000);
        // cy.get('#lista li span', {timeout: 30000})
        // .should('contain', 'Item 2')

        cy.get('#buttonListDOM').click()
        cy.get('#lista li span')
            .should('have.length', '1' )
        cy.get('#lista li span')
            .should('have.length', '2' )
    })

    it('Click retry', () => {
        cy.get('#buttonCount')
            .click()
            .should('have.value', '11 ')
    })

    it.only('Should vs Then', () => {
        cy.get('#buttonListDOM').then($el => {
            // console.log($el);
            expect($el).to.have.length(1)
            // cy.get('#buttonList')
        })
    })
})