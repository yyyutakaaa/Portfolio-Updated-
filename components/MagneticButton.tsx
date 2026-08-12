import React from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}

/**
 * Wraps interactive elements (buttons, links) and pulls them gently toward
 * the pointer within their own bounds. Mouse-only; touch and
 * prefers-reduced-motion leave the child completely still.
 */
const MagneticButton: React.FC<MagneticButtonProps> = ({ children, className = '', strength = 0.32 }) => {
  const ref = React.useRef<HTMLSpanElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 280, damping: 22, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 280, damping: 22, mass: 0.4 });

  const handlePointerMove = (event: React.PointerEvent<HTMLSpanElement>) => {
    if (prefersReducedMotion || event.pointerType !== 'mouse') return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((event.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((event.clientY - (rect.top + rect.height / 2)) * strength);
  };

  const handlePointerLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.span
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{ x: springX, y: springY }}
      className={`magnetic ${className}`}
    >
      {children}
    </motion.span>
  );
};

export default MagneticButton;
