/// <reference types="cypress" />

describe('Work with alerts', () => {

    before(() => {
        cy.visit('https://www.wcaquino.me/cypress/componentes.html')
    })

    it('Botão Cadastrar', () => {
        const stub = cy.stub().as('cadastrar')
        cy.on('window:alert', stub)
        cy.get('#formCadastrar').click().then(() => {
            expect(stub.getCall(0)).to.be.calledWith('Nome eh obrigatorio')
        })
    })

    it('Preencher Nome', () => {
        cy.get('#formNome').type('Leon')
        cy.get('#formCadastrar').click()
    })

    it('Botão Cadastrar 2', () => {
        const stubSobrenome = cy.stub().as('cadastrarSobrenome')
        cy.on('window:alert', stubSobrenome)
        cy.get('#formCadastrar').click().then(() => {
            expect(stubSobrenome.getCall(0)).to.be.calledWith('Sobrenome eh obrigatorio')
        })
    })

    it('Preencher Sobrenome', () => {
        cy.get('[data-cy=dataSobrenome]').type('Scott Kennedy')
        cy.get('#formCadastrar').click()
    })
    
    it('Botão Cadastrar 3', () => {
        const stubSexo = cy.stub().as('cadastrarSexo')
        cy.on('window:alert', stubSexo)
        cy.get('#formCadastrar').click().then(() => {
            expect(stubSexo.getCall(0)).to.be.calledWith('Sexo eh obrigatorio')
        })
    })
    
    it('Preencher sexo', () => {
        cy.get('#formSexoMasc')
            .click()
            .should('be.checked')
        cy.get('#formSexoFem')
            .should('not.be.checked')
        cy.get('#formCadastrar').click()
    })


    it('Confirmar cadastro', () => {
        cy.get('span').should('contain', 'Cadastrado!')
    })
})