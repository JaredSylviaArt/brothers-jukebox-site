// Brothers Jukebox — Footer Component

const FooterComponent = () => {
  return React.createElement('footer', { className: 'bj-footer' },
    React.createElement('section', { className: 'bj-mailing' },
      React.createElement('h3', null, 'Sign the ', React.createElement('em', null, 'guest book')),
      React.createElement('p', null, 'Get a holler when new dates drop, new pressings hit the merch table, and the promo video lands.'),
      React.createElement('form', { onSubmit: e => e.preventDefault() },
        React.createElement('input', { type: 'email', placeholder: 'YOUR EMAIL HERE' }),
        React.createElement('button', { type: 'submit' }, 'SIGN ME UP')
      )
    ),
    React.createElement('div', { className: 'bj-foot-inner' },
      React.createElement('div', { className: 'bj-foot-grid' },
        React.createElement('div', { className: 'bj-foot-mark' },
          React.createElement('span', { className: 'star' }, '★'), ' Brothers', React.createElement('br'),
          'Jukebox',
          React.createElement('small', null, 'Pressed in Central Florida · MMXXVI'),
          React.createElement('div', { className: 'bj-foot-socials' },
            ['IG','FB','YT','TT'].map(s => React.createElement('a', { key: s, href: '#' }, s))
          )
        ),
        React.createElement('div', { className: 'bj-foot-col' },
          React.createElement('h4', null, 'The Show'),
          React.createElement('ul', null,
            ['Home','About','Shows'].map(l => React.createElement('li', { key: l }, React.createElement('a', { href: '#' }, l)))
          )
        ),
        React.createElement('div', { className: 'bj-foot-col' },
          React.createElement('h4', null, 'The Table'),
          React.createElement('ul', null,
            ['Merch','Shipping','Returns'].map(l => React.createElement('li', { key: l }, React.createElement('a', { href: '#' }, l)))
          )
        ),
        React.createElement('div', { className: 'bj-foot-col' },
          React.createElement('h4', null, 'Business'),
          React.createElement('ul', null,
            ['Book Us','Press Kit','Contact'].map(l => React.createElement('li', { key: l }, React.createElement('a', { href: '#' }, l)))
          )
        )
      ),
      React.createElement('div', { className: 'bj-foot-bot' },
        React.createElement('span', null, '© MMXXVI Brothers Jukebox · All wrongs reserved'),
        React.createElement('span', null, '★ Made in Central Florida ★')
      )
    )
  );
};

Object.assign(window, { FooterComponent });
