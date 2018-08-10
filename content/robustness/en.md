---
title: Robustness
date: 2018-05-14
---

- validate syntax
  - rustc
  - JS only does this for code paths that are reached
- type checking (cannot read foo of undefined)
  - rustc
  - JS does this by hand
- style checking
  - clippy
  - parts of eslint
- unit tests
  - validate basic implementation
- property tests
  - quickcheck
  - proptest
- local simulations
  - chaos filesystem
  - chaos network
- fuzz testing
  - test for random inputs
- test cluster
  - tc(1)
  - jepsen
- production cluster
  - chaos monkey
