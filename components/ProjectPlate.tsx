import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useInView, useReducedMotion } from 'framer-motion';

interface ProjectPlateProps {
  to: string;
  cursorLabel: string;
  className?: string;
  children: React.ReactNode;
}

/**
 * The interactive image plate used for flagship project previews: a clip
 * reveal the first time it scrolls into view, then a subtle pointer-tracked
 * tilt on hover. Wrapped in a Link but marked aria-hidden — the accessible
 * link lives alongside it as visible text.
 */
const ProjectPlate: React.FC<ProjectPlateProps> = ({ to, cursorLabel, className = '', children }) => {
  const prefersReducedMotion = useReducedMotion();
  const revealRef = React.useRef<HTMLDivElement>(null);
  const inView = useInView(revealRef, { once: true, amount: 0.2 });
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRotateX = useSpring(rotateX, { stiffness: 180, damping: 20, mass: 0.5 });
  const springRotateY = useSpring(rotateY, { stiffness: 180, damping: 20, mass: 0.5 });

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || event.pointerType !== 'mouse') return;
    const rect = event.currentTarget.getBoundingClientRect();
    const relX = (event.clientX - rect.left) / rect.width - 0.5;
    const relY = (event.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(relX * 8);
    rotateX.set(relY * -8);
  };

  const handlePointerLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <Link
      to={to}
      tabIndex={-1}
      aria-hidden="true"
      data-cursor="label"
      data-cursor-label={cursorLabel}
      className={`plate plate--interactive block ${className}`}
    >
      <div ref={revealRef}>
        <motion.div
          initial={prefersReducedMotion ? undefined : { clipPath: 'inset(0% 0 100% 0)' }}
          animate={prefersReducedMotion ? undefined : (inView ? { clipPath: 'inset(0% 0 0% 0)' } : undefined)}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
            style={{ rotateX: springRotateX, rotateY: springRotateY, transformPerspective: 1000 }}
          >
            {children}
          </motion.div>
        </motion.div>
      </div>
    </Link>
  );
};

export default ProjectPlate;
