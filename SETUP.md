# Setup Instructions

## GitHub Pages Deployment

This website is designed for GitHub Pages and will work automatically when deployed. All paths are relative and will work correctly on GitHub Pages.

**Your site will be available at:** `https://samuelddc9.github.io`

## Running the Website Locally (For Testing)

This website uses modern web features (fetch API) that require a web server to work properly. Opening HTML files directly in a browser (file:// protocol) will cause CORS errors. However, **this is only for local testing** - GitHub Pages serves files over HTTPS, so everything works perfectly when deployed.

### Option 1: Python HTTP Server (Recommended)

If you have Python installed:

```bash
# Python 3
python -m http.server 8000

# Or Python 2
python -m SimpleHTTPServer 8000
```

Then open: `http://localhost:8000`

### Option 2: Node.js HTTP Server

If you have Node.js installed:

```bash
# Install http-server globally (one time)
npm install -g http-server

# Run the server
http-server -p 8000
```

Then open: `http://localhost:8000`

### Option 3: VS Code Live Server

If you're using VS Code:
1. Install the "Live Server" extension
2. Right-click on `index.html`
3. Select "Open with Live Server"

### Option 4: GitHub Pages

Since this is a GitHub Pages repository (`samuelddc9.github.io`), you can:
1. Push your changes to GitHub
2. The site will automatically be available at: `https://samuelddc9.github.io`

## Troubleshooting

### CORS Errors
If you see CORS errors in the console, you're opening the file directly. Use one of the server options above.

### Image Not Found Errors
- Make sure all images are in the `images/` folder
- Check that paths use `images/filename.ext` from root files
- Check that paths use `../../images/filename.ext` from project pages

### Blog Posts Not Loading
- Make sure `data/blog-posts.json` exists
- Make sure you're using a web server (not file://)
- Check browser console for specific error messages

## File Structure

```
/
├── index.html          # Main page
├── blog.html           # Blog page
├── style.css           # Styles
├── images/             # All images
├── projects/           # Project pages
│   ├── games/
│   └── apps/
├── js/                 # JavaScript
└── data/               # JSON data
```

## Quick Start

1. Open terminal in the project directory
2. Run: `python -m http.server 8000`
3. Open browser: `http://localhost:8000`

