import React from 'react'
import NavButton from './NavButton'

describe('<NavButton />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<NavButton buttonText="testing" />)
    cy.get("[data-cy=button]").should('have.text', "testing")
  })

})