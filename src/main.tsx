import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App';
import './styles/app.css';

const container = document.getElementById('root');
if (!container) throw new Error('Root-element niet gevonden.');

/**
 * De build zet de volledige pagina al als HTML in het document. Normaal
 * hydrateren we die. Alleen op de privacyroute wijkt de client af van wat er
 * voorgerenderd is, dus daar renderen we opnieuw in plaats van te hydrateren.
 */
const prerendered = container.childElementCount > 0;
const routed = /^#\/?.+/.test(window.location.hash) && window.location.hash !== '#top';

const tree = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

if (prerendered && !routed) {
  hydrateRoot(container, tree);
} else {
  container.replaceChildren();
  createRoot(container).render(tree);
}
