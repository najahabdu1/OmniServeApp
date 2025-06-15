// Script to generate app icons in different sizes
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Define icon sizes needed for Android and iOS
const iconSizes = [
  // iOS icon sizes
  { size: 20, name: 'icon-20.png' },
  { size: 29, name: 'icon-29.png' },
  { size: 40, name: 'icon-40.png' },
  { size: 50, name: 'icon-50.png' },
  { size: 57, name: 'icon-57.png' },
  { size: 60, name: 'icon-60.png' },
  { size: 72, name: 'icon-72.png' },
  { size: 76, name: 'icon-76.png' },
  { size: 83.5, name: 'icon-83.5.png' },
  { size: 1024, name: 'icon-1024.png' },
  { size: 120, name: 'icon-120.png' },
  { size: 152, name: 'icon-152.png' },
  { size: 167, name: 'icon-167.png' },
  { size: 180, name: 'icon-180.png' },
  
  // Android icon sizes
  { size: 36, name: 'android-icon-36.png' },
  { size: 48, name: 'android-icon-48.png' },
  { size: 72, name: 'android-icon-72.png' },
  { size: 96, name: 'android-icon-96.png' },
  { size: 144, name: 'android-icon-144.png' },
  { size: 192, name: 'android-icon-192.png' },
  { size: 512, name: 'android-icon-512.png' },
  
  // Web icon sizes
  { size: 16, name: 'favicon-16x16.png' },
  { size: 32, name: 'favicon-32x32.png' },
  { size: 96, name: 'favicon-96x96.png' },
  { size: 192, name: 'web-app-manifest-192x192.png' },
  { size: 512, name: 'web-app-manifest-512x512.png' },
];

// Source icon
const sourceIcon = path.join(__dirname, '..', 'assets', 'images', 'app-logo.png');

// Output directory
const outputDir = path.join(__dirname, '..', 'assets', 'images', 'icons');

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Function to process icons
async function processIcons() {
  // Generate icons
  for (const { size, name } of iconSizes) {
    try {
      const outputPath = path.join(outputDir, name);
      console.log(`Generating ${name} (${size}x${size})...`);
      
      // Use sharp to resize the image
      await sharp(sourceIcon)
        .resize(size, size)
        .toFile(outputPath);
      
      // Also copy to the main images directory for select sizes
      if (['favicon-96x96.png', 'web-app-manifest-192x192.png', 'web-app-manifest-512x512.png', 'android-icon-192.png'].includes(name)) {
        fs.copyFileSync(outputPath, path.join(__dirname, '..', 'assets', 'images', name));
      }
      
      console.log(`Generated ${name}`);
    } catch (error) {
      console.error(`Error generating ${name}:`, error.message);
    }
  }
  
  // Create an adaptive icon for Android (using the original as foreground with transparent background)
  try {
    const adaptiveIconPath = path.join(outputDir, 'adaptive-icon.png');
    console.log('Generating adaptive icon for Android...');
    
    await sharp(sourceIcon)
      .resize(1024, 1024)
      .toFile(adaptiveIconPath);
    
    fs.copyFileSync(adaptiveIconPath, path.join(__dirname, '..', 'assets', 'images', 'adaptive-icon.png'));
    console.log('Generated adaptive icon');
  } catch (error) {
    console.error('Error generating adaptive icon:', error.message);
  }
  
  console.log('Icon generation completed!');
}

processIcons().catch(err => {
  console.error('Error in icon generation process:', err);
});
