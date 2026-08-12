import React from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

interface SkillCategory {
  key: string;
  title: string;
  items: string[];
}

interface SkillsConsoleProps {
  categories: SkillCategory[];
}

const PANEL_ID = 'skills-panel';

/**
 * Accordion-style skill browser: one category expanded at a time, keyboard
 * operable via plain buttons (no custom tablist semantics to get wrong).
 * The panel keeps one stable DOM id across category switches so every tab
 * button's aria-controls resolves to a real element, not just the active
 * one's. The signal bar under each item is decorative — a "line acquired"
 * flourish, not a fabricated proficiency percentage.
 */
const SkillsConsole: React.FC<SkillsConsoleProps> = ({ categories }) => {
  const prefersReducedMotion = useReducedMotion();
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
              aria-controls={PANEL_ID}
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
        <div id={PANEL_ID} role="region" aria-label={active?.title}>
          <AnimatePresence mode="wait">
            {active && (
              <motion.ul
                key={active.key}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.32, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-5"
              >
                {active.items.map((item, i) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: prefersReducedMotion ? 0 : 0.48,
                      ease: [0.22, 1, 0.36, 1],
                      delay: prefersReducedMotion ? 0 : i * 0.035,
                    }}
                  >
                    <div className="flex items-baseline justify-between gap-4 border-b border-border pb-4">
                      <span className="text-sm sm:text-base">{item}</span>
                      <span className="font-mono text-[10px] text-textDim">{String(i + 1).padStart(2, '0')}</span>
                    </div>
                    <div className="signal-bar-track mt-3">
                      <span className="signal-bar-fill" />
                    </div>
                  </motion.li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default SkillsConsole;
