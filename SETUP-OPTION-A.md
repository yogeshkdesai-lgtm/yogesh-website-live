# Cloudflare Pages + Sanity Setup

This project is now prepared for:

- a public website hosted on Cloudflare Pages
- an admin content studio in Sanity
- editable text, photos, services, testimonials, consultation details, and contact info

## What is already wired

- The website uses local fallback content from [content.js](/Users/yogeshkdesai/Documents/Codex/2026-04-26/build-a-website-for-yogesh-k/content.js)
- The website will automatically switch to Sanity content when [cms-config.js](/Users/yogeshkdesai/Documents/Codex/2026-04-26/build-a-website-for-yogesh-k/cms-config.js) is filled in
- A ready-to-edit Sanity Studio schema lives in [studio/schemaTypes/siteSettings.ts](/Users/yogeshkdesai/Documents/Codex/2026-04-26/build-a-website-for-yogesh-k/studio/schemaTypes/siteSettings.ts)

## Step 1: Put this project on GitHub

Create a GitHub repository and upload this folder.

## Step 2: Make the site live on Cloudflare Pages

Use the official Cloudflare Pages static HTML flow:
- https://developers.cloudflare.com/pages/framework-guides/deploy-anything/

Recommended settings:

- Production branch: `main`
- Build command: `exit 0`
- Build output directory: `/`

Why `/`:
- this site is plain HTML/CSS/JS in the project root
- `index.html` is already at the top level

## Step 3: Create your Sanity project

Use the official Sanity Studio quickstart:
- https://www.sanity.io/docs/sanity-studio-quickstart

From the `studio` folder, run:

```bash
npm install
npm run dev
```

Before running it, replace `YOUR_PROJECT_ID` in:

- [studio/sanity.config.ts](/Users/yogeshkdesai/Documents/Codex/2026-04-26/build-a-website-for-yogesh-k/studio/sanity.config.ts)
- [studio/sanity.cli.ts](/Users/yogeshkdesai/Documents/Codex/2026-04-26/build-a-website-for-yogesh-k/studio/sanity.cli.ts)

This project is already wired to Sanity project ID `arzxzk0s`.

Keep the dataset as `production` unless you intentionally want another dataset.

## Step 4: Connect the public website to Sanity

Open [cms-config.js](/Users/yogeshkdesai/Documents/Codex/2026-04-26/build-a-website-for-yogesh-k/cms-config.js) and set:

```js
window.SITE_CMS_CONFIG = {
  projectId: "arzxzk0s",
  dataset: "production",
  apiVersion: "2026-04-15",
};
```

After you deploy that file to Cloudflare Pages, the website will fetch published content from Sanity automatically.

## Step 5: Create your first content document

In Sanity Studio:

1. Log in
2. Create a new `Website Content` document
3. Fill in the sections:
   - Global
   - Hero
   - Services
   - Consultation
   - Testimonials
   - About
   - Contact
4. Publish the document

Once published, the Cloudflare-hosted site will start showing that content.

## Step 6: Deploy the Sanity Studio

From the `studio` folder:

```bash
npm run deploy
```

Sanity will guide you through the hosted Studio deployment and give you an admin URL for editing content.

## Important note about access

- The website content is public to visitors
- Editing access is private and controlled through Sanity login
- Anyone you invite to your Sanity project can get admin/editor access

## What you will be able to update later

- your photograph
- hero title and subtitle
- service cards
- consultation options
- testimonials
- about content
- email and booking links
- footer tagline

## If you want the next step done too

After you create the Sanity project ID, I can do one more pass and fill the project IDs into the files for you.
