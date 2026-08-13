import React from 'react';

const formatter = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Europe/Brussels',
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
});

/** Wall time where Mehdi is. Ticks once a minute, not once a second. */
const LocalClock: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [time, setTime] = React.useState(() => formatter.format(new Date()));

  React.useEffect(() => {
    let interval = 0;

    // Line up with the top of the next minute, then settle into a steady beat.
    const align = window.setTimeout(() => {
      setTime(formatter.format(new Date()));
      interval = window.setInterval(() => setTime(formatter.format(new Date())), 60_000);
    }, (60 - new Date().getSeconds()) * 1000);

    return () => {
      window.clearTimeout(align);
      if (interval) window.clearInterval(interval);
    };
  }, []);

  return (
    <time className={className} dateTime={time}>
      {time} CET
    </time>
  );
};

export default LocalClock;
