---
name: planning
description: Create implementation plans for features, improvements, and multi-step changes, organized as per-feature slices under plans/[plan-name]/ with a resources folder for reference material. Use when the user asks to plan work before coding; skip for straightforward edits.
---

# Planning

Create a decision-ready plan without implementing it.

## Structure

Every plan lives under `plans/[plan-name]/`:

```
plans/[plan-name]/
  plan.md              # overview: outcome, decisions, ordered slice list, verification, risks
  slices/
    01-[slice-name].md # one self-contained file per feature slice
    02-[slice-name].md
    ...
  resources/
    [screenshots, mockups, reference files the user provides]
```

- **plan.md** — top-level summary: outcome, key architectural decisions, ordered list of slices with a one-line description each, overall verification strategy, and remaining risks/prerequisites.
- **slices/** — the plan broken into per-feature slices. Each slice is a single, self-contained markdown file (never split across multiple files), so it can be read in one view — this matters because coding agents (Codex, Claude, etc.) read one file at a time. Name files in execution order (`01-`, `02-`, ...) and state each slice's dependencies on other slices explicitly.
- **resources/** — reference material the user supplies (screenshots, design photos, sample data, existing docs). Check this folder before drafting slices and use anything relevant. If the user says they'll provide images or files for the plan, this is where they go.

## Process

1. Inspect the relevant code, project instructions (CLAUDE.md / AGENTS.md / other skills in this project), established patterns, and anything already in `plans/[plan-name]/resources/`.
2. Ask a clarifying question only when the answer would materially change the approach; otherwise state the assumption and proceed.
3. Write `plans/[plan-name]/plan.md`:
    - Concise outcome and important architectural decisions.
    - Ordered list of slices, each with its filename and one-line purpose.
    - Proportionate verification strategy (focused tests, relevant build/lint checks).
    - Remaining risks, choices, or external prerequisites.
4. Write one file per slice in `plans/[plan-name]/slices/`, each containing:
    - The specific outcome for that slice.
    - Files/areas to change, intended behavior, and dependencies on other slices.
    - Slice-specific verification steps.
5. Keep the plan and every slice specific enough to implement without re-discovery. Do not invent requirements, packages, migrations, or documentation work.
6. Do not make code or configuration changes unless the user separately asks to execute the plan.

## Consistency with other skills

If other skills or instruction files in the project define conventions (naming, folder layout, testing approach, doc style), follow them instead of introducing new ones. Check for project-level skills before drafting a plan.
