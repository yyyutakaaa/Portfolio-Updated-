/**
 * Scrolls to an element by id. Plain `href="#about"` anchors are off limits
 * because HashRouter owns the fragment; following one would navigate.
 * `scroll-padding-top` on <html> keeps the target clear of the fixed header.
 */
export const scrollToId = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ block: 'start' });
};
