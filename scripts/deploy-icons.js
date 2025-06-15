// Script to copy and rename app icons to the right locations
const fs = require('fs');
const path = require('path');

const iconsDir = path.join(__dirname, '..', 'assets', 'images', 'icons');
const imagesDir = path.join(__dirname, '..', 'assets', 'images');

// Define icon mappings
const iconMappings = [
  { source: 'icon-1024.png', target: 'icon.png' },
  { source: 'icon-1024.png', target: 'splash-icon.png' },
  { source: 'favicon-96x96.png', target: 'favicon-96x96.png' },
  { source: 'favicon-32x32.png', target: 'favicon.png' },
  { source: 'android-icon-192.png', target: 'adaptive-icon.png' },
  { source: 'icon-180.png', target: 'apple-touch-icon.png' },
  { source: 'web-app-manifest-192x192.png', target: 'web-app-manifest-192x192.png' },
  { source: 'web-app-manifest-512x512.png', target: 'web-app-manifest-512x512.png' },
];

console.log('Copying app icons to appropriate locations...');

// Copy each icon
iconMappings.forEach(({ source, target }) => {
  try {
    const sourcePath = path.join(iconsDir, source);
    const targetPath = path.join(imagesDir, target);
    
    if (fs.existsSync(sourcePath)) {
      fs.copyFileSync(sourcePath, targetPath);
      console.log(`Copied ${source} to ${target}`);
    } else {
      console.error(`Source file ${source} does not exist`);
    }
  } catch (error) {
    console.error(`Error copying ${source} to ${target}:`, error.message);
  }
});

console.log('App icons copied successfully!');
