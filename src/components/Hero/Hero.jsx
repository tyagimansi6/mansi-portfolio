import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaCode } from 'react-icons/fa';
import { FiDownload } from 'react-icons/fi';
import { about, roles, site } from '../../data/content';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion';
import styles from './Hero.module.css';

function useTypingEffect(words, { enabled = true, typeSpeed = 70, deleteSpeed = 40, pause = 1600 } = {}) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!enabled || !words.length) {
      setText(words[0] ?? '');
      return undefined;
    }

    const current = words[index % words.length];
    let timer;

    if (!deleting && text === current) {
      timer = window.setTimeout(() => setDeleting(true), pause);
    } else if (deleting && text === '') {
      setDeleting(false);
      setIndex((value) => (value + 1) % words.length);
    } else {
      timer = window.setTimeout(
        () => {
          const next = deleting
            ? current.slice(0, text.length - 1)
            : current.slice(0, text.length + 1);
          setText(next);
        },
        deleting ? deleteSpeed : typeSpeed,
      );
    }

    return () => window.clearTimeout(timer);
  }, [words, index, text, deleting, enabled, typeSpeed, deleteSpeed, pause]);

  return text;
}

export default function Hero() {
  const reducedMotion = usePrefersReducedMotion();
  const typed = useTypingEffect(roles, { enabled: !reducedMotion });
  const displayRole = reducedMotion ? roles[0] : typed;

  return (
    <section id="home" className={styles.hero}>
      <div className={styles.bgGrid} aria-hidden="true" />
      <div className={styles.bgGlow} aria-hidden="true" />

      <div className={`container ${styles.grid}`}>
        <motion.div
          className={styles.copy}
          initial={reducedMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          {site.statusBadge ? (
            <span className={styles.status}>{site.statusBadge}</span>
          ) : null}

          <p className={styles.eyebrow}>Hello, I&apos;m</p>
          <h1 className={styles.title}>{site.name}</h1>

          <p className={styles.positioning}>{site.positioning}</p>

          <p className={styles.role}>
            <span className={styles.roleText}>{displayRole}</span>
            {!reducedMotion ? <span className={styles.caret} aria-hidden="true" /> : null}
          </p>

          <p className={styles.lead}>{about.paragraphs[0]}</p>

          <div className={styles.ctas}>
            <a className="btn btn--primary" href="#projects">
              View My Work
            </a>
            <a className="btn btn--ghost" href={site.resume} download>
              <FiDownload aria-hidden="true" />
              Download Resume
            </a>
          </div>

          <div className={styles.links}>
            <a
              href={site.github}
              className={styles.link}
              aria-label="GitHub"
              title="GitHub"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub aria-hidden="true" />
            </a>
            <a
              href={site.linkedin}
              className={styles.link}
              aria-label="LinkedIn"
              title="LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin aria-hidden="true" />
            </a>
            <a
              href={site.codechef}
              className={`${styles.link} ${styles.linkMuted}`}
              aria-label="CodeChef"
              title="CodeChef"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaCode aria-hidden="true" />
            </a>
          </div>
        </motion.div>

        <motion.div
          className={styles.visual}
          initial={reducedMotion ? false : { opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className={styles.photoFrame}>
            <div className={styles.photoRing} aria-hidden="true" />
            <img
              className={styles.photo}
              src="/assets/images/profile-photo.png"
              alt="Mansi Tyagi - Computer Science Engineering student"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
