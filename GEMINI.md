# Universal Hotel CMS — Project Codex & Agent Guide

Questo file è la **fonte assoluta della verità** tecnica, architetturale, operativa e di design del workspace locale. Serve come contratto canonico del progetto e guida per gli agenti IA.

## 0. Regola assoluta di precedenza

- `GEMINI.md` è la prima fonte da consultare per architettura, design system, flussi dati, contratti applicativi, operatività Docker e convenzioni del backoffice/frontend pubblico.
- Se codice, runtime verificato e documentazione divergono, lo stato reale è quello verificato nel codice/runtime; il lavoro non è considerato concluso finché `GEMINI.md` non viene riallineato nello stesso turno.
- Ogni refactor che tocca schema Prisma, API, shell pubblica, design system, routing, seed, bootstrap Docker o flussi admin deve aggiornare questo file con data, impatto e verifica minima eseguita.

## 1. Guida per gli Agenti (Agent Guide)

### Canonical Source
- Leggi questo file prima di apportare modifiche architetturali, API, schema, Docker, routing frontend, design-system o operative.
- Tratta questo file come il contratto del progetto.
- Ignora gli artefatti generati: `frontend/dist/`, `backend/dist/`, `backend/generated/`, `backend/prisma/data/`, volumi locali e output media di runtime.

### Regole di Lavoro
- Preferisci la modifica corretta più piccola e preserva le convenzioni esistenti.
- Non committare file generati, segreti, file database locali, volumi media o output di build.
- Mantieni i valori `.env` privati. Usa `.env.example` per la struttura della configurazione documentata.
- Preserva l'attuale modello di contenuto bilingue Italiano/Inglese e il linguaggio di design pubblico a meno che il compito non lo richieda esplicitamente.

### Comandi Comuni
- Backend build: `npm --prefix backend run build`
- Backend lint: `npm --prefix backend run lint`
- Frontend build: `npm --prefix frontend run build`
- Frontend lint: `npm --prefix frontend run lint`
- Local stack: `docker compose up -d`
- Stack status: `docker compose ps`
- Fresh Docker build: `docker compose build backend frontend`

---

## 2. Architettura e Stato del Progetto

Ultimo allineamento verificato: 2026-04-10 (separazione camere/servizi + prezzo camere + recovery bootstrap Docker/Prisma + promo banner globale + hardening stack Docker + Tourism POI View + governance documentale + collaudo profondo pre-produzione + README operativo + dependency hygiene + audit zero + lint baseline).

### Topologia Reale
1. Il browser raggiunge `frontend` (nginx).
2. `frontend` serve la SPA tramite nginx.
3. nginx proxy-pass verso `backend` per `/api/*`, `/media/*` e `GET /news/:slug`.
4. `backend` espone API Express, renderer HTML News SSR, job runner e storage media.
5. Prisma usa SQLite persistito nel volume Docker `app_data`.
6. I file media vivono nel volume Docker `media_data`.

### Stack Tecnico
- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS, Radix UI, i18next, Leaflet.
- **Backend**: Node.js 20, Express 4, TypeScript, Prisma 5, Sharp, Nodemailer.
- **Database**: SQLite.
- **Deployment**: Docker Compose.

---

## 3. Architettura Dati (Prisma)

L'applicazione usa SQLite tramite Prisma. Non esiste un server database separato.

### Modelli Chiave
- `User`: Admin unico gestito via env.
- `SiteSettings`: Singleton per impostazioni globali e brand.
- `Page` & `Content`: CMS bilingue per slug pubblici.
- `RoomCategory`: Categorie camere con metadati (occupancy, price) e gallery.
- `Service`: Amenities dell'hotel.
- `PointOfInterest`: Luoghi di interesse bilingue con coordinate.
- `MediaFile`: Libreria media con master ottimizzati e varianti WebP.
- `NewsArticle`: Articoli con stati `draft|scheduled|published` e canali `site|newsletter|social`.
- `NewsletterSubscriber`: Gestione iscritti con double opt-in.
- `AsyncJob`: Coda persistita per task asincroni (newsletter, social, scheduling).

---

## 4. Design System "Contemporary calm"

Linguaggio visivo neutro, freddo e pragmatico.

- **Palette**: Ink (`#14100E`), Paper (`#FAFAF7`), Stone (`#E4E2DC`), Accent (`#8B7355`).
- **Tipografia**: `Inter` (Sans) per la maggior parte della UI, `Cormorant Garamond` (Serif) solo per i titoli display delle hero.
- **Componenti**: Radius minimo (2px), zero uppercase (tranne eyebrow), separazione tramite linee sottili (`border-line`), nessun'ombra generosa o gradienti caldi.

---

## 5. Operatività e Flussi Speciali

### Site Transfer (Export/Import)
Permette di migrare l'intero stato (DB + Media) tra ambienti tramite pacchetti `.tar.gz`.
- **Export**: Produce uno snapshot consistente.
- **Import**: Sovrascrittura totale del target. Esegue automaticamente `prisma db push` per allineare lo schema importato al runtime corrente.

### News & SSR
Gli articoli news sono serviti come JSON alla SPA, ma il dettaglio `/news/:slug` è renderizzato lato server dal backend per garantire SEO e Open Graph corretti. Condividono lo stesso contratto di shell pubblica definito in `shared/publicShell.ts`.

### Media Storage
I media sono salvati in `originals/`, `thumbnails/` e `variants/`. Il backend genera automaticamente varianti ottimizzate (`hero`, `gallery`, `card`, ecc.) in formato WebP tramite Sharp.

