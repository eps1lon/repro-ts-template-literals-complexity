# TypeScript expontential type complexity with template literals

## Reproduction

1. Clone repository
1. `npm install`
1. `npm run start`

## Expected

TypeScript should be able to compile the code in a reasonable amount of time.

## Actual

TypeScript takes a long time that scales exponentially with the number of union constituents with template literals.

By default, typechecking with `tsc` takes aroudn 45 seconds on a MacBook Pro M3 with 32GB of RAM.
Every removed constituent from `DynamicRoutes` halves that time.

## Fix

Most of the time is spent in `removeStringLiteralsMatchedByTemplateLiterals` which is doing an O(N) linear scan across all templates.
We can build up a trie of the templates and do a single pass across the string literals to remove them which reduces complexity.

Using a build with that fix (https://github.com/microsoft/TypeScript/pull/63343), brings down the time to around 2 seconds.

`tsgo` has the same performance characteristics and the fix can be ported (https://github.com/microsoft/typescript-go/pull/3331).
