import React from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';

/**
 * A small ring that trails the pointer and morphs into a filled label when
 * hovering elements tagged with data-cursor="label" + data-cursor-label="…".
 * Purely decorative: it never replaces the native cursor, so text fields and
 * default pointer affordances stay intact. Desktop/mouse only.
 */
const Cursor: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const [enabled, setEnabled] = React.useState(false);
  const [visible, setVisible] = React.useState(false);
  const [variant, setVariant] = React.useState<'default' | 'label'>('default');
  const [label, setLabel] = React.useState('');

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 480, damping: 40, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 480, damping: 40, mass: 0.4 });

  React.useEffect(() => {
    if (prefersReducedMotion) return;
    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    setEnabled(canHover);
  }, [prefersReducedMotion]);

  React.useEffect(() => {
    if (!enabled) return;

    const handleMove = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      setVisible(true);
    };

    const handleOver = (event: PointerEvent) => {
      const target = event.target as Element | null;
      const trigger = target?.closest('[data-cursor]');
      if (trigger instanceof HTMLElement) {
        setVariant('label');
        setLabel(trigger.dataset.cursorLabel ?? '');
      }
    };

    const handleOut = (event: PointerEvent) => {
      const target = event.target as Element | null;
      const trigger = target?.closest('[data-cursor]');
      if (trigger instanceof HTMLElement) {
        setVariant('default');
        setLabel('');
      }
    };

    const handleLeave = () => setVisible(false);

    window.addEventListener('pointermove', handleMove);
    window.addEventListener('pointerover', handleOver);
    window.addEventListener('pointerout', handleOut);
    window.addEventListener('pointerleave', handleLeave);

    return () => {
      window.removeEventListener('pointermove', handleMove);
      window.removeEventListener('pointerover', handleOver);
      window.removeEventListener('pointerout', handleOut);
      window.removeEventListener('pointerleave', handleLeave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      className="custom-cursor"
      data-variant={variant}
      style={{ x: springX, y: springY, opacity: visible ? 1 : 0 }}
      aria-hidden="true"
    >
      {variant === 'label' && label}
    </motion.div>
  );
};

export default Cursor;
