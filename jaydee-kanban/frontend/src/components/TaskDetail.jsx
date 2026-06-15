// Panneau de détail d'une tâche (SCRUM-27) + changement de statut (SCRUM-28).
// S'affiche en volet latéral ; se ferme via le bouton, la touche Échap ou un
// clic sur le fond. Le sélecteur de colonne déclenche le déplacement (onMove).
import { useEffect } from 'react';
import { priorityStyle } from './priority';

export default function TaskDetail({ task, columns, onClose, onMove }) {
  // Fermeture au clavier (Échap).
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  const badge = priorityStyle(task.priority);
  const columnName = columns.find((c) => c.id === task.columnId)?.name || task.columnId;
  const hasProgress = typeof task.progress === 'number';

  return (
    <div className="overlay" onClick={onClose}>
      <aside
        className="detail"
        role="dialog"
        aria-modal="true"
        aria-label={`Détail de la tâche ${task.name}`}
        onClick={(e) => e.stopPropagation()}
      >
        <header className="detail__header">
          <span className="detail__color" style={{ backgroundColor: task.color }} aria-hidden="true" />
          <h2 className="detail__title">{task.name}</h2>
          <button type="button" className="detail__close" onClick={onClose} aria-label="Fermer">×</button>
        </header>

        <dl className="detail__fields">
          {task.reference && (<><dt>Référence</dt><dd>{task.reference}</dd></>)}
          {task.priority && (
            <>
              <dt>Priorité</dt>
              <dd>
                <span className="task-card__badge" style={{ backgroundColor: badge.bg, color: badge.fg }}>
                  {task.priority}
                </span>
              </dd>
            </>
          )}
          <dt>Colonne</dt>
          <dd>{columnName}</dd>
          {task.dueDate && (<><dt>Échéance</dt><dd>⏱ {task.dueDate}</dd></>)}
          {hasProgress && (<><dt>Progression</dt><dd>{task.progress}%</dd></>)}
          {task.assignee && (<><dt>Assigné</dt><dd>{task.assignee}</dd></>)}
        </dl>

        <div className="detail__move">
          <label htmlFor="detail-status">Changer de statut</label>
          <select
            id="detail-status"
            value={task.columnId}
            onChange={(e) => onMove(task, e.target.value)}
          >
            {columns.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
      </aside>
    </div>
  );
}
