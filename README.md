# Setup

1. Install latest nodejs and pnpm
2. Run the following in the root directory:

- `pnpm install`
- `pnpm test`

# Notes

- Used Node.js + NestJS for runtime and platform
- TypeScript
- Vitest for tests
- NestJS was chosen for the IoC container even if the solution does not export an API.
- Source code is located at [packages/library/src](packages/library/src/)
- Tests at [packages/library/test](packages/library/test/)
- The project is meant to only run tests. No CLI, REST API, etc are available per the excercise instructions
- Tests are a mix of integration and unit, but most are integration tests
