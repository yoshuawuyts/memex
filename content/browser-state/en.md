<!--
Title: Managing State in Browser Applications
Date: 2018-03-08
-->

Nobody ever said building applications was easy.

For a moment, let's forget about which languages we use. Pretend there are no
tools available to us. Let's zoom out and look at what we're trying to build.
The goal is to build an application in the browser; a web app.

What kind of problem are we dealing with? Well, we definitely want to show
things on the screen. So rendering. But also want to fetch data from a server.
And probably respond to user input.

Now on to ARCHITECTURE. How we going to do this? Components; probably. State
management? Yes, that too.

Zoom out we must. Zoom out further. What's the problem we're solving? Ah yes,
stateful components with stateful stores. Many components. Many state.

We need a way to manage state. You know state is hard. Luckily you've watched a
talk on YouTube about state machines. You know state machines work well.  Nice.

Okay, back to components. You'll use a library. A library with components.
You still need to hook things together. Many components. Many state.

You remember about event busses. Linux does it this way. Processors do it this
way. Networks do it this way. Many to many. Event bus it is.

Now which one to use? The browser has events, but no bus. No good. Node. Node
has an event bus. It's called "Emitter", but whatever. You know it's an event
bus. It's your secret.

Now you have your many state. Your many components. Your event bus between it
all. Things are good. You can now start writing your application.

---

## State Machines
State machines are nice because they make the implicit explicit. It replaces
arbitrary conditionals with labeled switches. It makes transitions between
states explicit. It encodes parallelism and reduces the need for comments. This
is how you scale up state in applications.

## Event Emitters

## Global State
Pushing tricky things as far into application code as possible is an old trick.
When building applications in C, it's common to defer calling `alloc()` and
`free()` as far up the stack as possible.

Global state is a similar concept. State is tricky, so the closer it is to
userland code, the easier it is to debug. Single state allows you to look at a
single variable, and figure out what the state of the world is.

## Data Down, Events Up
Now I'm not entirely sure what people mean by "events up", but the "data down"
part makes a lot of sense. I like to think of it as "state down". All the way
down. As a whole.

I've been seeing folks split their single state up into lots of different bits.
Each component knows about all the pieces of state its subcomponents need. And
the subcomponents know that about their subcomponents. Lots of small slices, all
the way down.

I don't think that's a great way of doing things. It ends up being a lot of
code. Code that needs to be written. That needs to be explained when onboarding.
Code that needs to be read, reordered and rewritten.

I think it's better to just send a single object down. Call it `state`. Everyone
uses state everywhere.

If a component ever needs to determine if it needs to be re-rendered, increment
counters to keep track. A fancy word for this is "vector clock".

Whenever a store updates its state, you update the counter in the vector clock.
When a component checks if it should re-render, it compares the last known value
against the value in the vector clock - and if the new value is higher, it
re-renders.

Single state. Vector clocks. They work well together. 

## Maintaining Code
Oh and by the way, if you're interested in application architecture, watch [this
outstanding talk](https://youtu.be/xBa0_b-5XDw") by Thai Pangsakulyanont. It
goes over common pitfalls in application development with humor and depth;
definitely worth a watch!

And that's all. Thank you thank you!
