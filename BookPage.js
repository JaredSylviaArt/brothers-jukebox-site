// Brothers Jukebox — Book Us Page

const BookPage = ({ onNavigate }) => {
  const [formData, setFormData] = React.useState({
    name:'', email:'', phone:'', venue:'', location:'', date:'', type:'', message:''
  });
  const [submitted, setSubmitted] = React.useState(false);

  const credentials = [
    { num:'400-500', label:'Draw', desc:'Our regular crowd at Central Florida venues.' },
    { num:'Central', label:'Florida', desc:'Close to the rooms. Easy to book. Easy to bring back.' },
    { num:'90s', label:'Setlist', desc:"Country radio's biggest decade, played the way the crowd remembers." },
    { num:'Full', label:'Live Band', desc:'Five-piece, road-ready. Plug in and go.' },
  ];
  const wishlist = [
    { name:'Old Red Orlando', desc:'The country room we want to call home.' },
    { name:'Disney Springs', desc:'Built for the crowd already looking.' },
    { name:'Universal Orlando', desc:'A 90s setlist made for theme-park nights.' },
    { name:'Florida Venues', desc:'Bars, festivals, private events, benefits. State-wide.' },
  ];
  const eventTypes = ['Venue booking','Festival','Wedding','Private party','Corporate','Charity','Other'];

  const handleChange = e => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  const handleSubmit = e => { e.preventDefault(); setSubmitted(true); };

  return React.createElement('div', null,
    // Hero
    React.createElement('section', { className: 'bj-hero' },
      React.createElement('div', { className: 'bj-kicker' },
        'Page 05 ', React.createElement('span', { className: 'sep' }, '★'), ' Booking Inquiry ', React.createElement('span', { className: 'sep' }, '★'), ' Venue Managers'
      ),
      React.createElement('h1', { 'data-text': 'Book Us.' }, 'Book Us.'),
      React.createElement('div', { className: 'bj-subhead' },
        '90s country. Live and loud. ', React.createElement('em', null, 'Florida rooms since 2025.')
      )
    ),

    // Credentials
    React.createElement('section', null,
      React.createElement('div', { className: 'bj-section-head' },
        React.createElement('div', { className: 'num' }, '01'),
        React.createElement('h2', null, 'What You\'re Booking'),
        React.createElement('div', { className: 'meta' }, 'THE FAST VERSION')
      ),
      React.createElement('div', { className: 'creds-grid' },
        credentials.map((c, i) =>
          React.createElement('div', { key: i, className: 'cred-card' },
            React.createElement('div', { className: 'cred-num' }, c.num),
            React.createElement('div', { className: 'cred-label' }, c.label),
            React.createElement('p', null, c.desc)
          )
        )
      )
    ),

    // Wishlist
    React.createElement('section', { className: 'bj-merch-teaser' },
      React.createElement('div', { className: 'bj-section-head', style: { paddingLeft: 0, paddingRight: 0, paddingTop: 0 } },
        React.createElement('div', { className: 'num' }, '02'),
        React.createElement('h2', null, 'Rooms We Want'),
        React.createElement('div', { className: 'meta' }, 'ON THE WISHLIST', React.createElement('br'), 'THIS YEAR')
      ),
      React.createElement('div', { className: 'venue-wishlist' },
        wishlist.map((v, i) =>
          React.createElement('div', { key: i, className: 'venue-card' },
            React.createElement('h4', null, v.name),
            React.createElement('p', null, v.desc)
          )
        )
      )
    ),

    // Inquiry form
    React.createElement('section', { className: 'bj-form-section' },
      React.createElement('div', { className: 'bj-section-head', style: { paddingLeft: 0, paddingRight: 0, paddingTop: 0 } },
        React.createElement('div', { className: 'num' }, '03'),
        React.createElement('h2', null, 'Inquiry Form')
      ),
      React.createElement('div', { className: 'form-layout' },
        React.createElement('div', { className: 'form-side' },
          React.createElement('p', null, 'Tell us about the room and the night.'),
          React.createElement('p', null, 'We\'ll get back fast. If it\'s a fit, you\'ll hear from Mike directly.'),
          React.createElement('div', { className: 'form-contact' },
            React.createElement('div', { className: 'bj-kicker', style: { marginBottom: '8px' } }, 'Direct line'),
            React.createElement('p', null, 'brothersjukebox.com/book')
          )
        ),
        submitted
          ? React.createElement('div', { className: 'form-success' },
              React.createElement('div', { className: 'success-star' }, '★'),
              React.createElement('h3', null, 'Sent.'),
              React.createElement('p', null, 'Thanks for the inquiry — Brothers Jukebox will respond within 48 hours. — Mike')
            )
          : React.createElement('form', { className: 'bj-form', onSubmit: handleSubmit },
              React.createElement('div', { className: 'form-row-2' },
                React.createElement('div', { className: 'field' },
                  React.createElement('label', null, 'Name'),
                  React.createElement('input', { type:'text', name:'name', placeholder:'Your name', value: formData.name, onChange: handleChange, required: true })
                ),
                React.createElement('div', { className: 'field' },
                  React.createElement('label', null, 'Email'),
                  React.createElement('input', { type:'email', name:'email', placeholder:'you@example.com', value: formData.email, onChange: handleChange, required: true })
                )
              ),
              React.createElement('div', { className: 'form-row-2' },
                React.createElement('div', { className: 'field' },
                  React.createElement('label', null, 'Phone'),
                  React.createElement('input', { type:'tel', name:'phone', placeholder:'(555) 555-5555', value: formData.phone, onChange: handleChange })
                ),
                React.createElement('div', { className: 'field' },
                  React.createElement('label', null, 'Venue Name'),
                  React.createElement('input', { type:'text', name:'venue', placeholder:'Venue', value: formData.venue, onChange: handleChange, required: true })
                )
              ),
              React.createElement('div', { className: 'form-row-2' },
                React.createElement('div', { className: 'field' },
                  React.createElement('label', null, 'Venue Location'),
                  React.createElement('input', { type:'text', name:'location', placeholder:'City, FL', value: formData.location, onChange: handleChange })
                ),
                React.createElement('div', { className: 'field' },
                  React.createElement('label', null, 'Event Date'),
                  React.createElement('input', { type:'text', name:'date', placeholder:'MM/DD/YYYY or flexible', value: formData.date, onChange: handleChange })
                )
              ),
              React.createElement('div', { className: 'field' },
                React.createElement('label', null, 'Event Type'),
                React.createElement('select', { name:'type', value: formData.type, onChange: handleChange },
                  React.createElement('option', { value:'' }, 'Select event type...'),
                  eventTypes.map(t => React.createElement('option', { key: t, value: t }, t))
                )
              ),
              React.createElement('div', { className: 'field' },
                React.createElement('label', null, 'Message'),
                React.createElement('textarea', { name:'message', placeholder:"Tell us about the show — crowd size, vibe, anything we should know", value: formData.message, onChange: handleChange, rows: 4 })
              ),
              React.createElement('button', { className: 'bj-btn bj-btn-rust', type:'submit', style:{ marginTop:'8px' } }, 'Send it →')
            )
      )
    )
  );
};

Object.assign(window, { BookPage });
