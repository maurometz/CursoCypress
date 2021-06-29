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
}

export default buildEnv