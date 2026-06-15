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

// ─── RENDER PRODUCT CARD ─────────────────────────────────────
function renderCard(product) {
  const discount = Math.round((1 - product.price / product.originalPrice) * 100);
  const stars = '★'.repeat(Math.floor(product.rating)) + (product.rating % 1 >= 0.5 ? '½' : '');
  return `
    <div class="product-card" onclick="openModal(${product.id})">
      <div class="pc-img-wrap">
        <img src="${product.image}" alt="${product.name}" loading="lazy"/>
        <div class="pc-tag" style="background:${product.tagColor}">${product.tag}</div>
        ${discount > 0 ? `<div class="pc-discount">-${discount}%</div>` : ''}
      </div>
      <div class="pc-body">
        <div class="pc-name">${product.name}</div>
        <div class="pc-desc">${product.shortDesc}</div>
        <div class="pc-rating">
          <span class="pc-stars">${generateStars(product.rating)}</span>
          <span class="pc-rcount">(${product.reviews})</span>
        </div>
        <div class="pc-price-row">
          <span class="pc-price">₹${product.price.toLocaleString()}</span>
          <span class="pc-orig">₹${product.originalPrice.toLocaleString()}</span>
        </div>
        <button class="pc-btn">View Details</button>
      </div>
    </div>`;
}

function generateStars(rating) {
  let html = '';
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) html += '<span class="star full">★</span>';
    else if (i - 0.5 <= rating) html += '<span class="star half">★</span>';
    else html += '<span class="star empty">★</span>';
  }
  return html;
}

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

  // Read URL param
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
  document.getElementById('modalOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

function renderModal(p) {
  const discount = Math.round((1 - p.price / p.originalPrice) * 100);
  const thumbs = p.images.map((img, i) =>
    `<img src="${img}" class="modal-thumb ${i === 0 ? 'active' : ''}" onclick="changeModalImg(${i})" alt="View ${i+1}" loading="lazy"/>`
  ).join('');

  const specs = p.specs.map(s =>
    `<tr><td>${s.label}</td><td>${s.value}</td></tr>`
  ).join('');

  const highlights = p.highlights.map(h =>
    `<li><span class="hl-check">✓</span> ${h}</li>`
  ).join('');

  const inBox = p.inBox.map(item => `<div class="inbox-item">📦 ${item}</div>`).join('');

  document.getElementById('modalContent').innerHTML = `
    <div class="modal-product">
      <div class="modal-gallery">
        <div class="modal-main-img">
          <img src="${p.images[0]}" id="modalMainImg" alt="${p.name}"/>
        </div>
        <div class="modal-thumbs">${thumbs}</div>
      </div>
      <div class="modal-info">
        <div class="modal-tag" style="background:${p.tagColor}20;color:${p.tagColor};border:1px solid ${p.tagColor}40">${p.tag}</div>
        <h2 class="modal-title">${p.name}</h2>
        <div class="modal-rating">
          ${generateStars(p.rating)}
          <span class="modal-rnum">${p.rating} (${p.reviews} reviews)</span>
        </div>
        <div class="modal-price-row">
          <span class="modal-price">₹${p.price.toLocaleString()}</span>
          <span class="modal-orig">₹${p.originalPrice.toLocaleString()}</span>
          <span class="modal-save">Save ${discount}%</span>
        </div>
        <p class="modal-desc">${p.description}</p>
        <ul class="modal-highlights">${highlights}</ul>
        <div class="modal-actions">
          <a href="contact.html" class="btn-primary btn-full">Get Quote for This Product</a>
          <a href="tel:+919876543210" class="btn-outline btn-full">📞 Call Now</a>
        </div>
        <div class="modal-tabs">
          <button class="tab-btn active" onclick="showTab('specs', this)">Specifications</button>
          <button class="tab-btn" onclick="showTab('inbox', this)">In the Box</button>
        </div>
        <div class="tab-content" id="tab-specs">
          <table class="specs-table"><tbody>${specs}</tbody></table>
        </div>
        <div class="tab-content" id="tab-inbox" style="display:none">
          <div class="inbox-grid">${inBox}</div>
        </div>
      </div>
    </div>`;
}

function changeModalImg(index) {
  currentImgIndex = index;
  document.getElementById('modalMainImg').src = currentProduct.images[index];
  document.querySelectorAll('.modal-thumb').forEach((t, i) => {
    t.classList.toggle('active', i === index);
  });
}

function showTab(tabId, btn) {
  document.querySelectorAll('.tab-content').forEach(t => t.style.display = 'none');
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('tab-' + tabId).style.display = 'block';
  btn.classList.add('active');
}

// ─── CONTACT FORM ────────────────────────────────────────────
function submitContact() {
  const name  = document.getElementById('cName')?.value.trim();
  const phone = document.getElementById('cPhone')?.value.trim();
  const city  = document.getElementById('cCity')?.value.trim();
  if (!name || !phone || !city) {
    alert('Please fill in Name, Phone, and City to continue.');
    return;
  }
  document.getElementById('formCard').style.display = 'none';
  document.getElementById('formSuccess').style.display = 'block';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ─── SCROLL NAVBAR SHADOW ────────────────────────────────────
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 40);
});
