// Composant principal du tableau Kanban (Exercice 8).
// Récupère les données depuis l'API via un appel asynchrone et gère
// l'état de l'application (chargement, erreur, données).
import { useEffect, useState } from 'react';
import { fetchBoard } from '../api/boardApi';
import Column from './Column';

export default function Board() {
  const [columns, setColumns] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [status, setStatus] = useState('loading'); // loading | error | ready

  useEffect(() => {
    let actif = true;

    fetchBoard()
      .then((data) => {
        if (!actif) return;
        setColumns(data.columns);
        setTasks(data.tasks);
        setStatus('ready');
      })
      .catch(() => {
        if (actif) setStatus('error');
      });

    // Évite une mise à jour d'état sur un composant démonté.
    return () => {
      actif = false;
    };
  }, []);

  if (status === 'loading') {
    return <p className="board__message">Chargement du tableau…</p>;
  }

  if (status === 'error') {
    return (
      <p className="board__message board__message--error" role="alert">
        Impossible de charger le tableau. Vérifiez que l'API est démarrée.
      </p>
    );
  }

  // Regroupe les tâches par colonne pour un rendu cohérent.
  const tasksByColumn = (columnId) => tasks.filter((t) => t.columnId === columnId);

  return (
    <div className="board">
      {columns.map((column) => (
        <Column key={column.id} column={column} tasks={tasksByColumn(column.id)} />
      ))}
    </div>
  );
}
