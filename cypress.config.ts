import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    specPattern: 'app/__tests__/*.cy.test.ts',
    supportFile: 'cypress/support/e2e.ts',
  },
});
