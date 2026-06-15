// Couleurs des badges de priorité (fond / texte), alignées sur la maquette.
// Partagé entre TaskCard et TaskDetail.
export const PRIORITY_STYLES = {
  CRITIQUE: { bg: '#FEE2E2', fg: '#B91C1C' },
  STANDARD: { bg: '#DBEAFE', fg: '#1D4ED8' },
  ROUTINE: { bg: '#FEF3C7', fg: '#B45309' },
  'EN COURS': { bg: '#CCFBF1', fg: '#0F766E' },
  QUALITÉ: { bg: '#FEF3C7', fg: '#B45309' },
  DIMENSIONNEL: { bg: '#DBEAFE', fg: '#1D4ED8' },
  TERMINÉ: { bg: '#DCFCE7', fg: '#15803D' }
};

export function priorityStyle(priority) {
  return PRIORITY_STYLES[priority] || { bg: '#E2E8F0', fg: '#475569' };
}

// Liste ordonnée des priorités (formulaire de création, filtre).
export const PRIORITIES = Object.keys(PRIORITY_STYLES);
