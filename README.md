# VSG PNEUS — site & admin

Application **Next.js (App Router)** pour VSG PNEUS : site vitrine + formulaires **Devis** et **Rendez-vous**, avec un dashboard **Admin**.

## Prérequis

- **Node.js** (recommandé : LTS)
- **npm** (ou un autre gestionnaire, mais ce repo est prêt pour npm)

## Installation

```bash
npm install
```

## Variables d’environnement (SMTP)

Copier `.env.example` en `.env.local` puis renseigner vos valeurs :

```bash
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=votre-adresse@gmail.com
SMTP_PASS=abcd efgh ijkl mnop
SMTP_FROM="VSG PNEUS <votre-adresse@gmail.com>"
```

Notes :
- Pour Gmail, utiliser un **mot de passe d’application** (pas le mot de passe du compte).
- Le serveur **retire automatiquement les espaces** dans `SMTP_PASS`.
- Les emails des formulaires sont envoyés à **`SMTP_USER`** (le compte SMTP).

## Scripts

```bash
npm run dev     # lancer en développement
npm run build   # build production
npm run start   # démarrer la build
npm run lint    # eslint
```

## Pages principales

- **/** : accueil
- **/services** : services
- **/tarifs** : tarifs
- **/devis** : formulaire devis
- **/rendez-vous** : formulaire rendez-vous
- **/admin** : dashboard admin (protégé)

## Stockage des demandes (devis / rendez-vous)

- Les demandes sont stockées côté navigateur dans le **localStorage** :
  - `vsg_quotes`
  - `vsg_appointments`

Important :
- Un utilisateur peut toujours voir **son propre** localStorage via F12 (comportement normal du navigateur).
- Les `console.log` ont été retirés pour éviter d’afficher des données en clair dans la console.

## Dépendances (principales)

### Runtime

- **next**: 16.1.7
- **react / react-dom**: 19.2.3
- **tailwindcss** (utilisé via classes + `tailwind-merge`)
- **shadcn/ui + Radix** (composants UI)
- **react-hook-form** + **zod** + **@hookform/resolvers** (formulaires + validation)
- **nodemailer** (envoi email SMTP)
- **date-fns** + **moment** (dates)
- **lucide-react** (icônes)
- **@tanstack/react-table** (tables)
- **react-big-calendar**, **react-day-picker** (calendrier)
- **clsx**, **class-variance-authority**, **tw-animate-css** (styles/utilitaires)

### Dev

- **typescript**
- **eslint / eslint-config-next**
- **@types/** (node, react, nodemailer)
- **babel-plugin-react-compiler**

## Structure rapide

- `src/app/` : pages Next.js (App Router) + API routes
- `src/components/` : composants UI/sections/admin/layout
- `src/lib/` : helpers (auth, storage, utils)

## Déploiement

Déployer sur Vercel ou tout environnement Node :
- définir les variables d’environnement SMTP (mêmes clés que `.env.example`)
- exécuter `npm run build` puis `npm run start`
