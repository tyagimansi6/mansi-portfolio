import { useEffect, useState } from 'react';

function readHeaderOffset() {
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue('--header-h')
    .trim();
  const parsed = Number.parseFloat(raw);
  return Number.isFinite(parsed) ? parsed : 76;
}

/**
 * Tracks which section is active under a fixed navbar by finding the
 * last section whose top has crossed just below the header.
 */
export function useActiveSection(sectionIds = []) {
  const [activeId, setActiveId] = useState(sectionIds[0] ?? '');
  const idsKey = Array.isArray(sectionIds) ? sectionIds.join('|') : '';

  useEffect(() => {
    const ids = idsKey ? idsKey.split('|') : [];
    if (!ids.length) return undefined;

    let frame = 0;

    const updateActive = () => {
      const present = ids
        .map((id) => {
          const el = document.getElementById(id);
          return el ? { id, el } : null;
        })
        .filter(Boolean);

      if (!present.length) return;

      if (window.scrollY < 24) {
        setActiveId(present[0].id);
        return;
      }

      const line = readHeaderOffset() + 8;
      let current = present[0].id;

      present.forEach(({ id, el }) => {
        if (el.getBoundingClientRect().top <= line) {
          current = id;
        }
      });

      // When near the page bottom, keep the last available section active
      const scrollBottom = window.scrollY + window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      if (docHeight - scrollBottom < 100) {
        current = present[present.length - 1].id;
      }

      setActiveId(current);
    };

    const onScrollOrResize = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(updateActive);
    };

    updateActive();

    const mutationObserver = new MutationObserver(() => {
      updateActive();
    });
    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize);

    return () => {
      window.cancelAnimationFrame(frame);
      mutationObserver.disconnect();
      window.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);
    };
  }, [idsKey]);

  return activeId;
}

export default useActiveSection;
