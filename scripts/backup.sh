#!/bin/bash
# MoJoe Nightly Backup Script
# Backs up workspace to NAS

set -e

BACKUP_DIR="/Volumes/Sync-OneDrive/Clawdbot Backups"
WORKSPACE="$HOME/clawd"
CONFIG_DIR="$HOME/.clawdbot"
DATE=$(date +%Y-%m-%d)
LOG="$WORKSPACE/logs/backup.log"

mkdir -p "$WORKSPACE/logs"

log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG"
}

# Check if NAS is mounted, if not mount it
if [ ! -d "$BACKUP_DIR" ]; then
    log "Mounting NAS..."
    osascript -e 'tell application "Finder" to mount volume "smb://Mojoeagent:w_IA57jG@GutHome-NAS/Sync-OneDrive"' 2>/dev/null
    sleep 3
fi

if [ ! -d "$BACKUP_DIR" ]; then
    log "ERROR: Could not mount NAS"
    exit 1
fi

log "Starting backup..."

# Git commit & push (if remote exists)
cd "$WORKSPACE"
if [ -d ".git" ]; then
    log "Git: Adding changes..."
    git add -A
    if git diff --staged --quiet; then
        log "Git: No changes to commit"
    else
        git commit -m "Auto-backup $DATE" || true
        if git remote | grep -q origin; then
            git push origin main 2>/dev/null || log "Git: No remote configured, skipping push"
        fi
    fi
fi

# Rsync workspace to NAS (excluding large/temp files)
log "Syncing workspace to NAS..."
rsync -av --delete --modify-window=1 \
    --exclude='node_modules' \
    --exclude='venv' \
    --exclude='.next' \
    --exclude='dist' \
    --exclude='build' \
    --exclude='.env' \
    --exclude='*.log' \
    --exclude='.DS_Store' \
    --exclude='.git' \
    --exclude='.clawdhub' \
    "$WORKSPACE/" "$BACKUP_DIR/clawd/"

# Backup clawdbot config (excluding media and browser cache)
log "Syncing clawdbot config to NAS..."
rsync -av --delete --modify-window=1 \
    --exclude='media/inbound' \
    --exclude='media/outbound' \
    --exclude='browser' \
    --exclude='Cache' \
    --exclude='*.log' \
    --exclude='sessions' \
    "$CONFIG_DIR/" "$BACKUP_DIR/clawdbot-config/"

log "Backup complete!"
