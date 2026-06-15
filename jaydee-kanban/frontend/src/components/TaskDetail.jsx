import { useEffect, useState } from 'react';
import { priorityStyle, PRIORITIES } from './utils';

export default function TaskDetail({ task, columns, onClose, onUpdate }) {
  const [assignee, setAssignee] = useState(task.assignee || '');

  // fermeture avec Échap
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  const badge = priorityStyle(task.priority);
  const hasProgress = typeof task.progress === 'number';

  function commitAssignee() {
    const value = assignee.trim();
    if (value !== (task.assignee || '')) {
      onUpdate(task, { assignee: value || undefined });
    }
  }

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
          {task.dueDate && (<><dt>Échéance</dt><dd>⏱ {task.dueDate}</dd></>)}
          {hasProgress && (<><dt>Progression</dt><dd>{task.progress}%</dd></>)}
        </dl>

        <div className="detail__edit">
          <label className="detail__control">
            <span>Statut</span>
            <select value={task.columnId} onChange={(e) => onUpdate(task, { columnId: e.target.value })}>
              {columns.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </label>

          <label className="detail__control">
            <span>Priorité</span>
            <select value={task.priority || ''} onChange={(e) => onUpdate(task, { priority: e.target.value })}>
              {!task.priority && <option value="">—</option>}
              {PRIORITIES.map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
          </label>

          <label className="detail__control">
            <span>Assigné</span>
            <input
              value={assignee}
              placeholder="Marie Lefèvre"
              onChange={(e) => setAssignee(e.target.value)}
              onBlur={commitAssignee}
              onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); commitAssignee(); } }}
            />
          </label>
        </div>
      </aside>
    </div>
  );
}
