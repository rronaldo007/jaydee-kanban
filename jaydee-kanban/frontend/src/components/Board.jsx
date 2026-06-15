import { useEffect, useState } from 'react';
import {
  fetchBoard,
  updateTask as apiUpdateTask,
  createTask as apiCreateTask
} from '../api/boardApi';
import Column from './Column';
import TaskDetail from './TaskDetail';
import TaskForm from './TaskForm';

export default function Board({ priorityFilter = 'all', showForm = false, onCloseForm }) {
  const [columns, setColumns] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [status, setStatus] = useState('loading');
  const [selectedId, setSelectedId] = useState(null);
  const [actionError, setActionError] = useState(null);

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

  const visibleTasks =
    priorityFilter && priorityFilter !== 'all'
      ? tasks.filter((t) => t.priority === priorityFilter)
      : tasks;

  const tasksByColumn = (columnId) => visibleTasks.filter((t) => t.columnId === columnId);
  const selectedTask = tasks.find((t) => t.id === selectedId) || null;

  // mise à jour optimiste, on revient en arrière si l'API échoue
  async function applyUpdate(task, changes) {
    const hasChange = Object.keys(changes).some((k) => task[k] !== changes[k]);
    if (!hasChange) return;

    const previous = tasks;
    setActionError(null);
    setTasks((current) =>
      current.map((t) => (t.id === task.id ? { ...t, ...changes } : t))
    );

    try {
      await apiUpdateTask(task.id, {
        name: task.name,
        color: task.color,
        columnId: task.columnId,
        ...changes
      });
    } catch (e) {
      setTasks(previous);
      setActionError('La mise à jour a échoué. Veuillez réessayer.');
    }
  }

  async function handleCreate(payload) {
    const created = await apiCreateTask(payload);
    setTasks((current) => [...current, created]);
  }

  return (
    <>
      {actionError && (
        <p className="board__message board__message--error" role="alert">{actionError}</p>
      )}

      <div className="board">
        {columns.map((column) => (
          <Column
            key={column.id}
            column={column}
            tasks={tasksByColumn(column.id)}
            onSelect={(task) => setSelectedId(task.id)}
          />
        ))}
      </div>

      {selectedTask && (
        <TaskDetail
          key={selectedTask.id}
          task={selectedTask}
          columns={columns}
          onClose={() => setSelectedId(null)}
          onUpdate={applyUpdate}
        />
      )}

      {showForm && (
        <TaskForm columns={columns} onClose={onCloseForm} onCreate={handleCreate} />
      )}
    </>
  );
}
