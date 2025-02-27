/// <reference types="cypress" />

// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace Cypress {
  interface Chainable {
    searchByQuery(query: string): Chainable<void>
  }
}

Cypress.Commands.add('searchByQuery', (query: string) => {
  cy.visit('/')

  cy.get('input[name=q]').type(query).parent('form').submit()
})
