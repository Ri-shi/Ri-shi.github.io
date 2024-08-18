---
layout: post
title: Inversion of Control, by any other name...
tags: ["SOLID", "Software Design", "OpEd"]
---

We often hear (at every bloody interview) about the SOLID Principles. It's regarded by some as the major driving force of good software. But why do so many engineers get (at the very least) 1/5 of the principles wrong at a fairly consistent rate?

# The D in SOLID

SOLID stands for:
- Single Responsibility
- Open/Closed Principle
- Lisckov Substitution Principle
- Interface Segregation
- Dependency Inversion


If I had a coin for every instance an engineer has told me that the last "D" in SOLID stands for Dependency Injection, I'd have 20 coins (I'm young, sue me).

# By any other name...

Enter the other name for Dependency Inversion...Inversion Of Control.

I lie here a bit. Rather than a synonymic term, Inversion of Control is to Dependency Inversion, what the ocean is to a sea. A bit of history, [Martin Fowler popularized the term in his blog](https://martinfowler.com/articles/injection.html) around 2004, along with outlining the **Dependency Injection PATTERN**. He 'concretised' the IoC principle by making it tangible to a real use case - the management of dependencies.

Re-enter *Dependency Inversion*. This became a semi-concrete term for inverting control of dependencies. Since Dependency Management is where the IoC principle (arguable) is the most useful and tangible, the name has become popularized into a synonym for IoC (I suspect to complete the acronym 'SOLID', which I actually appreciate tbh. The word 'SOLII' sounds a bit flimsy imo).

# Yet Another Explanation of IoC  

The net is ripe with much much much better explanations and definitions of IoC. Here is yet another one:

> Inversion of Control outlines where ownership of execution should live within the design of a system. It advises that implementation details be isolated to the implementor and hidden from the driver, with the implementor accepting a command to do something from a driver, rather than exact instructions detailing how to do it.

Basically, to quote Jedi Master Fowler, its the "hollywood principle". "Don't call us, we'll call you".

# My Interpretation

Where the term "Dependency Inversion" shines at a software implementation level, the term "Inversion of Control" shines at the "integration between software" level. 

I've personally found the most use (not that other implementations are not useful) in integrations between multiple systems, particularly where these systems are owned by different teams. The principle can help direct questions where there might be 2 good answers.

An example I think fondly of, was an instance where my team at the time had a BFF integration with a mid-office system. The discussion was around having the mid-office system implement a better paging interface on a search function (with all the various constraints and challenges that the team and the system were facing at the time) or having the BFF drive the search with the limited interface in a more informed manner (calling the api multiple times with threading and controlling the flow with the UI).

In this scenario, we could clearly determine that the mid-office system would need to extend it's interface, rather than the BFF enhance it's logic of calling the other system. IoC advises that the BFF would "know too much" about the mid-office system's paging mechanism if we went the other way.

The above is a very watered down version of what actually happened, but hopefully it paints a picture of how IoC is more useful then just an interview question that most engineers are going to get mixed up with Dependency Injection.
