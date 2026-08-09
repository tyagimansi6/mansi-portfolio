import { motion } from 'framer-motion';
import { about } from '../../data/content';
import useCountUp from '../../hooks/useCountUp';
import useInViewOnce from '../../hooks/useInViewOnce';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion';
import SectionHeader from '../SectionHeader/SectionHeader';
import styles from './About.module.css';

function Metric({ value, label, suffix, index = 0 }) {
  const { ref, inView } = useInViewOnce({ threshold: 0.4 });
  const display = useCountUp(value, { inView, decimals: Number.isInteger(value) ? 0 : 1 });
  const reducedMotion = usePrefersReducedMotion();

  return (
    <motion.div
      ref={ref}
      className={`glass-card ${styles.metric}`}
      initial={reducedMotion ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.45, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
    >
      <span className={styles.metricId}>SYS.{String(index + 1).padStart(2, '0')}</span>
      <p className={styles.metricValue}>
        {display}
        {suffix}
      </p>
      <p className={styles.metricLabel}>{label}</p>
    </motion.div>
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

          <div className={styles.aside}>
            <div className={styles.metrics}>
              {about.stats.map((stat, index) => (
                <Metric
                  key={stat.label}
                  value={stat.value}
                  label={stat.label}
                  suffix={stat.suffix}
                  index={index}
                />
              ))}

              {about.highlights?.map((item, index) => (
                <motion.div
                  key={item.id}
                  className={`glass-card ${styles.metric} ${styles.highlight}`}
                  initial={reducedMotion ? false : { opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: 0.45,
                    delay: (about.stats.length + index) * 0.05,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <span className={styles.metricId}>SYS.HL</span>
                  <p className={styles.metricValue}>{item.value}</p>
                  <p className={styles.metricLabel}>{item.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
