// Composant Carte de tâche réutilisable (Exercice 8 / SCRUM-26 / SCRUM-27).
// Affiche : badge de priorité, nom, référence OF, échéance ou progression,
// et avatar de l'assigné. Cliquable pour ouvrir le détail (onSelect).
import { priorityStyle } from './priority';
import { initials } from './format';

export default function TaskCard({ task, onSelect }) {
  const badge = priorityStyle(task.priority);
  const hasProgress = typeof task.progress === 'number';

  return (
    <article
      className="task-card"
      style={{ borderLeftColor: task.color }}
      role="button"
      tabIndex={0}
      onClick={() => onSelect && onSelect(task)}
      onKeyDown={(e) => {
        if (onSelect && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onSelect(task);
        }
      }}
    >
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
          {initials(task.assignee)}
        </span>
      )}
    </article>
  );
}
