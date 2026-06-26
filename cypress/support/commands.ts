import type { StubableAdapter } from '../../app/common/adapter/AdapterService';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      stubAdapter<TArgs extends unknown[], TResult>(
        adapter: StubableAdapter<TArgs, TResult>,
        data: TResult,
      ): Chainable<void>;
    }
  }
}

let sessionId: string;
let stubs: Record<string, unknown> = {};

beforeEach(() => {
  sessionId = crypto.randomUUID();
  stubs = {};
  cy.setCookie('x-test-session', sessionId);
});

Cypress.Commands.add(
  'stubAdapter',
  (adapter: { adapterName: string }, data: unknown) => {
    stubs[adapter.adapterName] = data;
    cy.request('POST', '/api/test-stubs', { sessionId, data: stubs });
  },
);
