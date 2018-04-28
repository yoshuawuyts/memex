---
title: Software Librarians
date: 2018-04-28
---

How long do you expect sofware will be around? A few months? A few years?
Decades? Surely not forever. Or do you?

Building software is sometimes described as tending to a garden. We create
fertile ground to plant new functionality. We regularly revisit older plants to
water them, nurture them and check in how they're doing. And above all, we keep
an eye out for weeds, removing them before they can flourish and starve the
plants we've spent so much time nurturing.

Software is gardening. If we stop tending to it, it withers and dies.

So back to your program. How long can it survive without being tended to? How
long will its peer dependencies be around for? How much regular maintenance is
needed?

In the end all software is fallible. It all withers and dies. Operating systems
are updated. Hardware is replaced. Runtimes make backwards incompatible changes.
Digital decay. Bit rot.

But like gardeners we can embrace this as part of the process. Some crops have
high turnover in the short term. Others take a while to grow, but can be counted
on for decades. The right fit is dependant on your needs.

This is why I'm picking up Rust. I'm looking to plant programs that last. The
Dat protocol is meant for archiving. If we're looking to archive data, it's
paramount that our archiving software will be around just as long as our
archives are.

---

## Rust
Rust is a new-ish programming language from Mozilla. It's been designed to
replace C++. A cool benefit it has in this context, is that it can be compiled
statically in its entirety. This means the only peer dependency your
applications have is the operating system it runs on. And if that peer
dependency is the Linux kernel, it'll most likely keep running for as long as
the kernel is maintained. In terms of longetivity, that's probably as good as we
can get.

---

That's it for now. Thanks for reading!
