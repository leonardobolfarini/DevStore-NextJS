describe('search products', () => {
  it('should be able to search products', () => {
    cy.searchByQuery('moletom')

    cy.location('pathname').should('include', '/search')
    cy.location('search').should('include', 'q=moletom')
  })

  it('should not be able to stay in the search page without a search query', () => {
    cy.visit('/search')

    cy.location('pathname').should('equals', '/')
  })
})
