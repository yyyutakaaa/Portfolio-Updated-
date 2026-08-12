import { renderToString } from 'react-dom/server';
import App from './App';

/**
 * Wordt alleen tijdens de build gebruikt: de volledige pagina wordt naar HTML
 * gerenderd en in index.html gezet. Zo staat de tekst er al vóórdat er ook
 * maar één regel JavaScript is uitgevoerd — dat scheelt ruim een seconde op
 * een trage verbinding, en het maakt de site leesbaar zonder JS.
 */
export function render(): string {
  return renderToString(<App />);
}
