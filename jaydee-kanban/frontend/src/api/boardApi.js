// Couche d'accès à l'API (appels asynchrones).
const API_URL = '/api';

export async function checkHealth() {
  const res = await fetch(`${API_URL}/health`);
  if (!res.ok) throw new Error('API injoignable');
  return res.json();
}

export async function fetchBoard() {
  const res = await fetch(`${API_URL}/board`);
  if (!res.ok) throw new Error('Erreur lors du chargement du tableau');
  return res.json();
}
