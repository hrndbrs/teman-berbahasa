## Git

Never run `git add`, `git commit`, `git push`, or any other state-changing git
operation unless the user explicitly commands it in that message. "Commit this",
"stage the changes", "push" — an explicit instruction each time. Do not infer it
from context, a finished task, or a passing build. Read-only git (`status`,
`diff`, `log`) is fine.

## Code style

**Comments**: Default to zero comments. The bar for adding one is high: it must
explain something the code cannot — a non-obvious *why* (a workaround, a spec
quirk, a deliberate deviation), or the contract of an exported function/type
that its signature does not convey. If a comment restates what the next line
does, labels a block, marks a section, or narrates the obvious, it is noise —
do not write it. When tempted to explain *what* code does, rename or restructure
instead. Examples of banned comments:

```
// fetch the user            <- narrates the call
// loop through items        <- narrates the loop
// --- helpers ---           <- section banner
const isOpen = ref(false)    // open state   <- restates the name
// return early if empty     <- narrates the guard
```

**Tailwind**: Use canonical Tailwind classes. Prefer a built-in utility or a
theme token over an arbitrary value (`p-4` not `p-[16px]`, `text-faint` not
`text-[#655e53]`). Reach for arbitrary-value syntax (`[...]`) or raw CSS only
when Tailwind has no primitive for it (e.g. `writing-mode`, custom keyframes) —
and only for that specific declaration. Add a design token to the theme rather
than repeating the same arbitrary value.

**Variable names**: Names must say what the value is. No single letters (except a
loop index or a well-scoped math variable), no vague `data`/`item`/`temp`/`val`,
no abbreviations that aren't already idiomatic in this codebase. A boolean reads
as a predicate (`isOpen`, `hasNext`). Match the naming style of the surrounding
code.
