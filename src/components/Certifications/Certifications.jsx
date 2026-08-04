import { motion } from 'framer-motion';
import { FiCheckCircle, FiExternalLink, FiFileText } from 'react-icons/fi';
import { certifications } from '../../data/content';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion';
import SectionHeader from '../SectionHeader/SectionHeader';
import styles from './Certifications.module.css';

export default function Certifications() {
  const reducedMotion = usePrefersReducedMotion();
  const featured = certifications.find((item) => item.featured);
  const rest = certifications.filter((item) => !item.featured);

  return (
    <section id="certifications" className={`section ${styles.certifications}`}>
      <div className="container">
        <SectionHeader
          eyebrow="Certifications"
          title="Credentials & learning"
          subtitle="Verified coursework and ongoing professional development."
        />

        {featured ? (
          <motion.article
            className={`glass-card ${styles.featured}`}
            initial={reducedMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className={styles.featuredCopy}>
              <div className={styles.metaRow}>
                <span className={styles.org}>{featured.organization}</span>
                {featured.verified ? (
                  <span className={styles.verified}>
                    <FiCheckCircle aria-hidden="true" />
                    Verified
                  </span>
                ) : null}
              </div>
              <h3 className={styles.featuredTitle}>{featured.title}</h3>
              <p className={styles.status}>
                {featured.status}
                {featured.completedDate ? ` · ${featured.completedDate}` : ''}
              </p>
              <p className={styles.description}>{featured.description}</p>
              <div className={styles.actions}>
                {featured.certificatePdf ? (
                  <a
                    href={featured.certificatePdf}
                    className="btn btn--primary"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FiFileText aria-hidden="true" />
                    View Certificate
                  </a>
                ) : null}
                {featured.verifyUrl ? (
                  <a
                    href={featured.verifyUrl}
                    className="btn btn--ghost"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FiExternalLink aria-hidden="true" />
                    Verify Cisco
                  </a>
                ) : null}
              </div>
            </div>
            <div className={styles.badgeWrap}>
              <img
                src={featured.badge}
                alt={`${featured.title} badge`}
                className={styles.badge}
                loading="lazy"
                onError={(event) => {
                  event.currentTarget.style.display = 'none';
                }}
              />
            </div>
          </motion.article>
        ) : null}

        <div className={styles.grid}>
          {rest.map((item, index) => (
            <motion.article
              key={item.id}
              className={`glass-card ${styles.card} ${item.status === 'Ongoing' ? styles.ongoing : ''}`}
              initial={reducedMotion ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className={styles.cardTop}>
                <span className={styles.org}>{item.organization}</span>
                <span
                  className={`${styles.pill} ${item.status === 'Ongoing' ? styles.pillPulse : ''}`}
                >
                  {item.status}
                </span>
              </div>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.description}>{item.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
