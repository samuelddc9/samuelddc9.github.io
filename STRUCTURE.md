# Project Structure

This document describes the organized folder structure of the Team Tap Games website.

## Directory Structure

```
/
├── index.html              # Main homepage
├── blog.html               # Blog page
├── style.css               # Main stylesheet
├── favicon.ico             # Site favicon
├── README.md               # Project documentation
│
├── images/                 # All image assets
│   ├── teamtap.png         # Company logo
│   ├── hero.png            # Hero section background
│   ├── pattern.jpg         # Background pattern
│   ├── hospitalhavoc.png    # Game screenshots
│   ├── medbaylogo.jpg      # Game assets
│   ├── syncslayer.jpg      # Game assets
│   ├── horizon1.webp       # Game assets
│   ├── icon.png            # App icons
│   └── ...                 # Other images
│
├── projects/               # Individual project pages
│   ├── games/              # Game project pages
│   │   ├── hospital-havoc.html
│   │   ├── monster-medbay.html
│   │   ├── sync-slayer.html
│   │   ├── horizon-breach.html
│   │   └── kick-soccer-card-game.html
│   │
│   └── apps/               # App project pages
│       ├── true-camera.html
│       ├── farmer-connect.html
│       ├── rpg-helper.html
│       └── card-game-generator.html
│
├── js/                     # JavaScript files
│   └── app.js              # Main application script
│
└── data/                   # Data files
    ├── blog-posts.json     # Blog posts data
    └── README.md           # Blog management guide
```

## Path References

### From Root Files (index.html, blog.html)
- Images: `images/filename.ext`
- CSS: `style.css`
- JS: `js/app.js`
- Projects: `projects/games/filename.html` or `projects/apps/filename.html`

### From Project Pages (projects/games/ or projects/apps/)
- Images: `../../images/filename.ext`
- CSS: `../../style.css`
- JS: `../../js/app.js`
- Home: `../../index.html`
- Blog: `../../blog.html`

## Adding New Content

### Adding a New Game
1. Create HTML file in `projects/games/`
2. Add images to `images/`
3. Update `index.html` with new game entry
4. Use paths: `../../images/` for images, `../../style.css` for CSS

### Adding a New App
1. Create HTML file in `projects/apps/`
2. Add images to `images/`
3. Update `index.html` with new app entry
4. Use paths: `../../images/` for images, `../../style.css` for CSS

### Adding a New Blog Post
1. Edit `data/blog-posts.json`
2. Add new post object to the `posts` array
3. Image paths in JSON should be just the filename (e.g., `"image": "filename.png"`)
4. Blog.html automatically prepends `images/` to image paths

## Notes

- All images are centralized in the `images/` folder
- Project pages are organized by type (games/apps)
- Blog posts are managed via JSON for easy editing
- Paths are relative and work correctly from each file's location

