import React from 'react';

export interface LogEntry {
  id: string;
  title: string;
  subtitle: string;
  period: string;
  description: string[];
}

interface ExperienceLogProps {
  entries: LogEntry[];
  defaultOpenIds?: string[];
}

/**
 * A numbered, expand-on-demand list for experience/education — scannable
 * collapsed (role, company, period on one line), detailed on click. Stands
 * in for the usual vertical dotted timeline without hiding any information.
 */
const ExperienceLog: React.FC<ExperienceLogProps> = ({ entries, defaultOpenIds = [] }) => {
  const [openIds, setOpenIds] = React.useState<Set<string>>(() => new Set(defaultOpenIds));

  const toggle = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div>
      {entries.map((entry, i) => {
        const isOpen = openIds.has(entry.id);
        return (
          <div className="log-row" key={entry.id}>
            <button
              type="button"
              className="log-row-trigger"
              aria-expanded={isOpen}
              aria-controls={`log-panel-${entry.id}`}
              onClick={() => toggle(entry.id)}
            >
              <span className="flex items-baseline gap-4 md:gap-6">
                <span className="console-tab-index shrink-0">{String(i + 1).padStart(2, '0')}</span>
                <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="serif text-xl leading-snug sm:text-2xl">{entry.title}</span>
                  <span className="text-sm text-textDim">{entry.subtitle}</span>
                </span>
              </span>
              <span className="flex items-center gap-5 pl-[38px] md:pl-0">
                <span className="meta shrink-0">{entry.period}</span>
                <span aria-hidden="true" className="w-3 shrink-0 text-center text-textDim">{isOpen ? '—' : '+'}</span>
              </span>
            </button>

            <div className="log-row-panel" data-open={isOpen} id={`log-panel-${entry.id}`}>
              <div className="pb-7 pl-[38px] md:pl-[104px]">
                <ul className="max-w-prose space-y-2.5 text-sm text-textDim">
                  {entry.description.map((line) => (
                    <li key={line} className="flex gap-3">
                      <span className="text-textDim/60">—</span>
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ExperienceLog;
