import { useEffect, useState } from 'react';
import { checkHealth } from './api/boardApi';

// Exercice 4 : composant minimal qui teste la communication avec l'API.
// Le vrai tableau Kanban sera construit en Exercice 8.
function App() {
  const [status, setStatus] = useState('Connexion à l\'API...');

  useEffect(() => {
    checkHealth()
      .then((data) => setStatus(`API connectée (${data.service})`))
      .catch(() => setStatus('Échec de connexion à l\'API'));
  }, []);

  return (
    <main className="app">
      <h1>Jaydee · Tableau de production</h1>
      <p>{status}</p>
    </main>
  );
}

export default App;
