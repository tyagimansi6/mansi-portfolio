import { motion } from 'framer-motion';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion';
import styles from './SectionHeader.module.css';

export default function SectionHeader({ eyebrow, title, subtitle, align = 'center' }) {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <motion.header
      className={`${styles.header} ${align === 'left' ? styles.left : ''}`}
      initial={reducedMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      {eyebrow ? <p className={styles.eyebrow}>{eyebrow}</p> : null}
      <h2 className={styles.title}>{title}</h2>
      {subtitle ? <p className={styles.subtitle}>{subtitle}</p> : null}
    </motion.header>
  );
}
