---
name: cms-manager
description: Gestione operativa dello stack Universal Hotel CMS. Da usare per avvio, arresto, manutenzione database, gestione media e import/export del sito tramite podman-compose.
---

# CMS Manager Skill

Questa skill fornisce i flussi operativi per la gestione dello stack "Universal Hotel CMS" utilizzando `podman-compose`.

## Flussi Operativi Standard

### 1. Gestione Stack (Podman Compose)
Lo stack è composto da due servizi: `backend` e `frontend`.

- **Avvio**: `podman-compose up -d`
- **Arresto**: `podman-compose down`
- **Stato**: `podman-compose ps`
- **Log**: `podman-compose logs -f [backend|frontend]`
- **Build Fresh**: `podman-compose build --no-cache`

### 2. Manutenzione Database (Prisma)
Il database è SQLite, persistito nel volume `app_data`.

- **Generazione Client**: `npm --prefix backend run db:prepare && npx --prefix backend prisma generate`
- **Migrazione Schema**: `npx --prefix backend prisma db push`
- **Seed Dati**: `npm --prefix backend run db:seed`
- **Reset Completo**: `npx --prefix backend prisma db push --force-reset && npm --prefix backend run db:seed`

### 3. Gestione Utente Admin
- **Generazione Hash Password**: `npm --prefix backend run auth:hash-password`
  - *Nota*: Salvare l'output in `.env` per `ADMIN_PASSWORD_HASH`.

### 4. Trasferimento Sito (Import/Export)
Il sistema supporta pacchetti `.tar.gz` contenenti DB e Media.

- **Export**: Effettuabile tramite API `POST /api/admin/site-transfer/export` (richiede auth).
- **Import Manuale (Emergenza)**:
  1. Fermare lo stack: `podman-compose stop`
  2. Sostituire `backend/prisma/data/app.db` con il file esportato.
  3. Sostituire il contenuto del volume `media_data`.
  4. Avviare e forzare allineamento: `podman-compose up -d && npx --prefix backend prisma db push --accept-data-loss`

## Risoluzione Problemi

- **Backend non Healthy**: Controllare i log per errori di connessione SQLite o variabili `.env` mancanti (specialmente `JWT_SECRET`).
- **Frontend 404/502**: Verificare che il backend sia attivo e che l'endpoint `/api` sia correttamente proxato da nginx.
- **Permessi Volumi**: Se i container non scrivono, eseguire `podman unshare chown -R 1000:1000 ./backend/prisma/data ./media-storage`.

## Variabili d'Ambiente Critiche (.env)
- `DATABASE_URL`: Deve puntare a `file:./data/app.db`
- `ADMIN_EMAIL`: Email dell'amministratore
- `ADMIN_PASSWORD_HASH`: Hash bcrypt della password
- `JWT_SECRET`: Stringa casuale per i token sessione
