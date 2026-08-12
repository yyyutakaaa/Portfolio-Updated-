import { useMemo, useState } from 'react';
import { highlight, type Language } from '../lib/highlight';
import { useCopy } from '../lib/hooks';
import { Check, ChevronRight, Copy } from './Icons';

interface Props {
  label: string;
  filename: string;
  lang: Language;
  source: string;
  caseId: string;
}

const LANG_LABEL: Record<Language, string> = {
  powershell: 'POWERSHELL',
  cisco: 'CISCO IOS',
};

export default function CodeBlock({ label, filename, lang, source, caseId }: Props) {
  const [open, setOpen] = useState(false);
  const { copied, copy } = useCopy();
  const html = useMemo(() => highlight(source, lang), [source, lang]);
  const lineCount = useMemo(() => source.split('\n').length, [source]);

  return (
    <details
      className="code"
      open={open}
      onToggle={(e) => setOpen((e.currentTarget as HTMLDetailsElement).open)}
    >
      <summary className="code__summary mono">
        <ChevronRight className="code__chev" />
        <span>{label}</span>
        <span className="code__file">
          {filename} · {lineCount} regels
        </span>
      </summary>

      <div className="code__body">
        <button
          type="button"
          className="code__copy mono"
          onClick={() => void copy(source)}
          aria-label={`Kopieer de code van ${filename} naar het klembord`}
        >
          {copied ? <Check /> : <Copy />}
          <span aria-hidden="true">{copied ? 'GEKOPIEERD' : 'KOPIEER'}</span>
        </button>

        <pre className="code__pre" tabIndex={0} aria-label={`${LANG_LABEL[lang]} — ${filename}`}>
          <code
            data-lang={lang}
            /* De highlighter escapet alle invoer voordat er spans omheen gaan. */
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </pre>

        <p className="sr-only" role="status">
          {copied ? `Code van ${filename} gekopieerd naar het klembord.` : ''}
        </p>
      </div>

      <span className="sr-only">{`Codefragment ${caseId} in ${LANG_LABEL[lang]}.`}</span>
    </details>
  );
}
