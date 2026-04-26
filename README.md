# Yogesh K. Desai Website

This project now supports two modes:

- local fallback content for immediate preview
- Sanity-powered content for admin-managed updates

## Main files

- [index.html](/Users/yogeshkdesai/Documents/Codex/2026-04-26/build-a-website-for-yogesh-k/index.html): public website
- [styles.css](/Users/yogeshkdesai/Documents/Codex/2026-04-26/build-a-website-for-yogesh-k/styles.css): site styling
- [script.js](/Users/yogeshkdesai/Documents/Codex/2026-04-26/build-a-website-for-yogesh-k/script.js): rendering logic and Sanity fetch
- [content.js](/Users/yogeshkdesai/Documents/Codex/2026-04-26/build-a-website-for-yogesh-k/content.js): fallback content
- [cms-config.js](/Users/yogeshkdesai/Documents/Codex/2026-04-26/build-a-website-for-yogesh-k/cms-config.js): public Sanity project config
- [studio](/Users/yogeshkdesai/Documents/Codex/2026-04-26/build-a-website-for-yogesh-k/studio): Sanity admin studio
- [SETUP-OPTION-A.md](/Users/yogeshkdesai/Documents/Codex/2026-04-26/build-a-website-for-yogesh-k/SETUP-OPTION-A.md): deployment and admin setup guide

## How the content loading works

1. The website first renders from `content.js`
2. If `cms-config.js` contains a real Sanity `projectId`, it fetches published content from Sanity
3. If Sanity is not configured yet, the fallback content remains visible
