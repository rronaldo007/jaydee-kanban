import { useState } from 'react';
import NavBar from './components/NavBar';
import Board from './components/Board';
import BottomNav from './components/BottomNav';
import { PRIORITIES } from './components/utils';

function App() {
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="app">
      <NavBar onNewTask={() => setShowForm(true)} />

      <main className="app__main">
        <div className="app__header">
          <div>
            <h1 className="app__title">Tableau de production</h1>
            <p className="app__subtitle">
              Unité de production 01 · Suivi en temps réel des ordres de fabrication
            </p>
          </div>

          <select
            className="app__filter"
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            aria-label="Filtrer par priorité"
          >
            <option value="all">Toutes les priorités</option>
            {PRIORITIES.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>

        <Board
          priorityFilter={priorityFilter}
          showForm={showForm}
          onCloseForm={() => setShowForm(false)}
          onNewTask={() => setShowForm(true)}
        />
      </main>

      <BottomNav />
    </div>
  );
}

export default App;
