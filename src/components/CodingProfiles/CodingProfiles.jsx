import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaCode } from 'react-icons/fa';
import { FiExternalLink } from 'react-icons/fi';
import { codingProfiles } from '../../data/content';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion';
import SectionHeader from '../SectionHeader/SectionHeader';
import styles from './CodingProfiles.module.css';

const ICONS = {
  github: FaGithub,
  linkedin: FaLinkedin,
  codechef: FaCode,
};

export default function CodingProfiles() {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <section id="profiles" className={`section section--alt ${styles.profiles}`}>
      <div className="container">
        <SectionHeader
          eyebrow="Profiles"
          title="Find me online"
          subtitle="Code, career updates, and competitive programming in one place."
        />

        <div className={styles.grid}>
          {codingProfiles.map((profile, index) => {
            const Icon = ICONS[profile.id] ?? FaCode;
            return (
              <motion.a
                key={profile.id}
                href={profile.url}
                className={`glass-card ${styles.card}`}
                target="_blank"
                rel="noopener noreferrer"
                initial={reducedMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.45, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className={styles.icon} aria-hidden="true">
                  <Icon />
                </span>
                <div className={styles.copy}>
                  <h3 className={styles.name}>{profile.name}</h3>
                  <p className={styles.label}>{profile.label}</p>
                  <p className={styles.handle}>{profile.handle}</p>
                </div>
                <span className={styles.external} aria-hidden="true">
                  <FiExternalLink />
                </span>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
