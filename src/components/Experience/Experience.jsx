import { motion } from 'framer-motion';
import { FiFileText } from 'react-icons/fi';
import { experience } from '../../data/content';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion';
import SectionHeader from '../SectionHeader/SectionHeader';
import styles from './Experience.module.css';

export default function Experience() {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <section id="experience" className={`section ${styles.experience}`}>
      <div className="container">
        <SectionHeader
          eyebrow="Experience"
          title="Professional experience"
          subtitle="Internship work focused on responsive interfaces and collaborative frontend delivery."
        />

        <div className={`timeline ${styles.timeline}`}>
          {experience.map((item, index) => (
            <motion.article
              key={item.id}
              className={`glass-card timeline__item ${styles.item}`}
              initial={reducedMotion ? false : { opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="timeline__dot" aria-hidden="true" />
              <span className="timeline__year">{item.period}</span>
              <h3 className="timeline__title">{item.role}</h3>
              <p className="timeline__place">{item.company}</p>
              <p className="timeline__desc">{item.summary}</p>

              <ul className={styles.list}>
                {item.responsibilities.map((responsibility) => (
                  <li key={responsibility}>{responsibility}</li>
                ))}
              </ul>

              <div className={styles.docs}>
                {item.docs.map((doc) => (
                  <a
                    key={doc.href}
                    href={doc.href}
                    className="btn btn--ghost"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FiFileText aria-hidden="true" />
                    {doc.label}
                  </a>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
