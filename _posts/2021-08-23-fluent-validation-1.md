---
layout: post
title: Starting from Scratch - Fluent Validation
tags: ["StartingFromScratch", "javascript"]
---
In an attempt to further understand how fluent validation works in javascript, I tried to recreate an extremely basic chain-able system from scratch.

## Brief

The main goal of fluent validation seems to be the separation of highly conditional branching trees into it's own layer in very dynamic systems. So far the only system that I've worked on where this would be of great benefit are business/financial applications with a ton of business/product rules and while ideally you'd want those rules to be evaluated in the back-end I think that the front-end (especially if it's a monolithic front end, which is often the case in that environment) can get very dense with dynamic content depending on those rules.

I'm still searching for the "simplest form of this" with the "most substantial outcome" as Liebniz describes it, but I think that fluent validation is the strongest contender so far.

## Understanding the Basics

First, I researched different ways that function chaining was accomplished and ultimately found [this Stackoverflow post](https://stackoverflow.com/questions/35026609/chain-custom-javascript-functions) from 2016. In that post I found that there are 2 basic approaches that are pretty much similar in concept but with slightly different executions.

### Chaining in Javascript

Before that however, I needed to define what was the minium requirement for a function to be chained. So this:


```javascript
function chainableX () {
    console.log("Executing X");
    return this;
}

function chainableY() {
    console.log("Executing Y");
    return this;
}
```

Would allow us to 'chain' like this:


```javascript
var context = chainableX().chainableY();
```

    Executing X
    Executing Y


Where the resulting `context` variable would be the global call stack since these functions don't belong to any object.So, with that, returning `this` I could now chain functions.

### Accumulating Side-effects within a Scope

The next task was to allow for side effects to accumulate in a sequential manner. My initial thoughts were that this was very similar to a 'Builder' design pattern and indeed, when I glanced at the source code of some common validation packages, that seemed to be a solution that was used. However, in my attempt to keep things as simple as I possibly can, along with trying to use vanilla js and functional-ish concepts as much as I can, I opted for a slightly different approach, (but one that was not necessarily better by any metric).

My first attempt was to create an 'object' based solution that would accumulate the side effects on a variable within that context. So I thought that the initial object would somehow resemble this:


```javascript
check = {
    result: null,
    not: function() {
        this.result = !this.result;
        return this;
    },
    or: function() {
        return this;
    },
    and: function() {
        return this;
    },
    t: function() {
        return this;
    },
    f: function() {
        return this;
    }
}

console.log(check.not().f().and().t().result);
```
    true

### Chaining of Boolean Operators

I quickly realised that I'd have a glaring problem. The operators `AND` and `OR` are binary and while this gives the example chain above a 'space' to accumulate results, you can't accumulate a binary operator without 'embedding' values similar to `check.not().and(<exp>)`, which was not what I wanted.

So in order to solve this problem I decided to borrow from my Compiler Construction course in University by adding very basic 'lookahead' functionality.

Fundamentally, what this lookahead function would do is defer the binary operation until a subsequent unary operation has a result (kind of like the 'Chain of responsibility' design pattern). This is a bit of a dodgy solution which, I think, only works because chaining multiple binary operations have no value in a validation, i.e. `and().and().t()` makes no logical sense in boolean terms and adds no functional value.

So, adding this lookahead function as \_la and just concentrating on `AND`, we get the following:


```javascript
check = {
    _la: null,
    and: function() {
        //if a lookahead is already waiting to be executed we can automatically say that the previous operator was binary
        if (this._la) throw "Chaining multiple binary operators is not allowed";
        //This is just to allow for closure resolution to ensure that the function will retain the correct value of result
        let res = this.result;
        //The Looahead function in question. 'exp' is the result of a subsequent unary operation
        this._la = function(exp) {
            return res && exp;
        };
        return this;
    }
}
```

Adding some 'constants' like true and false, along with a 'default lookahead' function in order to cater for when our lookahead is null we get:


```javascript
check = {
    _la: null,
    _defaultLa: function(exp) {
        //Just pass through the value
        return exp;
    },
    and: function() {
        //if a lookahead is already waiting to be executed we can automatically say that the previous operator was binary
        if (this._la) throw "Chaining multiple binary operators is not allowed";
        //This is just to allow for closure resolution to ensure that the function will retain the correct value of result
        let res = this.result;
        //The Looahead function in question. 'exp' is the result of a subsequent unary operation
        this._la = function(exp) {
            return res && exp;
        };
        return this;
    },
    tautology: function() {
        var eval = (this._la) ? this._la : this._defaultLa;
        this.result = eval(true);
        this._la = null;
        return this;
    },
    fallacy: function () {
        var eval = (this._la) ? this._la : this._defaultLa;
        this.result = eval(false);
        this._la = null;
        return this;
    }
}

console.log(check.tautology().and().tautology().result);
```
    true


All that is left to do is to extend this concept to the `OR` and `NOT` operators. However the `NOT` operator, despite being a unary operator, still needs to be implemented as a deferred operation since we're negating the result of the operation after it, i.e. we need it to look like `not().operation()`.

The resulting snippet becomes:


```javascript
check = {
    result: null,
    _la: null,
    _defaultLa: function(exp) {
        //Just pass through the value
        return exp;
    },
    not: function() {
        var eval = (this._la) ? this._la : this._defaultLa;
        var res = this.result;
        this._la = function(exp) {
            //We pass in eval to the function stack by taking advantage of javascript closures
            return eval(!exp);
        }
        return this;
    },
    and: function() {
        //if a lookahead is already waiting to be executed we can automatically say that the previous operator was binary
        if (this._la) throw "Chaining multiple binary operators is not allowed";
        //This is just to allow for closure resolution to ensure that the function will retain the correct value of result
        let res = this.result;
        //The Looahead function in question. 'exp' is the result of a subsequent unary operation
        this._la = function(exp) {
            return res && exp;
        };
        return this;
    },
    or: function() {
        //if a lookahead is already waiting to be executed we can automatically say that the previous operator was binary
        if (this._la) throw "Chaining multiple binary operators is not allowed";
        //This is just to allow for closure resolution to ensure that the function will retain the correct value of result
        let res = this.result;
        //The Looahead function in question. 'exp' is the result of a subsequent unary operation
        this._la = function(exp) {
            return res || exp;
        };
        return this;
    },
    tautology: function() {
        var eval = (this._la) ? this._la : this._defaultLa;
        this.result = eval(true);
        this._la = null;
        return this;
    },
    fallacy: function () {
        var eval = (this._la) ? this._la : this._defaultLa;
        this.result = eval(false);
        this._la = null;
        return this;
    }
}

console.log(check.fallacy().or().not().fallacy().result);
```
    true


And there you have it. This is a working, chainable, admittedly ultra-basic fluent validator that you can extent by adding more operators and dependant objects etc.

### Final Product

However, to make it a bit more usable and extendable I thought converting this to a context-full, generic-ish object would be better:

```javascript
function fcheck() {
        this.result = null;
        this._la = null;
        this._defaultLa = function(exp) {
            return exp;
        };
        this._preval = function (exp) {
            var eval = (this._la) ? this._la : this._defaultLa;
            this.result = eval(exp);
        };
        this.not = function() {
            var eval = (this._la) ? this._la : this._defaultLa;
            this._la = function(exp) {
                //We pass in eval to the function stack by taking advantage of javascript closures
                return eval(!exp);
            }
            return this;
        };
        this.or = function() {
            if (this._la) throw "Chaining multiple binary operators is not allowed";
            let res = this.result;
            this._la = function(exp) {
                return res || exp;
            }
            return this;
        };
        this.and = function() {
            if (this._la) throw "Chaining multiple binary operators is not allowed";
            let res = this.result;
            this._la = function(exp) {
                return res && exp;
            };
            return this;
        };
        this.tautology = function() {
            this._preval(true);
            this._la = null;
            return this;
        };
        this.fallacy = function() {
            this._preval(false);
            this._la = null;
            return this;
        }
}

```

This allows us to dynamically add rules on the fly by adding to the object, this function:


```javascript
fcheck.prototype.addRule = function (ruleName, rule) {
    var acc = this;
    this[ruleName] = function () {
        this._preval(rule());
        return acc;
    }
    return this;
}
```

**So the final version:**


```javascript

function fcheck() {
        this.result = null;
        this._la = null;
        this._defaultLa = function(exp) {
            return exp;
        };
        this._preval = function (exp) {
            var eval = (this._la) ? this._la : this._defaultLa;
            this._la = null;
            this.result = eval(exp);
        };
        this.not = function() {
            var eval = (this._la) ? this._la : this._defaultLa;
            this._la = function(exp) {
                return eval(!exp);
            }
            return this;
        };
        this.or = function() {
            if (this._la) throw "Chaining multiple binary operators is not allowed";
            let res = this.result;
            this._la = function(exp) {
                return res || exp;
            }
            return this;
        };
        this.and = function() {
            if (this._la) throw "Chaining multiple binary operators is not allowed";
            let res = this.result;
            this._la = function(exp) {
                return res && exp;
            };
            return this;
        };
        this.tautology = function() {
            this._preval(true);
            return this;
        };
        this.fallacy = function() {
            this._preval(false);
            return this;
        }
}

fcheck.prototype.addRule = function (ruleName, rule) {
    var acc = this;
    this[ruleName] = function () {
        this._preval(rule());
        return acc;
    }
    return this;
}
```

And this object can be used like so:

```javascript
var scenario = new fcheck();
scenario.addRule("myFunction", function () {
    return true;
});

scenario.not().myFunction().and().fallacy().result;
```
    false

This also allows us to compose complex validations, for example:


```javascript

var flagA = true;
var flagB = false;

var Rule1 = new fcheck().addRule("isScenarioA", function () {
    return flagA == true;
});
var Rule2 = new fcheck().addRule("isScenarioA", function () {
    return flagB == true;
});

var BusinessValidations = new fcheck().addRule('rule1', function () {
    return Rule1.isScenarioA().result;
})
.addRule('rule2', function () {
    return Rule2.isScenarioA().result;
});
```


```javascript
BusinessValidations.rule1().and().rule2().result;
```
    false

```javascript
BusinessValidations.rule1().and().not().rule2().result;
```
    true

And that's it. Thanks for sticking around to this sentence. If you, the reader, has any thoughts on this implementation or a better way to do this (besides just using a library...I do know that I can and that's not the point here), please do reach out and let me know on my socials found somewhere on this site.
