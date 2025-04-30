import path from 'node:path';
import swc from 'unplugin-swc';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    root: process.env.WORKSPACE_ROOT!,
    include: [path.resolve(import.meta.dirname, '**/*.spec.ts')],
    dangerouslyIgnoreUnhandledErrors: true,
    reporters: ['verbose'],
    server: {
      deps: {
        // https://github.com/vitest-dev/vitest/issues/7060#issuecomment-2533264760
        inline: ['nestjs-endpoints'],
      },
    },
    ...(process.env.DEBUG === 'true' && {
      poolOptions: {
        threads: { execArgv: ['--inspect=0'] },
        forks: { execArgv: ['--inspect=0'] },
      },
    }),
  },
  plugins: [
    // This is required to build the test files with SWC
    swc.vite({
      // Explicitly set the module type to avoid inheriting this value from a `.swcrc` config file
      module: { type: 'es6' },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }) as any,
    tsconfigPaths(),
  ],
});
