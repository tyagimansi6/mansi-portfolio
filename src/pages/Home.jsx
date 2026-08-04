import { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion';
import Hero from '../components/Hero/Hero';
import About from '../components/About/About';

const Education = lazy(() => import('../components/Education/Education'));
const Skills = lazy(() => import('../components/Skills/Skills'));
const Projects = lazy(() => import('../components/Projects/Projects'));
const Experience = lazy(() => import('../components/Experience/Experience'));
const Achievements = lazy(() => import('../components/Achievements/Achievements'));
const Certifications = lazy(() => import('../components/Certifications/Certifications'));
const CodingProfiles = lazy(() => import('../components/CodingProfiles/CodingProfiles'));
const Contact = lazy(() => import('../components/Contact/Contact'));
const Footer = lazy(() => import('../components/Footer/Footer'));

function SectionFade({ children, delay = 0 }) {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function LazyFallback() {
  return <div className="section" aria-hidden="true" style={{ minHeight: '12rem' }} />;
}

export default function Home() {
  return (
    <main>
      <SectionFade>
        <Hero />
      </SectionFade>
      <SectionFade>
        <About />
      </SectionFade>

      <Suspense fallback={<LazyFallback />}>
        <SectionFade>
          <Education />
        </SectionFade>
        <SectionFade>
          <Skills />
        </SectionFade>
        <SectionFade>
          <Projects />
        </SectionFade>
        <SectionFade>
          <Experience />
        </SectionFade>
        <SectionFade>
          <Achievements />
        </SectionFade>
        <SectionFade>
          <Certifications />
        </SectionFade>
        <SectionFade>
          <CodingProfiles />
        </SectionFade>
        <SectionFade>
          <Contact />
        </SectionFade>
        <Footer />
      </Suspense>
    </main>
  );
}
