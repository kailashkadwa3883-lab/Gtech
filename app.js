// ─── HAMBURGER ───────────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    hamburger.classList.toggle('active');
  });
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
      navLinks.classList.remove('open');
      hamburger.classList.remove('active');
    }
  });
}

// ─── WHATSAPP FLOATING BUTTON (inject on all pages) ──────────
(function injectWhatsApp() {
  if (document.getElementById('waFloat')) return;
  const wa = document.createElement('div');
  wa.id = 'waFloat';
  wa.innerHTML = `
    <style>
      #waFloat { position:fixed; bottom:1.75rem; right:1.75rem; z-index:9999; display:flex; flex-direction:column; align-items:flex-end; gap:.5rem; }
      #waFloat .wa-tooltip { background:#0d2137; color:#fff; padding:.4rem .85rem; border-radius:50px; font-size:.78rem; font-weight:600; white-space:nowrap; box-shadow:0 2px 12px rgba(0,0,0,.18); opacity:0; transform:translateX(8px); transition:all .3s; pointer-events:none; font-family:'Inter',sans-serif; }
      #waFloat:hover .wa-tooltip { opacity:1; transform:translateX(0); }
      #waFloat .wa-main { width:56px; height:56px; background:#25d366; border-radius:50%; display:flex; align-items:center; justify-content:center; box-shadow:0 4px 18px rgba(37,211,102,.5); cursor:pointer; transition:transform .2s; animation:waBounce 2.5s infinite; text-decoration:none; }
      #waFloat .wa-main:hover { transform:scale(1.1); animation:none; box-shadow:0 6px 24px rgba(37,211,102,.65); }
      #waFloat .wa-main svg { width:30px; height:30px; fill:#fff; }
      #waFloat .call-btn { width:46px; height:46px; background:#1a73e8; border-radius:50%; display:flex; align-items:center; justify-content:center; box-shadow:0 4px 14px rgba(26,115,232,.45); cursor:pointer; transition:transform .2s; text-decoration:none; font-size:1.2rem; }
      #waFloat .call-btn:hover { transform:scale(1.1); }
      #scrollTopBtn { position:fixed; bottom:8.5rem; right:2rem; z-index:9998; width:38px; height:38px; background:#0d2137; color:#fff; border-radius:50%; border:none; cursor:pointer; font-size:1rem; display:flex; align-items:center; justify-content:center; opacity:0; pointer-events:none; transition:all .3s; box-shadow:0 2px 12px rgba(0,0,0,.2); }
      #scrollTopBtn.show { opacity:1; pointer-events:all; }
      #scrollTopBtn:hover { background:#1a73e8; transform:translateY(-2px); }
      @keyframes waBounce { 0%,100%{transform:scale(1)} 50%{transform:scale(1.08)} }
    </style>
    <div class="wa-tooltip">Chat on WhatsApp</div>
    <a href="https://wa.me/918890977017?text=Hello%20G%20Tech%2C%20I%20need%20a%20quote%20for%20CCTV." target="_blank" class="wa-main" title="WhatsApp Us">
      <svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
    </a>
    <a href="tel:+918890977017" class="call-btn" title="Call Us">📞</a>`;
  document.body.appendChild(wa);

  // Scroll to top button
  const stb = document.createElement('button');
  stb.id = 'scrollTopBtn';
  stb.innerHTML = '↑';
  stb.title = 'Back to top';
  stb.onclick = () => window.scrollTo({top:0, behavior:'smooth'});
  document.body.appendChild(stb);
  window.addEventListener('scroll', () => {
    stb.classList.toggle('show', window.scrollY > 400);
  });
})();

// ─── IMAGE ZOOM LIGHTBOX ──────────────────────────────────────
(function injectLightbox() {
  const lb = document.createElement('div');
  lb.id = 'imgLightbox';
  lb.innerHTML = `
    <style>
      #imgLightbox { position:fixed; inset:0; z-index:10000; background:rgba(0,0,0,.92); display:none; align-items:center; justify-content:center; padding:1rem; cursor:zoom-out; }
      #imgLightbox.open { display:flex; animation:lbFadeIn .25s ease; }
      @keyframes lbFadeIn { from{opacity:0} to{opacity:1} }
      #imgLightbox img { max-width:90vw; max-height:88vh; object-fit:contain; border-radius:8px; box-shadow:0 8px 40px rgba(0,0,0,.6); cursor:default; animation:lbZoomIn .25s ease; }
      @keyframes lbZoomIn { from{transform:scale(.9)} to{transform:scale(1)} }
      #lbClose { position:absolute; top:1.25rem; right:1.5rem; color:#fff; font-size:2rem; cursor:pointer; background:rgba(255,255,255,.1); width:44px; height:44px; border-radius:50%; display:flex; align-items:center; justify-content:center; transition:background .2s; border:none; }
      #lbClose:hover { background:rgba(255,255,255,.25); }
      #lbCaption { position:absolute; bottom:1.5rem; left:50%; transform:translateX(-50%); color:#fff; font-size:.85rem; background:rgba(0,0,0,.5); padding:.4rem 1rem; border-radius:50px; white-space:nowrap; font-family:'Inter',sans-serif; }
    </style>
    <button id="lbClose" onclick="closeLightbox(event)">✕</button>
    <img id="lbImg" src="" alt=""/>
    <div id="lbCaption"></div>`;
  lb.addEventListener('click', (e) => { if(e.target === lb) closeLightbox(e); });
  document.body.appendChild(lb);
})();

function openLightbox(src, caption) {
  const lb = document.getElementById('imgLightbox');
  document.getElementById('lbImg').src = src;
  document.getElementById('lbCaption').textContent = caption || '';
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox(e) {
  if(e) e.stopPropagation();
  document.getElementById('imgLightbox').classList.remove('open');
  if(!document.getElementById('modalOverlay')?.classList.contains('open')) {
    document.body.style.overflow = '';
  }
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeLightbox(null);
    closeModal();
  }
});

// ─── STAR GENERATOR ─────────────────────────────────────────
function generateStars(rating) {
  let html = '';
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) html += '<span class="star full">★</span>';
    else if (i - 0.5 <= rating) html += '<span class="star half">★</span>';
    else html += '<span class="star empty">★</span>';
  }
  return html;
}

// ─── RENDER PRODUCT CARD ─────────────────────────────────────
function renderCard(product) {
  return `
    <div class="product-card" onclick="openModal(${product.id})">
      <div class="pc-img-wrap">
        <img src="${product.image}" alt="${product.name}" loading="lazy"/>
        <div class="pc-tag" style="background:${product.tagColor}">${product.tag}</div>
        <div class="pc-zoom-hint">🔍 Click to view</div>
      </div>
      <div class="pc-body">
        <div style="font-size:.72rem;font-weight:700;color:${product.tagColor};margin-bottom:.2rem;letter-spacing:.04em">${product.brand}</div>
        <div class="pc-name">${product.name}</div>
        <div class="pc-desc">${product.subtitle}</div>
        <button class="pc-btn" style="margin-top:.85rem">View Details & Get Quote</button>
      </div>
    </div>`;
}

// Add zoom hint CSS globally
(function addCardStyles() {
  const style = document.createElement('style');
  style.textContent = `
    .pc-zoom-hint { position:absolute; bottom:.6rem; right:.6rem; background:rgba(0,0,0,.6); color:#fff; font-size:.68rem; padding:.2rem .55rem; border-radius:50px; opacity:0; transition:opacity .2s; pointer-events:none; }
    .product-card:hover .pc-zoom-hint { opacity:1; }
    .pc-img-wrap { cursor:zoom-in; }
  `;
  document.head.appendChild(style);
})();

// ─── HOMEPAGE FEATURED ───────────────────────────────────────
const featuredGrid = document.getElementById('featuredGrid');
if (featuredGrid && typeof FEATURED_IDS !== 'undefined') {
  const featured = FEATURED_IDS.map(id => PRODUCTS.find(p => p.id === id)).filter(Boolean);
  featuredGrid.innerHTML = featured.map(renderCard).join('');
}

// ─── PRODUCTS PAGE ───────────────────────────────────────────
const allGrid = document.getElementById('allProductsGrid');
if (allGrid) {
  let activeCategory = 'all';
  const urlParams = new URLSearchParams(window.location.search);
  const paramCat = urlParams.get('cat');
  if (paramCat) {
    activeCategory = paramCat;
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.cat === paramCat);
    });
  }
  function renderAll(cat) {
    const filtered = cat === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.category === cat);
    allGrid.innerHTML = filtered.length
      ? filtered.map(renderCard).join('')
      : '<p style="color:var(--muted);padding:2rem 0;">No products in this category.</p>';
  }
  renderAll(activeCategory);
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCategory = btn.dataset.cat;
      renderAll(activeCategory);
    });
  });
}

// ─── MODAL ───────────────────────────────────────────────────
let currentImgIndex = 0;
let currentProduct = null;

function openModal(id) {
  const p = PRODUCTS.find(pr => pr.id === id);
  if (!p) return;
  currentProduct = p;
  currentImgIndex = 0;
  renderModal(p);
  document.getElementById('modalOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const overlay = document.getElementById('modalOverlay');
  if (overlay) overlay.classList.remove('open');
  document.body.style.overflow = '';
}

function renderModal(p) {
  const thumbs = p.images.map((img, i) =>
    `<img src="${img}" class="modal-thumb ${i === 0 ? 'active' : ''}" onclick="changeModalImg(${i})" alt="View ${i+1}" loading="lazy"/>`
  ).join('');

  const specs = p.specs.map(s =>
    `<tr><td>${s.label}</td><td>${s.value}</td></tr>`
  ).join('');

  const highlights = p.highlights.map(h =>
    `<li><span class="hl-check">✓</span> ${h}</li>`
  ).join('');

  const inBox = p.inBox.map(item => `<div class="inbox-item">${item}</div>`).join('');
  const waMsg = encodeURIComponent(`Hello G Tech, I'm interested in ${p.name} – ${p.subtitle}. Please share the price and availability.`);

  document.getElementById('modalContent').innerHTML = `
    <style>
      .modal-gallery { position:relative; }
      .modal-main-img { position:relative; border-radius:10px; overflow:hidden; background:#f1f5f9; height:310px; cursor:zoom-in; }
      .modal-main-img img { width:100%; height:100%; object-fit:contain; transition:transform .4s ease; }
      .modal-main-img:hover img { transform:scale(1.06); }
      .modal-main-img .zoom-icon { position:absolute; top:.6rem; right:.6rem; background:rgba(0,0,0,.5); color:#fff; font-size:.7rem; padding:.2rem .55rem; border-radius:50px; pointer-events:none; }
      .modal-thumbs { display:flex; gap:.5rem; margin-top:.65rem; flex-wrap:wrap; }
      .modal-thumb { width:68px; height:58px; object-fit:cover; border-radius:8px; cursor:pointer; border:2px solid var(--border,#dde3ec); transition:all .2s; }
      .modal-thumb.active, .modal-thumb:hover { border-color:#1a73e8; transform:scale(1.06); box-shadow:0 2px 8px rgba(26,115,232,.3); }
    </style>
    <div class="modal-product">
      <div class="modal-gallery">
        <div class="modal-main-img" onclick="openLightbox('${p.images[0]}','${p.name}')">
          <img src="${p.images[0]}" id="modalMainImg" alt="${p.name}"/>
          <div class="zoom-icon">🔍 Click to zoom</div>
        </div>
        <div class="modal-thumbs">${thumbs}</div>
      </div>
      <div class="modal-info">
        <div style="display:flex;align-items:center;gap:.5rem;margin-bottom:.6rem;flex-wrap:wrap">
          <div class="modal-tag" style="background:${p.tagColor}20;color:${p.tagColor};border:1px solid ${p.tagColor}40;display:inline-block;font-size:.7rem;font-weight:700;padding:.2rem .65rem;border-radius:50px">${p.brand}</div>
          <div class="modal-tag" style="background:#e8f0fe;color:#1a73e8;border:1px solid #bbd0f8;display:inline-block;font-size:.7rem;font-weight:700;padding:.2rem .65rem;border-radius:50px">${p.tag}</div>
        </div>
        <h2 class="modal-title" style="font-family:'Syne',sans-serif;font-size:1.45rem;font-weight:800;margin-bottom:.3rem;color:#0d2137">${p.name}</h2>
        <div style="font-size:.88rem;color:#64748b;margin-bottom:.75rem;font-weight:500">${p.subtitle}</div>
        <p style="font-size:.86rem;color:#64748b;margin-bottom:.9rem;line-height:1.8">${p.description}</p>
        <ul style="list-style:none;display:flex;flex-direction:column;gap:.3rem;margin-bottom:1.25rem">
          ${highlights}
        </ul>
        <div style="background:#fff8e1;border:1.5px solid #ffd54f;border-radius:8px;padding:.85rem 1rem;margin-bottom:1.1rem;font-size:.84rem;color:#5d4037">
          💬 <strong>For price & availability</strong> — Call or WhatsApp us at <a href="tel:+918890977017" style="color:#1a73e8;font-weight:700">+91 8890977017</a>
        </div>
        <div style="display:flex;flex-direction:column;gap:.6rem;margin-bottom:1.4rem">
          <a href="tel:+918890977017" style="display:block;width:100%;padding:.78rem;background:#1a73e8;color:#fff;border:none;border-radius:8px;font-weight:700;font-size:.9rem;text-align:center;transition:all .2s;text-decoration:none">📞 Call for Price & Quote</a>
          <a href="https://wa.me/918890977017?text=${waMsg}" target="_blank" style="display:block;width:100%;padding:.78rem;background:#25d366;color:#fff;border:none;border-radius:8px;font-weight:700;font-size:.9rem;text-align:center;transition:all .2s;text-decoration:none">💬 WhatsApp for Quote</a>
        </div>
        <div style="display:flex;gap:.4rem;margin-bottom:.9rem;border-bottom:1.5px solid #dde3ec;padding-bottom:.45rem">
          <button class="tab-btn active" onclick="showTab('specs',this)" style="background:#e8f0fe;color:#1a73e8;border:none;cursor:pointer;font-size:.84rem;font-weight:600;padding:.3rem .7rem;border-radius:6px;font-family:inherit">Specifications</button>
          <button class="tab-btn" onclick="showTab('inbox',this)" style="background:none;color:#64748b;border:none;cursor:pointer;font-size:.84rem;font-weight:600;padding:.3rem .7rem;border-radius:6px;font-family:inherit">In the Box</button>
        </div>
        <div id="tab-specs">
          <table style="width:100%;border-collapse:collapse;font-size:.83rem"><tbody>${specs}</tbody></table>
        </div>
        <div id="tab-inbox" style="display:none">
          <div style="display:flex;flex-direction:column;gap:.45rem">${inBox}</div>
        </div>
      </div>
    </div>`;

  // specs table alternating rows
  const rows = document.querySelectorAll('#tab-specs table tr');
  rows.forEach((r,i) => {
    r.style.background = i % 2 === 0 ? '#f8fafc' : '#fff';
    r.querySelectorAll('td').forEach((td,j) => {
      td.style.padding = '.52rem .75rem';
      td.style.color = j === 0 ? '#64748b' : '#1e293b';
      if(j===0) td.style.fontWeight = '600';
      if(j===0) td.style.width = '40%';
    });
  });

  // inbox items styling
  document.querySelectorAll('.inbox-item').forEach(el => {
    el.style.cssText = 'font-size:.83rem;padding:.5rem .75rem;background:#f8fafc;border-radius:7px;color:#1e293b;display:flex;align-items:center;gap:.5rem';
    if(!el.innerHTML.startsWith('✓')) el.innerHTML = '✓ ' + el.innerHTML;
  });
}

function changeModalImg(index) {
  currentImgIndex = index;
  const img = document.getElementById('modalMainImg');
  const src = currentProduct.images[index];
  img.style.opacity = '0';
  img.style.transform = 'scale(0.96)';
  setTimeout(() => {
    img.src = src;
    img.style.transition = 'opacity .2s, transform .2s';
    img.style.opacity = '1';
    img.style.transform = 'scale(1)';
  }, 120);
  // Update main img click for lightbox
  img.parentElement.onclick = () => openLightbox(src, currentProduct.name);
  document.querySelectorAll('.modal-thumb').forEach((t, i) => {
    t.classList.toggle('active', i === index);
  });
}

function showTab(tabId, btn) {
  ['specs','inbox'].forEach(id => {
    const el = document.getElementById('tab-' + id);
    if(el) el.style.display = 'none';
  });
  document.querySelectorAll('.tab-btn').forEach(b => {
    b.style.background = 'none';
    b.style.color = '#64748b';
  });
  const target = document.getElementById('tab-' + tabId);
  if(target) target.style.display = 'block';
  btn.style.background = '#e8f0fe';
  btn.style.color = '#1a73e8';
}

// ─── CONTACT FORM ────────────────────────────────────────────
function submitContact() {
  const name  = document.getElementById('cName')?.value.trim();
  const phone = document.getElementById('cPhone')?.value.trim();
  if (!name || !phone) {
    alert('Please fill in Name and Phone to continue.');
    return;
  }
  document.getElementById('formCard').style.display = 'none';
  document.getElementById('formSuccess').style.display = 'block';
}

// ─── SCROLL NAVBAR ───────────────────────────────────────────
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// ─── SMOOTH SCROLL (for pages without index.html inline script) ──
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({behavior:'smooth'});
      navLinks?.classList.remove('open');
      hamburger?.classList.remove('active');
    }
  });
});
