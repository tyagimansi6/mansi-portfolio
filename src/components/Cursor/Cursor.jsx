import { useEffect, useState } from 'react';
import useMousePosition from '../../hooks/useMousePosition';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion';
import styles from './Cursor.module.css';

export default function Cursor() {
  const { x, y } = useMousePosition();
  const reducedMotion = usePrefersReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(pointer: fine)');
    const sync = () => setEnabled(media.matches && !reducedMotion);
    sync();
    media.addEventListener('change', sync);
    return () => media.removeEventListener('change', sync);
  }, [reducedMotion]);

  useEffect(() => {
    if (!enabled) {
      document.documentElement.classList.remove('custom-cursor');
      return undefined;
    }

    document.documentElement.classList.add('custom-cursor');

    const interactiveSelector =
      'a, button, input, textarea, select, [role="button"], [data-cursor="hover"]';

    const onOver = (event) => {
      if (event.target.closest(interactiveSelector)) {
        setHovering(true);
      }
    };

    const onOut = (event) => {
      if (event.target.closest(interactiveSelector)) {
        setHovering(false);
      }
    };

    const onEnter = () => setVisible(true);
    const onLeave = () => setVisible(false);

    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOut);
    document.addEventListener('mouseenter', onEnter);
    document.addEventListener('mouseleave', onLeave);

    return () => {
      document.documentElement.classList.remove('custom-cursor');
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
      document.removeEventListener('mouseenter', onEnter);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div className={styles.root} aria-hidden="true">
      <div
        className={`${styles.ring} ${hovering ? styles.ringHover : ''} ${visible ? styles.visible : ''}`}
        style={{ transform: `translate3d(${x}px, ${y}px, 0)` }}
      />
      <div
        className={`${styles.dot} ${visible ? styles.visible : ''}`}
        style={{ transform: `translate3d(${x}px, ${y}px, 0)` }}
      />
    </div>
  );
}
