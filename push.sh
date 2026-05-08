#!/bin/bash
echo "🚀 Preparing to push to GitHub..."

# Add all files
git add .

# Commit changes
git commit -m "feat: complete Real Time ISS & News Dashboard implementation"

# Make sure we are on the main branch
git branch -M main

# Ensure remote is set
git remote remove origin 2>/dev/null
git remote add origin https://github.com/abhay150-code/Real_Time_ISS_News_Dashboard.git

echo "🔄 Synchronizing with remote repository..."
# Pull any changes from remote to avoid conflicts (like a remote README)
git pull origin main --allow-unrelated-histories --no-rebase -m "Merge remote setup" 2>/dev/null

echo "⬆️ Pushing code to GitHub..."
# Push to GitHub
git push -u origin main

echo "✅ Done! Your code should now be live on GitHub."
