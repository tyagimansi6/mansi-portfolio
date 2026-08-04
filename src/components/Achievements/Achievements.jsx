import { motion } from 'framer-motion';
import { FaMedal, FaCertificate, FaLaptopCode, FaStar } from 'react-icons/fa';
import { achievements } from '../../data/content';
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

        <div className={styles.grid}>
          {achievements.map((item, index) => {
            const Icon = ICONS[item.id] ?? FaMedal;
            return (
              <motion.article
                key={item.id}
                className={`glass-card ${styles.card}`}
                initial={reducedMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.45, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className={styles.icon} aria-hidden="true">
                  <Icon />
                </span>
                <h3 className={styles.title}>{item.title}</h3>
                <p className={styles.description}>{item.description}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
