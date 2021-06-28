/// <reference types="cypress" />


describe('Testes com o Barriga React', () => {

    before(() => {
        // cy.login('ehre@ehre.com', '123456789')
    })
    
    beforeEach(() => {
        // cy.resetApp()
    })

    it('Adicionando conta', () => {
       cy.request({
           method: 'POST',
           url: 'https://barrigarest.wcaquino.me/signin',
           body: {
               email: "ehre@ehre.com",
               redirecionar: false,
               senha: '123456789'
           }
       }).its('body.token').should('not.be.empty')
    })

    it('Alterando conta', () => {
       
    })

    it('Não deve criar uma conta com mesmo nome', () => {
       
    })

    it('Deve criar uma transação',() => {
        
    })

    it('Pegar o saldo', () => {
        
    })

    it('Deve remover um movimentação', () => {
      
    })
})