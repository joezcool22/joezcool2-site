# Project instructions

Keep all work inside this project. Preserve existing files and local content.

## Architecture
- React, TypeScript, Vite; minimal dependencies, no backend.
- `src/model.ts`: typed shared content model, initial content, validation.
- `src/storage.ts`: localStorage draft/published snapshots and IndexedDB image adapter. Keep persistence separate for future backend integration.
- `src/main.tsx`: hash routing, public renderer, CMS editor, live preview.
- `src/style.css`: responsive public site and admin styles.
- Add valid filename comments at the top of HTML and source files.

## Commands
`npm install`, `npm run dev -- --host 127.0.0.1 --port 5173`, `npm run build`, `npm run preview -- --host 127.0.0.1`.

## Verification
Run production build. Check draft autosave, publish, refresh persistence, and public navigation. Draft edits must never silently alter published content. Confirm destructive actions, validate imports, and retain images required by the published snapshot. Do not add authentication claims, deployments, or scheduled tasks.

- src/theme.css contains the Bolt-inspired dark visual layer. Preserve the one-time themeRevision marker when changing storage; never reapply theme defaults on each load.


- src/videos.ts adapts the root video JSON and validates video entries; src/VideoLibrary.tsx renders categorized, filterable admin video cards and previews. Preserve original placement metadata and deduplicate by YouTube ID. The optional Content.videos field supports old backups. Seed only absent draft collections. Run node tests/videos.cjs after changes to video storage.

