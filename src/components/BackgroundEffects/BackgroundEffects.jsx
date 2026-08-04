import useMousePosition from '../../hooks/useMousePosition';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion';
import styles from './BackgroundEffects.module.css';

export default function BackgroundEffects() {
  const { x, y } = useMousePosition();
  const reducedMotion = usePrefersReducedMotion();

  return (
    <div className={styles.root} aria-hidden="true">
      <div className={styles.grid} />
      <div className={`${styles.blob} ${styles.blobOne}`} />
      <div className={`${styles.blob} ${styles.blobTwo}`} />
      <div className={`${styles.blob} ${styles.blobThree}`} />
      {!reducedMotion ? (
        <div
          className={styles.glow}
          style={{
            transform: `translate3d(${x}px, ${y}px, 0)`,
          }}
        />
      ) : null}
    </div>
  );
}
