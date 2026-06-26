'use server';

import { cookies } from 'next/headers';

export async function fetchStubs(): Promise<Record<string, unknown> | null> {
  const sessionId = (await cookies()).get('x-test-session')?.value;

  if (!sessionId) {
    return null;
  }

  const response = await fetch(
    `http://localhost:3000/api/test-stubs?sessionId=${sessionId}`,
    {
      cache: 'no-store',
    },
  );
  const { stubs }: { stubs: Record<string, unknown> | null } =
    await response.json();

  return stubs;
}
