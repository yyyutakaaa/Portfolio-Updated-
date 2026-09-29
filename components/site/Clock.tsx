import React from 'react';

const formatter = new Intl.DateTimeFormat('nl-BE', {
  timeZone: 'Europe/Brussels',
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
});

/** Wall time in Belgium. Ticks once a minute, lined up with the minute. */
const Clock: React.FC = () => {
  const [time, setTime] = React.useState(() => formatter.format(new Date()));

  React.useEffect(() => {
    let interval = 0;
    const align = window.setTimeout(() => {
      setTime(formatter.format(new Date()));
      interval = window.setInterval(() => setTime(formatter.format(new Date())), 60_000);
    }, (60 - new Date().getSeconds()) * 1000);

    return () => {
      window.clearTimeout(align);
      if (interval) window.clearInterval(interval);
    };
  }, []);

  return <time>{time}</time>;
};

export default Clock;
