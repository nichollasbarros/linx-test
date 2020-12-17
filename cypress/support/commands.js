// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })


Cypress.Commands.add('getToken', (user, passwd) =>{

    cy.request({
        method: 'POST',
        url: "https://sso.sbx.edenred.io/connect/token",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: {
            client_id: '4e7a68c990a54bc18cf98fbaaf4160ed',
            grant_type: 'password',
            username: user,
            password: passwd,
            acr_values: 'tenant:br-fleet-mobility'
        }
    }).its('body.access_token').should('not.be.empty')
        .then(token =>{
          return token
      })
})

Cypress.Commands.add('setOrganization', (token, cdOrganization) =>{

    cy.request({
        method: 'PUT',
        url: "https://homolog.projetos.embratec.local/administrative/rest/userOrganization/currentUserOrganization",
        headers         : { Authorization: `Bearer ${token}` },
        body            : { "codigoOrganizacao": cdOrganization}
    })
})