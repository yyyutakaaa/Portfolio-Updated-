import React, { useState } from 'react';
import Tile from '../components/Tile';
import { Briefcase, Download, Languages, Globe, GraduationCap } from 'lucide-react';
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
    <div className="resume-page max-w-5xl mx-auto space-y-10">
      
      {/* Header */}
      <div className="resume-header page-header flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16 border-b border-border pb-8">
        <div>
          <h1 className="text-4xl md:text-7xl font-extrabold uppercase tracking-[-0.055em] leading-[0.9]">{t.resume.title}</h1>
          <p className="text-textDim font-mono mt-2">{t.resume.subtitle}</p>
        </div>
        <button 
            className="flex items-center gap-2 bg-accent text-bg px-6 py-3 rounded-full font-mono text-sm font-bold uppercase hover:bg-textMain disabled:cursor-wait disabled:opacity-70"
            onClick={handleDownload}
            disabled={isGeneratingPdf}
            aria-label="Generate CV PDF"
            aria-busy={isGeneratingPdf}
        >
            <Download size={16} aria-hidden="true" />
            {isGeneratingPdf ? 'PDF…' : t.resume.download}
        </button>
      </div>

      <div className="resume-grid grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Main Content Column (Experience & Education) */}
        <div className="resume-main md:col-span-2 space-y-12">
           
           {/* Experience Section */}
           <div>
              <div className="flex items-center gap-3 mb-6">
                  <Briefcase className="text-textMain" size={20} />
                  <h2 className="text-xl font-bold uppercase tracking-wider">{t.resume.experienceTitle}</h2>
              </div>

              <div className="resume-timeline space-y-6 relative border-l border-border ml-3 pl-8 pb-4">
                  {t.resume.jobs.map((job, index) => (
                    <div className={`resume-entry relative ${index > 0 ? 'mt-12' : ''}`} key={index}>
                      <div className="absolute -left-[37px] top-1 h-4 w-4 rounded-full border-2 border-border bg-bg group-hover:border-textMain transition-colors" />
                      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-2">
                        <h3 className="text-lg font-bold text-textMain">{job.role}</h3>
                        <span className="font-mono text-xs text-accent">{job.period}</span>
                      </div>
                      <div className="font-mono text-sm text-textDim mb-4">{job.company}</div>
                      <ul className="list-disc list-outside ml-4 space-y-2 text-sm text-textDim marker:text-textMain/50">
                        {job.description.map((desc, i) => (
                          <li key={i}>{desc}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
              </div>
           </div>

           {/* Education Section */}
           <div>
              <div className="flex items-center gap-3 mb-6">
                  <GraduationCap className="text-textMain" size={20} />
                  <h2 className="text-xl font-bold uppercase tracking-wider">{t.resume.educationTitle}</h2>
              </div>

              <div className="resume-timeline space-y-6 relative border-l border-border ml-3 pl-8 pb-4">
                  {t.resume.educationList.map((edu, index) => (
                    <div className={`resume-entry relative ${index > 0 ? 'mt-8' : ''}`} key={index}>
                      <div className="absolute -left-[37px] top-1 h-4 w-4 rounded-full border-2 border-border bg-bg" />
                      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-1">
                        <h3 className="text-lg font-bold text-textMain">{edu.degree}</h3>
                        <span className="font-mono text-xs text-accent">{edu.period}</span>
                      </div>
                      <div className="font-mono text-sm text-textMain/80 mb-2">{edu.school}</div>
                      <p className="text-sm text-textDim">{edu.description}</p>
                    </div>
                  ))}
              </div>
           </div>

        </div>

        {/* Sidebar Column (Languages & Info) */}
        <div className="resume-sidebar space-y-6 md:sticky md:top-28 md:self-start">
          
          <Tile label={t.resume.languages.title} className="h-fit">
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-border">
                <span className="font-bold text-textMain">{t.resume.languages.dutch}</span>
                <span className="font-mono text-xs text-accent">{t.resume.languages.native}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-border">
                <span className="font-bold text-textMain">{t.resume.languages.arabic}</span>
                <span className="font-mono text-xs text-accent">{t.resume.languages.native}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-border">
                <span className="font-bold text-textMain">{t.resume.languages.english}</span>
                <span className="font-mono text-xs text-accent">{t.resume.languages.fluent}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-textDim">{t.resume.languages.french}</span>
                <span className="font-mono text-xs text-textDim">{t.resume.languages.basic}</span>
              </div>
            </div>
          </Tile>

          <Tile label={t.resume.contact.title} className="h-fit">
             <div className="space-y-4 text-sm font-mono text-textDim">
                <div className="flex items-center gap-3">
                   <Globe size={14} aria-hidden="true" />
                   <span>Evergem, België</span>
                </div>
                <div className="flex items-center gap-3">
                   <span className="w-3.5 text-center">@</span>
                   <a href="mailto:mehdi.ouladkhlie@outlook.be" aria-label="Send email to Mehdi" className="hover:text-textMain transition-colors">mehdi.ouladkhlie@<wbr />outlook.be</a>
                </div>
                <div className="flex items-center gap-3">
                   <span className="w-3.5 text-center">#</span>
                   <span>+32 465 13 66 79</span>
                </div>
             </div>
          </Tile>

        </div>

      </div>
    </div>
  );
};

export default Resume;
