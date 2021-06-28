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
        cy.request({
            method: 'GET',
            url: '/contas',
            headers: { Authorization: `JWT ${token}` },
            qs: {
                nome: 'Conta para alterar'
            }
        }).then(res => {
            cy.request({
                url: `/contas/${res.body[0].id}`,
                method: 'PUT',
                headers: { Authorization: `JWT ${token}` },
                body: {
                    nome: 'conta alterada via rest'
                }
            }).as('response')
        })

        cy.get('@response').its('status').should('be.equal', 200)
    })

    it('Não deve criar uma conta com mesmo nome', () => {
        cy.request({
            url: '/contas',
            method: 'POST',
            headers: { Authorization: `JWT ${token}` },
            body: {
                nome: 'Conta mesmo nome'
            },
            failOnStatusCode: false
        }).as('response')

        cy.get('@response').then(res => {
            console.log(res)
            expect(res.status).to.be.equal(400)
            expect(res.body.error).to.be.equal('Já existe uma conta com esse nome!')
        })
    })

    it('Deve criar uma transação', () => {

    })

    it('Pegar o saldo', () => {

    })

    it('Deve remover um movimentação', () => {

    })
})