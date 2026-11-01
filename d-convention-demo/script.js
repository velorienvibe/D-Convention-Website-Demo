// D Convention site interactions
(function(){
  const year = document.getElementById('year');
  if(year) year.textContent = new Date().getFullYear();

  const nav = document.querySelector('.main-nav');
  const toggle = document.querySelector('.menu-toggle');
  if(nav && toggle){
    toggle.addEventListener('click', function(){
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    });
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', function(){
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded','false');
    }));
  }

  const current = document.body.dataset.page;
  document.querySelectorAll('.main-nav a').forEach(a => {
    const href = a.getAttribute('href') || '';
    if(href === (current === 'home' ? 'index.html' : current + '.html')) a.classList.add('active');
  });

  // If a public image host blocks an image, keep the layout intact with a bundled local SVG.
  document.querySelectorAll('img[data-fallback]').forEach(img => {
    img.addEventListener('error', function(){
      if(this.dataset.fallback && !this.dataset.fallbackUsed){
        this.dataset.fallbackUsed = '1';
        this.src = this.dataset.fallback;
      }
    });
    if(img.complete && img.naturalWidth === 0 && img.dataset.fallback){
      img.dataset.fallbackUsed = '1';
      img.src = img.dataset.fallback;
    }
  });

  // Gallery lightbox
  const lightbox = document.querySelector('.lightbox');
  if(lightbox){
    const lightboxImg = lightbox.querySelector('img');
    const close = () => { lightbox.classList.remove('open'); lightbox.setAttribute('aria-hidden','true'); document.body.style.overflow=''; };
    document.querySelectorAll('[data-gallery]').forEach(tile => tile.addEventListener('click', () => {
      const image = tile.querySelector('img');
      if(!image) return;
      lightboxImg.src = image.currentSrc || image.src;
      lightboxImg.alt = image.alt;
      lightbox.classList.add('open');
      lightbox.setAttribute('aria-hidden','false');
      document.body.style.overflow='hidden';
    }));
    lightbox.querySelector('.lightbox-close')?.addEventListener('click', close);
    lightbox.addEventListener('click', e => { if(e.target === lightbox) close(); });
    document.addEventListener('keydown', e => { if(e.key === 'Escape') close(); });
  }

  // WhatsApp enquiry form: no server or database is required for this demo.
  const form = document.getElementById('enquiry-form');
  if(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      if(!form.reportValidity()) return;
      const data = new FormData(form);
      const get = key => String(data.get(key) || '').trim();
      const message = [
        'Hello D Convention, I would like to enquire about an event.', '',
        'Name: ' + get('name'),
        'Phone: ' + get('phone'),
        'Occasion: ' + get('event'),
        'Preferred date: ' + (get('date') || 'Not decided'),
        'Approx. guests: ' + (get('guests') || 'Not decided'),
        'Additional details: ' + (get('message') || 'None')
      ].join('\n');
      window.open('https://wa.me/919912916390?text=' + encodeURIComponent(message), '_blank', 'noopener,noreferrer');
    });
  }
})();
