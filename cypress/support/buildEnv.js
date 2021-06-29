const buildEnv = () => {
    cy.server()
        cy.route({
            method: 'POST',
            url: '/signin',
            response: {
                id:1000,
                nome:'Usuario falso',
                token:"string que não deveria ser aceita"
            }
        }).as('signin')
        
        cy.route({
            method: 'GET',
            url: '/saldo',
            response: [{
                conta_id: 9999,
                conta:"Carteira",
                saldo:"100.00"
            },
            {
                conta_id: 2000,
                conta:"Banco",
                saldo:"1000000000.00"}
            ]
        }).as('saldo')
        
        cy.route({
            method: 'GET',
            url: '/contas',
            response: [
                {id:1, nome:'Carteira',visivel:true, usuario_id:1},
                {id:2,nome:'Banco',visivel:true,usuario_id:1}
            ]
        }).as('contas')

        cy.route({
            method: 'GET',
            url: '/extrato/**',
            response:[
                {"conta":"Conta para movimentacoes","id":616132,"descricao":"Movimentacao para exclusao","envolvido":"AAA","observacao":null,"tipo":"DESP","data_transacao":"2021-06-29T03:00:00.000Z","data_pagamento":"2021-06-29T03:00:00.000Z","valor":"-1500.00","status":true,"conta_id":664977,"usuario_id":22325,"transferencia_id":null,"parcelamento_id":null},
                {"conta":"Conta com movimentacao","id":616133,"descricao":"Movimentacao de conta","envolvido":"BBB","observacao":null,"tipo":"DESP","data_transacao":"2021-06-29T03:00:00.000Z","data_pagamento":"2021-06-29T03:00:00.000Z","valor":"-1500.00","status":true,"conta_id":664978,"usuario_id":22325,"transferencia_id":null,"parcelamento_id":null},
                {"conta":"Conta para saldo","id":616135,"descricao":"Movimentacao 2, calculo saldo","envolvido":"DDD","observacao":null,"tipo":"DESP","data_transacao":"2021-06-29T03:00:00.000Z","data_pagamento":"2021-06-29T03:00:00.000Z","valor":"-1000.00","status":true,"conta_id":664979,"usuario_id":22325,"transferencia_id":null,"parcelamento_id":null},
                {"conta":"Conta para saldo","id":616136,"descricao":"Movimentacao 3, calculo saldo","envolvido":"EEE","observacao":null,"tipo":"REC","data_transacao":"2021-06-29T03:00:00.000Z","data_pagamento":"2021-06-29T03:00:00.000Z","valor":"1534.00","status":true,"conta_id":664979,"usuario_id":22325,"transferencia_id":null,"parcelamento_id":null},
                {"conta":"Conta para extrato","id":616137,"descricao":"Movimentacao para extrato","envolvido":"FFF","observacao":null,"tipo":"DESP","data_transacao":"2021-06-29T03:00:00.000Z","data_pagamento":"2021-06-29T03:00:00.000Z","valor":"-220.00","status":true,"conta_id":664980,"usuario_id":22325,"transferencia_id":null,"parcelamento_id":null},
                {"conta":"Conta para saldo","id":616134,"descricao":"Movimentacao 1, calculo saldo","envolvido":"CCC","observacao":null,"tipo":"REC","data_transacao":"2021-06-29T03:00:00.000Z","data_pagamento":"2021-06-29T03:00:00.000Z","valor":"3500.00","status":true,"conta_id":664979,"usuario_id":22325,"transferencia_id":null,"parcelamento_id":null},
                {"conta":"Conta para alterar","id":616546,"descricao":"Umbrella Corps.","envolvido":"Jill Valentine","observacao":null,"tipo":"REC","data_transacao":"2021-06-29T03:00:00.000Z","data_pagamento":"2021-06-29T03:00:00.000Z","valor":"232.00","status":false,"conta_id":664975,"usuario_id":22325,"transferencia_id":null,"parcelamento_id":null}]
        })
}

export default buildEnv