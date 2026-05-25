// Brothers Jukebox — Merch Page

const MerchPage = ({ onNavigate }) => {
  const content = window.bjUseContent('content/merch.json');
  const [selectedSize, setSelectedSize] = React.useState('M');
  const [activeFilter, setActiveFilter] = React.useState('All');
  if (!content) return null;

  const featured = content.featured || {};
  const products = content.products || [];
  const filters = ['All', ...Array.from(new Set(products.map(p => p.cat)))];
  const filtered = activeFilter === 'All' ? products : products.filter(p => p.cat === activeFilter);

  const addFeaturedToCart = () => {
    if (!window.Snipcart) return;
    window.Snipcart.api.cart.items.add({
      id: featured.snipcartId,
      name: (featured.title_line1 || '') + ' ' + (featured.title_line2 || ''),
      price: featured.price,
      url: '/',
      description: (featured.description_paragraphs || [''])[0],
      customFields: [{ name: 'Size', value: selectedSize, required: true, options: (featured.sizes || ['S','M','L','XL','2XL']).join('|') }]
    });
  };

  return React.createElement('div', null,
    React.createElement('section', { className: 'bj-hero' },
      React.createElement('div', { className: 'bj-kicker' }, content.kicker),
      React.createElement('h1', { 'data-text': content.title }, content.title),
      React.createElement('div', { className: 'bj-subhead' },
        content.subhead_prefix,
        React.createElement('em', null, content.subhead_emphasis)
      )
    ),

    React.createElement('section', { className: 'bj-featured-product' },
      React.createElement('div', { className: 'feat-img' },
        React.createElement('div', { className: 'feat-silhouette' }, '★'),
        React.createElement('div', { className: 'feat-corner-tag' }, featured.image_note || '')
      ),
      React.createElement('div', { className: 'feat-info' },
        React.createElement('div', { className: 'bj-kicker' }, featured.kicker),
        React.createElement('h2', null, featured.title_line1, React.createElement('br'), featured.title_line2),
        React.createElement('div', { className: 'feat-price' }, '$' + featured.price + ' ', React.createElement('span', null, '· ' + (featured.price_note || ''))),
        React.createElement('p', { className: 'feat-desc' },
          ...((featured.description_paragraphs || []).flatMap((p, i, arr) => [
            p,
            i < arr.length - 1 ? React.createElement(React.Fragment, { key: 'br' + i }, React.createElement('br'), React.createElement('br')) : null
          ]).filter(Boolean))
        ),
        React.createElement('div', { className: 'size-label' }, 'Size'),
        React.createElement('div', { className: 'size-selector' },
          (featured.sizes || []).map(s =>
            React.createElement('button', {
              key: s,
              className: 'size-btn' + (selectedSize === s ? ' active' : ''),
              onClick: () => setSelectedSize(s)
            }, s)
          )
        ),
        React.createElement('button', {
          className: 'bj-btn bj-btn-rust',
          style: { marginTop: '20px', width: '100%' },
          onClick: addFeaturedToCart
        }, 'Add to the table.')
      )
    ),

    React.createElement('section', { className: 'bj-merch-section' },
      React.createElement('div', { className: 'bj-section-head', style: { paddingLeft: 0, paddingRight: 0, paddingTop: 0 } },
        React.createElement('div', { className: 'num' }, '01'),
        React.createElement('h2', null, 'The Merch Table'),
        React.createElement('div', { className: 'meta' }, 'NEW SHIRT UP', React.createElement('br'), 'SHIPS CENTRAL FL')
      ),
      React.createElement('div', { className: 'filter-row' },
        filters.map(f =>
          React.createElement('button', {
            key: f,
            className: 'filter-pill' + (activeFilter === f ? ' active' : ''),
            onClick: () => setActiveFilter(f)
          }, f)
        )
      ),
      React.createElement('div', { className: 'bj-teaser-grid' },
        filtered.map((p, i) =>
          React.createElement('div', { key: i, className: 'teaser-card' },
            p.tag && React.createElement('span', { className: 'new-tag' }, p.tag),
            React.createElement('div', { className: 'product-img' },
              React.createElement('div', { className: 'silhouette' }, p.icon)
            ),
            React.createElement('h4', null, p.name),
            React.createElement('div', { className: 'price' }, '$' + p.price),
            React.createElement('div', { className: 'prod-desc' }, p.desc),
            p.hasSize
              ? React.createElement('button', {
                  className: 'btn-add-card bj-btn',
                  onClick: () => {
                    if (!window.Snipcart) return;
                    window.Snipcart.api.cart.items.add({
                      id: p.snipcartId,
                      name: p.name,
                      price: p.price,
                      url: '/',
                      description: p.desc,
                      customFields: [{ name: 'Size', value: 'M', required: true, options: 'S|M|L|XL|2XL' }]
                    });
                  }
                }, 'Add to Table')
              : React.createElement('button', {
                  className: 'btn-add-card bj-btn snipcart-add-item',
                  'data-item-id': p.snipcartId,
                  'data-item-name': p.name,
                  'data-item-price': p.price,
                  'data-item-url': '/',
                  'data-item-description': p.desc
                }, 'Add to Table')
          )
        )
      )
    ),

    React.createElement('section', { className: 'bj-proof' },
      React.createElement('div', { className: 'stat' },
        'Every shirt keeps ', React.createElement('em', null, 'live country'), ' music going in Florida.'
      ),
      React.createElement('div', { className: 'infl' }, 'Independent · Band-owned · Printed in small batches')
    )
  );
};

Object.assign(window, { MerchPage });
