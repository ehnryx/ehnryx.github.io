---
layout: post
title: "Buff fingers &ge; creativity"
head_title: "Buff fingers"
---

Happy New Year!

Last year I learned various fancy problem solving techniques and fancy data structures. These things
are rather useful to keep in the back pocket, but it seems that recently I have been too eager to
whip out some heavy machinery to turn problems into typing exercises. It is also often the case that
these problems have rather simple and elegant solutions. Here I present two unfortunate problems
that were solved by heavy machinery.

## [Codeforces Round #609 Problem C][C]{:target="_blank"}

This problem is summarized:

> Given a permutation of $$1,...,n$$, and define $$f(k)$$ to be the minimum number of adjacent swaps
> to have the numbers $$1,...,k$$ appear consecutively and in order somewhere in resulting
> permutation. Find $$f(k)$$ for $$k=1,...,n$$.

The idea is to find the number of inversions considering only the numbers $$1,...,k$$, and find the
number of swaps to move the numbers $$1,...,k$$ into a consecutive block in the permutation. The
answer would then be the sum of these two quantities. Since $$n$$ is rather large, we'll need a
subquadratic solution. Counting inversions is a classic problem that can be solved using a set with
order statistics among various other solutions. The harder part is finding the number of swaps to
move the numbers into a consecutive block. Observe that we can find the middle element of the
numbers $$1,...,k$$ as they originally appear in the permutation, and we want to move numbers that
are greater than $$k$$ to the left or right depending on their positions relative to the middle
element. Now, we can almost solve this problem by using some segment tree that supports range update
and range sum to maintain the number of required moves to move each element left of the leftmost
element in $$[1,k]$$ and right of the rightmost element in $$[1,k]$$. The problem is that we only
want to take the sum over elements that are greater than $$k$$ when we do the query. The intended
solution is to write some formulas, do some math, and use a some simple segment tree or fenwick
tree. Alternatively, the buff fingers solution is to use a splay tree which allows range updates,
range queries, and node deletions all in log time. Complexity: $$O(n\log(n))$$.

## [USACO February 2019 Platinum Problem 1][plat1]{:target="_blank"}

The intended solution for this problem is a really simple two pointer walk which can be easily
implemented in under 25 lines. Instead, I maintained convex hulls while doing a divide and conquer
which amounted to 120 lines. Let's see what went wrong.

The first step is to write out the expression that we want to maximize:

$$ \max_{1\le l\le r\le n} \left(\prod_{i=l}^r 1-p_i\right)
\left(\sum_{i=l}^r \frac{p_i}{1-p_i}\right) . $$

Then, we substitute $$F_x=\prod_{i=1}^x 1-p_i$$, and $$S_x=\sum_{i=1}^x p_i/(1-p_i)$$. Now, we can
rewrite the expression as $$\frac{F_r}{F_{l-1}}(S_r-S_{l-1})$$. So far so good. Now, instead of
thinking a bit more, and arriving at the easy two pointer walk, I observed that if we fix $$l$$,
then we can manipulate the expression to make the max part only depend on something linear in
$$S_r$$. Indeed, we can write

$$ \max_{1\le l\le r\le n} \frac{F_r}{F_{l-1}}(S_r-S_{l-1})
= F_r \max_{1\le l\le r\le n} \left(\frac{S_r}{F_{l-1}} - \frac{S_{l-1}}{F_{l-1}} \right). $$

We can solve this in $$O(n\log(n))$$ by maintaining a [convex hull of lines][cht]{:target="_blank"}.

Now, the only problem is that $$F_x$$ is the product of a lot of numbers that could be as small as
1e-6, so it could underflow to 0. To prevent this underflow, we perform a divide and conquer where
we find a range where the product does not underflow around the middle of each divide and conquer
range. Hence, we don't have to worry about $$F_x$$ becoming 0. This solution is $$O(n\log^2(n))$$,
which is too slow. The further observation that the slopes of the linear expressions are monotone
(ie. $$F_x$$ is monotone) allows us to maintain the convex hull in $$O(n)$$, making the total
complexity $$O(n\log(n))$$.

## Remarks

These were two instances where I got lucky and chanced upon a solution. It seems that usually I
don't manage to arrive at a reasonable solution, so I really should think more before committing to
horrid solutions that are probably incorrect and tire my fingers.

[C]: https://codeforces.com/contest/1268/problem/C
[plat1]: http://www.usaco.org/index.php?page=viewproblem2&cpid=924
[cht]: https://codeforces.com/blog/entry/63823
