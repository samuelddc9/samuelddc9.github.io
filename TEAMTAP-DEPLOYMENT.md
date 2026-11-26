# TeamTap Games on GitHub Pages

The site is static and requires no build, package install, API keys, or backend.

After editing `teamtap.css` or `teamtap.js`, run `node version-assets.mjs` before committing. It updates their content-based URL versions in `index.html` so visitors receive the matching CSS and JavaScript instead of a cached older version.

## Hosting

In repository **Settings → Pages**, select **Deploy from a branch**, choose **main** and **/ (root)**, then save. If already configured this way, pushing to main updates the site automatically.

Site address: https://samuelddc9.github.io/

## Files

- `index.html`: new TeamTap homepage.
- `teamtap.css`, `teamtap.js`: styles and interactions for the new homepage.
- `assets/`: new homepage illustrations and the approved logo.
- `portfolio.html`: preserved previous homepage, linked as Full portfolio / More projects.
- Existing `style.css`, `js/`, `images/`, `projects/`, and `blog.html` continue serving the portfolio and blog.
- `.nojekyll`: serves these static files without Jekyll processing.

The homepage features the two announced games supplied by the owner, using official Steam artwork, gameplay screenshots, and summarised descriptions. See ASSET-SOURCES.md. About and Contact are included on the homepage.

The logo is a transparent raster PNG generated with ImageGen and approved in the design conversation.
