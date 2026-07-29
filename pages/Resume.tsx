import React, { useState } from 'react';
import { Download } from 'lucide-react';
import Panel from '../components/Panel';
import Reveal from '../components/Reveal';
import { useLanguage } from '../contexts/LanguageContext';

const Resume: React.FC = () => {
  const { t } = useLanguage();
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  const handleDownload = async () => {
    if (isGeneratingPdf) return;

    setIsGeneratingPdf(true);

    try {
      const [{ Font, pdf }, { default: ResumePdfDocument, registerResumePdfFonts }] = await Promise.all([
        import('@react-pdf/renderer'),
        import('../components/ResumePdfDocument'),
      ]);
      Font.clear();
      registerResumePdfFonts();
      const blob = await pdf(<ResumePdfDocument content={t.resume} />).toBlob();
      const url = URL.createObjectURL(blob);
      const downloadLink = document.createElement('a');

      downloadLink.href = url;
      downloadLink.download = 'CV - Mehdi Oulad Khlie.pdf';
      document.body.appendChild(downloadLink);
      downloadLink.click();
      downloadLink.remove();

      window.setTimeout(() => URL.revokeObjectURL(url), 1_000);
    } catch (error) {
      console.error('Unable to generate the CV PDF.', error);
      window.alert('De PDF kon niet worden aangemaakt. Probeer het opnieuw.');
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  return (
    <div className="resume-page mx-auto max-w-5xl">

      {/* Header */}
      <header className="resume-header mb-20 flex flex-col gap-8 border-b border-border pb-10 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="display text-[clamp(2.75rem,8vw,5.5rem)]">{t.resume.title}</h1>
          <p className="mt-4 text-textDim">{t.resume.subtitle}</p>
        </div>
        <button
          type="button"
          className="button-outline print-hidden shrink-0 self-start md:self-auto"
          onClick={handleDownload}
          disabled={isGeneratingPdf}
          aria-label="Generate CV PDF"
          aria-busy={isGeneratingPdf}
        >
          <Download size={15} strokeWidth={1.4} aria-hidden="true" />
          {isGeneratingPdf ? 'PDF…' : t.resume.download}
        </button>
      </header>

      <div className="resume-grid grid grid-cols-1 gap-14 md:grid-cols-3 md:gap-16">

        {/* Experience & education */}
        <div className="resume-main space-y-20 md:col-span-2">

          <Reveal as="section">
            <h2 className="eyebrow">{t.resume.experienceTitle}</h2>

            <div className="resume-timeline mt-8 border-l border-border pl-8">
              {t.resume.jobs.map((job, index) => (
                <div className={`resume-entry relative ${index > 0 ? 'mt-12' : ''}`} key={`${job.company}-${job.period}`}>
                  <span className="resume-dot absolute -left-[33px] top-3 h-[7px] w-[7px] rounded-full bg-border" aria-hidden="true" />
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                    <h3 className="serif text-2xl leading-snug">{job.role}</h3>
                    <span className="meta shrink-0">{job.period}</span>
                  </div>
                  <div className="mt-1 text-sm text-textDim">{job.company}</div>
                  <ul className="mt-4 space-y-2 text-sm text-textDim">
                    {job.description.map((desc) => (
                      <li key={desc} className="flex gap-3">
                        <span className="text-textDim/60">—</span>
                        <span>{desc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal as="section">
            <h2 className="eyebrow">{t.resume.educationTitle}</h2>

            <div className="resume-timeline mt-8 border-l border-border pl-8">
              {t.resume.educationList.map((edu, index) => (
                <div className={`resume-entry relative ${index > 0 ? 'mt-10' : ''}`} key={`${edu.school}-${edu.period}`}>
                  <span className="resume-dot absolute -left-[33px] top-3 h-[7px] w-[7px] rounded-full bg-border" aria-hidden="true" />
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                    <h3 className="serif text-2xl leading-snug">{edu.degree}</h3>
                    <span className="meta shrink-0">{edu.period}</span>
                  </div>
                  <div className="mt-1 text-sm text-textDim">{edu.school}</div>
                  <p className="mt-3 text-sm text-textDim">{edu.description}</p>
                </div>
              ))}
            </div>
          </Reveal>

        </div>

        {/* Sidebar */}
        <aside className="resume-sidebar space-y-6 md:sticky md:top-28 md:self-start">
          <Panel label={t.resume.languages.title}>
            <dl className="divide-y divide-border">
              <div className="flex items-baseline justify-between gap-4 pb-3">
                <dt>{t.resume.languages.dutch}</dt>
                <dd className="meta">{t.resume.languages.native}</dd>
              </div>
              <div className="flex items-baseline justify-between gap-4 py-3">
                <dt>{t.resume.languages.arabic}</dt>
                <dd className="meta">{t.resume.languages.native}</dd>
              </div>
              <div className="flex items-baseline justify-between gap-4 py-3">
                <dt>{t.resume.languages.english}</dt>
                <dd className="meta">{t.resume.languages.fluent}</dd>
              </div>
              <div className="flex items-baseline justify-between gap-4 pt-3">
                <dt className="text-textDim">{t.resume.languages.french}</dt>
                <dd className="meta">{t.resume.languages.basic}</dd>
              </div>
            </dl>
          </Panel>

          <Panel label={t.resume.contact.title} delay={80}>
            <div className="space-y-3 text-sm text-textDim">
              <p>Evergem, België</p>
              <p>
                <a href="mailto:mehdi.ouladkhlie@outlook.be" aria-label="Send email to Mehdi" className="hover:text-textMain">
                  mehdi.ouladkhlie@<wbr />outlook.be
                </a>
              </p>
              <p>+32 465 13 66 79</p>
            </div>
          </Panel>
        </aside>

      </div>
    </div>
  );
};

export default Resume;
