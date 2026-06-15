// Composant Carte de tâche réutilisable (Exercice 8).
// Affiche le nom de la tâche et son repère visuel (couleur).
export default function TaskCard({ task }) {
  return (
    <article className="task-card" style={{ borderLeftColor: task.color }}>
      <span
        className="task-card__dot"
        style={{ backgroundColor: task.color }}
        aria-hidden="true"
      />
      <span className="task-card__name">{task.name}</span>
    </article>
  );
}
