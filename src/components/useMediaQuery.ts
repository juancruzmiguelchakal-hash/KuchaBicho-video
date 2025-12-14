import { useState, useEffect } from 'react';

/**
 * Hook personalizado para detectar si se cumple una media query de CSS.
 * Es la forma más robusta de manejar la reactividad al tamaño de la pantalla en React.
 * @param query La media query a evaluar (ej: '(max-width: 767px)')
 * @returns `true` si la query se cumple, `false` en caso contrario.
 */
export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(() => {
    // Evita el "flash" inicializando el estado con el valor correcto en el cliente.
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches;
    }
    return false;
  });

  useEffect(() => {
    const media = window.matchMedia(query);

    const listener = () => setMatches(media.matches);

    media.addEventListener('change', listener);

    return () => media.removeEventListener('change', listener);
  }, [query]);

  return matches;
};