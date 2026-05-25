# Brothers Jukebox — Deploy & CMS Setup

One-time setup to get the site live with a self-serve admin panel for the band.

---

## 1. Push to GitHub

1. Go to https://github.com/new and create a new repo (e.g. `brothers-jukebox-site`). Leave it **empty** — no README, no .gitignore.
2. In Terminal, in this `deploy 3` folder:

   ```bash
   cd "/Users/jaredsylvia/Downloads/deploy 3"
   git init
   git add .
   git commit -m "Initial site"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/brothers-jukebox-site.git
   git push -u origin main
   ```

   Replace `YOUR_USERNAME` with your GitHub handle.

---

## 2. Deploy to Netlify

1. Log into https://app.netlify.com.
2. Click **Add new site → Import an existing project**.
3. Connect GitHub → pick your `brothers-jukebox-site` repo.
4. **Build settings** — leave everything empty:
   - Build command: *(blank)*
   - Publish directory: *(blank, or `.`)*
5. Click **Deploy**. In ~30 seconds you'll have a live URL like `https://random-name-12345.netlify.app`.
6. (Optional) Rename it: **Site configuration → Change site name** → `brothers-jukebox` (gives you `brothers-jukebox.netlify.app`).

---

## 3. Enable the CMS

In your Netlify site dashboard:

1. **Identity → Enable Identity**
2. **Identity → Registration preferences → Invite only** (so randos can't sign up).
3. **Identity → Services → Git Gateway → Enable Git Gateway**
4. **Identity → Invite users** → enter your email + bandmates' emails.
   They'll get a confirmation email; clicking it sets their password.

---

## 4. Update the admin config

Open `admin/config.yml` in this folder and replace both `https://example.netlify.app` lines with your real Netlify URL. Commit + push:

```bash
git add admin/config.yml
git commit -m "Point CMS at production URL"
git push
```

Netlify auto-redeploys in ~30 seconds.

---

## 5. Try it

1. Visit `https://your-site.netlify.app/admin/`
2. Click **Log in** → log in with the email you invited.
3. You'll see four forms: **Home**, **About**, **Shows**, **Merch**.
4. Edit something, click **Publish**. The site rebuilds automatically and the change is live in ~30 seconds.

---

## How to add the band

Same as step 3 — Netlify dashboard → Identity → Invite users → enter their email. They get a confirmation email, set a password, and they can edit at `/admin/`.

---

## Common tasks

**Add a show** → `/admin/` → Shows → "Add show dates" → fill date/venue/time → Publish.
Past dates auto-hide from the upcoming list.

**Add a product** → `/admin/` → Merch → "Add merch table products" → fill in details → Publish.
Make sure `Snipcart product ID` has no spaces (e.g. `tour-tee-mmxxvi`). The `hasSize` checkbox controls whether a size picker shows.

**Swap a member photo** → `/admin/` → About → click the photo under that member → upload new one → Publish.

---

## What's still pending (not blocking launch)

- **Snipcart API key** — `index.html` has `data-api-key="YOUR_SNIPCART_PUBLIC_API_KEY"`. Replace with the band's real public key from https://app.snipcart.com before launch, or carts won't actually work.
- **Promo video** — `Watch Us Live` section is a placeholder. Drop a YouTube embed in `HomePage.js` when ready.
