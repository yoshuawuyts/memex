<!--
Title: Managing State in Browser Applications
Date: 2018-03-08
-->

Scaling systems is a tricky. Whatever you're making, once you scale it you're
bound to run into trouble. But if we apply a bit of _architecture_ right from
the start, we can turn the rocky ride into smooth sailing.

In this post we'll be covering frontend architecture. Frontend architecture has
quite a few distinct features that define it. Frontend applications are
asynchronous, sandboxed, and resource constrained. Rendering happens by mutating
a mutable object. And we have lots of APIs that allow us to run tasks in the
background, proxy network requests and run code in parallel. Frontend is
non-trivial, and we need to give it thought.

If there's any metric for success in our architecture, it's that we're able to
reduce the amount of code we write to _only_ define the behavior. In the end the
only way we can write something large, is by writing small things that work in
tandem.

## if-else does not scale
If there's going to be one takeaway from this post, it should be the `if` /
`else` statements don't scale.

- intro
  - scaling systems is hard
  - mutable state is hard to reason about
  - async / parallel is harder to reason about
  - there's patters we should explore
  - the goal is to minimize lines of code we write

- event emitter as the source of truth
  - M:N network topology
    - functions are an M:1 topology
    - functions struggle with lots of imports
  - push vs pull
  - reactive === emitters / streaming === emitters / subscriptions === emitters

- single state like you mean it
  - private values can't be debugged
  - should be able to keep a log of changes
  - should be able to toggle call sites

- if-statements don't scale, write state machines
  - document states
  - document state transitions

- components should be small
  - propTypes are not a good idea
    - their purpose doesn't make sense
      - it's code to guard  you from yourself
      - end up defining all attributes, all the way down
  - use vector clocks to determine updates

- final words
  - the closer you stay to primitives, the better you're usually off
  - fewer abstractions === better
    - think twice before introducing things like actions, subscriptions or other
      constraints. If they're a "design decision", you're probably creating too
      many abstractions.
