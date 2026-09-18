import React, { Suspense } from 'react';
import { HashRouter, Navigate, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import SmoothScroll, { scrollToTop } from './components/motion/SmoothScroll';
import { LanguageProvider } from './contexts/LanguageContext';
import { ScrollTrigger } from './lib/motion';

const Home = React.lazy(() => import('./pages/Home'));
const Resume = React.lazy(() => import('./pages/Resume'));
const Contact = React.lazy(() => import('./pages/Contact'));
const Privacy = React.lazy(() => import('./pages/Privacy'));
const ProjectMuted = React.lazy(() => import('./pages/ProjectMuted'));
const ProjectSets = React.lazy(() => import('./pages/ProjectSets'));
const Ink = React.lazy(() => import('./pages/Ink'));

/**
 * Resets scroll on navigation and recomputes every trigger once the new page
 * has laid out — stale start/end positions are the classic ScrollTrigger bug
 * in a single-page app.
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    scrollToTop();
    const timer = window.setTimeout(() => ScrollTrigger.refresh(), 180);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  return null;
};

/**
 * The sumi-e site is its own world — paper ground, its own nav, its own type —
 * so it renders without the old shell. The pages that have not been rebuilt in
 * it yet keep the shell they were designed for.
 */
const AppShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { pathname } = useLocation();

  if (pathname === '/') return <>{children}</>;

  return <Layout>{children}</Layout>;
};

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <HashRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <SmoothScroll>
          <ScrollToTop />
          <AppShell>
            <Suspense
              fallback={
                <div className="page-loader" aria-label="Loading page">
                  <span />
                  <span />
                  <span />
                </div>
              }
            >
              <Routes>
                <Route path="/" element={<Ink />} />
                {/* The previous homepage, kept reachable while the new one
                    takes over the sections it covers. */}
                <Route path="/legacy" element={<Home />} />
                <Route path="/resume" element={<Resume />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/visibility-spoofer-privacy" element={<Privacy />} />
                <Route path="/projects/muted" element={<ProjectMuted />} />
                <Route path="/projects/sets" element={<ProjectSets />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Suspense>
          </AppShell>
        </SmoothScroll>
      </HashRouter>
    </LanguageProvider>
  );
};

export default App;
