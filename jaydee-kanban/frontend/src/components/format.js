// Dérive les initiales d'un assigné à partir d'un nom complet ou d'initiales.
// "Marie Lefèvre" -> "ML", "RR" -> "RR", "Jean" -> "JE".
export function initials(name) {
  if (!name) return '';
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  const single = parts[0];
  return single.length <= 3 ? single.toUpperCase() : single.slice(0, 2).toUpperCase();
}
