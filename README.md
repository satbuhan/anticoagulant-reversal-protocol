# Anticoagulant Reversal in GI Haemorrhage — Interactive Decision Algorithm

An interactive, referenced walkthrough of the decision-making algorithm for
anticoagulant reversal in gastrointestinal haemorrhage. Every box and
decision point in the diagram can be selected to reveal, in one place: what
the step means, why the protocol calls for it, the exact dosing as authored,
and the sources behind it.

**Live site:** https://satbuhan.github.io/anticoagulant-reversal-protocol/

**Authors:** Dr. Özgür Karcıoğlu & Dr. Satuk Buğra Han Bozatlı

This tool is part of a growing atlas of tools built the same way:

- [Clinical Algorithm Atlas](https://satbuhan.github.io/clinical-algorithm-atlas/) — the hub page for all of them
- [Acute aortic dissection — initial medical management](https://github.com/satbuhan/aortic-dissection-protocol) ([live site](https://satbuhan.github.io/aortic-dissection-protocol/))
- [Butyrophenone selection — acute agitation & hyperactive delirium](https://github.com/satbuhan/agitation-delirium-protocol) ([live site](https://satbuhan.github.io/agitation-delirium-protocol/))
- [Influenza antiviral selection — baloxavir marboxil vs oseltamivir](https://github.com/satbuhan/influenza-antiviral-protocol) ([live site](https://satbuhan.github.io/influenza-antiviral-protocol/))
- [Dexketoprofen vs ibuprofen — selecting an NSAID for acute pain](https://github.com/satbuhan/nsaid-pain-protocol) ([live site](https://satbuhan.github.io/nsaid-pain-protocol/))

## Why this exists

A flowchart alone tells a reader *what* to do at each step but not *why*,
and a reader outside the authors' own team cannot easily check the evidence
behind a specific number (an INR-tiered dose, an andexanet dose cut-off, a
resumption window). This page keeps the original algorithm exactly as
authored, and attaches the clinical reasoning and literature to each box
without cluttering the diagram itself.

The algorithm this page presents is Figure 1 / Section 8 of a narrative
review by the same authors, "Management of Anticoagulant-Associated
Gastrointestinal Haemorrhage" (manuscript in preparation); the supplementary
content on this page draws on that review's evidence base, cross-checked
against independent sourcing for every citation.

## Status

This is a working version, built to be tested on both desktop and mobile.
Two things are worth flagging explicitly:

- One manuscript reference (Chai-Adisaksopha et al. 2015, on resuming
  anticoagulation after GI bleeding) carried a DOI that does not resolve to
  that article. The correct DOI was located independently and is used here;
  the `REFERENCES` entry in `assets/content.js` (id 35) notes the
  correction and what the manuscript originally printed.
- The manuscript's Table 2 gives a protamine-sulfate dosing regimen for
  UFH/LMWH reversal without citing a source for it. An independent source
  supporting the same general approach was located (`REFERENCES` id 31) and
  is cited on that box instead of leaving it unsourced.

Everything else is paraphrased from a cited source, listed in the
References section at the bottom of the page.

This is also the first tool in the atlas whose source algorithm forks into
four parallel branches at once (the agent-specific reversal pathways), not
two — `assets/app.js` generalizes the grouped-node wrapper mechanism used
by every earlier tool's YES/NO pairs (see `GROUP_COLUMNS` and the
`flow-wrap-4` CSS class) rather than introducing a separate one-off
mechanism for it.

## Disclaimer

This is an academic / educational reference tool, not a substitute for
institutional protocol or bedside clinical judgement. Verify any dose or
threshold against current local protocol before clinical use.

## How it's built

Plain HTML/CSS/JS, no build step and no framework — a single static site
that GitHub Pages can serve directly.

```
index.html          page structure
assets/style.css     design (the "paper" masthead/references,
                      the diagram scope + readout panel)
assets/content.js     ← single source of truth for every node's text,
                      dosing, and reference list. Edit this file to change
                      what the page says.
assets/app.js         rendering + interaction (builds the diagram and the
                      connector lines from content.js, handles the
                      click-to-expand panel on desktop and the bottom
                      sheet on mobile)
```

### Running it locally

No install needed:

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

### Editing content

Open `assets/content.js`. Each entry in `NODES` is one box or decision
diamond from the algorithm (`meaning`, `rationale`, optional `dose` table,
and `refs` pointing at numbered entries in `REFERENCES`). Add or edit a
reference in `REFERENCES` and point to it by `id` from any node. Never
change a node's `label` or `sub` text without the author team's
sign-off — those fields are the algorithm itself, transcribed verbatim from
Figure 1. Every `sub` field carries the source box's own bullet points as
literal `\n` line breaks — preserve those exactly; they render as separate
lines, not flattened into comma-separated prose, because that is how the
original boxes are drawn.

### Building the next tool in this atlas

See [`METHODOLOGY.md`](METHODOLOGY.md) — the full build/verification
process (fidelity rule, content schema, citation verification, QA steps),
written so that any collaborator or AI assistant can pick up this project
in a fresh session and build the next tool the same way.

## License

Content and code are released under
[CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/) —
share and adapt with attribution, non-commercially, under the same license.
