import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './app',
    testMatch: '**/__tests__/*.pw.test.ts',
    timeout: 10_000,
    fullyParallel: true,
    reporter: [
        ['list'],
        ['html', { open: 'never' }],
    ],
    use: {
        baseURL: 'http://localhost:3000',
        trace: 'off',
    },
    webServer: {
        command: 'npm run dev',
        url: 'http://localhost:3000/api/test-stubs',
        reuseExistingServer: false,
        timeout: 10_000,
        env: {
            NEXT_PUBLIC_PHASE: 'test',
        },
    },
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
    ],
});
