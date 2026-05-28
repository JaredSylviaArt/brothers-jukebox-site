// Brothers Jukebox — Product Detail Page

const ProductPage = ({ productId, onNavigate }) => {
  const content = window.bjUseContent('content/merch.json');
  const [selectedSize, setSelectedSize] = React.useState('M');
  const [activeIdx, setActiveIdx] = React.useState(0);
  if (!content) return null;

  const product = (content.products || []).find(p => p.snipcartId === productId);

  if (!product) {
    return React.createElement('div', null,
      React.createElement('section', { className: 'bj-hero' },
        React.createElement('div', { className: 'bj-kicker' }, '★ 404 ★ Product not found'),
        React.createElement('h1', { 'data-text': 'Off the table.' }, 'Off the table.'),
        React.createElement('p', { className: 'bj-undertag' }, 'That product isn\'t on the merch table — might be sold out or moved. Try the full store.'),
        React.createElement('div', { className: 'bj-hero-ctas' },
          React.createElement('button', { className: 'bj-btn bj-btn-rust', onClick: () => onNavigate('Merch') }, 'Back to the store')
        )
      )
    );
  }

  // Gallery: prefer gallery array, fall back to single image
  const gallery = (product.gallery && product.gallery.length > 0)
    ? product.gallery
    : (product.image ? [product.image] : []);
  const mainImage = gallery[activeIdx] || gallery[0];

  // Related: prefer explicit related array; fall back to 3 random others in same category, then any
  const allProducts = content.products || [];
  let related = [];
  if (product.related && product.related.length > 0) {
    related = product.related
      .map(id => allProducts.find(p => p.snipcartId === id))
      .filter(Boolean);
  }
  if (related.length < 3) {
    const have = new Set([product.snipcartId, ...related.map(p => p.snipcartId)]);
    const sameCat = allProducts.filter(p => !have.has(p.snipcartId) && p.cat === product.cat);
    const others = allProducts.filter(p => !have.has(p.snipcartId) && p.cat !== product.cat);
    related = [...related, ...sameCat, ...others].slice(0, 3);
  }

  // Long description: split on blank lines into paragraphs, and bold any **text**
  const renderLong = (text) => {
    if (!text) return null;
    const paragraphs = text.split(/\n\n+/);
    return paragraphs.map((p, i) => {
      const parts = p.split(/(\*\*[^*]+\*\*)/g).map((seg, j) =>
        seg.startsWith('**') && seg.endsWith('**')
          ? React.createElement('strong', { key: j }, seg.slice(2, -2))
          : seg
      );
      return React.createElement('p', { key: i, style: { marginBottom: '14px' } }, ...parts);
    });
  };

  const addToCart = () => {
    if (!window.Snipcart) return;
    const item = {
      id: product.snipcartId,
      name: product.name,
      price: product.price,
      url: '/',
      description: product.desc
    };
    if (product.hasSize) {
      item.customFields = [{ name: 'Size', value: selectedSize, required: true, options: 'S|M|L|XL|2XL' }];
    }
    // Resolve Printful variant ID for fulfillment routing
    const printfulVariantId = product.hasSize
      ? (product.printfulVariants && product.printfulVariants[selectedSize])
      : product.printfulVariantId;
    if (printfulVariantId) {
      item.metadata = { printful_variant_id: printfulVariantId };
    }
    window.Snipcart.api.cart.items.add(item);
  };

  return React.createElement('div', null,
    // Breadcrumb hero
    React.createElement('section', { className: 'bj-hero', style: { padding: '36px 48px 24px', textAlign: 'left' } },
      React.createElement('div', { className: 'bj-kicker' },
        React.createElement('a', {
          href: '/',
          onClick: e => { e.preventDefault(); onNavigate('Merch'); },
          style: { color: '#a8362a' }
        }, 'MERCH'),
        ' ', React.createElement('span', { className: 'sep' }, '★'), ' ',
        product.cat ? product.cat.toUpperCase() : '',
        ' ', React.createElement('span', { className: 'sep' }, '★'), ' ',
        product.name.toUpperCase()
      )
    ),

    // Main product layout
    React.createElement('section', { className: 'bj-featured-product' },
      // Gallery
      React.createElement('div', { className: 'feat-img', style: { flexDirection: 'column' } },
        mainImage
          ? React.createElement('img', {
              src: mainImage,
              alt: product.name,
              style: { position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block', zIndex: 1 }
            })
          : React.createElement('div', { className: 'feat-silhouette' }, product.icon || '★'),
        gallery.length > 1 && React.createElement('div', {
          className: 'bj-pdp-thumbs',
          style: {
            position: 'absolute', left: 16, right: 16, bottom: 16, zIndex: 2,
            display: 'flex', gap: '8px', flexWrap: 'wrap'
          }
        },
          gallery.map((src, i) =>
            React.createElement('button', {
              key: i,
              onClick: () => setActiveIdx(i),
              style: {
                width: 56, height: 56,
                border: i === activeIdx ? '2px solid #a8362a' : '1.5px solid #1a1612',
                background: '#e8dfc9',
                padding: 0, cursor: 'pointer',
                overflow: 'hidden'
              }
            },
              React.createElement('img', { src, alt: product.name + ' ' + (i+1), style: { width: '100%', height: '100%', objectFit: 'cover', display: 'block' } })
            )
          )
        )
      ),

      // Info
      React.createElement('div', { className: 'feat-info' },
        product.tag && React.createElement('div', { className: 'bj-kicker', style: { color: '#a8362a' } }, '★ ' + product.tag + ' ★'),
        React.createElement('h2', null, product.name),
        React.createElement('div', { className: 'feat-price' },
          '$' + product.price,
          React.createElement('span', null, ' · Ships from Central Florida')
        ),
        React.createElement('p', { className: 'feat-desc', style: { fontStyle: 'italic' } }, product.desc),
        React.createElement('div', { className: 'feat-desc' }, renderLong(product.long_description || '')),

        product.hasSize && React.createElement('div', { className: 'size-label' }, 'Size'),
        product.hasSize && React.createElement('div', { className: 'size-selector' },
          ['S','M','L','XL','2XL'].map(s =>
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
          onClick: addToCart
        }, 'Add to the table.')
      )
    ),

    // Testimonial
    product.testimonial && React.createElement('section', { className: 'bj-proof' },
      React.createElement('div', { className: 'stat', style: { fontSize: 'clamp(18px, 2.6vw, 26px)' } },
        '" ' + product.testimonial + ' "'
      ),
      React.createElement('div', { className: 'infl' }, '★ ★ ★ ★ ★')
    ),

    // Related products
    related.length > 0 && React.createElement('section', { className: 'bj-merch-section' },
      React.createElement('div', { className: 'bj-section-head', style: { paddingLeft: 0, paddingRight: 0, paddingTop: 0 } },
        React.createElement('div', { className: 'num' }, '02'),
        React.createElement('h2', null, 'You might also pack'),
        React.createElement('div', { className: 'meta' }, 'OTHER ITEMS', React.createElement('br'), 'AT THE TABLE')
      ),
      React.createElement('div', { className: 'bj-teaser-grid' },
        related.map((p, i) =>
          React.createElement('div', {
            key: i,
            className: 'teaser-card',
            onClick: () => onNavigate('Product', p.snipcartId),
            style: { cursor: 'pointer' }
          },
            p.tag && React.createElement('span', { className: 'new-tag' }, p.tag),
            React.createElement('div', { className: 'product-img' },
              p.image
                ? React.createElement('img', { src: p.image, alt: p.name, style: { position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block', zIndex: 1 } })
                : React.createElement('div', { className: 'silhouette' }, p.icon)
            ),
            React.createElement('h4', null, p.name),
            React.createElement('div', { className: 'price' }, '$' + p.price),
            React.createElement('div', { className: 'prod-desc' }, p.desc)
          )
        )
      )
    )
  );
};

Object.assign(window, { ProductPage });
