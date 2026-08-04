import useScrollProgress from '../../hooks/useScrollProgress';
import styles from './ScrollProgress.module.css';

export default function ScrollProgress() {
  const progress = useScrollProgress();

  return (
    <div
      className={styles.track}
      role="progressbar"
      aria-label="Page scroll progress"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(progress)}
    >
      <div className={styles.bar} style={{ transform: `scaleX(${progress / 100})` }} />
    </div>
  );
}
