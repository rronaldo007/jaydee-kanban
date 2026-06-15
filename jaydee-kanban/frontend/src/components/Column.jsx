// Composant Colonne réutilisable (Exercice 8).
// Reçoit une colonne, ses tâches, et propage la sélection d'une carte.
import TaskCard from './TaskCard';

export default function Column({ column, tasks, onSelect }) {
  return (
    <section className="column" aria-label={column.name}>
      <header className="column__header">
        <h2 className="column__title">{column.name}</h2>
        <span className="column__count">{tasks.length}</span>
      </header>

      <div className="column__tasks">
        {tasks.length === 0 ? (
          <p className="column__empty">Aucune tâche</p>
        ) : (
          tasks.map((task) => (
            <TaskCard key={task.id} task={task} onSelect={onSelect} />
          ))
        )}
      </div>
    </section>
  );
}
