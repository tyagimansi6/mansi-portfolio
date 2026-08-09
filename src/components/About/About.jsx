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
    <div ref={ref} className={`glass-card ${styles.stat}`}>
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
            className={styles.intro}
            initial={reducedMotion ? false : { opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph} className={styles.text}>
                {paragraph}
              </p>
            ))}
          </motion.div>

          <motion.div
            className={styles.aside}
            initial={reducedMotion ? false : { opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className={styles.stats}>
              {about.stats.map((stat) => (
                <Stat
                  key={stat.label}
                  value={stat.value}
                  label={stat.label}
                  suffix={stat.suffix}
                />
              ))}
            </div>

            {about.highlights?.length ? (
              <div className={styles.highlights}>
                {about.highlights.map((item) => (
                  <div key={item.id} className={`glass-card ${styles.highlight}`}>
                    <span className={styles.highlightValue}>{item.value}</span>
                    <span className={styles.highlightLabel}>{item.label}</span>
                  </div>
                ))}
              </div>
            ) : null}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
