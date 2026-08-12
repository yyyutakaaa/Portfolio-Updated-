import { CASES, WORK, type CaseStudy } from '../lib/content';
import { Fade, RevealLines } from '../components/Reveal';
import CodeBlock from '../components/CodeBlock';
import InlineDiagram from '../components/InlineDiagram';

function Case({ study }: { study: CaseStudy }) {
  return (
    <article
      className="case shell"
      id={`case-${study.no}`}
      data-topo={study.id}
      aria-labelledby={`case-${study.no}-title`}
    >
      <div className="grid12">
        <div className="case__col">
          <div className="case__header" data-magnetic data-cursor-label={`CASE ${study.no}`}>
            <p className="case__label mono">
              <b>CASE {study.no}</b>
              <span aria-hidden="true">/</span>
              <span>{study.slug}</span>
              <span aria-hidden="true">·</span>
              <span>{study.period}</span>
            </p>

            <RevealLines
              as="h3"
              id={`case-${study.no}-title`}
              className="display display--case"
              lines={[study.title]}
            />

            <Fade className="case__lede" index={1}>
              <p className="lede">{study.lede}</p>
            </Fade>

            <Fade className="case__stack" index={2}>
              {study.stack.map((item) => (
                <span className="chip mono" key={item}>
                  {item}
                </span>
              ))}
            </Fade>
          </div>

          <Fade className="case__blocks" index={0}>
            <div className="block">
              <p className="block__k mono">CONTEXT</p>
              <p className="body">{study.context}</p>
            </div>

            <div className="block">
              <p className="block__k mono">PROBLEEM</p>
              <p className="body">{study.problem}</p>
            </div>

            <div className="block">
              <p className="block__k mono">AANPAK</p>
              <ul>
                {study.approach.map((step, i) => (
                  <li key={step.slice(0, 24)}>
                    <span aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="block">
              <p className="block__k mono">RESULTAAT</p>
              <p className="body">{study.result}</p>
            </div>
          </Fade>

          <Fade as="dl" className="metrics" index={1}>
            {study.metrics.map((metric) => (
              <div className="metric" key={metric.label}>
                <dt className="sr-only">{metric.label}</dt>
                <dd>
                  <p className="metric__v">
                    {metric.value}
                    {metric.unit ? <span className="metric__u">{metric.unit}</span> : null}
                  </p>
                  <p className="metric__l mono" aria-hidden="true">
                    {metric.label}
                  </p>
                </dd>
              </div>
            ))}
          </Fade>

          <InlineDiagram
            archId={study.id}
            caption={`ARCHITECTUUR — CASE ${study.no}`}
            description={study.diagramAlt}
          />

          <Fade className="components" index={1}>
            <p className="mono mono--dim">COMPONENTEN</p>
            <ul className="components__list">
              {study.components.map((component, i) => (
                <li key={component}>
                  <b>{`N${String(i + 1).padStart(2, '0')}`}</b>
                  <span>{component}</span>
                </li>
              ))}
            </ul>
          </Fade>

          <Fade index={1}>
            <CodeBlock
              label={study.code.label}
              filename={study.code.filename}
              lang={study.code.lang}
              source={study.code.source}
              caseId={`${study.no} — ${study.slug}`}
            />
          </Fade>
        </div>
      </div>
    </article>
  );
}

export default function Work() {
  return (
    <section id="werk" aria-labelledby="werk-title" tabIndex={-1}>
      <div className="section shell" style={{ paddingBottom: 0 }}>
        <div className="section__head mono">
          <span className="section__no">{WORK.index}</span>
          <h2 className="section__title" id="werk-title">
            {WORK.title}
          </h2>
        </div>

        <Fade>
          <p className="lede" style={{ maxWidth: '52ch' }}>
            {WORK.lead}
          </p>
        </Fade>
      </div>

      {CASES.map((study) => (
        <Case key={study.id} study={study} />
      ))}
    </section>
  );
}
