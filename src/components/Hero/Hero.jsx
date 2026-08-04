import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaCode } from 'react-icons/fa';
import { FiDownload, FiMail, FiChevronDown } from 'react-icons/fi';
import { roles, site } from '../../data/content';
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

const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  left: `${(i * 17) % 100}%`,
  top: `${(i * 29) % 100}%`,
  size: 4 + (i % 5),
  delay: (i % 7) * 0.35,
  duration: 4 + (i % 5),
}));

export default function Hero() {
  const reducedMotion = usePrefersReducedMotion();
  const typed = useTypingEffect(roles, { enabled: !reducedMotion });
  const displayRole = reducedMotion ? roles[0] : typed;

  const links = useMemo(
    () => [
      { href: site.resume, label: 'Resume', icon: FiDownload, download: true },
      { href: site.github, label: 'GitHub', icon: FaGithub, external: true },
      { href: site.linkedin, label: 'LinkedIn', icon: FaLinkedin, external: true },
      { href: site.codechef, label: 'CodeChef', icon: FaCode, external: true },
      { href: `mailto:${site.email}`, label: 'Email', icon: FiMail },
    ],
    [],
  );

  return (
    <section id="home" className={styles.hero}>
      <div className={styles.particles} aria-hidden="true">
        {PARTICLES.map((particle) => (
          <motion.span
            key={particle.id}
            className={styles.particle}
            style={{
              left: particle.left,
              top: particle.top,
              width: particle.size,
              height: particle.size,
            }}
            animate={
              reducedMotion
                ? undefined
                : {
                    y: [0, -18, 0],
                    opacity: [0.25, 0.85, 0.25],
                  }
            }
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      <div className={`container ${styles.grid}`}>
        <motion.div
          className={styles.copy}
          initial={reducedMotion ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className={styles.eyebrow}>Hello, I&apos;m</p>
          <h1 className={styles.title}>{site.name}</h1>
          <p className={styles.role}>
            <span className={styles.roleText}>{displayRole}</span>
            {!reducedMotion ? <span className={styles.caret} aria-hidden="true" /> : null}
          </p>
          <p className={styles.lead}>
            Building polished, responsive web experiences with clean UI and thoughtful interaction design.
          </p>

          <div className={styles.ctas}>
            <a className="btn btn--primary" href="#projects">
              View Projects
            </a>
            <a className="btn btn--ghost" href="#contact">
              Contact Me
            </a>
          </div>

          <div className={styles.links}>
            {links.map(({ href, label, icon: Icon, external, download }) => (
              <a
                key={label}
                href={href}
                className={styles.link}
                aria-label={label}
                title={label}
                {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                {...(download ? { download: true } : {})}
              >
                <Icon aria-hidden="true" />
              </a>
            ))}
          </div>
        </motion.div>

        <motion.div
          className={styles.visual}
          initial={reducedMotion ? false : { opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className={styles.orb}>
            <div className={styles.orbRing} aria-hidden="true" />
            <div className={styles.orbCore}>
              <img
                className={styles.orbPhoto}
                src="/assets/images/profile-photo.png"
                alt="Mansi Tyagi - Computer Science Engineering student"
              />
            </div>
          </div>
        </motion.div>
      </div>

      <a href="#about" className={styles.scrollHint} aria-label="Scroll to about">
        <span>Scroll</span>
        <FiChevronDown aria-hidden="true" />
      </a>
    </section>
  );
}
