#!/usr/bin/env -S bun -b

import { envProgram } from './lib/envs';
import { spawn } from './lib/spawn';

if (import.meta.main) {
  await envProgram(async (args) => {
    await spawn(args._);
  });
}
