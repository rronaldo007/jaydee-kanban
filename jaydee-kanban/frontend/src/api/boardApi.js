const API_URL = '/api';

export async function fetchBoard() {
  const res = await fetch(`${API_URL}/board`);
  if (!res.ok) throw new Error('Erreur lors du chargement du tableau');
  return res.json();
}

export async function createTask(body) {
  const res = await fetch(`${API_URL}/board/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || 'Erreur lors de la création de la tâche');
  }
  return res.json();
}

export async function updateTask(id, body) {
  const res = await fetch(`${API_URL}/board/tasks/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  if (!res.ok) throw new Error('Erreur lors de la mise à jour de la tâche');
  return res.json();
}
