import path from 'node:path';
import { findUp } from 'find-up-simple';

export const workspaceRoot = await findUp('pnpm-workspace.yaml').then((dir) => {
  if (!dir) {
    throw new Error('pnpm-workspace.yaml not found');
  }
  return path.dirname(dir);
});
export const prismaDir = path.resolve(workspaceRoot, 'packages/@backend');
