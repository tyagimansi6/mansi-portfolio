import { motion } from 'framer-motion';
import { FaMedal, FaCertificate, FaLaptopCode, FaStar } from 'react-icons/fa';
import { achievements, site } from '../../data/content';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion';
import SectionHeader from '../SectionHeader/SectionHeader';
import styles from './Achievements.module.css';

const ICONS = {
  'codechef-3star': FaStar,
  'ncc-c': FaMedal,
  'emerging-tech': FaLaptopCode,
  'php-fullstack': FaCertificate,
};

export default function Achievements() {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <section id="achievements" className={`section section--alt ${styles.achievements}`}>
      <div className="container">
        <SectionHeader
          eyebrow="Achievements"
          title="Highlights along the way"
          subtitle="Milestones from competitive programming, leadership, and internship shortlists."
        />

        <div className={styles.timeline}>
          {achievements.map((item, index) => {
            const Icon = ICONS[item.id] ?? FaMedal;
            const featured = item.id === 'codechef-3star';
            return (
              <motion.article
                key={item.id}
                className={`${styles.item} ${featured ? styles.featured : ''}`}
                initial={reducedMotion ? false : { opacity: 0, x: -18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.5, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className={styles.node} aria-hidden="true">
                  <span className={styles.nodeCore} />
                </span>

                <div className={`glass-card ${styles.card}`}>
                  <div className={styles.cardTop}>
                    <span className={styles.icon} aria-hidden="true">
                      <Icon />
                    </span>
                    {featured ? <span className={styles.featuredBadge}>Featured</span> : null}
                  </div>
                  <h3 className={styles.title}>{item.title}</h3>
                  <p className={styles.description}>{item.description}</p>
                  {featured ? (
                    <a
                      href={site.codechef}
                      className={styles.profileLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View CodeChef profile
                    </a>
                  ) : null}
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
