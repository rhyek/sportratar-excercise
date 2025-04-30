# General

The solution is written in a way where the main and only mode of execution is the test runner.

It is understood that the solution is not meant to expose any API (REST, CLI, otherwise). The excercise mentions it should be a library, but does not go into detail of what will be consuming it. I've designed the solution to be imported from a NestJS application within the same Monorepo. It exports all artifacts needed for consumption via its [packages/library/src/index.ts](packages/library/src/index.ts) file.

A NestJS application would use the library similar to the [packages/library/test/library.spec.ts](packages/library/test/library.spec.ts) file.

If interested, my [nestjs-endpoints](https://github.com/rhyek/nestjs-endpoints) library can serve as an example of how I've documented and published Node.js/NestJS libraries for public use in the past.

## Error handling

The library exposes e `LibrayError` that consumers can match for in `try/catch` to handle expected errors.

# Setup

1. Install latest nodejs and pnpm
2. Run the following in the root directory:

- `pnpm install`
- `pnpm test`

# Stack

- Node.js + NestJS
- TypeScript
- Vitest for testing

# Notes

- NestJS was chosen for the IoC container even if the solution does not export an API.
- Source code is located at [packages/library/src](packages/library/src/)
- Tests at [packages/library/test](packages/library/test/)
- The project is meant to only run tests. No CLI, REST API, etc are available per the excercise instructions
- Tests are a mix of integration and unit, but most are integration tests
