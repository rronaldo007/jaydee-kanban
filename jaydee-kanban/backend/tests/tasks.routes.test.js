// Tests de la création de tâche et de la validation (Exercice 9).
// Vérifie que les données invalides sont rejetées avec le bon code HTTP
// et qu'une création valide réussit.
const request = require('supertest');
const app = require('../src/app');

describe('POST /api/board/tasks — validation', () => {
  it('rejette une requête sans corps (400)', async () => {
    const res = await request(app).post('/api/board/tasks').send({});
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('rejette une couleur invalide (400)', async () => {
    const res = await request(app)
      .post('/api/board/tasks')
      .send({ name: 'Test', color: 'rouge', columnId: 'todo' });
    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/couleur/i);
  });

  it('rejette une colonne inexistante (400)', async () => {
    const res = await request(app)
      .post('/api/board/tasks')
      .send({ name: 'Test', color: '#FF0000', columnId: 'fantome' });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('crée une tâche valide (201) et la renvoie', async () => {
    const res = await request(app)
      .post('/api/board/tasks')
      .send({ name: 'Nouvelle pièce', color: '#3B82F6', columnId: 'todo' });
    expect(res.status).toBe(201);
    expect(res.body).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        name: 'Nouvelle pièce',
        color: '#3B82F6',
        columnId: 'todo'
      })
    );
  });

  it('ne divulgue aucune information technique en cas d\'erreur', async () => {
    const res = await request(app).post('/api/board/tasks').send({});
    expect(res.status).toBe(400);
    // La réponse ne contient que le message ; aucune stack ni détail interne.
    expect(Object.keys(res.body)).toEqual(['error']);
    expect(res.body).not.toHaveProperty('stack');
    expect(res.body.error).not.toMatch(/\n\s+at\s/); // pas de trame de pile
  });
});

describe('PUT /api/board/tasks/:id — modification (SCRUM-25)', () => {
  it('modifie une tâche existante (200) et renvoie la version à jour', async () => {
    const res = await request(app)
      .put('/api/board/tasks/1')
      .send({ name: 'Boîtier automobile v2', color: '#22C55E', columnId: 'doing' });
    expect(res.status).toBe(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        id: 1,
        name: 'Boîtier automobile v2',
        color: '#22C55E',
        columnId: 'doing'
      })
    );
  });

  it('renvoie 404 pour une tâche inexistante', async () => {
    const res = await request(app)
      .put('/api/board/tasks/9999')
      .send({ name: 'Inconnue', color: '#FF0000', columnId: 'todo' });
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty('error');
  });

  it('rejette des données invalides (400)', async () => {
    const res = await request(app)
      .put('/api/board/tasks/1')
      .send({ name: '', color: 'bleu', columnId: 'todo' });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
  });
});
