import type { SpawnOptions } from 'bun';

export async function spawn(
  args: string[],
  options?: SpawnOptions.OptionsObject<'ignore', 'inherit', 'inherit'>,
) {
  const proc = Bun.spawn(args, {
    stdio: ['ignore', 'inherit', 'inherit'] as const,
    ...options,
    env: {
      ...options?.env,
      ...process.env,
    },
  });
  await proc.exited;
  if (proc.exitCode !== 0 && proc.exitCode !== null) {
    process.exit(proc.exitCode);
  }
}
