# Prompt evaluation — 19 October 2026

> A later run on 25 October 2026 compared ordinary task briefs with creator prompts on the same fixtures. See [`2026-10-25-brief-vs-creator/`](2026-10-25-brief-vs-creator/README.md).

## Question and method

Does the updated creator produce relevant, usable answers while preserving the facts and qualifications in the supplied material?

Three fixed, fictional source fixtures cover a website comparison, a code review, and a research paper. The task descriptions and source material are identical in both variants. The baseline uses the previous published builder. The update uses the new task-specific builder and explicit comparison fields. For the comparison, the baseline uses the former research mode, matching the task-selection problem that prompted this update. This is a comparison of complete workflows, not an isolated test of one sentence.

Separate fresh assistant workers answered the prompts with the same inherited model configuration and no model override. Each worker received all three cases in the same order, with instructions to treat them independently and not browse. The exact underlying model identifier, sampling seed, and decoding settings were not exposed. The site itself does not call a model.

There was one response per task per version. An intermediate revision was inspected before the final update; a dense verification paragraph led to adding explicit numbered-check guidance. `updated-prompts.json` and `updated-answers.json` retain the final evaluated wording. The parent assistant manually reviewed the final pair against the fixture facts and the criteria below. This review was not blinded.

## Results

| Task | Checks against the fixture | Baseline answer | Updated answer |
|---|---|---|---|
| Website comparison | Four criteria; unknown Cedar price; unknown Flint unsaved-prompt retention; unsupported marketing claim; limits of documentation; downstream AI privacy caveat | Preserved the specified facts and unknowns. Added an unnecessary “research question” paragraph. | Preserved the specified facts and unknowns. Used comparison-specific framing and distinguished absent evidence from an absent feature. |
| Code review | New key inside retry; possible completed charge before timeout; reuse one key; contract-faithful test; no claimed test execution; scope limited to one invocation | Identified the failure, supplied the correction, and gave numbered checks. | Identified the failure, supplied the correction, and gave numbered checks. |
| Research paper | 40 participants, 20 per group; scores 7.0 and 6.5; difference 0.5; 95% interval [-0.3, 1.3]; no delayed test; no completion-time data; limited generalization | Preserved the numbers, uncertainty, and evidence limits. | Preserved the numbers, uncertainty, and evidence limits. |

No factual correction was identified under this checklist in either final variant. The updated comparison removed the irrelevant academic framing. Both variants supported actionable next steps. The updated wording did not consistently shorten answers.

Whitespace-delimited token counts below include Markdown and code. They describe answer length, not readability or model token usage.

| Task | Baseline count | Updated count |
|---|---:|---:|
| comparison | 238 | 275 |
| code-review | 310 | 234 |
| paper | 253 | 263 |

## Limits

This is a small engineering check, not evidence of a general quality gain. It does not test Prompt Cowboy, real product behavior, browsing reliability, other models, repeated runs, or user comprehension. Fictional source documents make factual checks possible but do not reflect the full uncertainty of web research. The evaluator wrote the prompts and knew the version labels. No independent human readability rating, timing measurement, or statistical effect was estimated. Real outputs still need review.

## Application verification

The automated checks pass for 70 task/format combinations, comparison completeness, duplicate subjects, mode switching, user-selected formats, exact source preservation, and text-safe insertion. Static checks cover titles, headings, labels, links, assets, and creator-before-animation order. Animation checks cover the five-second cycle, manual selection, paused motion, reduced-motion behavior, visibility, and DPR limits. Numerical projection checks covered five viewport sizes from 280px to 1320px wide after correcting narrow-screen clipping.

Browser visual QA was unavailable in the editing environment. These tests do not establish pixel-perfect rendering or real-browser accessibility conformance.
