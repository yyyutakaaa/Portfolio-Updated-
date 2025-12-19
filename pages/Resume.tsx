import React from 'react';
import Tile from '../components/Tile';
import { Briefcase, Download, Languages, Globe, GraduationCap } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Resume: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
        <div>
          <h1 className="text-3xl md:text-5xl font-bold uppercase tracking-tight">{t.resume.title}</h1>
          <p className="text-textDim font-mono mt-2">{t.resume.subtitle}</p>
        </div>
        <button 
            className="flex items-center gap-2 bg-white text-bg px-5 py-2.5 font-mono text-sm font-bold uppercase hover:bg-gray-200 transition-colors"
            onClick={() => alert("PDF Download functionaliteit zou hier worden geïmplementeerd")}
        >
            <Download size={16} />
            {t.resume.download}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Main Content Column (Experience & Education) */}
        <div className="md:col-span-2 space-y-12">
           
           {/* Experience Section */}
           <div>
              <div className="flex items-center gap-3 mb-6">
                  <Briefcase className="text-white" size={20} />
                  <h2 className="text-xl font-bold uppercase tracking-wider">{t.resume.experienceTitle}</h2>
              </div>

              <div className="space-y-6 relative border-l border-border ml-3 pl-8 pb-4">
                  {t.resume.jobs.map((job, index) => (
                    <div className={`relative ${index > 0 ? 'mt-12' : ''}`} key={index}>
                      <div className="absolute -left-[37px] top-1 h-4 w-4 rounded-full border-2 border-border bg-bg group-hover:border-white transition-colors" />
                      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-2">
                        <h3 className="text-lg font-bold text-white">{job.role}</h3>
                        <span className="font-mono text-xs text-blue-400">{job.period}</span>
                      </div>
                      <div className="font-mono text-sm text-textDim mb-4">{job.company}</div>
                      <ul className="list-disc list-outside ml-4 space-y-2 text-sm text-textDim marker:text-white/50">
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
                  <GraduationCap className="text-white" size={20} />
                  <h2 className="text-xl font-bold uppercase tracking-wider">{t.resume.educationTitle}</h2>
              </div>

              <div className="space-y-6 relative border-l border-border ml-3 pl-8 pb-4">
                  {t.resume.educationList.map((edu, index) => (
                    <div className={`relative ${index > 0 ? 'mt-8' : ''}`} key={index}>
                      <div className="absolute -left-[37px] top-1 h-4 w-4 rounded-full border-2 border-border bg-bg" />
                      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-1">
                        <h3 className="text-lg font-bold text-white">{edu.degree}</h3>
                        <span className="font-mono text-xs text-blue-400">{edu.period}</span>
                      </div>
                      <div className="font-mono text-sm text-white/80 mb-2">{edu.school}</div>
                      <p className="text-sm text-textDim">{edu.description}</p>
                    </div>
                  ))}
              </div>
           </div>

        </div>

        {/* Sidebar Column (Languages & Info) */}
        <div className="space-y-6">
          
          <Tile label={t.resume.languages.title} className="h-fit">
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-border">
                <span className="font-bold text-white">{t.resume.languages.dutch}</span>
                <span className="font-mono text-xs text-green-400">{t.resume.languages.native}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-border">
                <span className="font-bold text-white">{t.resume.languages.arabic}</span>
                <span className="font-mono text-xs text-green-400">{t.resume.languages.native}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-border">
                <span className="font-bold text-white">{t.resume.languages.english}</span>
                <span className="font-mono text-xs text-blue-400">{t.resume.languages.fluent}</span>
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
                   <Globe size={14} />
                   <span>Evergem, België</span>
                </div>
                <div className="flex items-center gap-3">
                   <span className="w-3.5 text-center">@</span>
                   <a href="mailto:mehdi.ouladkhlie@outlook.be" className="hover:text-white transition-colors">mehdi.ouladkhlie@outlook.be</a>
                </div>
                <div className="flex items-center gap-3">
                   <span className="w-3.5 text-center">#</span>
                   <span>+32 468 54 94 78</span>
                </div>
             </div>
          </Tile>

        </div>

      </div>
    </div>
  );
};

export default Resume;