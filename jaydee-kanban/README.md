# Jaydee Kanban

Application web interne de suivi des ordres de fabrication (tableau Kanban).

## Architecture

- `backend/`  : API REST en Node.js + Express (séparation routes / contrôleurs / services / modèles)
- `frontend/` : interface en React (Vite), structurée en composants réutilisables
- `scripts/`  : scripts shell d'installation et de démarrage du monorepo

## Démarrage rapide (recommandé)

Depuis la racine du projet, deux scripts lancent tout le monorepo :

```
./scripts/install.sh    # installe les dépendances (racine + backend + frontend)
./scripts/start.sh      # démarre l'API et le front en parallèle
```

`start.sh` installe automatiquement les dépendances si elles manquent, puis
lance les deux serveurs ensemble (préfixes `API` en bleu, `WEB` en vert) :

- API Express : http://localhost:3001
- Front React : http://localhost:5173

Équivalents via npm (depuis la racine) :

```
npm run setup       # = ./scripts/install.sh
npm run start:sh    # = ./scripts/start.sh
npm start           # démarre les deux serveurs (concurrently), sans réinstallation
```

## Démarrage manuel (services séparés)

### Back-end
```
cd backend
npm install
npm run dev      # http://localhost:3001
```

### Front-end
```
cd frontend
npm install
npm run dev      # http://localhost:5173
```
