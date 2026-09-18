import React from 'react';
import InkTitle from './InkTitle';
import type { WorkItem } from '../../utils/inkContent';

/**
 * One project, given a whole band of the page.
 *
 * The hover does two things at once: a wash of ink opens behind the plate, and
 * the image comes into colour. Both are opacity and transform only — the
 * colour image is a second layer fading over a grey one rather than a
 * `filter` animated frame by frame, which keeps the whole thing on the
 * compositor. Both `img`s carry the same `srcSet`, so it is one download.
 */

/* Plates default to one shape so nothing reflows as images arrive, but a
   screenshot far off that shape (Sets' wide banner) can say so and get a box
   built for its own proportions instead of losing its edges to the crop. */
const DEFAULT_RATIO = '16 / 10';

/** `"1731 / 909"` → 1.904 — used to size the `<img>` intrinsic box. */
const ratioValue = (ratio: string) => {
  const [w, h] = ratio.split('/').map(Number);
  return w / h;
};

const WorkBlock: React.FC<{ item: WorkItem }> = ({ item }) => {
  const external = item.external;
  const ratio = item.image?.ratio ?? DEFAULT_RATIO;
  const intrinsicWidth = 1400;
  const intrinsicHeight = Math.round(intrinsicWidth / ratioValue(ratio));

  return (
    <article className="ink-work">
      <a
        className="ink-work__link"
        href={item.href}
        {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
        aria-label={`${item.title} — ${item.cta}`}
      >
        <span className="ink-work__index" aria-hidden="true">
          {item.index}
        </span>

        <span className="ink-work__text">
          <span className="ink-work__head">
            <InkTitle as="h3" className="ink-work__title">
              {item.title}
            </InkTitle>
            <span className="ink-cap ink-work__stack">{item.stack}</span>
          </span>
          <span className="ink-work__desc">{item.description}</span>
          <span className="ink-cap ink-work__cta">
            {item.cta}
            <svg viewBox="0 0 12 12" aria-hidden="true" focusable="false">
              <path d="M1 11 11 1M4 1h7v7" fill="none" stroke="currentColor" strokeWidth="1.2" />
            </svg>
          </span>
        </span>

        <span className="ink-work__frame">
          {/* Sits behind the plate and opens outward, so it never crosses the
              description that has to be read. */}
          <span className="ink-work__wash" aria-hidden="true" />

          <span className="ink-work__plate" style={{ aspectRatio: ratio }}>
            {item.image ? (
              <>
                <img
                  className="ink-work__img ink-work__img--grey"
                  src={item.image.src}
                  srcSet={item.image.srcSet}
                  sizes="(max-width: 899px) 92vw, 44vw"
                  alt={item.image.alt}
                  loading="lazy"
                  decoding="async"
                  width={intrinsicWidth}
                  height={intrinsicHeight}
                />
                <img
                  className="ink-work__img ink-work__img--colour"
                  src={item.image.src}
                  srcSet={item.image.srcSet}
                  sizes="(max-width: 899px) 92vw, 44vw"
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  decoding="async"
                  width={intrinsicWidth}
                  height={intrinsicHeight}
                />
              </>
            ) : (
              /* No screenshot for this one yet. Rather than a broken frame,
                 the plate carries the numeral as a watermark. */
              <span className="ink-work__blank" aria-hidden="true">
                {item.index}
              </span>
            )}
          </span>
        </span>
      </a>
    </article>
  );
};

export default WorkBlock;
