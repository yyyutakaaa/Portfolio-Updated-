import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * Wraps each routed page. Kept to a short fade + drift so route changes feel
 * continuous without adding perceptible delay before content is usable.
 */
const PageTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <>{children}</>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
