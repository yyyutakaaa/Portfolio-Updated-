import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';

/**
 * The table of contents: one ruled row per lab write-up, the figure its story
 * turns on at the left and its number at the right. The featured project is
 * lit; the lab that has no write-up closes the list in a quieter voice.
 */
const IndexRows: React.FC<{ onNavigate?: () => void; current?: string }> = ({ onNavigate, current }) => {
  const { c } = useLanguage();
  const items = c.projects.items;

  return (
    <ol className="rows">
      {items.map((item, i) => (
        <li key={item.slug}>
          <Link
            to={`/projects/${item.slug}`}
            className={`row ${item.featured || current === item.slug ? 'is-on' : ''}`}
            aria-current={current === item.slug ? 'page' : undefined}
            onClick={onNavigate}
          >
            <span className="row__n" aria-hidden="true">
              {item.figure}
            </span>
            <span>
              <span className="row__t row__full">{item.title}</span>
              <span className="row__t row__short">{item.shortTitle}</span>
              <span className="row__s">{item.subject}</span>
            </span>
            <span className="lbl row__p">{String(i + 1).padStart(2, '0')}</span>
          </Link>
        </li>
      ))}
      <li className="row row--also">
        <span className="row__n" aria-hidden="true">
          0
        </span>
        <span>
          <span className="row__t">{c.index.alsoTitle}</span>
          <span className="row__s">{c.index.alsoSubject}</span>
        </span>
        <span className="lbl row__p" aria-hidden="true">
          —
        </span>
      </li>
    </ol>
  );
};

export default IndexRows;
