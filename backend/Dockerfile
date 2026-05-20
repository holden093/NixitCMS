# ---- build stage ----
FROM node:20-bookworm-slim AS build

RUN apt-get update \
  && apt-get install -y --no-install-recommends openssl ca-certificates \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /app
WORKDIR /app/backend

COPY backend/package*.json ./
RUN npm ci

COPY backend ./
COPY shared ../shared

RUN npx prisma generate
RUN npm run build

# ---- production stage ----
FROM node:20-bookworm-slim

RUN apt-get update \
  && apt-get install -y --no-install-recommends openssl ca-certificates tar gosu \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /app/backend

COPY backend/package*.json ./
RUN npm ci --omit=dev

COPY --from=build /app/backend/generated ./generated
COPY --from=build /app/backend/dist ./dist
COPY --from=build /app/backend/prisma/schema.prisma ./prisma/schema.prisma
COPY backend/scripts ./scripts
COPY backend/docker-entrypoint.sh /usr/local/bin/

RUN mkdir -p prisma/data /app/media-storage \
  && chown -R node:node /app

EXPOSE 3001

ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["sh", "-c", "npm run db:setup && npm run start"]
