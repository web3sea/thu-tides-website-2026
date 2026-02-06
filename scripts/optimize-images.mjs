#!/usr/bin/env node
/**
 * Image Optimization Script
 *
 * Optimizes all images in the public/ directory:
 * - Converts to WebP format
 * - Resizes to max 2000px width
 * - Compresses with quality 85
 * - Creates backup of originals
 */

import { readdir, mkdir, copyFile, stat } from 'fs/promises';
import { join, extname, basename } from 'path';
import { existsSync } from 'fs';
import sharp from 'sharp';

const PUBLIC_DIR = './public';
const BACKUP_DIR = './public/backup-originals';
const MAX_WIDTH = 2000;
const QUALITY = 85;

// Image extensions to process
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.JPG', '.JPEG', '.png', '.PNG'];

async function ensureBackupDir() {
  if (!existsSync(BACKUP_DIR)) {
    await mkdir(BACKUP_DIR, { recursive: true });
    console.log('✓ Created backup directory');
  }
}

async function getImageFiles() {
  const files = await readdir(PUBLIC_DIR);
  return files.filter(file => {
    const ext = extname(file);
    return IMAGE_EXTENSIONS.includes(ext);
  });
}

async function getFileSize(filePath) {
  const stats = await stat(filePath);
  return stats.size;
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

async function optimizeImage(filename) {
  const inputPath = join(PUBLIC_DIR, filename);
  const backupPath = join(BACKUP_DIR, filename);
  const outputFilename = basename(filename, extname(filename)) + '.webp';
  const outputPath = join(PUBLIC_DIR, outputFilename);

  try {
    // Get original size
    const originalSize = await getFileSize(inputPath);

    // Skip if already optimized
    if (existsSync(outputPath)) {
      console.log(`⏭️  Skipping ${filename} (already optimized as ${outputFilename})`);
      return null;
    }

    // Backup original
    await copyFile(inputPath, backupPath);

    // Get image metadata
    const metadata = await sharp(inputPath).metadata();

    // Optimize and convert to WebP
    await sharp(inputPath)
      .resize(MAX_WIDTH, null, {
        withoutEnlargement: true,
        fit: 'inside'
      })
      .webp({ quality: QUALITY })
      .toFile(outputPath);

    // Get new size
    const newSize = await getFileSize(outputPath);
    const savings = ((originalSize - newSize) / originalSize * 100).toFixed(1);

    console.log(`✓ ${filename} → ${outputFilename}`);
    console.log(`  Original: ${formatBytes(originalSize)} (${metadata.width}x${metadata.height})`);
    console.log(`  Optimized: ${formatBytes(newSize)} (saved ${savings}%)`);

    return {
      original: filename,
      optimized: outputFilename,
      originalSize,
      newSize,
      savings: parseFloat(savings)
    };
  } catch (error) {
    console.error(`✗ Failed to optimize ${filename}:`, error.message);
    return null;
  }
}

async function main() {
  console.log('🖼️  Image Optimization Script\n');
  console.log(`Target: ${PUBLIC_DIR}`);
  console.log(`Max width: ${MAX_WIDTH}px`);
  console.log(`Quality: ${QUALITY}`);
  console.log(`Format: WebP\n`);

  await ensureBackupDir();

  const imageFiles = await getImageFiles();
  console.log(`Found ${imageFiles.length} images to process\n`);

  if (imageFiles.length === 0) {
    console.log('No images found to optimize.');
    return;
  }

  const results = [];
  let totalOriginalSize = 0;
  let totalNewSize = 0;

  for (const file of imageFiles) {
    const result = await optimizeImage(file);
    if (result) {
      results.push(result);
      totalOriginalSize += result.originalSize;
      totalNewSize += result.newSize;
    }
    console.log(''); // Empty line between files
  }

  // Summary
  console.log('📊 Summary');
  console.log('─'.repeat(50));
  console.log(`Images processed: ${results.length}`);
  console.log(`Total original size: ${formatBytes(totalOriginalSize)}`);
  console.log(`Total optimized size: ${formatBytes(totalNewSize)}`);
  const totalSavings = ((totalOriginalSize - totalNewSize) / totalOriginalSize * 100).toFixed(1);
  console.log(`Total space saved: ${formatBytes(totalOriginalSize - totalNewSize)} (${totalSavings}%)`);
  console.log('─'.repeat(50));

  console.log('\n✅ Optimization complete!');
  console.log(`\nOriginal files backed up to: ${BACKUP_DIR}`);
  console.log('\nNext steps:');
  console.log('1. Update your components to use .webp files');
  console.log('2. Test that images load correctly');
  console.log('3. Delete backup folder once verified');
}

main().catch(console.error);
