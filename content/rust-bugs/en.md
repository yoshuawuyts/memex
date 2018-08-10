---
title: Rust Won't Save You From All Bugs
date: 2018-10-10
---

## But it'll probably catch quite a few
Rust is neat. Very neat. There have been a lot of words dedicated to praising
it. Perhaps to the point where, as an outsider, you might have the impression
that when you write Rust code you won't run into bugs. Unfortunately this isn't
the case.

So let's dive in and see what kind of errors Rust can't catch (yet) at compile
time, just so you get a feel for what you need to watch out for when writing
Rust code.

## Crashes
Crashes, panics, aborts -- they all mean slightly different things, but they
all show somewhat similar behavior. When a panic occurs, your system stops,
emits a stack trace and exits with status code `101`.

However panics in Rust are less volatile than say C++ or Java. This is because
it's impossible to represent invalid states in safe Rust. So you won't see
Segfaults, NullPointerExceptions or "Cannot read property 'foo' of undefined"
show up in your process.

We'll dive into more detail on _which_ panics are possible in the next few
sections.

## Arithmetic Under / Overflows
By default Rust's math operations don't wrap around. Wrapping around is when you
the following is true: `u8::max_value() + 1 == 0`. In non-release builds this
causes a panic. You can opt-into wrap around behavior using `.wrapping_add()`
and friends, but that's not the default. So you have to watch out when doing
math.

## Numeric Guards in the type system
Rust's stdlib does not have a way to set value constraints on input numbers. Say
we would want to only allow multiple of 2's to be passed into a function. We'd
need to write a runtime assertion for this:
```rust
fn square(x: usize) -> usize {
  assert!(x.is_power_of_two());
  x * x
}
```

This is the type of invariant that would be ideal if we could enforce at compile
time. Luckily we can using [typenum](https://docs.rs/typenum/). This would allow
us to rewrite the above to:

```rust
fn square(x: impl typenum::PowerOfTwo) -> usize {
  x * x
}
```

The downside to this is that it will only work at compile time, so it can't work
on user input. The upside to this is that it'll work at compile time, and catch
programmer errors early.

## Unsafe blocks
All bets are off when using `unsafe {}`. Well, sort of. Like we said before it
changes compile time checks to runtime checks that you need to implement
yourself.

Luckily it seems we're getting an increasing range of useful tools to deal with
unsafe code. Ralfj has been working on [a runtime version of the borrow
checker](https://www.ralfj.de/blog/2018/08/07/stacked-borrows.html) (excited to
see where this goes!). And [cargo-geiger](https://crates.io/crates/cargo-geiger)
exists to vet your dependencies for instances of `unsafe`.

Also note that by default you're allowed to write `unsafe {}` blocks in your
code. If you want to be a bit more strict about this you can add the
`#[deny(unsafe_code)]` attribute to the top of your `lib.rs` file.

## Infinite loops
It's totally possible to get yourself into an infinite loop. This code will
eventually crash:

```rust
fn do_thing(x: mut usize) {
  loop {
    x += 1;
  }
}
```

So generally it's recommended to always make use of iterators, because if
they're implemented correctly there's less chance you might accidentally mess up
a loop. But like with everything there's no guarantees, so it's good to be aware
of.

## Out of Memory problems
This is treading into the realm of things that I haven't tested out yet, but I
heard that if your program runs out of memory, any part of your code might
crash. This shouldn't be all too common on modern hardware, but it's included
for completion.

## Random Bit Flips
Same with cosmic rays flipping bits in your RAM. Realistically this shouldn't be
too much of an issue for most applications, but it's good to keep in mind that
Rust does not prevent hardware failures.

## Logic bugs
This is probably the most fun one out there. Rust can help you catch bugs where
you _incorrectly_ told a computer to do a thing. But it can't help you catch
bugs where you _correctly_ told the computer to the wrong thing. This class of
bugs is considered logic bugs.

An example is the following code:
```rust
// Incorrect
fn increment_a(x: usize) -> usize {
  x + 1
}

// Correct
fn increment_b(x: usize) -> usize {
  x + 2
}
```

The compiler doesn't know which version is the correct code. Both cases are
perfectly fine, but the difference sits in the intent of the code. The only way
to catch these type of bugs is by writing tests.

Luckily there are great test packages in Rust such as
[proptest](https://github.com/altsysrq/proptest) and
[quickcheck](https://github.com/BurntSushi/quickcheck/). These help you to test
a _much_ wider input space than when you write tests by hand, which increases
the chance of flushing out bugs before your code hits production.

A fun paraphrased quote here is (I think?) by Dijkstra:
> "Tests can only prove the presence of bugs, but never the absence of them."

## Conclusion
Hopefully this helps illustrate what kind of errors Rust can catch at compile
time, and which errors it can't. As far as _productive_ languages go, I think
Rust is in a pretty good spot.

I'm also excited for what the future might hold. Personally I'd love to
eventually see Rust figure out a way to bring the capabilities `typenum`
provides into the core language
([#2000](https://github.com/rust-lang/rfcs/pull/2000), perhaps?)

Regardless of what the future holds, I think Rust is decent at what it does
already -- and will probably only get better at it over time.
