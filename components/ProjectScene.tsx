import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import KineticHeading from './motion/KineticHeading';
import Reveal from './motion/Reveal';
import { gsap } from '../lib/motion';

interface ProjectSceneProps {
  index: string;
  label: string;
  title: string;
  stack: string;
  description: string;
  features: string[];
  cta: string;
  to: string;
  image: {
    fallback: string;
    srcSet: string;
    width: number;
    height: number;
  };
  /** Puts the visual on the right and the story on the left. */
  reversed?: boolean;
  /** The one project that leads the page: accent label, framed plate, solid CTA. */
  flagship?: boolean;
}

/**
 * One project, one scene. The visual drifts against the scroll while the story
 * holds still beside it, and the whole block resolves to a single call to
 * action — there is nothing else to click.
 */
const ProjectScene: React.FC<ProjectSceneProps> = ({
  index,
  label,
  title,
  stack,
  description,
  features,
  cta,
  to,
  image,
  reversed = false,
  flagship = false,
}) => {
  const sceneRef = React.useRef<HTMLElement>(null);
  const plateRef = React.useRef<HTMLAnchorElement>(null);
  const ghostRef = React.useRef<HTMLSpanElement>(null);

  React.useEffect(() => {
    const scene = sceneRef.current;
    const plate = plateRef.current;
    const ghost = ghostRef.current;
    if (!scene || !plate) return;

    const mm = gsap.matchMedia();

    // The unveil runs at every width — it is the moment the scene "arrives".
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const img = plate.querySelector('img');

      const unveil = gsap.timeline({
        scrollTrigger: { trigger: plate, start: 'top 82%', once: true },
        defaults: { duration: 1.5, ease: 'expo.out' },
      });

      unveil.fromTo(
        plate,
        { clipPath: 'inset(10% 6% 10% 6%)' },
        { clipPath: 'inset(0% 0% 0% 0%)', clearProps: 'clipPath' },
      );
      if (img) {
        unveil.fromTo(img, { scale: 1.08 }, { scale: 1, clearProps: 'scale' }, 0);
      }

      return () => {
        unveil.scrollTrigger?.kill();
        unveil.kill();
      };
    });

    // The depth pass only where there's room for drift to read as depth.
    mm.add('(prefers-reduced-motion: no-preference) and (min-width: 768px)', () => {
      /**
       * A scrubbed layer moves on every scroll frame, so it wants its own
       * compositor layer — but only while it is on screen. The trigger's own
       * range is exactly that window, so it hands the promotion out and takes
       * it back again.
       */
      const promote = (el: Element) => (self: { isActive: boolean }) =>
        gsap.set(el, { willChange: self.isActive ? 'transform' : 'auto' });

      const tweens = [
        gsap.fromTo(
          plate,
          { yPercent: -4.5 },
          {
            yPercent: 4.5,
            ease: 'none',
            scrollTrigger: {
              trigger: scene,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.65,
              onToggle: promote(plate),
            },
          },
        ),
      ];

      // The ghost index drifts against the plate: two layers, two speeds.
      if (ghost) {
        tweens.push(
          gsap.fromTo(
            ghost,
            { yPercent: 14 },
            {
              yPercent: -14,
              ease: 'none',
              scrollTrigger: {
                trigger: scene,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.9,
                onToggle: promote(ghost),
              },
            },
          ),
        );
      }

      return () => {
        tweens.forEach((tween) => {
          tween.scrollTrigger?.kill();
          tween.kill();
        });
        gsap.set(plate, { clearProps: 'transform,willChange' });
        if (ghost) gsap.set(ghost, { clearProps: 'transform,willChange' });
      };
    });

    return () => {
      mm.revert();
    };
  }, []);

  /* The flagship plate breathes on a wide, blurred box-shadow, which repaints
     on every frame it runs. Off screen there is nothing to see, so it pauses. */
  React.useEffect(() => {
    const plate = plateRef.current;
    if (!plate || !flagship) return;

    plate.dataset.offscreen = 'true';

    const observer = new IntersectionObserver(
      ([entry]) => {
        plate.dataset.offscreen = entry.isIntersecting ? 'false' : 'true';
      },
      { rootMargin: '80px' },
    );
    observer.observe(plate);

    return () => {
      observer.disconnect();
      delete plate.dataset.offscreen;
    };
  }, [flagship]);

  return (
    <article ref={sceneRef} className="group/scene relative">
      {/* Oversized contour index — a layout element, drifting against the plate. */}
      <span
        ref={ghostRef}
        aria-hidden="true"
        className={`display text-outline pointer-events-none absolute -top-10 select-none text-[clamp(7rem,19vw,16rem)] leading-none text-textMain opacity-[0.13] md:-top-20 ${
          reversed ? 'right-0' : 'left-0'
        }`}
      >
        {index}
      </span>

      <div className="relative grid items-center gap-10 md:grid-cols-12 md:gap-14">
        <Link
          ref={plateRef}
          to={to}
          tabIndex={-1}
          aria-hidden="true"
          className={`plate plate--pad md:col-span-7 ${flagship ? 'plate--flagship' : ''} ${reversed ? 'md:order-2 md:col-start-6' : ''}`}
        >
          <picture>
            <source type="image/webp" srcSet={image.srcSet} sizes="(max-width: 767px) calc(100vw - 40px), 640px" />
            <img
              src={image.fallback}
              width={image.width}
              height={image.height}
              alt=""
              loading="lazy"
              decoding="async"
            />
          </picture>
        </Link>

        <div className={`md:col-span-5 ${reversed ? 'md:order-1 md:row-start-1' : ''}`}>
          {flagship ? (
            <span className="label text-lime-ink flex items-center gap-2.5 !text-[color:var(--lime-ink)]">
              <span className="dot dot--sm dot--lime dot--live" aria-hidden="true" />
              {label}
            </span>
          ) : (
            <span className="label">{label}</span>
          )}

          <KineticHeading as="h3" className="display display-tight mt-5 text-[clamp(3rem,7vw,5.5rem)]">
            {title}
          </KineticHeading>

          {/* The heading animates itself, so the rest follows it in sequence. */}
          <Reveal stagger={0.08} delay={0.15}>
            <p className="index-num mt-6 block">{stack}</p>

            <p className="prose-dim mt-8">{description}</p>

            <ul className="mt-9 border-t border-border">
              {features.map((feature) => (
                <li key={feature} className="flex items-baseline gap-4 border-b border-border py-3.5">
                  <span className="dot dot--sm" aria-hidden="true" />
                  <span className="text-sm text-textDim">{feature}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10">
              {/* The flagship earns the page's only solid button above the fold. */}
              {flagship ? (
                <Link to={to} className="btn">
                  {cta}
                  <ArrowRight size={14} strokeWidth={1.6} aria-hidden="true" />
                </Link>
              ) : (
                <Link to={to} className="link-line">
                  {cta}
                  <ArrowRight size={14} strokeWidth={1.6} aria-hidden="true" />
                </Link>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </article>
  );
};

export default ProjectScene;
