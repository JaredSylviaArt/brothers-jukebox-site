// Brothers Jukebox — About Page

const AboutPage = ({ onNavigate }) => {
  const about = window.bjUseContent('content/about.json');
  if (!about) return null;

  return React.createElement('div', null,
    React.createElement('section', { className: 'bj-hero' },
      React.createElement('div', { className: 'bj-kicker' }, about.kicker),
      React.createElement('h1', { 'data-text': about.title }, about.title),
      React.createElement('div', { className: 'bj-subhead' }, React.createElement('em', null, about.subhead))
    ),

    React.createElement('section', { className: 'bj-story' },
      React.createElement('div', { className: 'story-text' },
        React.createElement('h3', null, about.story_heading),
        ...(about.story_paragraphs || []).map((p, i) => React.createElement('p', { key: i }, p))
      ),
      React.createElement('div', { className: 'story-stats' },
        React.createElement('ul', null,
          (about.stats || []).map((s, i) =>
            React.createElement('li', { key: i },
              React.createElement('span', { className: 'check' }, '★'),
              React.createElement('span', null, React.createElement('strong', null, s.label), ' — ', s.text)
            )
          )
        )
      )
    ),

    React.createElement('section', { className: 'bj-members' },
      React.createElement('div', { className: 'bj-section-head', style: { paddingLeft: '48px', paddingRight: '48px' } },
        React.createElement('div', { className: 'num' }, '03'),
        React.createElement('h2', null, 'Lineup')
      ),
      React.createElement('div', { className: 'members-grid' },
        (about.members || []).map((m, i) =>
          React.createElement('div', { key: i, className: 'member-card' },
            React.createElement('div', { className: 'member-photo' },
              m.photo
                ? React.createElement('img', { src: m.photo, alt: m.name, className: 'member-photo-img' })
                : React.createElement('span', null, (m.name || '?').charAt(0))
            ),
            React.createElement('div', { className: 'member-info' },
              React.createElement('h4', null, m.name),
              React.createElement('div', { className: 'role' }, m.role),
              React.createElement('p', null, m.bio)
            )
          )
        )
      )
    ),

    React.createElement('section', { className: 'bj-sound' },
      React.createElement('div', { className: 'bj-section-head', style: { paddingLeft: '48px', paddingRight: '48px' } },
        React.createElement('div', { className: 'num' }, '04'),
        React.createElement('h2', null, 'The Sound')
      ),
      React.createElement('div', { className: 'sound-inner' },
        React.createElement('div', { className: 'sound-text' },
          ...(about.sound_paragraphs || []).map((p, i) => React.createElement('p', { key: i }, p))
        ),
        React.createElement('div', { className: 'influence-grid' },
          (about.influences || []).map((inf, i) =>
            React.createElement('div', { key: i, className: 'influence-card' },
              React.createElement('strong', null, inf.name),
              React.createElement('span', null, inf.desc)
            )
          )
        )
      )
    ),

    React.createElement('section', { className: 'bj-proof' },
      React.createElement('div', { className: 'stat' },
        'Ready to ', React.createElement('em', null, 'pack the floor'), '?'
      ),
      React.createElement('div', { style: { marginTop: '20px' } },
        React.createElement('button', { className: 'bj-btn bj-btn-rust', onClick: () => onNavigate('Book Us') }, 'Get in touch →')
      )
    )
  );
};

Object.assign(window, { AboutPage });
