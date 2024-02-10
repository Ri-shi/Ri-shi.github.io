---
layout: post
title: Thoughts On - Utilising Web Components in Modular, Micro-service Systems
tags: ["Thoughts", "WIP", "Web Components", "Software Design", "Design Thinking", "Micro-services"]
published: false
---

> [!NOTE]
> This article is a **work in progress**

In the classical software stack of any company, there are 2 distinct sides, that being UI or so called Front-end and API’s or so called Backends. Recently a trend of so called ‘mid-office’ backend-for-frontend layers have been popular, rightly so, to enable backend-reuse that is truly agnostic of whatever channel the business decides it wants, in order to enrich client experience. This article will highlight the different concepts as I understand them, along with what I believe to be an optimal end goal with, in some instances, a higher-level implementation plan that takes into account ‘legacy’ and semi-transformed solutions.

# Background Knowledge and Concepts

## Micro-frontends
A micro-frontend is an abstract encapsulation of a single domain that should have a single responsibility in UI form. This mimics the definition of a micro-service, however the logistics of a frontend are more involved as the user experience should be immutable over multiple channels if possible. This means that if you have a micro-frontend that is used in Platform A it should provide the same functionality, in the same fashion on Platform B with the same client experience.


This is, however, not always realistic. Consider the case of mobile vs web channels, where web might not have the same capabilities as it's counter part, such as gyroscope/biometrics. Here, our *most* ideal world would be one where the gaps that exist in various channels are trivial to either fill or ignore due to a correct level of modularity existing within the system design.

## Micro-services
A micro-service is an abstract encapsulation of a single domain that should have a single responsibility in a backend-service form. There are different types of micro-services and care must be taken to distinguish between a 'service' and a 'micro' service, as often times the former is wrongly used interchangeably with the latter.

## Web Components
A browser native protocol that creates a separate, embedded element that holds logic and hides the implementation from the main DOM. The embedded element Is given a ‘Shadow DOM’. The Shadow DOM is embedded into the main page by the browser which looks for a custom element tag that is registered with the DOM using the built in functions.

## Unidirectional Data-flow
Data flow is an integral and often overlooked concept. Controlling the flow of data comes with many benefits, namely:
- Enhanced logging
- Auditing and debugging
- Adding enhanced user experience, for example, replay functionality and undo/redo
- This is integral for implementing offline mode

Unidirectional data flow restricts the flow of data to flow in one direction with a limited modus operandi for manipulating state.

## Backend-for-frontend
There is extensive literature for this concept online, most of which describes a BFF as a fully dedicated API with the sole purpose of supporting a singular channel of interaction. This inverts control of business logic by decoupling UX concerns from Domain Logic and having singularly responsible services for each.


The language that these API’s speak must be consistent. This means that the format and syntax that is used by the data given by the API should be the same that it accepts for commands. Practically, this means that if you have an API X with route GET A providing data of type T (where T is a model with some structure), route POST B must accept model of type T as well. This eliminates a massive amount of code on the front-end and ensures minimal logic on the frontend side, giving consistency across channels with lightweight implementations.
Remember, the goal of a BFF is to make the frontend as "dumb" as possible w.r.t. Domain Logic so it can be "smart" at user interaction.

## Strangler Fig Design Pattern
This is a pattern used to transform or modernize legacy monolithic systems, coined as such by Martin Fowler.
The basic concept is to:
Prepare the legacy monolith by wrapping it in regression tests
Remove all direct instantiations and introduce dependency inversion
Rewrite logical units in a piecewise fashion and deprecate the old api’s over time
This pattern is powerful but slightly complex to implement with UI’s, however, micro-frontend architectures alleviate a lot of complexity when done right.

# Modular Frontend's

There are 3 tiers of UI's that would enable mobility in a distributed multichannel architecture.

## Tier 1: Shell
This handles the context and should be as 'dumb' as possible, only handling Auth and User Profiles at most. The main purpose for this type of UI is to hold a collection of higher-level UI's to consolidate user journeys.

## Tier 2: Micro-frontend
This is a single domain UI that ideally holds only 1 user journey end-to-end. These UI's would get their context from a lower level UI (like the shell) and orchestrate their own data. Ideally these would match up 1 to 1 with a User Journey Micro-service.

## Tier 3: Components
These are single units of functionality and are ideally context-free pure functions. This is to enable DRY code to distribute functionality across micro-frontends.

## Additional Concepts

### UI Context
All modular UI's will need context to function. This is the smallest piece of data that will allow a modular UI to orchestrate it's own information. It is important to note that, for better user experience, the UI's should be static across changing context. This means that if a Shell changes from Context A to Context B, a higher tier UI should be able to handle this change without having to reload, with minimal requests to the backend as possible.

### Inversion of Control
Inversion of Control is used to increase the modularity of the program and makes it extensible. This is a very important and overlooked concept when bundling modular UI's into a single application. Since there should only exist a single context across all modules, IoC gives a safe way for these UI's to gain context from each other. Additionally, event sourcing via an IoC interface is preferable due to the inherent decoupling of this method of interprocess communication.
