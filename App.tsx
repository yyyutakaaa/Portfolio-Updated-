import React, { Suspense } from 'react';
import { HashRouter, Navigate, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Cursor from './components/Cursor';
import PageTransition from './components/PageTransition';
import { LanguageProvider } from './contexts/LanguageContext';
import { SmoothScrollProvider, useSmoothScroll } from './contexts/SmoothScrollContext';

const Home = React.lazy(() => import('./pages/Home'));
const Resume = React.lazy(() => import('./pages/Resume'));
const Contact = React.lazy(() => import('./pages/Contact'));
const Privacy = React.lazy(() => import('./pages/Privacy'));
const ProjectMuted = React.lazy(() => import('./pages/ProjectMuted'));
const ProjectSets = React.lazy(() => import('./pages/ProjectSets'));

const ScrollToTop = () => {
  const { pathname } = useLocation();
  const { scrollTo } = useSmoothScroll();

  React.useEffect(() => {
    scrollTo(0, { immediate: true });
  }, [pathname, scrollTo]);

  return null;
};

const AppRoutes: React.FC = () => {
  const { pathname } = useLocation();

  return (
    <Layout>
      <Suspense fallback={<div className="page-loader" aria-label="Loading page"><span /><span /><span /></div>}>
        <PageTransition key={pathname}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/visibility-spoofer-privacy" element={<Privacy />} />
            <Route path="/projects/muted" element={<ProjectMuted />} />
            <Route path="/projects/sets" element={<ProjectSets />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </PageTransition>
      </Suspense>
    </Layout>
  );
};

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <HashRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <SmoothScrollProvider>
          <Cursor />
          <ScrollToTop />
          <AppRoutes />
        </SmoothScrollProvider>
      </HashRouter>
    </LanguageProvider>
  );
};

export default App;
