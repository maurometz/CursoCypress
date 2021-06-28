/// <reference types="cypress" />

import loc from '../../support/locators'
import '../../support/commandsContas'

describe('Testes com o Barriga React', () => {

    before(() => {
        cy.login('ehre@ehre.com', '123456789')
    })
    
    beforeEach(() => {
        cy.get(loc.MENU.HOME).click()
        cy.resetApp()
    })

    it('Adicionando conta', () => {
        cy.acessarMenuConta()
        cy.inserirConta('First Account')
        cy.get(loc.MESSAGE).should('contain', 'sucesso!')
    })

    it('Alterando conta', () => {
        cy.acessarMenuConta()
        .wait(1000)
        cy.xpath(loc.CONTAS.FN_XP_BTN_ALTERAR('Conta para alterar')).click().click()
        .wait(1000)
        cy.get(loc.CONTAS.NOME)
            .clear()
            .type('Conta para alterar alterada')
        cy.get(loc.CONTAS.BTN_SALVAR).click()
        .wait(1000)
        cy.get(loc.MESSAGE).should('contain', 'sucesso!')
        .wait(1000)
    })

    it('Não deve criar uma conta com mesmo nome', () => {
        cy.acessarMenuConta()

        cy.get(loc.CONTAS.NOME).type('{selectall}{backspace}Conta mesmo nome')
        cy.get(loc.CONTAS.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'code 400')
    })

    it('Deve criar uma transação',() => {
        cy.get(loc.MENU.MOVIMENTACAO).click()
            
        cy.get(loc.MOVIMENTACAO.DESCRICAO).type('Desc')
        cy.get(loc.MOVIMENTACAO.VALOR).type('123')
        cy.get(loc.MOVIMENTACAO.INTERESSADO).type('Ethan Winters')
        cy.get(loc.MOVIMENTACAO.CONTA).select('Conta com movimentacao')
        cy.get(loc.MOVIMENTACAO.STATUS).click()
        cy.get(loc.MOVIMENTACAO.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'sucesso')

        cy.get(loc.EXTRATO.LINHAS).should('have.length', 7)
        cy.xpath(loc.EXTRATO.FN_XP_BUSCA_ELEMENTO('Desc', '123')).should('exist')
    })

    it('Pegar o saldo', () => {
        cy.get(loc.MENU.HOME).click()
        cy.xpath(loc.SALDO.FN_XP_SALDO_CONTA('Conta para saldo')).should('contain', '534,00')

        cy.get(loc.EXTRATO.MENU_EXTRATO).click()
        cy.xpath(loc.EXTRATO.FN_XP_ALTERAR_ELEMENTO('Movimentacao 1, calculo saldo')).click()
        cy.wait(2000)
        cy.get(loc.MOVIMENTACAO.STATUS).click()
        cy.get(loc.MOVIMENTACAO.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'sucesso')
        cy.wait(2000)

        cy.get(loc.MENU.HOME).click()
        cy.xpath(loc.SALDO.FN_XP_SALDO_CONTA('Conta para saldo')).should('contain', '4.034,00')
    })

    it('Deve remover um movimentação', () => {
        cy.get(loc.EXTRATO.MENU_EXTRATO).click()
        cy.xpath(loc.EXTRATO.FN_XP_REMOVER_ELEMENTO('Movimentacao para exclusao')).click()
        cy.get(loc.MESSAGE).should('contain', 'sucesso')
    })
})