import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  SiCplusplus,
  SiCss,
  SiExpress,
  SiFigma,
  SiGit,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiNodedotjs,
  SiPython,
  SiReact,
} from 'react-icons/si';
import { FaCode, FaCubes, FaLayerGroup, FaServer, FaTools, FaLaptopCode } from 'react-icons/fa';
import { skills } from '../../data/content';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion';
import SectionHeader from '../SectionHeader/SectionHeader';
import styles from './Skills.module.css';

const ICONS = {
  'C++': SiCplusplus,
  Python: SiPython,
  JavaScript: SiJavascript,
  HTML: SiHtml5,
  CSS: SiCss,
  React: SiReact,
  'Node.js': SiNodedotjs,
  'Express.js': SiExpress,
  Git: SiGit,
  GitHub: SiGithub,
  Figma: SiFigma,
  DSA: FaCode,
  OOP: FaCubes,
};

const CATEGORY_ICONS = {
  Languages: FaCode,
  Frontend: FaLaptopCode,
  Backend: FaServer,
  Tools: FaTools,
};

function SkillChip({ name, level, index }) {
  const Icon = ICONS[name] ?? FaCode;
  const reducedMotion = usePrefersReducedMotion();

  return (
    <motion.div
      className={styles.chip}
      initial={reducedMotion ? false : { opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4, delay: index * 0.03, ease: [0.22, 1, 0.36, 1] }}
      whileHover={reducedMotion ? undefined : { y: -3, rotateX: 4, rotateY: -3 }}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <span className={styles.icon} aria-hidden="true">
        <Icon />
      </span>
      <div className={styles.chipBody}>
        <div className={styles.chipMeta}>
          <span className={styles.chipName}>{name}</span>
          <span className={styles.chipLevel}>{level}%</span>
        </div>
        <div className={styles.track} aria-hidden="true">
          <span className={styles.fill} style={{ width: `${level}%` }} />
        </div>
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const reducedMotion = usePrefersReducedMotion();
  const categories = useMemo(() => ['All', ...skills.map((group) => group.category)], []);
  const [filter, setFilter] = useState('All');

  const visibleGroups = useMemo(() => {
    if (filter === 'All') return skills;
    return skills.filter((group) => group.category === filter);
  }, [filter]);

  return (
    <section id="skills" className={`section ${styles.skills}`}>
      <div className="container">
        <SectionHeader
          eyebrow="Skills"
          title="What I work with"
          subtitle="Languages, frontend, backend, and tools grouped for a clearer view of my stack."
        />

        <div className={styles.filters} role="tablist" aria-label="Skill categories">
          {categories.map((category) => {
            const Icon = CATEGORY_ICONS[category] ?? FaLayerGroup;
            return (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={filter === category}
                className={`${styles.filter} ${filter === category ? styles.filterActive : ''}`}
                onClick={() => setFilter(category)}
              >
                <Icon aria-hidden="true" />
                {category}
              </button>
            );
          })}
        </div>

        <div className={styles.grid}>
          {visibleGroups.map((group, groupIndex) => {
            const CategoryIcon = CATEGORY_ICONS[group.category] ?? FaLayerGroup;
            return (
              <motion.article
                key={group.category}
                className={`glass-card ${styles.card}`}
                initial={reducedMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: groupIndex * 0.05, ease: [0.22, 1, 0.36, 1] }}
                whileHover={reducedMotion ? undefined : { y: -4 }}
              >
                <div className={styles.cardHead}>
                  <span className={styles.categoryIcon} aria-hidden="true">
                    <CategoryIcon />
                  </span>
                  <h3 className={styles.category}>{group.category}</h3>
                </div>
                <div className={styles.chips}>
                  {group.items.map((item, index) => (
                    <SkillChip
                      key={`${group.category}-${item.name}`}
                      name={item.name}
                      level={item.level}
                      index={index}
                    />
                  ))}
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
