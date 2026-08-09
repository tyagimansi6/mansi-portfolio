import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { FiDownload } from 'react-icons/fi';
import { about, site } from '../../data/content';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion';
import styles from './Hero.module.css';

const HERO_LINES = [
  'Computer Science Student',
  'Full-Stack Developer',
  'AI Enthusiast',
];

const TERMINAL_LINES = [
  'initializing portfolio...',
  'loading projects...',
  'loading skills...',
  'system ready ✓',
];

function useTerminalLines(lines, { enabled = true, charSpeed = 28, linePause = 420 } = {}) {
  const [visibleCount, setVisibleCount] = useState(enabled ? 0 : lines.length);
  const [typed, setTyped] = useState(enabled ? '' : lines[lines.length - 1] ?? '');

  useEffect(() => {
    if (!enabled) {
      setVisibleCount(lines.length);
      setTyped(lines[lines.length - 1] ?? '');
      return undefined;
    }

    if (visibleCount >= lines.length) return undefined;

    const current = lines[visibleCount];
    if (typed.length < current.length) {
      const timer = window.setTimeout(() => {
        setTyped(current.slice(0, typed.length + 1));
      }, charSpeed);
      return () => window.clearTimeout(timer);
    }

    const timer = window.setTimeout(() => {
      setVisibleCount((count) => count + 1);
      setTyped('');
    }, linePause);

    return () => window.clearTimeout(timer);
  }, [lines, visibleCount, typed, enabled, charSpeed, linePause]);

  return { visibleCount, typed };
}

export default function Hero() {
  const reducedMotion = usePrefersReducedMotion();
  const { visibleCount, typed } = useTerminalLines(TERMINAL_LINES, {
    enabled: !reducedMotion,
  });

  return (
    <section id="home" className={styles.hero}>
      <div className={styles.bgGrid} aria-hidden="true" />
      <div className={styles.bgGlow} aria-hidden="true" />
      <div className={styles.particles} aria-hidden="true">
        {Array.from({ length: 12 }).map((_, index) => (
          <span key={index} className={styles.particle} style={{ '--i': index }} />
        ))}
      </div>

      <div className={`container ${styles.grid}`}>
        <motion.div
          className={styles.copy}
          initial={reducedMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className={styles.status}>
            <span className={styles.statusDot} aria-hidden="true" />
            SYSTEM ONLINE
          </span>

          <h1 className={styles.title}>MANSI TYAGI</h1>

          <ul className={styles.roles}>
            {HERO_LINES.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>

          <p className={styles.lead}>{about.paragraphs[0]}</p>

          <div className={styles.ctas}>
            <a className="btn btn--primary" href="#projects">
              Explore Projects
            </a>
            <a
              className="btn btn--ghost"
              href={site.resume}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Resume
            </a>
            <a
              className="btn btn--ghost"
              href={site.resume}
              download="Mansi_Tyagi_Resume.pdf"
            >
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
            <div className={styles.photoGlass}>
              <img
                className={styles.photo}
                src="/assets/images/profile-photo.png"
                alt="Mansi Tyagi - Computer Science Engineering student"
              />
            </div>
          </div>

          <div className={styles.terminal} aria-label="System status terminal">
            <div className={styles.terminalBar}>
              <span />
              <span />
              <span />
              <em>portfolio.exe</em>
            </div>
            <div className={styles.terminalBody}>
              {TERMINAL_LINES.slice(0, visibleCount).map((line) => (
                <p key={line} className={styles.terminalLine}>
                  <span className={styles.prompt}>&gt;</span> {line}
                </p>
              ))}
              {visibleCount < TERMINAL_LINES.length ? (
                <p className={styles.terminalLine}>
                  <span className={styles.prompt}>&gt;</span> {typed}
                  {!reducedMotion ? <span className={styles.caret} aria-hidden="true" /> : null}
                </p>
              ) : null}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
