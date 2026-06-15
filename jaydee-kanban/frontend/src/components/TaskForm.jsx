// Formulaire de création d'une tâche (SCRUM-29).
// Volet latéral cohérent avec la maquette ; soumet via onCreate (POST API).
import { useEffect, useState } from 'react';
import { PRIORITIES } from './priority';

const COLORS = ['#EF4444', '#3B82F6', '#F59E0B', '#14B8A6', '#22C55E'];

export default function TaskForm({ columns, onClose, onCreate }) {
  const [name, setName] = useState('');
  const [color, setColor] = useState(COLORS[1]);
  const [columnId, setColumnId] = useState(columns[0]?.id || '');
  const [priority, setPriority] = useState('STANDARD');
  const [reference, setReference] = useState('');
  const [assignee, setAssignee] = useState('');
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await onCreate({
        name,
        color,
        columnId,
        priority,
        reference: reference.trim() || undefined,
        assignee: assignee.trim() || undefined
      });
      onClose();
    } catch (err) {
      setError(err.message || 'La création a échoué.');
      setSubmitting(false);
    }
  }

  return (
    <div className="overlay" onClick={onClose}>
      <aside
        className="detail"
        role="dialog"
        aria-modal="true"
        aria-label="Nouvelle tâche"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="detail__header">
          <h2 className="detail__title">Nouvelle tâche</h2>
          <button type="button" className="detail__close" onClick={onClose} aria-label="Fermer">×</button>
        </header>

        <form className="form" onSubmit={handleSubmit}>
          <label className="form__field">
            <span>Nom *</span>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Ex. Carter X-9" />
          </label>

          <label className="form__field">
            <span>Référence (OF)</span>
            <input value={reference} onChange={(e) => setReference(e.target.value)} placeholder="OF-1099" />
          </label>

          <label className="form__field">
            <span>Colonne *</span>
            <select value={columnId} onChange={(e) => setColumnId(e.target.value)}>
              {columns.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </label>

          <label className="form__field">
            <span>Priorité</span>
            <select value={priority} onChange={(e) => setPriority(e.target.value)}>
              {PRIORITIES.map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
          </label>

          <label className="form__field">
            <span>Assigné</span>
            <input value={assignee} onChange={(e) => setAssignee(e.target.value)} placeholder="Marie Lefèvre" />
          </label>

          <div className="form__field">
            <span>Couleur *</span>
            <div className="form__colors">
              {COLORS.map((c) => (
                <button
                  type="button"
                  key={c}
                  className={c === color ? 'form__color form__color--active' : 'form__color'}
                  style={{ backgroundColor: c }}
                  onClick={() => setColor(c)}
                  aria-label={`Couleur ${c}`}
                />
              ))}
            </div>
          </div>

          {error && <p className="form__error" role="alert">{error}</p>}

          <div className="form__actions">
            <button type="button" className="form__cancel" onClick={onClose}>Annuler</button>
            <button type="submit" className="form__submit" disabled={submitting}>
              {submitting ? 'Création…' : 'Créer la tâche'}
            </button>
          </div>
        </form>
      </aside>
    </div>
  );
}
