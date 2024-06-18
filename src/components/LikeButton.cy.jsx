import React from 'react'
import LikeButton from './LikeButton'

describe('<LikeButton />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<LikeButton />)
  })
})