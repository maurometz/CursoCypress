/// <reference types="cypress" />

import loc from '../../support/locators'
import '../../support/commandsContas'

describe('Testes com o Barriga React', () => {

    before(() => {
        cy.login('ehre@ehre.com', '123456789')
        cy.resetApp()
    })

    it('Adicionando conta', () => {
        cy.acessarMenuConta()
        cy.inserirConta('First Account')
        cy.get(loc.MESSAGE).should('contain', 'sucesso!')
    })

    it('Alterando conta', () => {
        cy.acessarMenuConta()
        cy.xpath(loc.CONTAS.XP_BTN_ALTERAR).click()
        .wait(1000)
        cy.get(loc.CONTAS.NOME)
            .clear()
            .type('First2 Account2')
        cy.get(loc.CONTAS.BTN_SALVAR).click()
        .wait(1000)
        cy.get(loc.MESSAGE).should('contain', 'sucesso!')
        .wait(1000)
    })

    it('Confirmando', () => {
        cy.get('.toast-success > .toast-message').should('exist')
    })

    it('Não deve criar uma conta com mesmo nome', () => {
        cy.acessarMenuConta()

        cy.get(loc.CONTAS.NOME).type('{selectall}{backspace}First2 Account2')
        cy.get(loc.CONTAS.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'code 400')
    })
})