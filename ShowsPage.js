// Brothers Jukebox — Shows Page

const ShowsPage = ({ onNavigate }) => {
  const content = window.bjUseContent('content/shows.json');
  if (!content) return null;

  const today = new Date(new Date().toDateString());
  const upcoming = (content.shows || []).filter(s => new Date(s.date + 'T12:00:00') >= today);

  return React.createElement('div', null,
    React.createElement('section', { className: 'bj-hero' },
      React.createElement('div', { className: 'bj-kicker' }, content.kicker),
      React.createElement('h1', { 'data-text': content.title }, content.title),
      React.createElement('div', { className: 'bj-subhead' },
        content.subhead_prefix,
        React.createElement('em', null, content.subhead_emphasis)
      ),
      React.createElement('p', { className: 'bj-undertag' }, content.undertag)
    ),

    React.createElement('section', null,
      React.createElement('div', { className: 'bj-section-head' },
        React.createElement('div', { className: 'num' }, '01'),
        React.createElement('h2', null, 'Upcoming Dates'),
        React.createElement('div', { className: 'meta' }, 'UPDATED WHENEVER', React.createElement('br'), 'THE NEXT ONE\'S LOCKED')
      ),
      React.createElement('div', { className: 'bj-shows-list' },
        upcoming.length === 0
          ? React.createElement('p', { style: { padding: '24px 0', textAlign: 'center' } }, 'New dates coming soon.')
          : upcoming.map((s, i) => {
              const fmt = window.bjFormatShowDate(s.date, i);
              return React.createElement('div', { key: i, className: 'show-row' },
                React.createElement('div', { className: 'idx' }, fmt.idx),
                React.createElement('div', { className: 'date' }, React.createElement('small', null, fmt.month), fmt.day),
                React.createElement('div', null,
                  React.createElement('div', { className: 'venue' }, s.venue),
                  React.createElement('div', { className: 'city' }, s.city, ' — ', s.detail, ' · ', s.time)
                ),
                React.createElement('div', { className: 'ticket' },
                  React.createElement('a', {
                    href: s.ticketUrl || '#',
                    target: s.ticketUrl ? '_blank' : undefined,
                    rel: s.ticketUrl ? 'noopener' : undefined,
                    onClick: e => { if (!s.ticketUrl) e.preventDefault(); }
                  }, s.ticketUrl ? 'Tickets' : 'RSVP')
                )
              );
            })
      )
    ),

    React.createElement('section', { className: 'bj-merch-teaser' },
      React.createElement('div', { className: 'bj-section-head', style: { paddingLeft: 0, paddingRight: 0, paddingTop: 0 } },
        React.createElement('div', { className: 'num' }, '02'),
        React.createElement('h2', null, 'Rooms We Want'),
        React.createElement('div', { className: 'meta' }, 'FLORIDA VENUES', React.createElement('br'), 'ON THE WISHLIST')
      ),
      React.createElement('div', { className: 'venue-wishlist' },
        (content.wishlist || []).map((v, i) =>
          React.createElement('div', { key: i, className: 'venue-card' },
            React.createElement('h4', null, v.name),
            React.createElement('p', null, v.desc)
          )
        )
      )
    ),

    React.createElement('section', { className: 'bj-merch-teaser', style: { paddingTop: 0 } },
      React.createElement('div', { className: 'bj-section-head', style: { paddingLeft: 0, paddingRight: 0, paddingTop: 0 } },
        React.createElement('div', { className: 'num' }, '03'),
        React.createElement('h2', null, 'Past Performances'),
        React.createElement('div', { className: 'meta' }, 'A FEW NIGHTS', React.createElement('br'), 'WE WON\'T FORGET')
      ),
      React.createElement('div', { className: 'bj-gallery past' },
        (content.past_performances || []).map((cap, i) =>
          React.createElement('div', { key: i, className: 'photo past-photo' },
            React.createElement('div', { className: 'caption' }, '★ ', cap)
          )
        )
      )
    ),

    React.createElement('section', { className: 'bj-proof' },
      React.createElement('div', { className: 'stat' },
        React.createElement('em', null, 'Book us'), ' for your venue or event.'
      ),
      React.createElement('div', { style: { marginTop: '20px' } },
        React.createElement('button', { className: 'bj-btn bj-btn-rust', onClick: () => onNavigate('Book Us') }, 'Send an Inquiry →')
      )
    )
  );
};

Object.assign(window, { ShowsPage });
