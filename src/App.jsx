import { useState } from 'react';
import { motion } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import usePrefersReducedMotion from './hooks/usePrefersReducedMotion';
import BackgroundEffects from './components/BackgroundEffects/BackgroundEffects';
import Cursor from './components/Cursor/Cursor';
import ScrollProgress from './components/ScrollProgress/ScrollProgress';
import PageLoader from './components/PageLoader/PageLoader';
import Navbar from './components/Navbar/Navbar';
import BackToTop from './components/BackToTop/BackToTop';
import Home from './pages/Home';

function AppShell() {
  const [ready, setReady] = useState(false);
  const reducedMotion = usePrefersReducedMotion();

  return (
    <>
      {!ready ? <PageLoader onComplete={() => setReady(true)} /> : null}

      <BackgroundEffects />
      <Cursor />
      <ScrollProgress />
      <Navbar />

      {ready ? (
        <motion.div
          key="app-content"
          initial={reducedMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <Home />
        </motion.div>
      ) : null}

      <BackToTop />
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppShell />
    </ThemeProvider>
  );
}
