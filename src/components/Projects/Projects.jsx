import { useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FiExternalLink, FiGithub } from 'react-icons/fi';
import { projectFilters, projects } from '../../data/content';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion';
import SectionHeader from '../SectionHeader/SectionHeader';
import styles from './Projects.module.css';

function ProjectCard({ project, featured = false, index = 0 }) {
  const reducedMotion = usePrefersReducedMotion();
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const onMove = (event) => {
    if (reducedMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    setTilt({
      x: (0.5 - py) * 8,
      y: (px - 0.5) * 10,
    });
  };

  const onLeave = () => setTilt({ x: 0, y: 0 });

  return (
    <motion.article
      ref={cardRef}
      className={`glass-card ${styles.card} ${featured ? styles.featured : ''}`}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
      }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      initial={reducedMotion ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
    >
      {featured ? <span className={styles.badge}>Featured</span> : null}
      <h3 className={styles.title}>{project.title}</h3>
      <p className={styles.description}>{project.description}</p>
      <ul className={styles.tags}>
        {project.tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
      <div className={styles.actions}>
        <a
          href={project.liveUrl}
          className="btn btn--primary"
          {...(project.liveUrl.startsWith('http')
            ? { target: '_blank', rel: 'noopener noreferrer' }
            : {})}
        >
          <FiExternalLink aria-hidden="true" />
          Live
        </a>
        <a
          href={project.sourceUrl}
          className="btn btn--ghost"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FiGithub aria-hidden="true" />
          Source
        </a>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState('All');

  const featured = useMemo(() => projects.find((project) => project.featured), []);
  const filtered = useMemo(() => {
    const rest = projects.filter((project) => !project.featured);
    if (filter === 'All') return rest;
    return rest.filter((project) => project.categories.includes(filter));
  }, [filter]);

  const showFeatured =
    featured && (filter === 'All' || featured.categories.includes(filter));

  return (
    <section id="projects" className={`section section--alt ${styles.projects}`}>
      <div className="container">
        <SectionHeader
          eyebrow="Projects"
          title="Selected work"
          subtitle="Filter by stack and explore featured and supporting projects."
        />

        <div className={styles.filters} role="tablist" aria-label="Project filters">
          {projectFilters.map((item) => (
            <button
              key={item}
              type="button"
              role="tab"
              aria-selected={filter === item}
              className={`${styles.chip} ${filter === item ? styles.chipActive : ''}`}
              onClick={() => setFilter(item)}
            >
              {item}
            </button>
          ))}
        </div>

        <div className={styles.layout}>
          {showFeatured ? (
            <ProjectCard project={featured} featured index={0} />
          ) : null}
          <div className={styles.grid}>
            {filtered.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index + 1} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
