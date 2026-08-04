import { motion } from 'framer-motion';
import { about } from '../../data/content';
import useCountUp from '../../hooks/useCountUp';
import useInViewOnce from '../../hooks/useInViewOnce';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion';
import SectionHeader from '../SectionHeader/SectionHeader';
import styles from './About.module.css';

function Stat({ value, label, suffix }) {
  const { ref, inView } = useInViewOnce({ threshold: 0.4 });
  const display = useCountUp(value, { inView, decimals: Number.isInteger(value) ? 0 : 1 });

  return (
    <div ref={ref} className={styles.stat}>
      <p className={styles.statValue}>
        {display}
        {suffix}
      </p>
      <p className={styles.statLabel}>{label}</p>
    </div>
  );
}

export default function About() {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <section id="about" className={`section ${styles.about}`}>
      <div className="container">
        <SectionHeader
          eyebrow="About"
          title="A bit about me"
          subtitle="Curious developer focused on clean interfaces, solid fundamentals, and continuous learning."
        />

        <div className={styles.layout}>
          <motion.div
            className={`glass-card ${styles.card}`}
            initial={reducedMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph} className={styles.text}>
                {paragraph}
              </p>
            ))}
          </motion.div>

          <motion.div
            className={styles.stats}
            initial={reducedMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            {about.stats.map((stat) => (
              <Stat
                key={stat.label}
                value={stat.value}
                label={stat.label}
                suffix={stat.suffix}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
