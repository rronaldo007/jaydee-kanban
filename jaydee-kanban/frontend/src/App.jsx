import Board from './components/Board';

// Application Kanban Jaydee : en-tête + tableau principal (Exercice 8).
function App() {
  return (
    <div className="app">
      <header className="app__header">
        <h1 className="app__title">Jaydee · Tableau de production</h1>
        <p className="app__subtitle">Suivi en temps réel des ordres de fabrication</p>
      </header>
      <main className="app__main">
        <Board />
      </main>
    </div>
  );
}

export default App;
