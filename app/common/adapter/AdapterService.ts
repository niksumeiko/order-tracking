import { fetchStubs } from '../../testing/TestStubsService';

export type StubableAdapter<TArgs extends unknown[], TResult> = ((
  ...args: TArgs
) => Promise<TResult>) & { adapterName: string };

export function createAdapter<TArgs extends unknown[], TResult>({
  name,
  callback,
}: {
  name: string;
  callback: (...args: TArgs) => Promise<TResult>;
}): StubableAdapter<TArgs, TResult> {
  const adapter = async (...args: TArgs): Promise<TResult> => {
    if (process.env.NEXT_PUBLIC_PHASE === 'test') {
      const stubs = await fetchStubs();

      if (!stubs?.[name]) {
        throw new Error(`Missing stub for "${name}" adapter`);
      }

      return stubs[name] as TResult;
    }
    return callback(...args);
  };

  adapter.adapterName = name;
  return adapter;
}