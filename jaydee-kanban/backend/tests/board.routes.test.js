// Tests automatisés de la route GET /api/board (Exercice 7).
// On vérifie : le code HTTP, le format des données retournées et la
// gestion des erreurs (route inexistante).
const request = require('supertest');
const app = require('../src/app');

describe('GET /api/board', () => {
  it('répond avec le code HTTP 200', async () => {
    const res = await request(app).get('/api/board');
    expect(res.status).toBe(200);
  });

  it('retourne du JSON contenant les colonnes et les tâches', async () => {
    const res = await request(app).get('/api/board');
    expect(res.headers['content-type']).toMatch(/application\/json/);
    expect(res.body).toHaveProperty('columns');
    expect(res.body).toHaveProperty('tasks');
    expect(Array.isArray(res.body.columns)).toBe(true);
    expect(Array.isArray(res.body.tasks)).toBe(true);
  });

  it('retourne des tâches au format attendu (id, name, color, columnId)', async () => {
    const res = await request(app).get('/api/board');
    expect(res.body.tasks.length).toBeGreaterThan(0);
    const task = res.body.tasks[0];
    expect(task).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        name: expect.any(String),
        color: expect.stringMatching(/^#[0-9A-Fa-f]{6}$/),
        columnId: expect.any(String)
      })
    );
    // Toute tâche référence une colonne existante.
    const columnIds = res.body.columns.map((c) => c.id);
    res.body.tasks.forEach((t) => {
      expect(columnIds).toContain(t.columnId);
    });
  });
});

describe('Gestion des erreurs', () => {
  it('retourne 404 sur une route inexistante', async () => {
    const res = await request(app).get('/api/inexistant');
    expect(res.status).toBe(404);
  });
});
