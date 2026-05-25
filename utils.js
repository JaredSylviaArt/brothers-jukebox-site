// Brothers Jukebox — shared utilities

window.bjFormatShowDate = function(isoDate, index) {
  const d = new Date(isoDate + 'T12:00:00');
  const days = ['SUN','MON','TUE','WED','THU','FRI','SAT'];
  const months = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
  return {
    idx: String(index + 1).padStart(2, '0'),
    day: String(d.getDate()).padStart(2, '0'),
    month: days[d.getDay()] + ' · ' + months[d.getMonth()]
  };
};

window.bjUseContent = function(path) {
  const [data, setData] = React.useState(null);
  React.useEffect(() => {
    fetch(path + '?t=' + Date.now())
      .then(r => r.json())
      .then(setData)
      .catch(err => console.error('Failed to load ' + path, err));
  }, []);
  return data;
};
