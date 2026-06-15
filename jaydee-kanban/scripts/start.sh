#!/usr/bin/env bash
#
# start.sh — Démarre l'application Kanban Jaydee (API Express + front React).
#
# Installe les dépendances si nécessaire, puis lance les deux serveurs
# simultanément via concurrently :
#   - API  → http://localhost:3001
#   - WEB  → http://localhost:5173
#
# Usage : ./scripts/start.sh
#
set -euo pipefail

# Racine du projet (dossier parent de scripts/), quel que soit le répertoire courant.
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "▶ Projet : $ROOT_DIR"

# Installe les dépendances seulement si elles manquent (gain de temps au relancement).
if [ ! -d "node_modules" ] || [ ! -d "backend/node_modules" ] || [ ! -d "frontend/node_modules" ]; then
  echo "▶ Installation des dépendances (racine + backend + frontend)…"
  npm run install:all
else
  echo "▶ Dépendances déjà installées — étape ignorée."
fi

echo "▶ Démarrage des serveurs (Ctrl+C pour arrêter)…"
exec npm start
