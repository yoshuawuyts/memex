<!--
Title: Architecting a History Pipeline
Date: 2018-02-05
-->

Ahh, the [Web History
API](https://developer.mozilla.org/en-US/docs/Web/API/History_API). It's one of
the core element that enables [Single Page Applications
(SPAs)](https://en.wikipedia.org/wiki/Single-page_application) to work - but its
design is nowhere near comfortable.

In [Choo](https://choo.io) we've layered an abstraction on top of all browser
events, [systemd style](https://www.freedesktop.org/wiki/Software/dbus/). This
is great for debugging, and reasoning about the system. But it puts the burden
on the framework authors to get the API right.

Finding the right API for these events is a tricky design exercise. The reality
is that getting the API right is probably not going to happen, and the best we
can do is to [not add complexity onto the existing
system](http://tinyclouds.org/rant.html). When dealing with software that's
sufficiently complex, the cheapest way to create an API, is to copy the existing
API.

## The Web History API
So let's take a look at what the existing History API looks like in Browsers.

The history API is a layer around a [stack data
structure](https://en.wikibooks.org/wiki/Data_Structures/Stacks_and_Queues),
with various methods and events to interact with it. But unlike a regular stack,
it's able to move a cursor up and down the stack. This is how the "forward" and
"back" button works in the browser. However, if you move back and the modify the
stack, it pops off the whole top of the stack.

Makes sense? I hope it does.

_note: by "cursor" we don't mean "the mouse cursor". We mean the data-structure
kind. Think of it as a positional index which entry of the stack we're currently
looking at. By default it's always the top one, but the history API allows us to
move around._

| API                                       | New history entry? | Moves cursor? | Description |
| ---                                       | ------------------ | ------------- |
| `window.history.back()`                   | No                 | Yes           | Navigate backward in the history API.
| `window.history.forward()`                | No                 | Yes           | Move forward through the history stack.
| `window.history.go(n)`                    | No                 | Yes           | Move forward or backward `n` steps through the history stack.
| `window.history.length`                   | No                 | No            | Determine how many items are currently stored in the history stack.
| `history.pushState(state, title, url)`    | Yes                | Yes           | Add a new entry to the history stack.
| `history.replaceState(state, title, url)` | Yes                | Yes           | Replace the top-most history entry with another.
| `window.onpopstate`                       | No                 | No            | Listen for any changes to the history stack, other than through `history.pushState` or `history.replaceState`.
| `window.onhashchange`                     | No                 | No            | Listen for any changes to the url hash.

It's important to note that there isn't a history event to listen to all
navigation changes. If `history.pushState` or `history.replaceState` are called,
they don't create an event. Unless we listen for `onhaschange`, but that doesn't
work with regular URLs.

You might also have noted the `state` argument. Browsers have a notion of
immutable state between pages. The idea is that if you navigate forward /
backward you can recreate the view you were currently seeing. I've never gotten
it to integrate neatly with an SPA.

## Choo's Event Model
Choo currently wraps the history API into its own model. The reason why we're
writing this post is because we think we can do better. But before we do that,
let's take a look at [the current API](https://choo.io/reference/routing).

| API                                 | New history entry? | Moves cursor? | Description |
| ---                                 | ------------------ | ------------- | -----------
| `emitter.emit('pushState', url)`    | Yes                | Yes           | Add a new entry to the history stack.
| `emitter.emit('replaceState', url)` | Yes                | Yes           | Replace the top-most history entry with another.
| `emitter.on('popState')`            | No                 | No            | Listen for any changes to the history stack, other than through `history.pushState` or `history.replaceState`.
| `emitter.on('navigate')`            | No                 | No            | Listen for all changes to the history stack.

Note that there isn't a good way to navigate backward through the history API?
Oops, we messed up. However, we're now able to listen to all history events.
That's pretty neat.

Oh, and also `'popState'` and not `'popstate'` is pretty bad. That's unncessary
friction we've now introduced.

## A New Choo History API

We could do better tho; what if like all other Choo stores, we namespaced our
events. And what if we added the full breadth of the history API? That'd
probably work out well.

| API                                         | New history entry? | Moves cursor? | Description |
| ---                                         | ------------------ | ------------- | -----------
| `emitter.emit('history:back')`              | No                 | Yes           | Navigate backward in the history API.
| `emitter.emit('history:forward')`           | No                 | Yes           | Navigate forward in the history API.
| `emitter.emit('history:go', n)`             | No                 | Yes           | Yes  Move forward or backward n steps through the history stack.
| `emitter.emit('history:pushState', url)`    | Yes                | Yes           | Add a new entry to the history stack.
| `emitter.emit('history:replaceState', url)` | Yes                | Yes           | Replace the top-most history entry with another.
| `emitter.on('history:popstate')`            | No                 | No            | Listen for any changes to the history stack, other than through `history.pushState` or `history.replaceState`.
| `emitter.on('history:navigate')`            | No                 | No            | Listen for all changes to the history stack.
