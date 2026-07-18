import React, { Suspense } from 'react';
import { HashRouter, Navigate, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import { LanguageProvider } from './contexts/LanguageContext';

const Home = React.lazy(() => import('./pages/Home'));
const Resume = React.lazy(() => import('./pages/Resume'));
const Contact = React.lazy(() => import('./pages/Contact'));
const Privacy = React.lazy(() => import('./pages/Privacy'));
const ProjectMuted = React.lazy(() => import('./pages/ProjectMuted'));

const ScrollToTop = () => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <HashRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <ScrollToTop />
        <Layout>
          <Suspense fallback={<div className="page-loader" aria-label="Loading page"><span /><span /><span /></div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/resume" element={<Resume />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/visibility-spoofer-privacy" element={<Privacy />} />
              <Route path="/projects/muted" element={<ProjectMuted />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </Layout>
      </HashRouter>
    </LanguageProvider>
  );
};

export default App;
