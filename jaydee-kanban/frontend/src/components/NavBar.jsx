// Barre de navigation supérieure (SCRUM-26) — alignée sur la maquette.
const LINKS = ['Tableau de production', 'Planification', 'Maintenance', 'Inventaire'];

export default function NavBar({ onNewTask }) {
  return (
    <nav className="navbar">
      <div className="navbar__brand">
        <span className="navbar__logo">JD</span>
        <span className="navbar__title">Jaydee</span>
      </div>

      <ul className="navbar__menu">
        {LINKS.map((link, i) => (
          <li
            key={link}
            className={i === 0 ? 'navbar__link navbar__link--active' : 'navbar__link'}
          >
            {link}
          </li>
        ))}
      </ul>

      <div className="navbar__actions">
        <button type="button" className="navbar__new" onClick={onNewTask}>
          + Nouvelle tâche
        </button>
        <span className="navbar__avatar" title="RUKUNDO Ronaldo">RR</span>
      </div>
    </nav>
  );
}
