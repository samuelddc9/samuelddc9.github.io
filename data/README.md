# Blog Posts Management

This folder contains the blog posts data in JSON format. This makes it easy to manage blog posts without editing HTML directly.

## File Structure

- `blog-posts.json` - Contains all blog posts in JSON format

## How to Add a New Blog Post

1. Open `blog-posts.json`
2. Add a new post object to the `posts` array
3. Follow this structure:

```json
{
  "id": 7,
  "title": "Your Post Title",
  "date": "January 20, 2024",
  "category": "development",
  "image": "your-image.png",
  "excerpt": "Short description that appears in the blog list...",
  "fullContent": [
    "First paragraph of full content.",
    "Second paragraph of full content.",
    "Add as many paragraphs as you need."
  ]
}
```

## Post Fields

- **id**: Unique number for the post (increment from the last post)
- **title**: The blog post title
- **date**: Publication date in format "Month Day, Year" (e.g., "January 20, 2024")
- **category**: One of: `announcements`, `development`, `updates`, `behind-the-scenes`
- **image**: Filename of the image (should be in the root directory)
- **excerpt**: Short preview text shown in the blog list
- **fullContent**: Array of strings, each string is a paragraph

## Categories

Available categories:
- `announcements` - Product launches, company news
- `development` - Development updates, technical posts
- `updates` - Game/app updates, patches
- `behind-the-scenes` - Creative process, team insights

## Notes

- Posts are automatically sorted by date (newest first)
- The category name is automatically formatted for display (e.g., "behind-the-scenes" becomes "Behind The Scenes")
- Make sure image files are in the root directory of the website
- JSON must be valid - use a JSON validator if you're unsure

## Example

```json
{
  "id": 7,
  "title": "New Game Announcement!",
  "date": "February 1, 2024",
  "category": "announcements",
  "image": "newgame.png",
  "excerpt": "We're excited to announce our newest project...",
  "fullContent": [
    "We've been working on something special, and today we're ready to share it with you!",
    "This new game combines everything we love about cooperative gameplay with fresh new mechanics.",
    "Stay tuned for more updates as development progresses!"
  ]
}
```

