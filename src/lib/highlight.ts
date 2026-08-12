/**
 * Kleine syntax-highlighter voor PowerShell en Cisco IOS.
 *
 * Bewust monochroom: de accentkleur is gereserveerd voor live data, actieve
 * nodes en links. Verschil in betekenis komt hier uit helderheid en gewicht,
 * niet uit kleur. Dat houdt het codeblok onderdeel van de tekening.
 */

const ESCAPE: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
};

export function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (c) => ESCAPE[c]);
}

const wrap = (cls: string, text: string) => `<span class="${cls}">${escapeHtml(text)}</span>`;

/* ------------------------------------------------------------------ */
/* PowerShell                                                          */
/* ------------------------------------------------------------------ */

const PS_KEYWORDS = new Set([
  'param', 'foreach', 'function', 'if', 'else', 'elseif', 'return', 'throw',
  'continue', 'break', 'try', 'catch', 'finally', 'in', 'begin', 'process',
  'end', 'switch', 'while', 'do', 'filter', 'not', 'and', 'or',
]);

const PS_PATTERN = new RegExp(
  [
    '(<#[\\s\\S]*?#>|#[^\\n]*)',                       // 1 commentaar
    '(\'(?:[^\']|\'\')*\'|"(?:[^"\\\\]|\\\\.)*")',      // 2 string
    '(\\[[A-Za-z_][\\w.]*(?:\\([^)\\n]*\\))?\\])',      // 3 type / attribuut
    '(\\$[A-Za-z_][\\w:]*)',                            // 4 variabele
    '(\\b[A-Z][a-zA-Z]*-[A-Z][\\w]*)',                  // 5 cmdlet
    '(\\B-[A-Za-z][\\w]*)',                             // 6 parameter
    '(\\b[a-zA-Z]+\\b)',                                // 7 woord (keyword-check)
    '(\\b\\d+(?:\\.\\d+)?(?:[KMGT]B)?\\b)',             // 8 getal
  ].join('|'),
  'g',
);

function highlightPowerShell(source: string): string {
  let out = '';
  let last = 0;

  for (const m of source.matchAll(PS_PATTERN)) {
    const index = m.index ?? 0;
    if (index > last) out += escapeHtml(source.slice(last, index));

    const [text, comment, str, type, variable, cmdlet, param, word, num] = m;

    if (comment) out += wrap('tok-com', comment);
    else if (str) out += wrap('tok-str', str);
    else if (type) out += wrap('tok-fn', type);
    else if (variable) out += wrap('tok-var', variable);
    else if (cmdlet) out += wrap('tok-fn', cmdlet);
    else if (param) out += wrap('tok-par', param);
    else if (word) out += PS_KEYWORDS.has(word.toLowerCase()) ? wrap('tok-kw', word) : escapeHtml(word);
    else if (num) out += wrap('tok-num', num);
    else out += escapeHtml(text);

    last = index + text.length;
  }

  out += escapeHtml(source.slice(last));
  return out;
}

/* ------------------------------------------------------------------ */
/* Cisco IOS                                                           */
/* ------------------------------------------------------------------ */

const IOS_VALUE = /^(\d[\d.]*(?:\/\d+)?|[A-Za-z]+Ethernet[\d/]+|\d+)$/;

function highlightCisco(source: string): string {
  return source
    .split('\n')
    .map((line) => {
      if (/^\s*!/.test(line)) return wrap('tok-com', line);

      const indent = line.match(/^\s*/)?.[0] ?? '';
      const rest = line.slice(indent.length);
      if (!rest) return escapeHtml(line);

      const parts = rest.split(' ');
      const rendered = parts.map((part, i) => {
        if (part === '') return '';
        // Het eerste woord van een regel is het commando.
        if (i === 0) return wrap('tok-kw', part);
        if (IOS_VALUE.test(part)) return wrap('tok-num', part);
        if (part === '-->' || part === '|') return wrap('tok-par', part);
        if (/^[A-Z0-9_-]+$/.test(part) && part.length > 1) return wrap('tok-str', part);
        return wrap('tok-par', part);
      });

      return escapeHtml(indent) + rendered.join(' ');
    })
    .join('\n');
}

/* ------------------------------------------------------------------ */

export type Language = 'powershell' | 'cisco';

export function highlight(source: string, lang: Language): string {
  return lang === 'cisco' ? highlightCisco(source) : highlightPowerShell(source);
}
