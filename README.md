# Forma local CMS

React + TypeScript + Vite. A working local CMS and public website.

## Commands

- `npm install`
- `npm run dev -- --host 127.0.0.1 --port 5173`
- `npm run build`
- `npm run preview -- --host 127.0.0.1`

Open `/#/` for the published website and `/#/admin` for the CMS. Hash routing supports static hosting. Build output is `dist/`.

## Storage and architecture

`src/model.ts` defines the shared content model and backup validation. `src/storage.ts` owns localStorage and IndexedDB persistence and is the adapter to replace for a backend. `src/main.tsx` renders both the public site and live draft preview with the same Website component. Draft autosaves after 450ms; Publish copies the draft to the public snapshot. Content initializes only when no saved record exists. Corrupt saved content is preserved with a recovery screen.

Uploaded images are stored in IndexedDB. Replacing an image creates a new blob so published content remains unchanged until publishing. Backups include drafts, published content, and image data. Import validates before replacing content. Orphaned image blobs are retained to avoid destructive loss.

This is a browser-local demo with no secure authentication, server, multiuser synchronization, or email form service. Contact links open an email client. Data belongs to the current browser profile and origin; changing the port changes storage. Clearing browser data removes content. Export backups regularly. Preview links are inert in the editor. Use View site to test navigation. Content links should use hash routes or trusted URLs. The logo accepts text or a Unicode symbol; image sections use the media library.

## Visual theme

The Bolt-inspired dark theme lives in src/theme.css. The public renderer still reads accent color, background, and font from the content model. A one-time theme revision in the storage adapter updates existing local theme settings without resetting page content, navigation, or media. Future appearance edits and backup imports preserve their own theme values. The design uses system fonts and CSS gradients with no external font or image requests.


## Video media library

Media library > Videos includes 500 unique YouTube links from joezcool2-video-links.json, preserving 502 original gallery placements across 10 sections. Filter by section and Regular videos, Shorts, or Livestreams; search by title, description, section, or video ID. Counts show unique videos (208 regular, 291 Shorts, 1 livestream), while source placement counts include duplicates. Missing titles display the video ID. Preview opens a YouTube privacy-enhanced embed with a direct watch link fallback. No videos are downloaded. External thumbnails and playback require internet and provider availability.

The collection is seeded into the draft only when the videos field is absent. Refresh does not re-import removed entries. Metadata edits and removals autosave and are included in validated JSON backups. Existing public pages are unchanged; this addition is an admin collection, not a public video gallery. Run node tests/videos.cjs for import, persistence, and backup checks.


## Live preview and republishing

Preview: https://joezcool22.github.io/joezcool2-site/
Repository: https://github.com/joezcool22/joezcool2-site

The public hosted site always reads src/published-site.json, including portable image data. Every visitor receives the same deployed snapshot. Draft content is never used for the hosted public pages. Public video galleries support search, section and format filters, pagination, and YouTube playback. No authentication or backend is provided.

To edit and republish:
1. Open /#/admin locally or on the preview URL. Drafts autosave in that browser and origin.
2. To start from the current deployed version, Backups > Load deployed content into draft (confirm replacement).
3. Make changes; choose Publish locally.
4. In Backups, choose Export published site. This downloads published-site.json with published content and images only.
5. In this project run: npm run import:published -- "C:/path/to/published-site.json"
6. Run node tests/videos.cjs and npm run build.
7. Commit and push. GitHub Actions validates, builds, and deploys pushes to main. It also supports a manual workflow run.

You can give Codex the exported file path and ask it to import and republish. Do not place GitHub credentials in the website. Editing on the hosted CMS does not automatically upload changes. The public site remains on the last deployment until a successful push and workflow run.

The Vite configuration uses relative asset paths and routing uses hashes for repository subpaths. Domain settings are unchanged. Point joezcool2.com at Pages only when the replacement is ready. Existing local browser content is preserved and can be exported separately.

The initial live preview uses new JoezCool2 sample copy and the complete video catalog. It does not copy private/local drafts automatically. scripts/seed-release.cjs created the first snapshot; do not rerun it over edited published content.
