/**
 * Convert PNG logos to WebP format for better performance
 *
 * This script converts the 3 partner logos from PNG to WebP,
 * reducing file size from 2.58 MB to ~775 KB (70% reduction).
 *
 * Run with: node scripts/convert-logos-to-webp.js
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const logos = [
  'logo_evolution.png',
  'logo_munduk_heaven.png',
  'logo_reconnect.png',
];

const publicDir = path.join(__dirname, '..', 'public');

async function convertLogo(filename) {
  const input = path.join(publicDir, filename);
  const output = path.join(publicDir, filename.replace('.png', '.webp'));

  // Check if input file exists
  if (!fs.existsSync(input)) {
    console.warn(`⚠️  ${filename} not found, skipping...`);
    return null;
  }

  try {
    // Convert to WebP with high quality
    await sharp(input)
      .webp({ quality: 85, effort: 6 })
      .toFile(output);

    const originalSize = fs.statSync(input).size;
    const webpSize = fs.statSync(output).size;
    const reduction = Math.round((1 - webpSize / originalSize) * 100);

    return {
      filename,
      originalSize,
      webpSize,
      reduction,
    };
  } catch (error) {
    console.error(`❌ Error converting ${filename}:`, error.message);
    return null;
  }
}

async function main() {
  console.log('🖼️  Converting logos to WebP format...\n');

  const results = await Promise.all(logos.map(convertLogo));
  const successful = results.filter((r) => r !== null);

  if (successful.length === 0) {
    console.error('❌ No logos were converted successfully');
    process.exit(1);
  }

  console.log('📊 Conversion Results:\n');

  let totalOriginal = 0;
  let totalWebp = 0;

  successful.forEach((result) => {
    totalOriginal += result.originalSize;
    totalWebp += result.webpSize;

    const originalMB = (result.originalSize / 1024 / 1024).toFixed(2);
    const webpKB = (result.webpSize / 1024).toFixed(0);

    console.log(
      `✅ ${result.filename}: ${originalMB} MB → ${webpKB} KB (${result.reduction}% reduction)`
    );
  });

  const totalSavings = totalOriginal - totalWebp;
  const totalSavingsMB = (totalSavings / 1024 / 1024).toFixed(2);
  const totalReduction = Math.round((1 - totalWebp / totalOriginal) * 100);

  console.log('\n📦 Total Savings:');
  console.log(
    `   Original: ${(totalOriginal / 1024 / 1024).toFixed(2)} MB`
  );
  console.log(`   WebP: ${(totalWebp / 1024 / 1024).toFixed(2)} MB`);
  console.log(
    `   Savings: ${totalSavingsMB} MB (${totalReduction}% reduction)`
  );

  console.log('\n✨ Conversion complete!');
  console.log(
    '\n💡 Next steps: Update components to use .webp extensions'
  );
}

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
