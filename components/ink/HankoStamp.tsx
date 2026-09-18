import React from 'react';
import Hanko from './Hanko';
import { gsap, prefersReducedMotion } from '../../lib/motion';

/**
 * The contact button is a seal, and pressing it behaves like one: the block
 * drives down into the paper, and the impression it leaves stays behind,
 * rotated a degree or two off true the way a hand-pressed seal always is.
 *
 * It is a real `mailto` anchor and default is never prevented, so the mail
 * client opens on the click itself — the animation is feedback, not a gate.
 */

interface HankoStampProps {
  email: string;
  label: string;
  ariaLabel: string;
}

const HankoStamp: React.FC<HankoStampProps> = ({ email, label, ariaLabel }) => {
  const uid = React.useId().replace(/[^a-zA-Z0-9]/g, '');
  const blockRef = React.useRef<HTMLSpanElement>(null);
  const markRef = React.useRef<HTMLSpanElement>(null);

  const press = React.useCallback(() => {
    const block = blockRef.current;
    const mark = markRef.current;
    if (!block || !mark || prefersReducedMotion()) return;

    gsap.killTweensOf([block, mark]);

    gsap
      .timeline()
      /* Down hard and fast, back up slowly — the weight is in the contact. */
      .to(block, { scale: 0.88, y: 6, duration: 0.09, ease: 'power3.in' })
      .to(block, { scale: 1, y: 0, duration: 0.55, ease: 'elastic.out(1, 0.55)' })
      .fromTo(
        mark,
        { autoAlpha: 0, scale: 1.12, rotate: -7 },
        { autoAlpha: 1, scale: 1, rotate: -4, duration: 0.2, ease: 'power2.out' },
        0.09,
      )
      // The impression fades the way wet ink dries down, not like a toast.
      .to(mark, { autoAlpha: 0, duration: 1.5, ease: 'power2.in' }, 1.1);
  }, []);

  return (
    <div className="ink-stamp">
      <a className="ink-stamp__button" href={`mailto:${email}`} aria-label={ariaLabel} onClick={press}>
        {/* The impression, underneath and offset — what the seal left behind. */}
        <span className="ink-stamp__mark" ref={markRef} aria-hidden="true">
          <Hanko uid={`mark-${uid}`} />
        </span>

        <span className="ink-stamp__block" ref={blockRef}>
          <Hanko uid={`block-${uid}`} />
        </span>
      </a>

      <span className="ink-cap ink-stamp__label">{label}</span>
    </div>
  );
};

export default HankoStamp;
