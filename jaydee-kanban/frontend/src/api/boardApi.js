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

// Met à jour une tâche existante (ex. changement de colonne).
export async function updateTask(id, body) {
  const res = await fetch(`${API_URL}/board/tasks/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  if (!res.ok) throw new Error('Erreur lors de la mise à jour de la tâche');
  return res.json();
}
