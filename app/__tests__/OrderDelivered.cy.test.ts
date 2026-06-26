/// <reference types="cypress" />
/// <reference types="@testing-library/cypress" />

import {
  confirmOrderDelivery,
  fetchOrder,
  fetchOrderStatus,
} from '../domain/OrderAdapter';

describe('confirm order delivery', () => {
  it('confirms order being delivered', () => {
    cy.stubAdapter(fetchOrder, { id: 'ORDER_ID', type: 'Wholesale' });
    cy.stubAdapter(fetchOrderStatus, 'lost on the way');
    cy.stubAdapter(confirmOrderDelivery, { status: 'delivered' });

    cy.visit('/order');

    cy.findByRole('heading', { name: 'Order #ORDER_ID' }).should('be.visible');
    cy.findByText('Type: Wholesale').should('be.visible');
    cy.findByText(/Status: lost on the way/).should('be.visible');

    cy.findByRole('button', { name: 'Confirm delivered' }).click();

    cy.findByText(/Status: delivered/).should('be.visible');
  });
});
