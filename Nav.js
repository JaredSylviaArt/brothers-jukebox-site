// Brothers Jukebox — Nav Component
// Ticker strip + full site navigation

const NavComponent = ({ currentPage, onNavigate }) => {
  const navLinks = ['Home', 'About', 'Shows', 'Merch', 'Book Us'];

  return React.createElement(React.Fragment, null,
    // Ticker
    React.createElement('div', { className: 'bj-ticker' },
      React.createElement('div', { className: 'bj-ticker-track' },
        ['BROTHERS JUKEBOX','★','90s COUNTRY · LIVE · CENTRAL FLORIDA','★','NOW BOOKING SUMMER MMXXVI','★','400 — 500 STRONG EVERY SHOW','★',
         'BROTHERS JUKEBOX','★','90s COUNTRY · LIVE · CENTRAL FLORIDA','★','NOW BOOKING SUMMER MMXXVI','★','400 — 500 STRONG EVERY SHOW','★'].map((item, i) =>
          React.createElement('span', { key: i, className: item === '★' ? 'dot' : '' }, item)
        )
      )
    ),
    // Nav
    React.createElement('nav', { className: 'bj-nav' },
      React.createElement('a', { href: '#', className: 'bj-mark', onClick: e => { e.preventDefault(); onNavigate('Home'); } },
        React.createElement('img', { src: 'images/logo.webp', alt: 'Brothers Jukebox', className: 'bj-logo' })
      ),
      React.createElement('ul', null,
        navLinks.map(link =>
          React.createElement('li', { key: link },
            React.createElement('a', {
              href: '#',
              className: currentPage === link ? 'active' : '',
              onClick: e => { e.preventDefault(); onNavigate(link); }
            }, link)
          )
        )
      ),
      React.createElement('div', { className: 'bj-socials' },
        ['IG','FB','YT'].map(s =>
          React.createElement('a', { key: s, href: '#', title: s }, s)
        )
      ),
      React.createElement('button', {
        className: 'bj-nav-cart snipcart-checkout',
        title: 'Cart'
      }, 'Cart [', React.createElement('span', { className: 'snipcart-items-count' }), ']')
    )
  );
};

Object.assign(window, { NavComponent });
