import type { StubableAdapter } from '../common/adapter/AdapterService';

declare global {
  namespace Cypress {
    interface Chainable {
      stubAdapter<TArgs extends unknown[], TResult>(
        adapter: StubableAdapter<TArgs, TResult>,
        data: TResult,
      ): Chainable<void>;
    }
  }
}
