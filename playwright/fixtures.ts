import { test as base } from '@playwright/test';
import { StubableAdapter } from '../app/common/adapter/AdapterService';

type StubAdapterFn = <TArgs extends unknown[], TResult>(
  adapter: StubableAdapter<TArgs, TResult>,
  data: TResult,
) => Promise<void>;

export const test = base.extend<{ stubAdapter: StubAdapterFn }>({
  stubAdapter: async ({ page }, use) => {
    const sessionId = crypto.randomUUID();
    const stubs: Record<string, unknown> = {};

    await page.context().addCookies([
      {
        name: 'x-test-session',
        value: sessionId,
        url: 'http://localhost:3000',
      },
    ]);

    const stub: StubAdapterFn = async (adapter, data) => {
      stubs[adapter.adapterName] = data;
      await page.request.post('http://localhost:3000/api/test-stubs', {
        data: { sessionId, data: stubs },
      });
    };

    await use(stub);
  },
});

export { expect } from '@playwright/test';