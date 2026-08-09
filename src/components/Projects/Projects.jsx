import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { FiExternalLink, FiGithub, FiMessageSquare } from 'react-icons/fi';
import { projectFilters, projects } from '../../data/content';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion';
import SectionHeader from '../SectionHeader/SectionHeader';
import styles from './Projects.module.css';

function ProjectVisual({ project, featured }) {
  if (project.image) {
    return (
      <div className={`${styles.visual} ${featured ? styles.visualFeatured : ''}`}>
        <img
          src={project.image}
          alt={`${project.title} preview`}
          className={styles.image}
          loading="lazy"
        />
      </div>
    );
  }

  return (
    <div
      className={`${styles.visual} ${styles.visualPlaceholder} ${featured ? styles.visualFeatured : ''}`}
      aria-hidden="true"
    >
      <span className={styles.visualGlow} />
      <FiMessageSquare className={styles.visualIcon} />
      <span className={styles.visualLabel}>
        {project.categories?.includes('Full Stack') ? 'Full Stack' : 'Project'}
      </span>
    </div>
  );
}

function ProjectCard({ project, featured = false, index = 0 }) {
  const reducedMotion = usePrefersReducedMotion();
  const showVisual = featured || Boolean(project.image);

  return (
    <motion.article
      className={`glass-card ${styles.card} ${featured ? styles.featured : ''}`}
      initial={reducedMotion ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      whileHover={reducedMotion ? undefined : { y: featured ? -5 : -3 }}
    >
      {showVisual ? <ProjectVisual project={project} featured={featured} /> : null}

      <div className={styles.body}>
        <div className={styles.cardTop}>
          {project.number ? <span className={styles.number}>{project.number}</span> : null}
          {featured ? <span className={styles.badge}>Featured Full Stack</span> : null}
        </div>

        <h3 className={styles.title}>{project.title}</h3>
        <p className={styles.description}>{project.description}</p>

        <ul className={styles.tags}>
          {project.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>

        {project.liveUrl || project.sourceUrl ? (
          <div className={styles.actions}>
            {project.sourceUrl ? (
              <a
                href={project.sourceUrl}
                className="btn btn--ghost"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FiGithub aria-hidden="true" />
                GitHub
              </a>
            ) : null}
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                className="btn btn--primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FiExternalLink aria-hidden="true" />
                Live Demo
              </a>
            ) : null}
          </div>
        ) : null}
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
