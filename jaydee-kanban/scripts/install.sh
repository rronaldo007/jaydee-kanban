#!/usr/bin/env bash
#
# install.sh — Installe toutes les dépendances du projet Kanban Jaydee.
#
# Installe les paquets de la racine (concurrently), du back-end (Express)
# et du front-end (React/Vite).
#
# Usage : ./scripts/install.sh
#
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "▶ Installation des dépendances dans : $ROOT_DIR"
npm run install:all
echo "✓ Installation terminée. Lancez ./scripts/start.sh pour démarrer."
