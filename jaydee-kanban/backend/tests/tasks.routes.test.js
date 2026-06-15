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
