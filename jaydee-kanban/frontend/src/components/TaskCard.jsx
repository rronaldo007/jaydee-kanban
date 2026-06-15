// Composant Carte de tâche réutilisable (Exercice 8 / SCRUM-26).
// Affiche : badge de priorité, nom, référence OF, échéance ou progression,
// et avatar de l'assigné. Les champs d'affichage sont optionnels.

// Couleurs des badges de priorité (fond / texte), alignées sur la maquette.
const PRIORITY_STYLES = {
  CRITIQUE: { bg: '#FEE2E2', fg: '#B91C1C' },
  STANDARD: { bg: '#DBEAFE', fg: '#1D4ED8' },
  ROUTINE: { bg: '#FEF3C7', fg: '#B45309' },
  'EN COURS': { bg: '#CCFBF1', fg: '#0F766E' },
  QUALITÉ: { bg: '#FEF3C7', fg: '#B45309' },
  DIMENSIONNEL: { bg: '#DBEAFE', fg: '#1D4ED8' },
  TERMINÉ: { bg: '#DCFCE7', fg: '#15803D' }
};

export default function TaskCard({ task }) {
  const badge = PRIORITY_STYLES[task.priority] || { bg: '#E2E8F0', fg: '#475569' };
  const hasProgress = typeof task.progress === 'number';

  return (
    <article className="task-card" style={{ borderLeftColor: task.color }}>
      {task.priority && (
        <span
          className="task-card__badge"
          style={{ backgroundColor: badge.bg, color: badge.fg }}
        >
          {task.priority}
        </span>
      )}

      <h3 className="task-card__name">{task.name}</h3>
      {task.reference && <p className="task-card__ref">{task.reference}</p>}

      {hasProgress ? (
        <div className="task-card__progress">
          <div className="task-card__progress-track">
            <div
              className="task-card__progress-bar"
              style={{ width: `${task.progress}%` }}
            />
          </div>
          <span className="task-card__progress-value">{task.progress}%</span>
        </div>
      ) : (
        task.dueDate && <p className="task-card__due">⏱ {task.dueDate}</p>
      )}

      {task.assignee && (
        <span className="task-card__avatar" title={task.assignee}>
          {task.assignee}
        </span>
      )}
    </article>
  );
}
