# ui-sdk-demos

Next.js sandbox for [Vercel UI SDK](https://ui-sdk.dev) (`@ui-sdk/react` / `@ui-sdk/core`).

Two demos:

| Route | Demo |
| --- | --- |
| `/` | 3-level category **Combobox** (typeahead + selection) |
| `/command` | **Command palette** (Dialog + Command, `Ctrl/Cmd+K`) |

## Quick start

```bash
git clone https://github.com/seulgi-i/ui-sdk-demos.git
cd ui-sdk-demos
npm install
npm run dev -- --port 3010
```

- Combobox: http://localhost:3010/
- Command palette: http://localhost:3010/command

## Screenshots

Demo screenshots: [`docs/images/`](./docs/images/)

Regenerate (dev server on port 3010):

```bash
npm run capture:blog
```

## Stack

- Next.js 16 (App Router) + React 19
- `@ui-sdk/react` / `@ui-sdk/core` `0.1.0-beta.1`

## Verified behaviors (short)

### Combobox

- Filter `채소` → 1 leaf; focus stays on input; `aria-activedescendant` highlights
- `Enter` selects and closes; `Escape` restores the selected label and keeps input focus
- Manual `ComboboxItem` maps did **not** filter; `items` + empty `ComboboxList` did

### Command palette

- Open focuses `command-input`; empty query shows 3 suggestions
- Filter `카테고리` → 2 commands
- `Enter` / `Escape` close the dialog and restore focus to the trigger

## Layout

```text
src/
  app/page.tsx                 # Combobox demo
  app/command/page.tsx         # Command palette demo
  components/
  data/categories.json         # 30-node fake tree
  data/commands.ts             # fake BO commands
docs/
  images/
scripts/capture-blog-images.mjs
```

## Links

- UI SDK docs: https://ui-sdk.dev
- Upstream: https://github.com/vercel-labs/ui
