// Brothers Jukebox — Home Page

const HomePage = ({ onNavigate }) => {
  const home = window.bjUseContent('content/home.json');
  const showsContent = window.bjUseContent('content/shows.json');
  const merchContent = window.bjUseContent('content/merch.json');
  if (!home || !showsContent || !merchContent) return null;

  const upcoming = (showsContent.shows || [])
    .filter(s => new Date(s.date + 'T12:00:00') >= new Date(new Date().toDateString()))
    .slice(0, 3);
  const teaserMerch = (merchContent.products || []).slice(0, 3);

  return React.createElement('div', null,
    // Hero
    React.createElement('section', { className: 'bj-hero' },
      React.createElement('div', { className: 'stamp tl' }, 'No. 047', React.createElement('small', null, 'Bootleg Tour MMXXVI')),
      React.createElement('div', { className: 'stamp tr' }, 'Live', React.createElement('small', null, 'MMXXVI')),
      React.createElement('div', { className: 'bj-kicker' }, home.kicker),
      React.createElement('h1', { 'data-text': home.title }, home.title),
      React.createElement('div', { className: 'bj-subhead' },
        home.subhead_prefix,
        React.createElement('em', null, home.subhead_emphasis),
        home.subhead_suffix
      ),
      React.createElement('p', { className: 'bj-undertag' },
        home.undertag_line1,
        React.createElement('br'), React.createElement('br'),
        React.createElement('em', null, home.undertag_line2)
      ),
      React.createElement('div', { className: 'bj-hero-ctas' },
        React.createElement('button', { className: 'bj-btn', onClick: () => onNavigate('About') }, 'About the Band'),
        React.createElement('button', { className: 'bj-btn bj-btn-rust', onClick: () => onNavigate('Merch') }, 'Shop Merch')
      ),
      React.createElement('div', { className: 'bj-hero-rule' },
        React.createElement('span', { className: 'line' }),
        React.createElement('span', { className: 'star' }, '★'),
        React.createElement('span', null, 'LIVE · LOUD · LOCAL'),
        React.createElement('span', { className: 'star' }, '★'),
        React.createElement('span', { className: 'line' })
      )
    ),

    // Social Proof Banner
    React.createElement('section', { className: 'bj-proof' },
      React.createElement('div', { className: 'stat' },
        home.proof_stat_prefix,
        React.createElement('em', null, home.proof_stat_emphasis),
        home.proof_stat_suffix
      ),
      React.createElement('div', { className: 'infl' },
        'INSPIRED BY ',
        ...(home.influences || []).flatMap((name, i) => [
          React.createElement('span', { key: 's' + i, className: 'star' }, '★'),
          ' ' + name + ' '
        ])
      )
    ),

    // Photo Gallery
    React.createElement('div', { className: 'bj-gallery' },
      (home.gallery || []).map((g, i) =>
        React.createElement('div', { key: i, className: i === 0 ? 'photo big' : 'photo' },
          g.image && React.createElement('img', { src: g.image, alt: g.alt || g.caption, className: 'photo-img' }),
          React.createElement('div', { className: 'caption' }, '★ ' + g.caption)
        )
      )
    ),

    // Upcoming Shows
    React.createElement('section', null,
      React.createElement('div', { className: 'bj-section-head' },
        React.createElement('div', { className: 'num' }, '01'),
        React.createElement('h2', null, 'Upcoming Shows'),
        React.createElement('div', { className: 'meta' }, 'SUMMER MMXXVI', React.createElement('br'), 'SUBJECT TO CHANGE')
      ),
      React.createElement('div', { className: 'bj-shows-list' },
        upcoming.map((s, i) => {
          const fmt = window.bjFormatShowDate(s.date, i);
          return React.createElement('div', { key: i, className: 'show-row' },
            React.createElement('div', { className: 'idx' }, fmt.idx),
            React.createElement('div', { className: 'date' }, React.createElement('small', null, fmt.month), fmt.day),
            React.createElement('div', null,
              React.createElement('div', { className: 'venue' }, s.venue),
              React.createElement('div', { className: 'city' }, '— ' + (s.detail || '') + ' · ' + (s.time || ''))
            ),
            React.createElement('div', { className: 'ticket' },
              React.createElement('a', { href: '#', onClick: e => { e.preventDefault(); onNavigate('Shows'); } }, 'Tickets')
            )
          );
        }),
        React.createElement('div', { className: 'see-all' },
          React.createElement('button', { className: 'bj-btn', onClick: () => onNavigate('Shows') }, 'View All Shows')
        )
      )
    ),

    // Merch teaser
    React.createElement('section', { className: 'bj-merch-teaser' },
      React.createElement('div', { className: 'bj-section-head', style: { paddingLeft: 0, paddingRight: 0, paddingTop: 0 } },
        React.createElement('div', { className: 'num' }, '02'),
        React.createElement('h2', null, 'Get the Gear'),
        React.createElement('div', { className: 'meta' }, 'NEW SHIRT LAUNCH', React.createElement('br'), 'SHIPS FROM CENTRAL FLORIDA')
      ),
      React.createElement('div', { className: 'bj-teaser-grid' },
        teaserMerch.map((m, i) =>
          React.createElement('div', { key: i, className: 'teaser-card' },
            m.tag && React.createElement('span', { className: 'new-tag' }, m.tag),
            React.createElement('div', { className: 'product-img' },
              React.createElement('div', { className: 'silhouette' }, m.icon)
            ),
            React.createElement('h4', null, m.name),
            React.createElement('div', { className: 'price' }, '$' + m.price)
          )
        )
      ),
      React.createElement('div', { className: 'cta-wrap' },
        React.createElement('button', { className: 'bj-btn bj-btn-rust', onClick: () => onNavigate('Merch') }, 'Visit the Store')
      )
    ),

    // Marquee
    React.createElement('div', { className: 'bj-marquee' },
      React.createElement('div', { className: 'bj-marquee-track' },
        [...(home.marquee_songs || []), ...(home.marquee_songs || [])].flatMap((s, i) => [
          React.createElement('span', { key: 'song' + i }, s),
          React.createElement('span', { key: 'star' + i, className: 'star' }, '★')
        ])
      )
    ),

    // Video placeholder
    React.createElement('section', { className: 'bj-video-section' },
      React.createElement('div', { className: 'bj-section-head', style: { justifyContent: 'center', paddingLeft: 0, paddingRight: 0 } },
        React.createElement('div', { className: 'num' }, '03'),
        React.createElement('h2', null, 'Watch Us Live')
      ),
      React.createElement('div', { className: 'bj-video-frame' },
        React.createElement('div', { className: 'corner tl' }, 'REC ● 00:00:00'),
        React.createElement('div', { className: 'play' }, '▶ COMING SOON'),
        React.createElement('div', { className: 'corner br' }, 'BJ-CAM · MMXXVI')
      ),
      React.createElement('p', { className: 'small-note' }, home.video_note)
    )
  );
};

Object.assign(window, { HomePage });
