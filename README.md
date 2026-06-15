# Jaydee Kanban

Application web interne de suivi des ordres de fabrication (tableau Kanban).
Back-end Node.js + Express, front-end React (Vite).

## Structure du dépôt

- `jaydee-kanban/` : le projet (back-end, front-end, scripts)
- `docs/` : livrables (maquettes, exports)

## Fonctionnalités

### Tableau & cartes
- Affichage du tableau Kanban en colonnes (À faire, En cours, À contrôler, Terminé) avec compteur par colonne.
- Cartes enrichies : badge de priorité, nom, référence OF, échéance ou barre de progression, avatar de l'assigné (initiales dérivées du nom).
- Chargement des données via appel asynchrone à l'API, avec états de chargement et d'erreur.
- Interface responsive : poste fixe et tablette (défilement horizontal), mobile (onglets de colonnes + barre de navigation basse).

### Interactions
- **Détail d'une tâche** : clic sur une carte pour ouvrir un panneau latéral (fermeture par bouton, Échap ou clic sur le fond).
- **Déplacement** : changer le statut d'une tâche d'une colonne à l'autre.
- **Création** : bouton « + Nouvelle tâche » → formulaire (nom, couleur, colonne, priorité, référence, assigné).
- **Édition** : changer la priorité et l'assigné (nom complet) depuis le détail.
- **Filtre** : filtrer les cartes par priorité ; les compteurs reflètent le filtre.
- Mises à jour optimistes avec retour arrière et message en cas d'échec de l'API.

### Back-end (API sécurisée)
- Modèles métier (Colonne, Tâche) avec contrôle de cohérence (id unique, nom, couleur hexadécimale, colonne existante).
- Jeu de données de démonstration validé au démarrage.
- Middleware de validation centralisé sur la création/modification de tâche.
- Gestionnaire global d'erreurs renvoyant un code HTTP adapté, sans fuite d'information technique.
- Tests automatisés (Jest + Supertest) couvrant les routes et les cas d'erreur.

## API

| Méthode | Route | Description |
|---------|-------|-------------|
| `GET` | `/api/health` | État du service (test de communication) |
| `GET` | `/api/board` | Colonnes + tâches au format JSON |
| `POST` | `/api/board/tasks` | Crée une tâche (validée) — `201` / `400` |
| `PUT` | `/api/board/tasks/:id` | Modifie une tâche — `200` / `400` / `404` |

```
cd jaydee-kanban/backend && npm test   # exécute la suite de tests
```

## Architecture (dans `jaydee-kanban/`)

- `backend/`  : API REST en Node.js + Express (séparation routes / contrôleurs / services / modèles)
- `frontend/` : interface en React (Vite), structurée en composants réutilisables
- `scripts/`  : scripts shell d'installation et de démarrage du monorepo

## Démarrage rapide (recommandé)

```
cd jaydee-kanban
./scripts/install.sh    # installe les dépendances (racine + backend + frontend)
./scripts/start.sh      # démarre l'API et le front en parallèle
```

`start.sh` installe automatiquement les dépendances si elles manquent, puis
lance les deux serveurs ensemble (préfixes `API` en bleu, `WEB` en vert) :

- API Express : http://localhost:3001
- Front React : http://localhost:5173

Équivalents via npm (depuis `jaydee-kanban/`) :

```
npm run setup       # = ./scripts/install.sh
npm run start:sh    # = ./scripts/start.sh
npm start           # démarre les deux serveurs (concurrently), sans réinstallation
```

## Démarrage manuel (services séparés)

### Back-end
```
cd jaydee-kanban/backend
npm install
npm run dev      # http://localhost:3001
```

### Front-end
```
cd jaydee-kanban/frontend
npm install
npm run dev      # http://localhost:5173
```
