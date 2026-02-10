#!/bin/bash

# Firebase Setup Wizard for Thu Tides Location Voting System
# This script guides you through the Firebase configuration process

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Helper functions
echo_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

echo_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

echo_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

echo_error() {
    echo -e "${RED}❌ $1${NC}"
}

echo_step() {
    echo -e "\n${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${BLUE}$1${NC}"
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}\n"
}

# Welcome message
clear
echo_step "🔥 Firebase Setup Wizard for Thu Tides Voting System"

echo_info "This wizard will help you configure Firebase for the location voting feature."
echo_info "You'll need about 15-20 minutes to complete the setup."
echo ""
echo_info "Prerequisites:"
echo "  • Google account"
echo "  • Access to Firebase Console (https://console.firebase.google.com)"
echo ""

read -p "Press Enter to continue..."

# Step 1: Firebase Project Creation
echo_step "Step 1: Create Firebase Project"

echo_info "Please follow these steps in Firebase Console:"
echo ""
echo "  1. Open: https://console.firebase.google.com"
echo "  2. Click 'Add project' or 'Create a project'"
echo "  3. Project name: thu-tides-voting"
echo "  4. Disable Google Analytics (optional)"
echo "  5. Click 'Create project'"
echo "  6. Wait for creation (~30 seconds)"
echo "  7. Click 'Continue'"
echo ""

read -p "Have you created the Firebase project? (y/n): " created_project

if [[ "$created_project" != "y" && "$created_project" != "Y" ]]; then
    echo_error "Please create the Firebase project first, then run this script again."
    exit 1
fi

echo_success "Firebase project created!"

# Step 2: Enable Firestore
echo_step "Step 2: Enable Firestore Database"

echo_info "In your Firebase Console:"
echo ""
echo "  1. Click 'Firestore Database' in the left sidebar"
echo "  2. Click 'Create database'"
echo "  3. Select 'Start in production mode'"
echo "  4. Choose location closest to your users (e.g., us-central1)"
echo "  5. Click 'Enable'"
echo "  6. Wait for Firestore to initialize (~1 minute)"
echo ""

read -p "Have you enabled Firestore? (y/n): " enabled_firestore

if [[ "$enabled_firestore" != "y" && "$enabled_firestore" != "Y" ]]; then
    echo_error "Please enable Firestore, then run this script again."
    exit 1
fi

echo_success "Firestore enabled!"

# Step 3: Set Security Rules
echo_step "Step 3: Set Firestore Security Rules"

echo_info "In Firestore Console, go to the 'Rules' tab and replace with:"
echo ""
echo "----------------------------------------"
cat << 'EOF'
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /votes/{locationId} {
      allow read: if true;
      allow write: if false;
    }
    match /vote_ips/{ipHash} {
      allow read, write: if false;
    }
  }
}
EOF
echo "----------------------------------------"
echo ""
echo_info "Then click 'Publish'"
echo ""

read -p "Have you set the security rules? (y/n): " set_rules

if [[ "$set_rules" != "y" && "$set_rules" != "Y" ]]; then
    echo_warning "Security rules are important! Consider setting them."
fi

# Step 4: Get Web App Config
echo_step "Step 4: Get Firebase Web App Configuration"

echo_info "Get your web app configuration:"
echo ""
echo "  1. Click the gear icon (⚙️) next to 'Project Overview'"
echo "  2. Select 'Project settings'"
echo "  3. Scroll to 'Your apps' section"
echo "  4. Click the web icon (</>) to add a web app"
echo "  5. Register app with nickname: thu-tides-web"
echo "  6. Don't enable Firebase Hosting"
echo "  7. Click 'Register app'"
echo ""

read -p "Press Enter when you see the Firebase configuration code..."

echo ""
echo_info "Now copy your configuration values:"
echo ""

read -p "  NEXT_PUBLIC_FIREBASE_API_KEY: " api_key
read -p "  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: " auth_domain
read -p "  NEXT_PUBLIC_FIREBASE_PROJECT_ID: " project_id
read -p "  NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: " storage_bucket
read -p "  NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: " messaging_sender_id
read -p "  NEXT_PUBLIC_FIREBASE_APP_ID: " app_id

echo_success "Web app configuration captured!"

# Step 5: Service Account Key
echo_step "Step 5: Generate Service Account Key"

echo_info "Generate and download service account key:"
echo ""
echo "  1. Still in Project Settings, go to 'Service accounts' tab"
echo "  2. Click 'Generate new private key'"
echo "  3. Confirm by clicking 'Generate key'"
echo "  4. A JSON file will download - keep it secure!"
echo ""

read -p "Have you downloaded the service account key JSON? (y/n): " downloaded_key

if [[ "$downloaded_key" != "y" && "$downloaded_key" != "Y" ]]; then
    echo_error "Please download the service account key, then run this script again."
    exit 1
fi

read -p "Enter the full path to the downloaded JSON file: " key_path

# Expand tilde to home directory
key_path="${key_path/#\~/$HOME}"

if [[ ! -f "$key_path" ]]; then
    echo_error "File not found: $key_path"
    exit 1
fi

# Base64 encode the service account key
echo_info "Encoding service account key..."
service_account_key=$(cat "$key_path" | base64)

echo_success "Service account key encoded!"

# Step 6: Update .env.local
echo_step "Step 6: Update Environment Variables"

ENV_FILE=".env.local"

echo_info "Updating $ENV_FILE with Firebase configuration..."

# Backup existing .env.local
cp "$ENV_FILE" "$ENV_FILE.backup"
echo_success "Backed up existing $ENV_FILE to $ENV_FILE.backup"

# Update Firebase variables in .env.local
sed -i.bak "s|^NEXT_PUBLIC_FIREBASE_API_KEY=.*|NEXT_PUBLIC_FIREBASE_API_KEY=$api_key|" "$ENV_FILE"
sed -i.bak "s|^NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=.*|NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=$auth_domain|" "$ENV_FILE"
sed -i.bak "s|^NEXT_PUBLIC_FIREBASE_PROJECT_ID=.*|NEXT_PUBLIC_FIREBASE_PROJECT_ID=$project_id|" "$ENV_FILE"
sed -i.bak "s|^NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=.*|NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=$storage_bucket|" "$ENV_FILE"
sed -i.bak "s|^NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=.*|NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=$messaging_sender_id|" "$ENV_FILE"
sed -i.bak "s|^NEXT_PUBLIC_FIREBASE_APP_ID=.*|NEXT_PUBLIC_FIREBASE_APP_ID=$app_id|" "$ENV_FILE"
sed -i.bak "s|^FIREBASE_SERVICE_ACCOUNT_KEY=.*|FIREBASE_SERVICE_ACCOUNT_KEY=$service_account_key|" "$ENV_FILE"

# Clean up backup files
rm "$ENV_FILE.bak"

echo_success "Environment variables updated!"

# Step 7: Validate Configuration
echo_step "Step 7: Validate Configuration"

echo_info "Validating Firebase configuration..."
node scripts/validate-firebase-config.js

if [ $? -eq 0 ]; then
    echo_success "Configuration is valid!"
else
    echo_error "Configuration validation failed. Please check the errors above."
    exit 1
fi

# Step 8: Seed Firestore
echo_step "Step 8: Seed Firestore Database"

echo_info "Now we'll seed Firestore with the 11 travel destinations."
echo ""

read -p "Ready to seed Firestore? (y/n): " seed_now

if [[ "$seed_now" == "y" || "$seed_now" == "Y" ]]; then
    node scripts/seed-firestore.js

    if [ $? -eq 0 ]; then
        echo_success "Firestore seeded successfully!"
    else
        echo_error "Failed to seed Firestore. Check the error above."
        exit 1
    fi
else
    echo_warning "Skipped seeding. Run later with: node scripts/seed-firestore.js"
fi

# Completion
echo_step "🎉 Setup Complete!"

echo_success "Firebase is now configured for the Thu Tides voting system!"
echo ""
echo_info "Next steps:"
echo "  1. Restart your dev server: pnpm dev"
echo "  2. Visit: http://localhost:3000"
echo "  3. Click 'Where Should We Go Next?' button"
echo "  4. Vote for your favorite destination!"
echo ""
echo_info "Documentation:"
echo "  • Testing guide: VOTING_SYSTEM_TESTING.md"
echo "  • Full setup: FIREBASE_SETUP.md"
echo "  • Implementation: IMPLEMENTATION_COMPLETE.md"
echo ""
echo_success "Happy coding! 🚀"
echo ""
