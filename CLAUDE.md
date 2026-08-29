# CLAUDE.md

## Git

Never run `git add`, `git commit`, `git push`, or any other state-changing git
operation unless the user explicitly commands it in that message. "Commit this",
"stage the changes", "push" — an explicit instruction each time. Do not infer it
from context, a finished task, or a passing build. Read-only git (`status`,
`diff`, `log`) is fine.

## Code style

**Comments**: Do not scatter comments through the code. Default to none. Write a
comment only when it is genuinely needed — a doc comment on an exported
function/type whose contract is not obvious, or a short note explaining a
non-obvious "why" (a workaround, a constraint, a subtle ordering). Never narrate
what the code already says. No section-divider banners, no restating the
obvious, no comment per line.
