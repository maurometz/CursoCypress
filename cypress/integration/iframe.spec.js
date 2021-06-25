/// <reference types="cypress" />

describe('Work with iFrames', () => {

    it('Deve preencher campo de texto', () => {

        cy.visit('https://www.wcaquino.me/cypress/componentes.html')
        cy.get('#frame1').then(iframe => {
            const body = iframe.contents().find('body')
            cy.wrap(body).find('#tfield')
                .type('kekw')
                .should('have.value', 'kekw')
        })

    })

    it('Deve testar frame diretamente', () => {

        cy.visit('https://www.wcaquino.me/cypress/frame.html')
        cy.get('#otherButton').click()
        cy.on('window:alert', msg => {
            expect(msg).to.be.equal('Click OK!')
            })

    })
})