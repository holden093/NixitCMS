# 🏨 Universal Hotel CMS
**Una soluzione CMS pulita, professionale e full-stack progettata per hotel indipendenti e progetti di ospitalità.**

> [!IMPORTANT]
> **Disclaimer**: Questo è un progetto amatoriale, "vibe-coded" e nato per rispondere a un caso d'uso molto specifico e personale. Viene condiviso per fruizione collettiva poiché la soluzione è ritenuta sufficientemente solida e funzionale per scopi simili, ma va inteso come tale.

---
Universal Hotel CMS (UHC) fornisce tutto il necessario per gestire la presenza online di un boutique hotel: da un sito web pubblico ad alte prestazioni a un potente backoffice amministrativo. È costruito con un focus su **velocità**, **semplicità** e **controllo editoriale**.

---

## ✨ Caratteristiche Principali

- **🌍 Completamente Bilingue**: Supporto nativo per Italiano e Inglese per tutti i contenuti pubblici.
- **🏗️ Stack Tecnologico Moderno**: Costruito con React 18, Vite, Tailwind CSS e Node.js.
- **📸 Gestione Media**: Ottimizzazione automatica in WebP e varianti (hero, card, thumbnail) gestite tramite Sharp.
- **📰 News & Newsletter**: Modulo editoriale integrato con pubblicazione programmata e newsletter double opt-in.
- **🛠️ Database Zero-Config**: Basato su SQLite via Prisma per una distribuzione e un backup semplificati.
- **📂 Trasferimento Sito**: Esporta e importa l'intero sito (database + media) con un unico pacchetto `.tar.gz`.
- **🚀 Ottimizzato SEO**: Server-Side Rendering (SSR) per gli articoli news per garantire condivisione social e indicizzazione perfette.

---

## 🚦 Avvio Rapido

Metti in funzione il progetto in meno di 5 minuti usando Podman o Docker.

### 1. Prepara l'Ambiente
Copia il file di esempio delle variabili d'ambiente e personalizzalo:
```bash
cp .env.example .env
```

### 2. Genera la Password Admin
È necessario un hash bcrypt per la tua password amministratore. Esegui questa utility:
```bash
npm --prefix backend run auth:hash-password
```
Copia l'output nella variabile `ADMIN_PASSWORD_HASH` nel tuo file `.env`.

### 3. Lancia lo Stack
```bash
podman-compose up -d
```

Il tuo sito è ora attivo su:
- **Sito Pubblico**: `http://localhost:8080`
- **Pannello Admin**: `http://localhost:8080/admin`
- **Salute API**: `http://localhost:3001/health`

---

## 🛠️ Stack Tecnico

| Livello | Tecnologie |
| :--- | :--- |
| **Frontend** | React 18, Vite, Tailwind CSS, Radix UI, Framer Motion |
| **Backend** | Node.js 20, Express 4, TypeScript |
| **Persistenza** | SQLite + Prisma ORM |
| **Media** | Sharp (ottimizzazione WebP), Multer |
| **DevOps** | Podman/Docker Compose, Nginx |

---

## 📁 Struttura del Progetto

```text
.
├── backend/    # API Express, Schema Prisma, Async Job Runner, SSR News
├── frontend/   # React SPA (Pubblica & Admin), Tailwind, i18next
├── shared/     # Tipi e logica condivisi tra FE e BE
├── MAP.md      # Approfondimento Architetturale
└── AGENTS.md   # Fonte della Verità Tecnica & Guida per l'Agente
```

---

## 🛡️ Moduli Amministrativi

UHC fornisce una suite completa di strumenti per i gestori di hotel:

- **Editor Contenuti**: Gestisci tutti i testi delle pagine e le stringhe localizzate.
- **Categorie Camere**: Descrizioni dettagliate delle camere, occupazione e gestione gallery.
- **Servizi & Comfort**: Mostra l'offerta del tuo hotel.
- **POI (Punti di Interesse)**: Mappa interattiva con raccomandazioni locali.
- **Newsletter**: Gestisci gli iscritti e invia aggiornamenti news.
- **Backup & Migrazione**: Esportazione e importazione del sito con un click.

---

## 📖 Documentazione

Per dettagli tecnici profondi, decisioni architetturali e linee guida di sviluppo, consulta:
- 📘 **[AGENTS.md](./AGENTS.md)**: La "Fonte della Verità" per questo progetto.
- 🗺️ **[MAP.md](./MAP.md)**: Topologia del sistema e mappatura dei flussi dati.

---

## 🤖 Agent Skills

Questo progetto include istruzioni specializzate per gli agenti di codifica IA:
- **`cms-manager`**: Situata in `.antigravity/skills/cms-manager`, fornisce conoscenze procedurali per le operazioni dello stack (migrazioni DB, trasferimento sito, manutenzione).
- **`docker-standard`**: Una regola globale che garantisce che tutte le operazioni siano eseguite via Docker/Podman per mantenere l'integrità dell'ambiente.

Per abilitare queste skill nella tua sessione Antigravity CLI, esegui:
```bash
/skills reload
```

---

## 🤝 Contribuire

I contributi sono benvenuti! Assicurati che ogni modifica sia verificata con `npm run lint` e `npm run build` sia nel frontend che nel backend prima dell'invio.

---

*Costruito con ❤️ per l'ospitalità.*
