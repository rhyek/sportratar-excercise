import { existsSync } from 'fs';
import path from 'path';
import dotenv from '@dotenvx/dotenvx';
import arg from 'arg';
import { packageDirectory } from 'pkg-dir';
import { workspaceRoot } from './dirs';

export type ScriptContext = 'dev' | 'test';

export async function loadEnvs(cwd: string, context: ScriptContext) {
  const pkgDir = await packageDirectory({ cwd });
  if (!pkgDir) {
    throw new Error('Could not find package directory');
  }
  const envFiles = new Set<string>();
  function push(...files: string[]) {
    for (const file of files) {
      envFiles.add(file);
    }
  }
  push(
    path.resolve(workspaceRoot, '.env.development.pre'),
    path.resolve(workspaceRoot, '.env.local.pre'),
    path.resolve(pkgDir, '.env.development.pre'),
  );
  if (context === 'test') {
    push(
      path.resolve(workspaceRoot, '.env.test.pre'),
      path.resolve(pkgDir, '.env.test.pre'),
    );
  }
  push(
    path.resolve(workspaceRoot, '.env.development'),
    path.resolve(workspaceRoot, '.env.local'),
    path.resolve(pkgDir, '.env.development'),
    path.resolve(pkgDir, '.env.local'),
    path.resolve(cwd, '.env.development'),
    path.resolve(cwd, '.env.local'),
  );
  if (context === 'test') {
    push(
      path.resolve(workspaceRoot, '.env.test'),
      path.resolve(workspaceRoot, '.env.test.local'),
      path.resolve(pkgDir, '.env.test'),
      path.resolve(pkgDir, '.env.test.local'),
      path.resolve(cwd, '.env.test'),
      path.resolve(cwd, '.env.test.local'),
    );
  }
  const existing = Array.from(envFiles).filter((envFile) =>
    existsSync(envFile),
  );
  if (process.env.DEBUG) {
    for (const envFile of existing) {
      console.debug(`loading envs from: ${envFile}`);
    }
  }

  dotenv.config({
    path: existing,
    override: true,
    quiet: true,
  });
}

export async function envProgram<T extends Record<string, any>>(
  cb: (
    args: arg.Result<
      {
        '--dev': BooleanConstructor;
        '--test': BooleanConstructor;
      } & T
    >,
  ) => void | Promise<void>,
  options?: {
    extraOptions?: T;
    argLibOptions?: arg.Options;
  },
) {
  const args = arg(
    {
      '--dev': Boolean,
      '--test': Boolean,
      ...options?.extraOptions,
    },
    {
      permissive: true,
      ...options?.argLibOptions,
    },
  );
  const { '--dev': dev, '--test': test } = args;
  if (!dev && !test && !process.env.NODE_ENV && !process.env.TEST) {
    console.error(
      'Must specify --dev or --test or provide NODE_ENV or TEST environment variable',
    );
    process.exit(1);
  }
  const scriptContext: ScriptContext | null = test
    ? 'test'
    : dev
      ? 'dev'
      : process.env.TEST === 'true'
        ? 'test'
        : process.env.NODE_ENV === 'development'
          ? 'dev'
          : null;
  if (!scriptContext) {
    throw new Error('Could not determine script context');
  }
  process.env.SCRIPT_CONTEXT = scriptContext;
  await loadEnvs(process.cwd(), scriptContext);
  await cb(args);
}
