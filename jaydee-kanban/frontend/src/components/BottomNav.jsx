const ITEMS = ['Tableau', 'Planning', 'Stock', 'Profil'];

export default function BottomNav() {
  return (
    <nav className="bottom-nav">
      {ITEMS.map((item, i) => (
        <span
          key={item}
          className={i === 0 ? 'bottom-nav__item bottom-nav__item--active' : 'bottom-nav__item'}
        >
          {item}
        </span>
      ))}
    </nav>
  );
}
