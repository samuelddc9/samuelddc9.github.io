# TeamTap Games on GitHub Pages

The site is static and requires no build, package install, API keys, or backend.

After editing `teamtap.css`, `teamtap.js`, `motion.css`, or `motion.js`, run `node version-assets.mjs` before committing. It updates their content-based URL versions in `index.html` so visitors receive the matching CSS and JavaScript instead of a cached older version.

`motion.css` and `motion.js` add scroll entrances, hover surfaces, a moving ticker with a pause control, and shaped section transitions. Content stays visible without JavaScript and motion respects the visitor's reduced-motion preference.

## Hosting

In repository **Settings → Pages**, select **Deploy from a branch**, choose **main** and **/ (root)**, then save. If already configured this way, pushing to main updates the site automatically.

Site address: https://teamtap.games/

The root `CNAME` file declares `teamtap.games` as the GitHub Pages custom domain. In Squarespace DNS, use GitHub Pages A records (`185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`) at `@`, and a `www` CNAME to `samuelddc9.github.io`. Remove Squarespace's default website A, www CNAME, and HTTPS records when switching. Email MX and TXT records are independent and should be retained. Enable Enforce HTTPS in GitHub Pages once its certificate is ready.

## Files

- `index.html`: new TeamTap homepage.
- `teamtap.css`, `teamtap.js`: styles and interactions for the new homepage.
- `assets/`: new homepage illustrations and the approved logo.
- `portfolio.html`: preserved previous homepage, linked as Full portfolio / More projects.
- Existing `style.css`, `js/`, `images/`, `projects/`, and `blog.html` continue serving the portfolio and blog.
- `.nojekyll`: serves these static files without Jekyll processing.

The homepage features the two announced games supplied by the owner, using official Steam artwork, gameplay screenshots, and summarised descriptions. See ASSET-SOURCES.md. About and Contact are included on the homepage.

The logo is a transparent raster PNG generated with ImageGen and approved in the design conversation.

## Trailers

Game cards and details include Watch trailer buttons. Royal Armory uses the official YouTube announcement trailer (`qMaAcAulGjU`); TeaShop currently streams its official Steam HLS trailer. The `trailers` configuration in `teamtap.js` selects each source. To switch TeaShop to YouTube later, replace its `stream` entry with a `youtube` video ID.

Players load only on click. Closing the trailer by its close button, backdrop, or Escape removes the player and stops playback. The detail dialog remains available when a trailer is launched from it.

TeaShop uses a locally hosted copy of HLS.js 1.7.4, loaded on demand only in browsers without native HLS support. Source: https://github.com/video-dev/hls.js (Apache-2.0). Distribution: https://cdn.jsdelivr.net/npm/hls.js@1.7.4/dist/hls.min.js. License: `assets/vendor/hls.LICENSE`.
