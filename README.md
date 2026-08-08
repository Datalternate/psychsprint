# PsychSprint

**15 minutes to research. 1 minute to explain.**

A rapid academic research & impromptu-presentation trainer — built for counselling psychology coursework, with a second **Explore Psychology** mode for anyone curious about the mind.

Made by [@psychologistkiariidavis](https://www.instagram.com/psychologistkiariidavis/)

---

## Deploy to GitHub Pages (one-time setup)

1. **Create the repo** on GitHub named `psychsprint` (this matters — the site is pre-configured for `https://<your-username>.github.io/psychsprint/`).

2. **Push this project** to it:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/<your-username>/psychsprint.git
   git push -u origin main
   ```

3. **Turn on Pages via GitHub Actions:**
   - Go to your repo → **Settings** → **Pages**
   - Under "Build and deployment" → **Source**, select **GitHub Actions**
   - That's it — the included workflow (`.github/workflows/deploy.yml`) will build and deploy automatically on every push to `main`.

4. Check the **Actions** tab for build progress. Once it's green, your site is live at:
   ```
   https://<your-username>.github.io/psychsprint/
   ```

### Using a custom domain instead?
If you point a domain (e.g. from Namecheap) at this repo:
1. Add a `CNAME` file to the `public/` folder containing just your domain, e.g. `psychsprint.com`
2. In `vite.config.js`, change `base: "/psychsprint/"` to `base: "/"`
3. Set the domain under Settings → Pages → Custom domain

## Local development

```bash
npm install
npm run dev
```

## Notes

- Session history and progress are stored in the browser's `localStorage` — private to each visitor's device, nothing is sent to a server.
- Content is research-constructed for your 7 units (APS408, 415, 416, 428, 431, 422, 407) — not pulled from an official Machakos University syllabus. Swap in official course outlines as you get them.
