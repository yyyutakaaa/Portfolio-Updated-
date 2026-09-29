import React, { Suspense } from 'react';
import { HashRouter, Navigate, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/site/Layout';
import { LanguageProvider } from './contexts/LanguageContext';

const Home = React.lazy(() => import('./pages/Home'));
const LabProject = React.lazy(() => import('./pages/LabProject'));
const Resume = React.lazy(() => import('./pages/Resume'));
const Contact = React.lazy(() => import('./pages/Contact'));
const Privacy = React.lazy(() => import('./pages/Privacy'));
const ProjectMuted = React.lazy(() => import('./pages/ProjectMuted'));
const ProjectSets = React.lazy(() => import('./pages/ProjectSets'));

/** Each route starts at the top, unless the home page was sent to a section. */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  React.useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);

  return null;
};

const App: React.FC = () => (
  <LanguageProvider>
    <HashRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <ScrollToTop />
      <Layout>
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
            <Route path="/" element={<Home />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/visibility-spoofer-privacy" element={<Privacy />} />
            <Route path="/projects/muted" element={<ProjectMuted />} />
            <Route path="/projects/sets" element={<ProjectSets />} />
            <Route path="/projects/:slug" element={<LabProject />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </Layout>
    </HashRouter>
  </LanguageProvider>
);

export default App;
