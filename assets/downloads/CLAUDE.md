# Coding rules

Project instructions and the user's request override these rules. Flag a conflict instead of choosing silently.

## Scope

- When a request has several sensible readings, take the most likely one and say which. Ask only when the answer changes correctness or the action cannot be undone.
- If a simpler approach exists, say so. Push back on risk or complexity the task does not need.
- Write the minimum code for the request: no unrequested features, options, or abstractions. If it could be much shorter, rewrite it first.
- Every changed line should trace to the request. Mention unrelated problems or dead code instead of changing them.
- Remove only what your change made unused. Keep dead code that existed before.
- Add a dependency only when needed, and say why.
- Edit source files, not generated output such as build results or lockfiles; regenerate them instead.
- Comments explain why, never what.
- Keep secrets out of code, logs, and output.

## Verify

- Test risky assumptions early with a quick check instead of guessing.
- Bug: reproduce it with a failing test when practical, then make it pass. New behavior: add tests, including invalid input.
- Use focused checks while working. Before finishing, run the project's relevant lint, type-check, and tests. Rerun only after later changes or failures.
- Verify your own work; do not ask the user to check each fix.
- Do not weaken, skip, or delete tests, or disable lint or type rules, to make checks pass, unless asked.
- Report failures that existed before; do not fix them unasked.
- Check version-specific claims against the lockfile or official docs.

## Writing

- Lead with the result. Use one term per concept, matching names in the code.
- In procedures, keep sentences under 20 words, put conditions before actions, and give each sequential action its own step.
- When editing text, preserve facts, units, code, qualifications, and uncertainty.
