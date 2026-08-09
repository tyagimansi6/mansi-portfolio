import { motion } from 'framer-motion';
import { FiCheckCircle, FiFileText } from 'react-icons/fi';
import { certifications } from '../../data/content';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion';
import SectionHeader from '../SectionHeader/SectionHeader';
import styles from './Certifications.module.css';

function CertCard({ item, featured = false, index = 0 }) {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <motion.article
      className={`glass-card ${styles.card} ${featured ? styles.featured : ''} ${item.status === 'Ongoing' ? styles.ongoing : ''}`}
      initial={reducedMotion ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className={styles.body}>
        <div className={styles.cardTop}>
          <span className={styles.org}>{item.organization}</span>
          <div className={styles.metaPills}>
            {item.verified ? (
              <span className={styles.verified}>
                <FiCheckCircle aria-hidden="true" />
                Verified
              </span>
            ) : null}
            <span className={`${styles.pill} ${item.status === 'Ongoing' ? styles.pillPulse : ''}`}>
              {item.status}
            </span>
          </div>
        </div>

        <h3 className={featured ? styles.featuredTitle : styles.cardTitle}>{item.title}</h3>

        {item.completedDate ? <p className={styles.status}>{item.completedDate}</p> : null}

        <p className={styles.description}>{item.description}</p>

        <div className={styles.actions}>
          {item.certificatePdf ? (
            <a
              href={item.certificatePdf}
              className="btn btn--primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FiFileText aria-hidden="true" />
              View Certificate
            </a>
          ) : null}
          {item.verifyUrl ? (
            <a
              href={item.verifyUrl}
              className="btn btn--ghost"
              target="_blank"
              rel="noopener noreferrer"
            >
              Verify
            </a>
          ) : null}
        </div>
      </div>

      {item.badge ? (
        <div className={styles.badgeWrap}>
          <img
            src={item.badge}
            alt={`${item.title} badge`}
            className={featured ? styles.badge : styles.cardBadge}
            loading="lazy"
            onError={(event) => {
              event.currentTarget.style.display = 'none';
            }}
          />
        </div>
      ) : null}
    </motion.article>
  );
}

export default function Certifications() {
  const featured = certifications.find((item) => item.featured);
  const rest = certifications.filter((item) => !item.featured);

  return (
    <section id="certifications" className={`section ${styles.certifications}`}>
      <div className="container">
        <SectionHeader
          eyebrow="Certifications"
          title="Credentials & learning"
          subtitle="Coursework and professional simulations with certificates available to view."
        />

        <div className={styles.layout}>
          {featured ? <CertCard item={featured} featured index={0} /> : null}
          <div className={styles.grid}>
            {rest.map((item, index) => (
              <CertCard key={item.id} item={item} index={index + 1} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
