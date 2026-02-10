const sharp = require('sharp');

async function generatePoster() {
  try {
    await sharp('public/website_banner_poster.png')
      .resize(1920, 1080, {
        fit: 'cover',
        position: 'center'
      })
      .webp({ quality: 85, effort: 6 })
      .toFile('public/website_banner_poster.webp');

    console.log('✓ Poster image generated successfully');

    // Get file size for verification
    const fs = require('fs');
    const stats = fs.statSync('public/website_banner_poster.webp');
    const fileSizeInKB = Math.round(stats.size / 1024);
    console.log(`✓ File size: ${fileSizeInKB} KB`);
  } catch (error) {
    console.error('Error generating poster:', error);
    process.exit(1);
  }
}

generatePoster();
