Replace the existing index.html in the ROOT of your GitHub Pages repository with this file.
This homepage links to batch4-games.html and registers service-worker.js when hosted over HTTPS.
Keep play.html, batch4-games.html, batch4-runtime.js, batch4-games.css, batch4-games-manifest.json, manifest.webmanifest, arcade-icon.svg and service-worker.js in the same repository root.
This index file alone cannot fix 404s if those required files are missing or nested in a subfolder.
