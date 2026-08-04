import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { skills } from '../../data/content';
import useInViewOnce from '../../hooks/useInViewOnce';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion';
import SectionHeader from '../SectionHeader/SectionHeader';
import styles from './Skills.module.css';

function SkillBar({ name, level, animate }) {
  return (
    <div className={styles.barRow}>
      <div className={styles.barMeta}>
        <span>{name}</span>
        <span>{level}%</span>
      </div>
      <div className={styles.track}>
        <motion.div
          className={styles.fill}
          initial={{ width: 0 }}
          animate={{ width: animate ? `${level}%` : 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
}

function SkillCard({ category, items, index }) {
  const reducedMotion = usePrefersReducedMotion();
  const { ref, inView } = useInViewOnce({ threshold: 0.3 });
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const onMove = (event) => {
    if (reducedMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    setTilt({
      x: (0.5 - py) * 10,
      y: (px - 0.5) * 12,
    });
  };

  const onLeave = () => setTilt({ x: 0, y: 0 });

  return (
    <motion.article
      ref={(node) => {
        cardRef.current = node;
        ref.current = node;
      }}
      className={`glass-card ${styles.card}`}
      style={{
        transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
      }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      initial={reducedMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <h3 className={styles.category}>{category}</h3>
      <div className={styles.bars}>
        {items.map((item) => (
          <SkillBar
            key={item.name}
            name={item.name}
            level={item.level}
            animate={inView && !reducedMotion ? true : inView}
          />
        ))}
      </div>
    </motion.article>
  );
}

export default function Skills() {
  return (
    <section id="skills" className={`section ${styles.skills}`}>
      <div className="container">
        <SectionHeader
          eyebrow="Skills"
          title="What I work with"
          subtitle="A mix of frontend craft, core languages, and tools I use every day."
        />
        <div className={styles.grid}>
          {skills.map((group, index) => (
            <SkillCard
              key={group.category}
              category={group.category}
              items={group.items}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
