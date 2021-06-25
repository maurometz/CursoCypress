/// <reference types="cypress" />

describe('Work with PopUp', () => {

    it('Deve testar o popup diretamente', () => {

        cy.visit('https://www.wcaquino.me/cypress/componentes.html')
        cy.get('#frame1').then(iframe => {
            const body = iframe.contents().find('body')
            cy.wrap(body).find('#tfield')
                .type('kekw')
                .should('have.value', 'kekw')
        })

    })

    it.only('Deve verificar se o popup foi invocado', () => {

        cy.visit('https://www.wcaquino.me/cypress/componentes.html')
        cy.window().then(win => {
            cy.stub(win, 'open').as('winOpen')
        })
        cy.get('#buttonPopUp').click()
        cy.get('@winOpen').should('be.called')
    })

    describe.only('com links', () => {
        beforeEach(() => {
            cy.visit('https://www.wcaquino.me/cypress/componentes.html')
        })

        it('check popup url', () => {
            cy.contains('Popup2')
                .should('have.prop', 'href')
                .and('equal', 'https://www.wcaquino.me/cypress/frame.html' )
        })

        it('Acessar link dinamicamente', () => {
            cy.contains('Popup2').then($a => {
                const href = $a.prop('href')
                cy.visit(href)
                cy.get('#tfield').type('kekw de novo')
            })
        })

        it('Vai forçar o link na mesma página', () => {
            cy.contains('Popup2')
                .invoke('removeAttr', 'target')
                .click()
            cy.get('#tfield').type('kekw de novo')
        })
    })
})