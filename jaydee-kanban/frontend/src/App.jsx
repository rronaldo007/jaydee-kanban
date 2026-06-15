import NavBar from './components/NavBar';
import Board from './components/Board';

// Application Kanban Jaydee : barre de navigation + en-tête + tableau (SCRUM-26).
function App() {
  return (
    <div className="app">
      <NavBar />

      <main className="app__main">
        <div className="app__header">
          <div>
            <h1 className="app__title">Tableau de production</h1>
            <p className="app__subtitle">
              Unité de production 01 · Suivi en temps réel des ordres de fabrication
            </p>
          </div>
          <button type="button" className="app__filter">Filtrer par priorité ▾</button>
        </div>

        <Board />
      </main>
    </div>
  );
}

export default App;
