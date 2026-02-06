#!/bin/bash

# Image Optimization Script for Thu Tides
# This script compresses WebP images to improve Core Web Vitals

echo "🖼️  Thu Tides Image Optimization"
echo "================================"
echo ""

# Check if cwebp is installed
if ! command -v cwebp &> /dev/null; then
    echo "❌ cwebp not found. Installing via Homebrew..."
    if command -v brew &> /dev/null; then
        brew install webp
    else
        echo "❌ Homebrew not found. Please install webp manually:"
        echo "   Visit: https://developers.google.com/speed/webp/download"
        exit 1
    fi
fi

echo "✅ cwebp found"
echo ""

# Create backup directory
BACKUP_DIR="backup-images"
if [ ! -d "$BACKUP_DIR" ]; then
    echo "📁 Creating backup directory..."
    mkdir -p "$BACKUP_DIR"
fi

# Target images over 5MB
echo "🔍 Finding large images (>5MB)..."
LARGE_IMAGES=$(find public -name "*.webp" -size +5M)

if [ -z "$LARGE_IMAGES" ]; then
    echo "✅ No images over 5MB found!"
    exit 0
fi

echo "Found the following large images:"
echo "$LARGE_IMAGES"
echo ""

# Optimize each image
TOTAL_SAVINGS=0
for img in $LARGE_IMAGES; do
    filename=$(basename "$img")
    echo "🔧 Optimizing: $filename"

    # Get original size
    ORIGINAL_SIZE=$(stat -f%z "$img" 2>/dev/null || stat -c%s "$img" 2>/dev/null)
    ORIGINAL_MB=$(echo "scale=2; $ORIGINAL_SIZE / 1048576" | bc)

    # Back up original
    cp "$img" "$BACKUP_DIR/$filename"

    # Optimize (quality 85, compression level 6)
    cwebp -q 85 -m 6 "$img" -o "${img%.webp}_temp.webp" 2>&1 | grep -v "^Saving"

    if [ $? -eq 0 ]; then
        mv "${img%.webp}_temp.webp" "$img"

        # Get new size
        NEW_SIZE=$(stat -f%z "$img" 2>/dev/null || stat -c%s "$img" 2>/dev/null)
        NEW_MB=$(echo "scale=2; $NEW_SIZE / 1048576" | bc)
        SAVINGS=$(echo "$ORIGINAL_SIZE - $NEW_SIZE" | bc)
        SAVINGS_MB=$(echo "scale=2; $SAVINGS / 1048576" | bc)
        PERCENT=$(echo "scale=1; ($SAVINGS / $ORIGINAL_SIZE) * 100" | bc)

        echo "   ✅ $ORIGINAL_MB MB → $NEW_MB MB (saved $SAVINGS_MB MB, ${PERCENT}% reduction)"
        TOTAL_SAVINGS=$(echo "$TOTAL_SAVINGS + $SAVINGS" | bc)
    else
        echo "   ❌ Failed to optimize $filename"
        rm -f "${img%.webp}_temp.webp"
    fi
    echo ""
done

TOTAL_SAVINGS_MB=$(echo "scale=2; $TOTAL_SAVINGS / 1048576" | bc)
echo "================================"
echo "✅ Optimization complete!"
echo "💾 Total space saved: $TOTAL_SAVINGS_MB MB"
echo "📁 Original images backed up to: $BACKUP_DIR/"
echo ""
echo "Next steps:"
echo "1. Test the site locally (pnpm dev)"
echo "2. Check image quality is acceptable"
echo "3. If quality is good, commit the changes"
echo "4. If not, restore from $BACKUP_DIR/ and adjust quality setting"
