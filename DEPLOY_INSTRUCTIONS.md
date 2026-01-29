# How to Share "Eduk8u Labuan Investments AI"

You have two easy options to send a link to your boss.

## Option 1: Vercel (Recommended, Fastest, Professional)
This creates a live link like `https://eduk8u-labuan.vercel.app`.

1.  **Create a Repository on GitHub**
    *   Go to [github.com/new](https://github.com/new).
    *   Name it `eduk8u-labuan`.
    *   Click **Create repository**.

2.  **Push Your Code**
    *   Copy the commands GitHub gives you under "…or push an existing repository from the command line".
    *   They will look like this (run these in your terminal):
        ```bash
        git remote add origin https://github.com/YOUR_USERNAME/eduk8u-labuan.git
        git branch -M main
        git push -u origin main
        ```

3.  **Deploy**
    *   Go to [vercel.com/new](https://vercel.com/new).
    *   Select your `eduk8u-labuan` repository.
    *   Click **Deploy**.
    *   **Done!** Send the link to your boss.

## Option 2: GitHub Pages (Free, but requires config changes)
If you specifically need to use GitHub Pages (e.g. `yourname.github.io/eduk8u-labuan`):

1.  Open `next.config.ts`.
2.  Add `output: 'export'` inside the config object.
3.  Open `package.json` and change the build script to: `"build": "next build && touch out/.nojekyll"`.
4.  Run `npm run build`.
5.  Deploy the `out` folder to GitHub Pages.
    *   *Note: This is more complex than Vercel. I strongly recommend Option 1.*

## Local Demo (Show on your screen)
If you are presenting *in person* or via *screen share*:
1.  Ensure `npm run dev` is running.
2.  Open `http://localhost:3000`.
3.  Press `F11` for Full Screen to give the full "App Experience".
