---
layout: post
title: Understanding - The Mathematics of Architecture
tags: ["Maths", "Architecture", "Understanding"]
published: false
---

Let us define an architectural entity as a single functional unit **definitly bounded** by several domains.

These domains are:
- Functional Scope: $S_n$
	- What functionality does this entity provide. Conversly, what problem does this solve.
- Dependencies: $j$
	- If this entity were to be placed on a di-graph, how many lines flow out ($j$)
- Dependants: $n$
	- If this entity were to be placed on a di-graph, how many lines flow in ($n$)

Now that we've defined our basic terminology, let's define some composite concepts.

# A Solution

A solution is a 

## Responsibility

Responsibility ($R$) is the aggregation of the functional scopes of all dependancies $j$.

$
R = \sum^{j}S_{j}
$

## Criticality

Criticality
