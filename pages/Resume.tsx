import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

/**
 * The CV on the same sheet as the write-ups: title, download, languages and
 * contact on the left, experience and education read down the right. The PDF
 * is generated on demand so the page stays light.
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
          ? 'Het is niet gelukt om de PDF te maken. Probeer het nog eens.'
          : "Couldn't generate the PDF. Give it another try.",
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
    <article className="page">
      <aside className="side side--sticky">
        <p className="lbl">{r.subtitle}</p>
        <h1 className="side__title">{r.title}</h1>
        <div className="actions">
          <button
            type="button"
            className="btn btn--accent"
            onClick={handleDownload}
            disabled={isGeneratingPdf}
            aria-busy={isGeneratingPdf}
          >
            {isGeneratingPdf ? 'PDF…' : r.download}
          </button>
        </div>

        <div className="side__group">
          <p className="lbl">{r.languages.title}</p>
          <dl>
            {languages.map((entry) => (
              <div key={entry.name}>
                <dt>{entry.name}</dt>
                <dd className="lbl">{entry.level}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="side__group">
          <p className="lbl">{r.contact.title}</p>
          <dl>
            <div>
              <dd>{language === 'nl' ? 'Evergem, België' : 'Evergem, Belgium'}</dd>
            </div>
            <div>
              <dd>
                <a href="mailto:mehdi.ouladkhlie@outlook.be">
                  mehdi.ouladkhlie@<wbr />outlook.be
                </a>
              </dd>
            </div>
            <div>
              <dd>
                <a href="tel:+32468549478">+32 468 54 94 78</a>
              </dd>
            </div>
          </dl>
        </div>
      </aside>

      <div className="read">
        <section>
          <h2>{r.experienceTitle}</h2>
          <ol className="timeline">
            {r.jobs.map((job) => (
              <li key={`${job.company}-${job.period}`}>
                <div className="timeline__top">
                  <h3>{job.role}</h3>
                  <span className="lbl">{job.period}</span>
                </div>
                <p className="timeline__where">{job.company}</p>
                <ul className="bullets">
                  {job.description.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </section>

        <section>
          <h2>{r.educationTitle}</h2>
          <ol className="timeline">
            {r.educationList.map((edu) => (
              <li key={`${edu.school}-${edu.period}`}>
                <div className="timeline__top">
                  <h3>{edu.degree}</h3>
                  <span className="lbl">{edu.period}</span>
                </div>
                <p className="timeline__where">{edu.school}</p>
                <p>{edu.description}</p>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </article>
  );
};

export default Resume;
