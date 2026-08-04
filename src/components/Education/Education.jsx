import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { education } from '../../data/content';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion';
import SectionHeader from '../SectionHeader/SectionHeader';
import styles from './Education.module.css';

export default function Education() {
  const reducedMotion = usePrefersReducedMotion();
  const [activeId, setActiveId] = useState(education[0]?.id ?? '');

  return (
    <section id="education" className={`section section--alt ${styles.education}`}>
      <div className="container">
        <SectionHeader
          eyebrow="Education"
          title="Academic journey"
          subtitle="Interactive timeline of my academic milestones."
        />

        <div className={`timeline ${styles.timeline}`}>
          {education.map((item, index) => {
            const isActive = activeId === item.id;
            return (
              <motion.article
                key={item.id}
                className={`glass-card timeline__item ${styles.item} ${isActive ? styles.active : ''}`}
                initial={reducedMotion ? false : { opacity: 0, x: -18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.45, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
                onMouseEnter={() => setActiveId(item.id)}
                onFocus={() => setActiveId(item.id)}
                onClick={() => setActiveId(item.id)}
                tabIndex={0}
                role="button"
                aria-expanded={isActive}
              >
                <span className={`timeline__dot ${styles.dot}`} aria-hidden="true" />
                <span className="timeline__year">{item.degree}</span>
                <h3 className="timeline__title">{item.title}</h3>
                <p className="timeline__place">
                  {item.place}
                  {item.detail && item.detail !== item.place ? ` · ${item.detail}` : ''}
                </p>
                <AnimatePresence initial={false}>
                  {isActive ? (
                    <motion.p
                      className={`timeline__desc ${styles.desc}`}
                      initial={reducedMotion ? false : { opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={reducedMotion ? undefined : { opacity: 0, height: 0 }}
                      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    >
                      {item.description}
                    </motion.p>
                  ) : (
                    <p className={styles.hint}>Hover or click to expand</p>
                  )}
                </AnimatePresence>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
