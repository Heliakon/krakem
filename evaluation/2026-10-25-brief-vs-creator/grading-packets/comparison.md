# Grading packet: comparison

## The user’s task
Compare Cedar and Flint to choose a prompt tool for a team that needs no-login use and no server retention. Use these criteria: cost, login requirement, prompt storage, and source access. Use only the supplied fixture documents; do not browse.

## Source material the user supplied
Fixture A: Cedar product documentation. Cedar composes prompts locally in the browser. It requires no login. It does not send or save prompt text on a server. Users copy prompts into another AI. It cannot fetch URLs. The document does not state a price.
Fixture B: Flint product documentation. Flint requires an account. Its paid plan costs USD 8 per month. It sends prompt text to a model API and stores saved prompts on a server. The document does not say whether unsaved prompts are retained. It can fetch public web pages. Its landing page says “10x better answers” but provides no test results.

## Fact checklist
1. Covers all four criteria (cost, login requirement, prompt storage, source access) for both tools
2. States Cedar price is unknown / not documented
3. States whether Flint retains unsaved prompts is unknown
4. Treats the “10x better answers” claim as unsupported marketing
5. Notes limits of the supplied documentation (does not infer absent features from missing documentation)
6. Notes the downstream caveat: Cedar users paste prompts into another AI, whose retention is outside Cedar’s documentation


---

## Answer R1

**Recommendation: Cedar.** It meets both of your requirements (no login, no server retention) according to its documentation. Flint fails both.

## Comparison

| Criterion | Cedar | Flint |
|---|---|---|
| **Cost** | Not stated in the documentation (unknown) | Paid plan is USD 8 per month |
| **Login requirement** | None | Account required |
| **Prompt storage** | Composed locally in the browser. Prompt text is not sent to or saved on a server. | Prompt text is sent to a model API. Saved prompts are stored on a server. The documentation doesn't say whether unsaved prompts are retained. |
| **Source access** | Cannot fetch URLs. Users copy prompts into another AI. | Can fetch public web pages |

## Analysis

- **No-login use:** Cedar meets this. Flint requires an account, so it doesn't.
- **No server retention:** Cedar's documentation says prompt text is neither sent nor saved on a server. Flint sends prompt text to a model API and stores saved prompts on a server. Even if you never saved a prompt, its handling of unsaved prompts is undocumented, so you couldn't confirm no retention.
- **Cost:** Flint is USD 8 per month. Cedar's price isn't given, so you can't say it is cheaper. Confirm Cedar's pricing before committing.
- **Source access:** This is Flint's one advantage, because it can fetch public web pages. With Cedar, users must paste in any source material themselves. This matters only if your team needs automatic URL fetching.

## Caveats

- Flint's "10x better answers" claim has no test results behind it, so I gave it no weight.
- This comparison uses only the two fixture documents. Vendor documentation describes intended behavior, and I haven't verified it independently.

## Bottom line

If the no-login and no-retention requirements are firm, choose Cedar. Flint is out on those grounds alone, whatever its fetching ability. Two things to settle first: Cedar's price, and whether the lack of URL fetching is acceptable for your workflow.


---

## Answer R2

## Comparison: Cedar vs. Flint

Goal: pick a prompt tool for a team that needs no-login use and no server retention. Sources: Fixture A (Cedar product documentation) and Fixture B (Flint product documentation). I did not browse.

| Criterion | Cedar (Fixture A) | Flint (Fixture B) |
|---|---|---|
| Cost | Unknown. The document does not state a price. | Documented: the paid plan costs USD 8 per month. Whether a free tier exists is unknown. |
| Login requirement | Documented: no login required. | Documented: an account is required. |
| Prompt storage | Documented: composes prompts locally in the browser. It does not send or save prompt text on a server. | Documented: sends prompt text to a model API and stores saved prompts on a server. Retention of unsaved prompts is unknown. |
| Source access | Unknown. The document says nothing about source code. | Unknown. The document says nothing about source code. |

## Evidence types

**Documented features**
- Cedar: local browser composition, no login, no server send or save, copy-paste into another AI, cannot fetch URLs.
- Flint: account required, USD 8 per month paid plan, prompt text sent to a model API, saved prompts stored on a server, can fetch public web pages.

**Marketing claims**
- Flint's landing page says "10x better answers". It provides no test results, so treat the claim as unverified.
- Fixture A contains no marketing claims.

**Inferences (mine, not stated in the documents)**
- Cedar fits your two requirements. The documentation states both no login and no server send or save.
- Flint conflicts with both requirements on documented facts. It requires an account, and it stores saved prompts on a server.
- With Cedar, you must paste prompts into another AI yourself. That other AI is outside Cedar's documentation, so its retention is unknown. "No server retention" would then depend on that tool.

## Trade-offs

**Choose Cedar if** you need no-login use and no server retention in the tool itself. The trade-off is manual work: you copy prompts elsewhere, and Cedar cannot fetch URLs. Its cost is unknown.

**Choose Flint if** you can accept accounts and server-side storage and you value built-in model access and public web page fetching. It costs USD 8 per month on the paid plan. It does not meet your stated requirements as documented.

I am not naming a universal winner. The better option depends on which requirements you treat as fixed. For yours, Cedar is the documented match.

## Limits of the evidence

- Each subject has one short fixture. Absence of a statement means unknown, not absent.
- Source access is unknown for both. Do not assume either is open or closed source.
- Cedar's price is unknown. Flint's free-tier status and unsaved-prompt retention are unknown.
- I did not verify the "10x better answers" claim.

## Next checks

1. Ask Cedar's vendor for its price and whether its source is available.
2. Ask Flint's vendor about free-tier availability, unsaved-prompt retention, and source access.
3. Check the retention policy of the AI where your team will paste Cedar's prompts.


---

## Answer R3

**Recommendation: Cedar.** It meets both of your requirements, no login and no server retention. Flint fails both.

| Criterion | Cedar | Flint |
|---|---|---|
| Cost | Not stated in the documentation | Paid plan is USD 8 per month |
| Login requirement | None | Account required |
| Prompt storage | Composes prompts locally in the browser. It does not send or save prompt text on a server. | Sends prompt text to a model API. Saved prompts are stored on a server. The documentation doesn't say whether unsaved prompts are retained. |
| Source access | Cannot fetch URLs. Users copy prompts into another AI. | Can fetch public web pages |

**Why Cedar fits**
- It requires no login.
- Its documentation says prompt text is neither sent nor saved on a server, so it satisfies the no-retention requirement.
- If you need to bring in outside content, you would have to paste it in yourself, because Cedar can't fetch URLs.

**Why Flint doesn't fit**
- It requires an account, which breaks the no-login requirement.
- It stores saved prompts on a server and sends prompt text to a model API. That breaks the no-server-retention requirement.
- Its documentation also leaves open whether unsaved prompts are retained, so even that case isn't confirmed safe.
- Its one advantage is fetching public web pages. The "10x better answers" claim on its landing page comes with no test results, so I wouldn't count it in Flint's favor.

**Gaps in the documents**
- **Cedar's price is unknown.** Confirm it before committing. Cost can't be compared fairly until then, though Flint's USD 8 per month is only a known cost, not a reason to prefer it.
- **Other costs are unknown.** Cedar sends nothing to a model, so you would paste prompts into another AI, and that tool's cost and data handling are outside this comparison.
- **The documents show no testing.** Neither one reports test results, so this comparison reflects what the vendors say, not independently verified behavior.

If your team needs web page fetching built in, Flint is the only option of the two. Choosing it means giving up both of your hard requirements.


---

## Answer R4

## Comparison: Cedar vs. Flint

Goal: pick a prompt tool for a team that needs no-login use and no server retention. This comparison uses only the two supplied fixture documents. I did not browse.

| Criterion | Cedar (Fixture A) | Flint (Fixture B) |
|---|---|---|
| Cost | Unknown. The document does not state a price. | Documented: the paid plan costs USD 8 per month (Fixture B). Whether a free tier exists is unknown. |
| Login requirement | Documented: no login required (Fixture A). | Documented: an account is required (Fixture B). |
| Prompt storage | Documented: composes prompts locally in the browser. It does not send or save prompt text on a server (Fixture A). | Documented: sends prompt text to a model API and stores saved prompts on a server. Retention of unsaved prompts is unknown (Fixture B). |
| Source access | Unknown. Fixture A does not say whether the source is open or closed. | Unknown. Fixture B does not say whether the source is open or closed. |

### Evidence, claims and inferences

**Documented features**
- Cedar: no login, local browser composition, no server send or save of prompt text. Users copy prompts into another AI. It cannot fetch URLs.
- Flint: account required, USD 8 per month paid plan, prompt text sent to a model API, saved prompts stored on a server. It can fetch public web pages.

**Marketing claim**
- Flint's landing page says "10x better answers". It provides no test results, so treat this as unverified. It does not affect any of the four criteria.

**Inferences (mine, not stated in the documents)**
- Cedar appears to meet both of your requirements, no login and no server retention, based on its documentation.
- Flint does not meet the no-login requirement, because it requires an account. It also stores saved prompts on a server, which conflicts with no server retention.
- Flint's fit on retention is clear from the documented server storage and API transmission, even though unsaved-prompt retention is unknown.
- Cedar's lack of URL fetching and Flint's ability to fetch web pages are documented. They are outside your criteria, so I did not weigh them.

### Which option fits which needs

- **Your stated needs (no login, no server retention):** Cedar fits. Flint conflicts with both requirements on the documented facts.
- **A need to fetch public web pages, or to send prompts directly to a model API inside the tool:** Flint documents these. Cedar documents no model API; users copy prompts into another AI. Cedar cannot fetch URLs.
- **Cost:** Only Flint has a stated price (USD 8 per month). You cannot compare costs, because Cedar's price is unknown.

I am not giving a universal winner or scores. The documents do not support them.

### Limits of the evidence

1. Cedar's price is unknown. Confirm it with the vendor before you commit.
2. Source access is unknown for both tools. If you need open source or code auditability, check each vendor directly.
3. Cedar's "does not send or save prompt text on a server" is a vendor documentation statement. The fixture gives no independent verification, such as an audit or network test.
4. The documents say nothing about other data Cedar might send, such as telemetry. Absence of that information is not evidence of absence.
5. Flint's retention of unsaved prompts is unknown.
6. Both documents are single fixtures. They may omit plans, features or later changes.

### Next checks

1. Ask the Cedar vendor for its price and licence or source availability.
2. Ask the Flint vendor for its source availability and unsaved-prompt retention only if you still want to consider it.
3. If Cedar's no-retention behaviour matters for compliance, verify it yourself, for example by checking the browser's network activity while composing a prompt.
