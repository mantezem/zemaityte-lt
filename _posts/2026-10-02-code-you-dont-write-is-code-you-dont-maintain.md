---
layout: post
title: "Code You Don't Write Is Code You Don't Maintain"
date: 2026-10-18
ai_assistance: "AI assistance: 10% | Claude Opus 5.5"
description: "How AI-generated code compounds."

---

I consider myself environmentally conscious - 
I am mindful of the resources I use and try not to over-consume. 
I try to reduce, reuse, recycle.


Similarly, I have gained something of a reputation at work recently of being the person who likes to delete things.
I have been taking it upon myself to periodically clean up our data ecosystem, and a lot of my code review comments 
have recently been about reducing, reusing, recycling, or, more specifically, 
removing, rethinking, refactoring.


The amount of such comments that I've been writing has probably doubled in the recent months.
It's a common experience today - asking an agent for a change, big or small, 
and receiving a solution that has probably about twice as much code as needed.
Furthermore, first iteration is rarely satisfactory. 
So we iterate. 
And each iteration adds more and more surplus lines of code (LOCs). 


## Exponential growth of LOCs

We are producing a 
[record amount of code](https://github.blog/engineering/architecture-optimization/building-git-infrastructure-for-agent-scale-development/).
Let's do a little thought experiment with maths. 

Let's say we start with some theoretical constant `LOC_MIN`, 
that is the minimal number of LOCs needed for the implementation of some feature.
A great programmer builds the feature and their final number of LOCs, let's call it `LOC_FINAL`, is close to `LOC_MIN`
(we would never expect their `LOC_FINAL` to be equal to `LOC_MIN`, as, to say the least, the number of lines is not the 
only or even most important measure of the quality of a program). 
For an LLM of today, assuming that the number of surplus LOCs is proportional to the number of lines needed, 
or `LOC_MIN`, after the first iteration, its `LOC_FINAL` is `LOC_MIN` times some surplus coefficient `k >= 1`.
That is, `LOC_FINAL(1) = k*LOC_MIN`.

If each iteration produces `k` times more LOCs than needed, 
then after `N >= 1` iterations we have:   

```
LOC_FINAL(N) = LOC_MIN * k * k * ... * k (N times) =  LOC_MIN * k^N.
```

Exponential.

In general, I would guess that no agent of today is producing more than twice the lines needed.
That is, we can probably safely assume that `k ∈ (1, 2]`.
So let's consider the worst case, where `k = 2`.
Without human intervention, after 5 iterations we would have 

```
LOC_FINAL(5) = LOC_MIN * 2^5 = 32 * LOC_MIN.
```

A whole 32 times too many lines.

And it's not that far-fetched. 
The coding agents seem to be tuned to produce first and foremost.
Indeed, just recently an agent even suggested I could re-implement the UI of an open-source 
third-party service just to add a feature I was simply enquiring about. 

I have a real example among the couple of projects which I had purely vibe-coded
by completely letting go of the wheel.
That is, I only interacted with the codebase via the chat with an agent, 
without reviewing or making any decisions about the code.
One of the projects has become completely unmaintainable. 
I had attempted to simplify it - again, using the chat, not by hand - but soon I gave up. 
It just seemed like it would be easier to throw it out and start from scratch.

A good amount of simplification is done before a human submits code for review, 
and yet it's not uncommon to have the code shrink to a half by the end of the review process.
And it's still not great - next time an LLM touches that part of the code, 
the LOCs will continue to compound.

Undoubtedly, the models will keep getting better at coding - they are far from perfect 
and there's  p l e n t y  of room for improvement. 
Eventually, they should be writing code that is actually good, 
and the solutions should require fewer iterations.
If the number of iterations `N` is reduced, and the surplus multiplier `k` gets closer to 1, 
then `LOC_FINAL` will get closer to `LOC_MIN`.

## Single-Use Code

I can definitely see a place where none of this matters, at all.
Not every piece of code needs to be looked at. 
For instance, the single-use code that is now abundant.
The first thing that comes to mind is Claude Artifacts, where you essentially get a one-off dashboard, a visual summary 
of analysis that you performed with Claude.  
There is code underneath, it is essentially used once, and nobody cares if it has 32 times too many lines of code.

But if you want to build an application that will evolve and need ongoing maintenance,
it just doesn't seem like the right time to let go yet. 
You will be iterating over the codebase again and again and again. 
Your exponentially growing LOCs will hit a point eventually where even an LLM won't be able to proceed.
It will require too much context to grasp what changes will have what impact, 
and there will be too much complexity for it to work efficiently.
It may even become too costly to redesign.
Much like my vibe-coded application which only lived a couple of months.

For now, we just have to work with what we have, and put some measures in place against over-engineering.
Let's look at what specifically seems to be over-engineered.

## What Agents Add, Add, Add 

At the time of writing, here are some of the ways agents have been annoying me:

- speculative features whose cost of maintenance outweighs their use, 
- defending against breakages that would either never actually happen, or self-heal with a retry,
- function inception - a function in a function in a function, each with a two paragraph docstring, without adding much functionality,
- leftover tests from previous iterations that are no longer relevant, or don't make sense given the way the feature ended up being implemented, 
- chunks of comments explaining the reasoning of implementation, including approaches that the LLM tried and then rolled back.

Once we notice these patterns, we can start implementing the countermeasures.

## The Countermeasures

Two main principles drive my decision on whether to try and fix a behavioural issue in an agent.
The first one is something I repeat (mostly to myself) all the time - 
if you see a mistake an agent keeps making, commit a measure to the repo to defend against it. 
But that has to be weighed against the second principle - 
the implemented measures are themselves something we need to maintain, 
and while the agent behaviours may seem stubborn, they are also fleeting.


For instance, when Opus 5 came out, Boris Cherny shared that 
[they cut 80% of Claude Code's prompt](https://www.ycombinator.com/library/UN-boris-cherny-we-cut-80-of-claude-code-s-prompt). 
It is only natural that if a version of "be concise and to-the-point" is in most of our own 
[`AGENTS.md`](https://agents.md/) files, 
the next generation of models will have that baked in. 
Below are some of the ways I have tried or considered.



### Waiting It Out

For the first two issues, the answer could be an instruction in `AGENTS.md`. 
But when the instruction is about general agent behaviour rather than something specific to our repo, 
I lean towards waiting it out. 
In the meantime, I ask the questions myself in review: would this failure be silent, and would it be costly? 
If it’s loud, unlikely, and self-heals, do we need 100 lines guarding against it?
Is this feature something we want and are willing to maintain?

### Plugins

Function inception can come from premature abstraction, or appear 
in the final stages of feature implementation, when I have simplified 
the code myself leaving some scaffolding that is actually no longer needed.
Something I have been testing out and enjoying recently is the 
[Code Simplifier](https://claude.com/marketplace/plugins/code-simplifier)
plugin by Anthropic themselves.
The plugin fires proactively, but I have used it directly by asking Claude to check if any of the code
in the current branch could be simplified.
It flagged some class properties that never varied between instances, 
which meant they could simply have been constants.
It pointed out some one-liner functions that were called in a single place only. 
After the use of the plugin, the code was lighter and easier to follow. 


### Skills

To tighten the unit tests, I implemented a `write-unit-tests` skill inspired by the 
[`python-testing` skill](https://github.com/affaan-m/ECC/blob/main/skills/python-testing/SKILL.md) 
from the ECC (Everything Claude Code) repo.
Our agents already know `pytest`, and we only have unit tests, so my version of the skill ended up being much shorter. 
Most importantly, I included a prompt for re-evaluation of all the tests of the branch after each round, 
more specifically, if they are still testing relevant behaviour, and if they should keep their place. 


### Human Touch

I’m not sure that we need to guard against the last example, the multi-line comment blocks agents leave behind. 
Those comment blocks are left for the developer, 
to make it easier for them to review the code once the agent has finished it. 
Most of the time, those comments should be removed manually - deleting them is like ticking check-boxes.
Have you noticed how the comment blocks grow with each iteration, until they contradict themselves and the code?


### Bonus - Code Hygiene

I've also noticed that some of the issues above come from precedents - 
when you point out to an LLM that it over-engineered, oftentimes it explains itself by saying that
it found something similar nearby in your codebase.
They do rely a lot on our repos for design decisions, as well as relying on their own knowledge and skills.
That's a reason in itself to keep a tighter control over the state of your code.
Bloat doesn't just compound within a feature, it spreads across the codebase.

## Let's Delete, Delete, Delete

When coding with Claude, sometimes I check `/usage` for `Total code changes`.
One of my recent PRs had `146 lines added, 829 lines removed`.

Every line you discard is a line that won't break. 
It's a line nobody has to read, comprehend, or debug.
Let's keep removing, rethinking, refactoring.

And let's keep recycling.
