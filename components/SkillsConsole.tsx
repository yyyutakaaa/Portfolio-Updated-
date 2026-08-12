import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Reveal from './Reveal';

interface SkillCategory {
  key: string;
  title: string;
  items: string[];
}

interface SkillsConsoleProps {
  categories: SkillCategory[];
}

/**
 * Accordion-style skill browser: one category expanded at a time, keyboard
 * operable via plain buttons (no custom tablist semantics to get wrong).
 * The signal bar under each item is decorative — a "line acquired" flourish,
 * not a fabricated proficiency percentage.
 */
const SkillsConsole: React.FC<SkillsConsoleProps> = ({ categories }) => {
  const [openKey, setOpenKey] = React.useState(categories[0]?.key ?? '');
  const active = categories.find((cat) => cat.key === openKey);

  return (
    <div className="grid gap-10 md:grid-cols-12 md:gap-14">
      <div className="md:col-span-4">
        {categories.map((cat, i) => {
          const isOpen = openKey === cat.key;
          return (
            <button
              key={cat.key}
              type="button"
              className="console-tab"
              aria-expanded={isOpen}
              aria-controls={`skills-panel-${cat.key}`}
              onClick={() => setOpenKey(cat.key)}
            >
              <span className="flex items-baseline gap-4">
                <span className="console-tab-index">{String(i + 1).padStart(2, '0')}</span>
                <span className="serif text-xl sm:text-2xl">{cat.title}</span>
              </span>
              <span aria-hidden="true" className="text-base text-textDim">{isOpen ? '—' : '+'}</span>
            </button>
          );
        })}
      </div>

      <div className="md:col-span-8">
        <AnimatePresence mode="wait">
          {active && (
            <motion.ul
              key={active.key}
              id={`skills-panel-${active.key}`}
              role="region"
              aria-label={active.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-5"
            >
              {active.items.map((item, i) => (
                <Reveal as="li" key={item} delay={i * 60}>
                  <div className="flex items-baseline justify-between gap-4 border-b border-border pb-4">
                    <span className="text-sm sm:text-base">{item}</span>
                    <span className="font-mono text-[10px] text-textDim/70">{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <div className="signal-bar-track mt-3" style={{ '--fill': '100%' } as React.CSSProperties}>
                    <span className="signal-bar-fill" />
                  </div>
                </Reveal>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SkillsConsole;
