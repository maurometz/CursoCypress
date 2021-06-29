/// <reference types="cypress" />

import loc from '../../support/locators'
import '../../support/commandsContas'
import buildEnv from '../../support/buildEnv'

describe('Testes com o Barriga React', () => {
    after(() => {
        cy.clearLocalStorage()
    })
    
    beforeEach(() => {
        buildEnv()
        cy.login('ab@a', 'senhaerrada')
        cy.get(loc.MENU.HOME).click()
        // cy.resetApp()
    })

    it('Adicionando conta', () => {

        cy.route({
            method: 'POST',
            url: '/contas',
            response: {id: 3, nome: 'First Account', visivel: true, usuario_id: 1}
        }).as('saveConta')

        cy.acessarMenuConta()
        cy.route({
            method: 'GET',
            url: '/contas',
            response: [
                {id:1, nome:'Carteira',visivel:true, usuario_id:1},
                {id:2,nome:'Banco',visivel:true,usuario_id:1},
                {id:3,nome:'First Account',visivel:true,usuario_id:1}

            ]
        }).as('contas')

        cy.inserirConta('First Account')
        cy.get(loc.MESSAGE).should('contain', 'sucesso!')
    })

    it('Alterando conta', () => {

        cy.route({
            method: 'GET',
            url: '/contas/**',
            response: [
                {id:1, nome:'Carteira',visivel:true, usuario_id:1},
                {id:2, nome:'Banco',visivel:true, usuario_id:1}
        ]
        }).as('contas')

        cy.route({
            method: 'PUT',
            url: '/contas/**',
            response: {id:1, nome:'Conta alterada',visivel:true, usuario_id:1}
        })

        cy.acessarMenuConta()
        .wait(1000)
        cy.xpath(loc.CONTAS.FN_XP_BTN_ALTERAR('Carteira')).click()
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
        cy.route({
            method: 'POST',
            url: '/contas',
            response: {"error":"Já existe uma conta com esse nome!"},
            status: 400
        }).as('saveContaMesmoNome')

        cy.acessarMenuConta()

        cy.get(loc.CONTAS.NOME).type('Conta mesmo nome')
        cy.get(loc.CONTAS.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'code 400')
    })

    it('Deve criar uma transação',() => {
        cy.route({
            method: 'POST',
            url: '/transacoes',
            response: {"id":616546,"descricao":"Umbrella Corps.","envolvido":"Jill Valentine","observacao":null,"tipo":"REC","data_transacao":"2021-06-29T03:00:00.000Z","data_pagamento":"2021-06-29T03:00:00.000Z","valor":"232.00","status":false,"conta_id":664975,"usuario_id":22325,"transferencia_id":null,"parcelamento_id":null}
        })

        cy.route({
            method: 'GET',
            url: '/extrato/**',
            response: 'fixture:movimentacaoSalva'
        })

        cy.get(loc.MENU.MOVIMENTACAO).click()
            
        cy.get(loc.MOVIMENTACAO.DESCRICAO).type('Desc')
        cy.get(loc.MOVIMENTACAO.VALOR).type('123')
        cy.get(loc.MOVIMENTACAO.INTERESSADO).type('Ethan Winters')
        cy.get(loc.MOVIMENTACAO.CONTA).select('Banco')
        cy.get(loc.MOVIMENTACAO.STATUS).click()
        cy.get(loc.MOVIMENTACAO.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'sucesso')

        

        cy.get(loc.EXTRATO.LINHAS).should('have.length', 7)
        cy.xpath(loc.EXTRATO.FN_XP_BUSCA_ELEMENTO('Desc', '123')).should('exist')
    })

    it  ('Pegar o saldo', () => {
        cy.route({
            method: 'GET',
            url: '/transacoes/**',
            response:  {
                "conta": "Conta para saldo",
                "id": 616134,
                "descricao": "Movimentacao 1, calculo saldo",
                "envolvido": "CCC",
                "observacao": null,
                "tipo": "REC",
                "data_transacao": "2021-06-29T03:00:00.000Z",
                "data_pagamento": "2021-06-29T03:00:00.000Z",
                "valor": "3500.00",
                "status": true,
                "conta_id": 664979,
                "usuario_id": 22325,
                "transferencia_id": null,
                "parcelamento_id": null
              }
        })

        cy.route({
            method: 'PUT',
            url: '/transacoes/**',
            response:  {
                "conta": "Conta para saldo",
                "id": 616134,
                "descricao": "Movimentacao 1, calculo saldo",
                "envolvido": "CCC",
                "observacao": null,
                "tipo": "REC",
                "data_transacao": "2021-06-29T03:00:00.000Z",
                "data_pagamento": "2021-06-29T03:00:00.000Z",
                "valor": "3500.00",
                "status": true,
                "conta_id": 664979,
                "usuario_id": 22325,
                "transferencia_id": null,
                "parcelamento_id": null
              }
        })
        
        cy.get(loc.MENU.HOME).click()
        cy.xpath(loc.SALDO.FN_XP_SALDO_CONTA('Carteira')).should('contain', '100,00')

        cy.get(loc.EXTRATO.MENU_EXTRATO).click()
        cy.xpath(loc.EXTRATO.FN_XP_ALTERAR_ELEMENTO('Movimentacao 1, calculo saldo')).click()
        cy.wait(2000)
        cy.get(loc.MOVIMENTACAO.STATUS).click()
        cy.get(loc.MOVIMENTACAO.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'sucesso')

        cy.route({
            method: 'GET',
            url: '/saldo',
            response: [{
                conta_id: 9999,
                conta:"Carteira",
                saldo:"4034.00"
            },
            {
                conta_id: 2000,
                conta:"Banco",
                saldo:"1000000000.00"}
            ]
        }).as('saldoFinal')
        cy.wait(2000)

        cy.get(loc.MENU.HOME).click()
        cy.xpath(loc.SALDO.FN_XP_SALDO_CONTA('Carteira')).should('contain', '4.034,00')
    })

    it('Deve remover um movimentação', () => {
        cy.route({
            method: 'DELETE',
            url: '/transacoes/**',
            response: {},
            status: 204
        }).as('del')
        cy.get(loc.EXTRATO.MENU_EXTRATO).click()
        cy.xpath(loc.EXTRATO.FN_XP_REMOVER_ELEMENTO('Movimentacao para exclusao')).click()
        cy.get(loc.MESSAGE).should('contain', 'sucesso')
    })

    it.only('Deve validar dados adicionaos para criar conta', () => {
        const reqStub = cy.stub()
        cy.route({
            method: 'POST',
            url: '/contas',
            response: {id: 3, nome: 'First Account', visivel: true, usuario_id: 1},
            // onRequest: req => {
            //     expect(req.request.body.nome).to.be.empty
            //     expect(req.request.headers).to.have.property('Authorization')
            // }
            onRequest: reqStub
        }).as('saveConta')

        cy.acessarMenuConta()
        cy.route({
            method: 'GET',
            url: '/contas',
            response: [
                {id:1, nome:'Carteira',visivel:true, usuario_id:1},
                {id:2,nome:'Banco',visivel:true,usuario_id:1},
                {id:3,nome:'First Account',visivel:true,usuario_id:1}

            ]
        }).as('contas')

        cy.inserirConta('{CONTROL}')
        // cy.wait('@saveConta').its('request.body.nome').should('not.be.empty')
        cy.wait('@saveConta').then(() => {
            console.log(reqStub.args[0][0])
            expect(reqStub.args[0][0].request.body.name).to.be.empty
            expect(reqStub.args[0][0].request.headers).to.have.property('Authorization')
        })
        cy.get(loc.MESSAGE).should('contain', 'sucesso!')
    })

    it.only('Deve testar as cores', () => {
        cy.route({
            method: 'GET',
            url: '/extrato/**',
            response:[
                {"conta":"Conta para movimentacoes","id":616132,"descricao":"Receita paga","envolvido":"AAA","observacao":null,"tipo":"REC","data_transacao":"2021-06-29T03:00:00.000Z","data_pagamento":"2021-06-29T03:00:00.000Z","valor":"-1500.00","status":true,"conta_id":664977,"usuario_id":22325,"transferencia_id":null,"parcelamento_id":null},
                {"conta":"Conta com movimentacao","id":616133,"descricao":"Receita pendente","envolvido":"BBB","observacao":null,"tipo":"DESP","data_transacao":"2021-06-29T03:00:00.000Z","data_pagamento":"2021-06-29T03:00:00.000Z","valor":"-1500.00","status":false,"conta_id":664978,"usuario_id":22325,"transferencia_id":null,"parcelamento_id":null},
                {"conta":"Conta para saldo","id":616135,"descricao":"Despesa paga","envolvido":"DDD","observacao":null,"tipo":"DESP","data_transacao":"2021-06-29T03:00:00.000Z","data_pagamento":"2021-06-29T03:00:00.000Z","valor":"-1000.00","status":true,"conta_id":664979,"usuario_id":22325,"transferencia_id":null,"parcelamento_id":null},
                {"conta":"Conta para saldo","id":616136,"descricao":"Despesa pendente","envolvido":"EEE","observacao":null,"tipo":"REC","data_transacao":"2021-06-29T03:00:00.000Z","data_pagamento":"2021-06-29T03:00:00.000Z","valor":"1534.00","status":false,"conta_id":664979,"usuario_id":22325,"transferencia_id":null,"parcelamento_id":null}   
            ]})   
            cy.get(loc.EXTRATO.MENU_EXTRATO).click()
            cy.xpath(loc.EXTRATO.FN_XP_LINHA('Receita paga')).should('have.class', 'receitaPaga')
            cy.xpath(loc.EXTRATO.FN_XP_LINHA('Receita pendente')).should('have.class', 'despesaPendente')
            cy.xpath(loc.EXTRATO.FN_XP_LINHA('Despesa paga')).should('have.class', 'despesaPaga')
            cy.xpath(loc.EXTRATO.FN_XP_LINHA('Despesa pendente')).should('have.class', 'receitaPendente')

    })
})