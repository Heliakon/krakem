# Ordinary brief vs. creator prompt — 25 October 2026

## Question

For the same task and source material, does the prompt from Krakem's creator produce answers that are more correct, more actionable, easier to read, or need less editing than an ordinary brief?

## Method

- **Fixtures:** the three fictional cases in `../fixtures.json` (website comparison, code review, research paper). They are unchanged from the 19 October evaluation.
- **Two prompt types**, built by `make-prompts.mjs` and saved in `prompts.json`:
  - *Ordinary brief:* the fixture's task text, a blank line, then the source material. This is what a visitor might type without the creator.
  - *Creator prompt:* `buildTechnicalPrompt()` from `assets/prompt.js` with the fixture's task type, format, comparison fields, and the same source material.
- **Answers:** 12 in total (3 fixtures × 2 prompt types × 2 runs). Each answer came from a separate, fresh Claude Code subagent requested with the `sonnet` model alias. Every subagent self-reported `claude-sonnet-5-5`. Sampling temperature, seed, and other decoding settings were not exposed. Every subagent got the same wrapper instruction: read one file as the user's message, answer it, and save the answer. It used no other tools and did not browse. Input files had random IDs, so a subagent could not tell which prompt type it received. The wrapper and the Claude Code system prompt differ from an ordinary chat product. Both prompt types were affected equally.
- **Grading:** one grader per fixture, requested with the `opus` model alias. The resolved model identifier was not recorded. Each grader saw the task, the source material, a fact checklist, and the four answers for that fixture, labelled R1–R4 in a random order. Graders were not told that two prompt types existed. The packets are in `grading-packets/`. Graders recorded the following for each answer:
  - checklist status for each item: preserved, missing, or contradicted;
  - statements that are unsupported or wrong;
  - actionability and readability, each on a 1–3 scale with a reason;
  - required editing: none, minor, or substantial, with a note.
- **Unblinding:** labels were mapped back to prompt types only after all grades were saved. `answers.json` has every answer verbatim. `grades.json` has every grade with its mapping.

## Results

These are model judgments, not human ratings. They come from very small samples.

| Measure (6 answers per prompt type) | Ordinary brief | Creator prompt |
|---|---|---|
| Checklist items preserved | 37 of 38 | 37 of 38 |
| Items contradicted | 0 | 0 |
| Statements flagged as unsupported | 4 (code review 1, paper 3) | 2 (paper 2) |
| Actionability 3 of 3 | 6 of 6 | 6 of 6 |
| Readability 3 of 3 | 6 of 6 | 4 of 6 |
| Required editing: none / minor / substantial | 2 / 4 / 0 | 1 / 5 / 0 |
| Answer length in words (comparison; code review; paper) | 368, 332; 538, 584; 600, 543 | 520, 639; 513, 509; 693, 518 |

Per fixture:

- **Comparison.** Each prompt type missed the downstream-AI retention caveat once. Both creator answers read the criterion "source access" as source-code access. They marked it "Unknown" in the table, even though the fixtures document URL fetching. Both ordinary answers mapped it to URL fetching. The 19 October creator answer showed a similar reading. Creator answers were longer, and graders noted repetition in them.
- **Code review.** All four answers preserved every checklist item and gave a code fix and a test that follows the API contract. One ordinary answer contained one unsupported statement.
- **Paper.** All four answers preserved the numbers and uncertainty. Three answers had flagged statements: one creator answer and both ordinary answers. Most were unlabelled practical-significance judgments or confusing explanations of the interval. One creator answer needed no edits.

## Reading the results

The evidence does not show a consistent quality difference between the two prompt types. Both preserved almost every checked fact, and every answer was rated fully actionable. The ordinary briefs here were already specific: they named the criteria, the audience, and "do not browse". A vaguer brief might behave differently; this run does not test that. The creator prompts did not reduce required editing in this sample. The comparison prompt may encourage an overly literal reading of ambiguous criteria. That is a hypothesis for a targeted test, not an established effect.

## Limits

- Two runs per cell. No statistical test was run or would be meaningful.
- One answering model, accessed through Claude Code subagents rather than a chat product. Decoding settings were unknown.
- The grader is also a Claude model, and model graders can share biases with the answering model. There was no human rating, timing, or user-comprehension measure.
- Fictional fixtures allow fact checks but do not reflect real browsing or real product documentation.
- The checklists were written by the same assistant that built the prompts. The grading was blinded; the checklist design was not.

## Reproduce

1. From the site root, run `node evaluation/2026-10-25-brief-vs-creator/make-prompts.mjs`.
2. Answer each prompt in `prompts.json` in a fresh conversation with the same model and settings for both prompt types. Repeat each at least twice.
3. Shuffle the answers for each fixture, remove anything that identifies the prompt type, and grade them against the checklists in `grading-packets/`.
4. Unblind only after all grades are recorded.
