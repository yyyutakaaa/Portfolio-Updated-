import React, { useState } from 'react';
import InkReveal from '../components/ink/InkReveal';
import InkSectionHead from '../components/ink/InkSectionHead';
import BrushDivider from '../components/ink/BrushDivider';
import { useLanguage } from '../contexts/LanguageContext';

/**
 * The CV as a sheet you read top to bottom: experience and education as two
 * ruled timelines, with languages and the direct lines held beside them. The
 * PDF is generated on demand, as before, so the page stays light.
 */
const Resume: React.FC = () => {
  const { t, language } = useLanguage();
  const r = t.resume;
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
      const blob = await pdf(<ResumePdfDocument content={r} />).toBlob();
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

  const languages = [
    { name: r.languages.dutch, level: r.languages.native },
    { name: r.languages.arabic, level: r.languages.native },
    { name: r.languages.english, level: r.languages.fluent },
    { name: r.languages.french, level: r.languages.basic },
  ];

  return (
    <article className="ink-page ink-resume">
      <header className="ink-section ink-section--page">
        <div className="ink-shell">
          <InkSectionHead label={r.subtitle} heading={r.title} level="h1" />
          <div className="ink-grid">
            <InkReveal className="ink-case__lead" delay={0.3}>
              <div className="ink-actions">
                <button
                  type="button"
                  className="ink-btn"
                  onClick={handleDownload}
                  disabled={isGeneratingPdf}
                  aria-busy={isGeneratingPdf}
                >
                  {isGeneratingPdf ? 'PDF…' : r.download}
                </button>
              </div>
            </InkReveal>
          </div>
        </div>
      </header>

      <section className="ink-section">
        <div className="ink-shell">
          <BrushDivider />
          <div className="ink-grid ink-resume__layout">
            <div className="ink-resume__main">
              <InkSectionHead label="01" heading={r.experienceTitle} className="ink-section__head--inline" />
              <ol className="ink-timeline">
                {r.jobs.map((job) => (
                  <InkReveal as="li" key={`${job.company}-${job.period}`} className="ink-timeline__entry">
                    <div className="ink-timeline__top">
                      <h3 className="ink-timeline__role">{job.role}</h3>
                      <span className="ink-cap">{job.period}</span>
                    </div>
                    <p className="ink-timeline__where">{job.company}</p>
                    <ul className="ink-bullets ink-bullets--single">
                      {job.description.map((line) => (
                        <li key={line}>{line}</li>
                      ))}
                    </ul>
                  </InkReveal>
                ))}
              </ol>

              <InkSectionHead label="02" heading={r.educationTitle} className="ink-section__head--inline" />
              <ol className="ink-timeline">
                {r.educationList.map((edu) => (
                  <InkReveal as="li" key={`${edu.school}-${edu.period}`} className="ink-timeline__entry">
                    <div className="ink-timeline__top">
                      <h3 className="ink-timeline__role">{edu.degree}</h3>
                      <span className="ink-cap">{edu.period}</span>
                    </div>
                    <p className="ink-timeline__where">{edu.school}</p>
                    <p className="ink-prose">{edu.description}</p>
                  </InkReveal>
                ))}
              </ol>
            </div>

            <aside className="ink-resume__aside">
              <InkReveal>
                <p className="ink-cap ink-contact__kicker">{r.languages.title}</p>
                <dl className="ink-facts ink-facts--stacked">
                  {languages.map((entry) => (
                    <div className="ink-facts__row" key={entry.name}>
                      <dt>{entry.name}</dt>
                      <dd className="ink-cap">{entry.level}</dd>
                    </div>
                  ))}
                </dl>
              </InkReveal>

              <InkReveal>
                <p className="ink-cap ink-contact__kicker">{r.contact.title}</p>
                <dl className="ink-facts ink-facts--stacked">
                  <div className="ink-facts__row">
                    <dd>{language === 'nl' ? 'Evergem, België' : 'Evergem, Belgium'}</dd>
                  </div>
                  <div className="ink-facts__row">
                    <dd>
                      <a className="ink-inline-link" href="mailto:mehdi.ouladkhlie@outlook.be">
                        mehdi.ouladkhlie@<wbr />outlook.be
                      </a>
                    </dd>
                  </div>
                  <div className="ink-facts__row">
                    <dd>
                      <a className="ink-inline-link" href="tel:+32468549478">
                        +32 468 54 94 78
                      </a>
                    </dd>
                  </div>
                </dl>
              </InkReveal>
            </aside>
          </div>
        </div>
      </section>
    </article>
  );
};

export default Resume;
