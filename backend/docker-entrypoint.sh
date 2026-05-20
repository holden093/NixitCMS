#!/bin/sh
set -e

# Fix ownership of mounted volumes (may be root-owned from previous runs)
mkdir -p /app/backend/prisma/data /app/media-storage
rm -rf /app/backend/media-storage
ln -s /app/media-storage /app/backend/media-storage
chown -R node:node /app/backend/prisma/data /app/media-storage 2>/dev/null || true

# Drop to node user and exec the CMD
exec gosu node "$@"
