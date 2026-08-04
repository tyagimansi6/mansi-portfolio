import { useEffect, useState } from 'react';

const DEFAULT_ROOT_MARGIN = '-40% 0px -50% 0px';
const DEFAULT_THRESHOLD = [0, 0.25, 0.5, 0.75, 1];

export function useActiveSection(sectionIds = [], options = {}) {
  const [activeId, setActiveId] = useState(sectionIds[0] ?? '');
  const idsKey = Array.isArray(sectionIds) ? sectionIds.join('|') : '';
  const rootMargin = options.rootMargin ?? DEFAULT_ROOT_MARGIN;
  const threshold = options.threshold ?? DEFAULT_THRESHOLD;

  useEffect(() => {
    const ids = idsKey ? idsKey.split('|') : [];
    if (!ids.length) return undefined;

    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (!elements.length) return undefined;

    const ratios = new Map();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          ratios.set(
            entry.target.id,
            entry.isIntersecting ? entry.intersectionRatio : 0,
          );
        });

        let nextId = ids[0];
        let bestRatio = -1;

        ids.forEach((id) => {
          const ratio = ratios.get(id) ?? 0;
          if (ratio > bestRatio) {
            bestRatio = ratio;
            nextId = id;
          }
        });

        if (bestRatio > 0) {
          setActiveId(nextId);
        }
      },
      { rootMargin, threshold },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [idsKey, rootMargin, threshold]);

  return activeId;
}

export default useActiveSection;
