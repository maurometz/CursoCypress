/// <reference types="cypress" />


describe('Testes com o Barriga React', () => {
    let token
    before(() => {
        cy.getToken('ehre@ehre.com', '123456789')
            .then(tkn => {
                token = tkn
            })
    })

    beforeEach(() => {
        cy.resetRest()
    })

    it('Adicionando conta', () => {
        cy.request({
            url: '/contas',
            method: 'POST',
            headers: { Authorization: `JWT ${token}` },
            body: {
                nome: 'Conta via rest'
            }
        }).as('response')

        cy.get('@response').then(res => {
            expect(res.status).to.be.equal(201)
            expect(res.body).to.have.property('id')
            expect(res.body).to.have.property('nome', 'Conta via rest')
        })
    })

    it('Alterando conta', () => {

    })

    it('Não deve criar uma conta com mesmo nome', () => {

    })

    it('Deve criar uma transação', () => {

    })

    it('Pegar o saldo', () => {

    })

    it('Deve remover um movimentação', () => {

    })
})