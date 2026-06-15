// Petites fonctions utilitaires (priorites + formatage + responsive)
import { useState, useEffect } from 'react';

// couleurs des badges (fond / texte)
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

export const PRIORITIES = Object.keys(PRIORITY_STYLES);

// "Marie Lefèvre" -> "ML"
export function initials(name) {
  if (!name) return '';
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  const single = parts[0];
  return single.length <= 3 ? single.toUpperCase() : single.slice(0, 2).toUpperCase();
}

// vrai quand l'écran est de taille mobile
export function useIsMobile(query = '(max-width: 640px)') {
  const [isMobile, setIsMobile] = useState(() => window.matchMedia(query).matches);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    setIsMobile(mq.matches);
    return () => mq.removeEventListener('change', handler);
  }, [query]);
  return isMobile;
}
