/**
 * Zet de gerenderde HTML in dist/index.html.
 *
 * De site is verder een gewone client-app; dit is puur een prestatiestap.
 * Zonder deze stap wacht de eerste tekst op de JavaScript-bundel, met deze
 * stap staat alles er meteen en hydrateert React er daarna overheen.
 */
import { readFile, writeFile, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const root = dirname(fileURLToPath(import.meta.url));
const indexPath = resolve(root, 'dist/index.html');

const { render } = await import(resolve(root, 'dist-ssr/entry-server.js'));
const html = render();

const template = await readFile(indexPath, 'utf8');
const marker = '<div id="root"></div>';

if (!template.includes(marker)) {
  throw new Error('Kan de root-placeholder niet vinden in dist/index.html.');
}

await writeFile(indexPath, template.replace(marker, `<div id="root">${html}</div>`), 'utf8');
await rm(resolve(root, 'dist-ssr'), { recursive: true, force: true });

const bytes = Buffer.byteLength(html, 'utf8');
console.log(`prerender: ${(bytes / 1024).toFixed(1)} kB HTML in dist/index.html gezet`);
