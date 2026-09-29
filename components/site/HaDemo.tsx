import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

/**
 * The Proxmox test in miniature: switch off Node 1 and watch the VM come back
 * up on Node 2 without anyone touching it.
 */
const HaDemo: React.FC = () => {
  const { c } = useLanguage();
  const d = c.demo;
  const [phase, setPhase] = React.useState<'idle' | 'failing' | 'moved' | 'back'>('idle');
  const timer = React.useRef<number>();

  React.useEffect(() => () => window.clearTimeout(timer.current), []);

  const onNode2 = phase === 'moved';
  const node1Off = phase === 'failing' || phase === 'moved';

  const toggle = () => {
    if (phase === 'failing') return;
    if (phase === 'moved') {
      setPhase('back');
      return;
    }
    setPhase('failing');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    timer.current = window.setTimeout(() => setPhase('moved'), reduce ? 0 : 1400);
  };

  const vm = <div className={`demo__vm ${phase === 'failing' ? 'is-leaving' : ''}`}>VM</div>;

  return (
    <div className="demo">
      <p className="lbl">{d.label}</p>
      <div className="demo__stage">
        <div className={`demo__node ${node1Off ? 'is-off' : ''}`}>
          <span>
            <span className="demo__dot" />
            Node 1
          </span>
          {!onNode2 && vm}
        </div>
        <div className="demo__node">
          <span>
            <span className="demo__dot" />
            Node 2
          </span>
          {onNode2 && vm}
        </div>
      </div>
      <button type="button" className="btn" onClick={toggle} disabled={phase === 'failing'} style={{ justifySelf: 'start' }}>
        {onNode2 || phase === 'failing' ? d.on : d.off}
      </button>
      <p className="demo__status" aria-live="polite">
        {d.status[phase]}
      </p>
    </div>
  );
};

export default HaDemo;
