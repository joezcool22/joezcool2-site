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


## GitHub Pages preparation

Source repository: https://github.com/joezcool22/joezcool2-site

The Pages workflow is manual only. Uploading or pushing source does not deploy this site. When ready for a preview deployment:
1. In repository Settings > Pages, choose GitHub Actions as the build source.
2. Open Actions > Deploy to GitHub Pages > Run workflow on main.
3. After success, use https://joezcool22.github.io/joezcool2-site/.

The Vite configuration uses relative asset URLs and the app uses hash routes. node_modules, dist, and local browser content are not committed.

Release limitation: this is still a local CMS demo. The Publish button writes only to the current browser. Uploaded images and edited content are not uploaded to GitHub. The source video catalog is included, but public video galleries and shared published-content loading still need implementation before replacing the existing site. No existing domain settings are changed by this setup.
