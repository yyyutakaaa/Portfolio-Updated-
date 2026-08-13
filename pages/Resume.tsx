import React, { useState } from 'react';
import { Download } from 'lucide-react';
import KineticHeading from '../components/motion/KineticHeading';
import Reveal from '../components/motion/Reveal';
import { useLanguage } from '../contexts/LanguageContext';

const Resume: React.FC = () => {
  const { t, language } = useLanguage();
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
      window.alert(
        language === 'nl'
          ? 'De PDF kon niet worden aangemaakt. Probeer het opnieuw.'
          : 'The PDF could not be generated. Please try again.',
      );
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  return (
    <div className="container-narrow">
      <div className="resume-page">
        <header className="resume-header mb-20 flex flex-col gap-10 border-b border-border pb-12 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="label">{t.resume.subtitle}</span>
            <KineticHeading
              as="h1"
              trigger="load"
              delay={0.1}
              className="display display-tight mt-7 text-[clamp(2.75rem,9vw,6.5rem)]"
            >
              {t.resume.title}
            </KineticHeading>
          </div>

          <button
            type="button"
            className="btn print-hidden shrink-0 self-start md:self-auto"
            onClick={handleDownload}
            disabled={isGeneratingPdf}
            aria-label="Generate CV PDF"
            aria-busy={isGeneratingPdf}
          >
            <Download size={14} strokeWidth={1.6} aria-hidden="true" />
            {isGeneratingPdf ? 'PDF…' : t.resume.download}
          </button>
        </header>

        <div className="resume-grid grid grid-cols-1 gap-16 md:grid-cols-12 md:gap-14">
          <div className="resume-main space-y-24 md:col-span-8">
            <section>
              <div className="flex items-baseline gap-5 border-t border-border pt-5">
                <span className="index-num">01</span>
                <h2 className="label">{t.resume.experienceTitle}</h2>
              </div>

              <div className="resume-timeline mt-12 border-l border-border pl-8">
                {t.resume.jobs.map((job, index) => (
                  <Reveal
                    key={`${job.company}-${job.period}`}
                    className={`resume-entry relative ${index > 0 ? 'mt-14' : ''}`}
                  >
                    <span
                      className="resume-dot absolute -left-[33px] top-3 h-[7px] w-[7px] rounded-full border border-border bg-bg"
                      aria-hidden="true"
                    />
                    <div className="flex flex-col gap-1.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                      <h3 className="headline text-xl md:text-2xl">{job.role}</h3>
                      <span className="index-num shrink-0">{job.period}</span>
                    </div>
                    <p className="mt-2 text-sm text-textDim">{job.company}</p>
                    <ul className="mt-5 space-y-2.5">
                      {job.description.map((desc) => (
                        <li key={desc} className="flex gap-4 text-sm text-textDim">
                          <span className="dot dot--sm mt-2 shrink-0" aria-hidden="true" />
                          <span>{desc}</span>
                        </li>
                      ))}
                    </ul>
                  </Reveal>
                ))}
              </div>
            </section>

            <section>
              <div className="flex items-baseline gap-5 border-t border-border pt-5">
                <span className="index-num">02</span>
                <h2 className="label">{t.resume.educationTitle}</h2>
              </div>

              <div className="resume-timeline mt-12 border-l border-border pl-8">
                {t.resume.educationList.map((edu, index) => (
                  <Reveal
                    key={`${edu.school}-${edu.period}`}
                    className={`resume-entry relative ${index > 0 ? 'mt-12' : ''}`}
                  >
                    <span
                      className="resume-dot absolute -left-[33px] top-3 h-[7px] w-[7px] rounded-full border border-border bg-bg"
                      aria-hidden="true"
                    />
                    <div className="flex flex-col gap-1.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                      <h3 className="headline text-xl md:text-2xl">{edu.degree}</h3>
                      <span className="index-num shrink-0">{edu.period}</span>
                    </div>
                    <p className="mt-2 text-sm text-textDim">{edu.school}</p>
                    <p className="mt-4 text-sm text-textDim">{edu.description}</p>
                  </Reveal>
                ))}
              </div>
            </section>
          </div>

          <aside className="resume-sidebar space-y-3 md:col-span-4 md:sticky md:top-28 md:self-start">
            <Reveal className="tile">
              <h2 className="label label-ink">{t.resume.languages.title}</h2>
              <dl className="mt-6 divide-y divide-border">
                <div className="flex items-baseline justify-between gap-4 pb-3">
                  <dt className="text-sm">{t.resume.languages.dutch}</dt>
                  <dd className="index-num">{t.resume.languages.native}</dd>
                </div>
                <div className="flex items-baseline justify-between gap-4 py-3">
                  <dt className="text-sm">{t.resume.languages.arabic}</dt>
                  <dd className="index-num">{t.resume.languages.native}</dd>
                </div>
                <div className="flex items-baseline justify-between gap-4 py-3">
                  <dt className="text-sm">{t.resume.languages.english}</dt>
                  <dd className="index-num">{t.resume.languages.fluent}</dd>
                </div>
                <div className="flex items-baseline justify-between gap-4 pt-3">
                  <dt className="text-sm text-textDim">{t.resume.languages.french}</dt>
                  <dd className="index-num">{t.resume.languages.basic}</dd>
                </div>
              </dl>
            </Reveal>

            <Reveal className="tile" delay={0.08}>
              <h2 className="label label-ink">{t.resume.contact.title}</h2>
              <div className="mt-6 space-y-3 text-sm text-textDim">
                <p>Evergem, België</p>
                <p>
                  <a
                    href="mailto:mehdi.ouladkhlie@outlook.be"
                    aria-label="Send email to Mehdi"
                    className="hover:text-textMain"
                  >
                    mehdi.ouladkhlie@<wbr />outlook.be
                  </a>
                </p>
                <p>
                  <a href="tel:+32465136679" className="hover:text-textMain">
                    +32 465 13 66 79
                  </a>
                </p>
              </div>
            </Reveal>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Resume;
