import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { site } from '../../data/content';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion';
import styles from './PageLoader.module.css';

export default function PageLoader({ onComplete, minDuration = 1400 }) {
  const [visible, setVisible] = useState(true);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const duration = reducedMotion ? 200 : minDuration;
    const timer = window.setTimeout(() => setVisible(false), duration);
    return () => window.clearTimeout(timer);
  }, [minDuration, reducedMotion]);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {visible ? (
        <motion.div
          className={styles.loader}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reducedMotion ? 0.15 : 0.55, ease: [0.22, 1, 0.36, 1] }}
          role="status"
          aria-live="polite"
          aria-label="Loading portfolio"
        >
          <div className={styles.glow} aria-hidden="true" />
          <motion.div
            className={styles.brand}
            initial={reducedMotion ? false : { opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className={styles.mark}>{site.brand.charAt(0)}</span>
            <span className={styles.name}>{site.brand}</span>
          </motion.div>
          <div className={styles.track} aria-hidden="true">
            <motion.span
              className={styles.bar}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{
                duration: reducedMotion ? 0.2 : minDuration / 1000,
                ease: [0.22, 1, 0.36, 1],
              }}
            />
          </div>
          <p className={styles.caption}>Loading portfolio…</p>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
