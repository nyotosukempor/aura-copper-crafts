/* ==========================================================================
   AURA COPPER & BRASS CRAFTS - PONYTAIL MINIMALIST INTERACTIVE JS
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. NAVBAR SCROLL & MOBILE TOGGLE ---
    const header = document.getElementById('main-header');
    const mainNav = document.getElementById('main-nav');
    const mobileToggle = document.getElementById('mobile-toggle');

    // Debounced scroll spy using passive listener
    let scrollTicking = false;
    window.addEventListener('scroll', () => {
        if (!scrollTicking) {
            requestAnimationFrame(() => {
                header.classList.toggle('scrolled', window.scrollY > 50);
                const sections = document.querySelectorAll('section[id]');
                const scrollY = window.scrollY;
                let currentId = '';
                sections.forEach(s => { if (scrollY >= s.offsetTop - 130) currentId = s.id; });
                document.querySelectorAll('.nav-link').forEach(l => {
                    l.classList.toggle('active', l.getAttribute('href') === `#${currentId}`);
                });
                scrollTicking = false;
            });
            scrollTicking = true;
        }
    }, { passive: true });

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            const isOpen = mainNav.classList.toggle('open');
            mobileToggle.querySelector('i').className = `fa-solid ${isOpen ? 'fa-xmark' : 'fa-bars'}`;
        });
    }

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => mainNav.classList.remove('open'));
    });


    // --- 2. HERO PARTICLES (SPARKS) ---
    const canvas = document.getElementById('particle-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let w = canvas.width = window.innerWidth, h = canvas.height = window.innerHeight;
        window.addEventListener('resize', () => {
            w = canvas.width = window.innerWidth;
            h = canvas.height = window.innerHeight;
        }, { passive: true });

        // Reduced count (20 vs 35), shadowBlur set once on ctx not per particle
        const particles = Array.from({ length: 20 }, () => ({
            x: Math.random() * w, y: Math.random() * h,
            r: Math.random() * 1.8 + 0.4,
            color: Math.random() > 0.5 ? '#f59e0b' : '#d97736',
            vx: (Math.random() - 0.5) * 0.3, vy: -Math.random() * 0.5 - 0.15
        }));

        // Check if hero is visible before animating
        const heroEl = document.getElementById('hero');
        let heroVisible = true;
        if (typeof IntersectionObserver !== 'undefined') {
            new IntersectionObserver(([e]) => { heroVisible = e.isIntersecting; },
                { threshold: 0 }).observe(heroEl || canvas);
        }

        ctx.shadowBlur = 6;
        (function loop() {
            if (heroVisible) {
                ctx.clearRect(0, 0, w, h);
                particles.forEach(p => {
                    p.x += p.vx; p.y += p.vy;
                    if (p.y < 0) { p.y = h; p.x = Math.random() * w; }
                    ctx.shadowColor = p.color;
                    ctx.fillStyle = p.color;
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                    ctx.fill();
                });
            }
            requestAnimationFrame(loop);
        })();
    }



    // --- 4. STUDIO KUSTOMIZER ENGINE (DELEGATED) ---
    const state = { product: 'bathtub', material: 'copper', finish: 'polished', texture: 'hammered' };

    const customizerPanel = document.querySelector('.customizer-panel');
    if (customizerPanel) {
        customizerPanel.addEventListener('click', (e) => {
            const btnProduct = e.target.closest('.btn-select-product');
            if (btnProduct) {
                document.querySelectorAll('.btn-select-product').forEach(b => b.classList.remove('active'));
                btnProduct.classList.add('active');
                state.product = btnProduct.dataset.product;
            }

            const btnSwatch = e.target.closest('.swatch-btn');
            if (btnSwatch) {
                document.querySelectorAll('.swatch-btn').forEach(b => b.classList.remove('active'));
                btnSwatch.classList.add('active');
                state.finish = btnSwatch.dataset.finish;
            }

            const btnTex = e.target.closest('.btn-texture');
            if (btnTex) {
                document.querySelectorAll('.btn-texture').forEach(b => b.classList.remove('active'));
                btnTex.classList.add('active');
                state.texture = btnTex.dataset.texture;
            }

            updateView();
        });

        customizerPanel.addEventListener('change', (e) => {
            if (e.target.name === 'material') {
                document.querySelectorAll('.radio-card').forEach(c => c.classList.remove('active'));
                e.target.closest('.radio-card').classList.add('active');
                state.material = e.target.value;
                updateView();
            }
        });
    }

    function updateView() {
        const svg = document.getElementById('customizer-svg');
        if (!svg) return;

        const labels = {
            product: { bathtub: 'Bak Mandi', chandelier: 'Lampu Chandelier', relief: 'Relief Dinding', vase: 'Vas & Decor' },
            material: { copper: 'Tembaga Murni', brass: 'Kuningan Impor' },
            finish: { polished: 'Polished Metallic', antique: 'Antique Patina', green: 'Verdigris Green', black: 'Burnished Black' },
            texture: { hammered: 'Tempa Bintik', smooth: 'Smooth Mirror', ukir: 'Ukir Relief' }
        };

        document.getElementById('spec-tag-product').textContent = `Produk: ${labels.product[state.product]}`;
        document.getElementById('spec-tag-material').textContent = `Bahan: ${labels.material[state.material]}`;
        document.getElementById('spec-tag-finish').textContent = `Finish: ${labels.finish[state.finish]}`;
        document.getElementById('spec-tag-texture').textContent = `Tekstur: ${labels.texture[state.texture]}`;

        let stops = { s1: '#f59e0b', s2: '#d97736', s3: '#b85d1c', s4: '#54230c' };
        if (state.material === 'brass') stops = { s1: '#fef08a', s2: '#e5a93c', s3: '#b45309', s4: '#78350f' };
        if (state.finish === 'antique') { stops.s1 = '#d97736'; stops.s4 = '#1c1917'; }
        if (state.finish === 'green') stops = { s1: '#6ee7b7', s2: '#10b981', s3: '#047857', s4: '#064e3b' };
        if (state.finish === 'black') stops = { s1: '#78716c', s2: '#292524', s3: '#1c1917', s4: '#09090b' };

        const patOpacity = state.texture === 'smooth' ? 0.05 : (state.texture === 'ukir' ? 0.6 : 0.35);

        let shape = '';
        if (state.product === 'bathtub') {
            shape = `
                <ellipse cx="300" cy="380" rx="220" ry="25" fill="#f59e0b" opacity="0.15"/>
                <path d="M90 200 C70 300, 140 360, 300 360 C460 360, 530 300, 510 200 C510 200, 480 270, 300 270 C120 270, 90 200, 90 200 Z" fill="url(#cG)"/>
                <path d="M90 200 C70 300, 140 360, 300 360 C460 360, 530 300, 510 200 C510 200, 480 270, 300 270 C120 270, 90 200, 90 200 Z" fill="url(#cT)"/>
                <ellipse cx="300" cy="200" rx="210" ry="45" fill="url(#cG)" stroke="#ffffff" stroke-width="1"/>
                <ellipse cx="300" cy="206" rx="190" ry="36" fill="#1c1917"/>`;
        } else if (state.product === 'chandelier') {
            shape = `
                <line x1="300" y1="0" x2="300" y2="100" stroke="${stops.s1}" stroke-width="4"/>
                <polygon points="300,100 220,180 380,180" fill="url(#cG)"/>
                <circle cx="300" cy="240" r="110" fill="url(#cG)"/>
                <circle cx="300" cy="240" r="110" fill="url(#cT)"/>
                <circle cx="300" cy="240" r="30" fill="#fef08a" filter="drop-shadow(0 0 20px #f59e0b)"/>`;
        } else if (state.product === 'relief') {
            shape = `
                <rect x="100" y="60" width="400" height="300" rx="15" fill="url(#cG)" stroke="${stops.s1}" stroke-width="4"/>
                <rect x="120" y="80" width="360" height="260" rx="8" fill="url(#cT)"/>
                <path d="M150 210 Q220 120 300 210 T450 210" fill="none" stroke="#fef08a" stroke-width="8" stroke-linecap="round"/>`;
        } else {
            shape = `
                <path d="M230 80 Q300 120 370 80 Q420 230 330 350 L270 350 Q180 230 230 80 Z" fill="url(#cG)"/>
                <path d="M230 80 Q300 120 370 80 Q420 230 330 350 L270 350 Q180 230 230 80 Z" fill="url(#cT)"/>
                <ellipse cx="300" cy="80" rx="70" ry="18" fill="url(#cG)" stroke="#ffffff" stroke-width="2"/>`;
        }

        svg.classList.add('updating');
        requestAnimationFrame(() => {
            svg.innerHTML = `
            <defs>
                <linearGradient id="cG" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="${stops.s1}"/><stop offset="40%" stop-color="${stops.s2}"/>
                    <stop offset="70%" stop-color="${stops.s3}"/><stop offset="100%" stop-color="${stops.s4}"/>
                </linearGradient>
                <pattern id="cT" width="16" height="16" patternUnits="userSpaceOnUse">
                    <circle cx="4" cy="4" r="2" fill="#000" opacity="${patOpacity}"/>
                    <circle cx="12" cy="12" r="2" fill="#000" opacity="${patOpacity}"/>
                </pattern>
            </defs>${shape}`;
            requestAnimationFrame(() => {
                svg.classList.remove('updating');
            });
        });
    }

    updateView();

    // Link Customizer to Calculator
    const btnApply = document.getElementById('btn-apply-customizer');
    if (btnApply) {
        btnApply.addEventListener('click', () => {
            document.getElementById('calc-product-type').value = state.product;
            document.getElementById('calc-material-type').value = state.material;
            document.getElementById('calculator').scrollIntoView({ behavior: 'smooth' });
            calculate();
        });
    }


    // --- 5. CALCULATOR ESTIMATOR ENGINE ---
    ['calc-product-type', 'calc-length', 'calc-width', 'calc-height', 'calc-thickness', 'calc-material-type']
        .forEach(id => {
            const el = document.getElementById(id);
            if (el) el.addEventListener('input', calculate);
        });

    function calculate() {
        const prod = document.getElementById('calc-product-type').value;
        const lM = (parseFloat(document.getElementById('calc-length').value) || 0) / 100;
        const wM = (parseFloat(document.getElementById('calc-width').value) || 0) / 100;
        const hM = (parseFloat(document.getElementById('calc-height').value) || 0) / 100;
        const thick = parseFloat(document.getElementById('calc-thickness').value) || 1.0;
        const mat = document.getElementById('calc-material-type').value;

        let area = 0;
        if (prod === 'bathtub') area = (lM * wM) + 1.8 * (lM * hM + wM * hM);
        else if (prod === 'chandelier') area = Math.PI * (lM / 2) * (hM + wM);
        else if (prod === 'relief') area = (lM * wM) + 2 * (lM * 0.05 + wM * 0.05);
        else if (prod === 'dome') area = 2.5 * Math.PI * Math.pow(lM / 2, 2);
        else area = (2 * Math.PI * (wM / 2) * hM) + (Math.PI * Math.pow(wM / 2, 2));

        const weight = area * thick * (mat === 'copper' ? 8.96 : 8.5);
        const basePrice = weight * (mat === 'copper' ? 220000 : 180000) * (prod === 'relief' || prod === 'chandelier' ? 2.8 : 2.2);

        const minP = Math.max(1500000, Math.round(basePrice * 0.9 / 50000) * 50000);
        const maxP = Math.max(1800000, Math.round(basePrice * 1.15 / 50000) * 50000);

        document.getElementById('res-surface-area').textContent = `${area.toFixed(2)} m²`;
        document.getElementById('res-weight').textContent = `${weight.toFixed(1)} kg`;

        const fmt = val => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val);
        document.getElementById('res-price-range').textContent = `${fmt(minP)} - ${fmt(maxP)}`;

        const nameMap = { bathtub: 'Bak Mandi Tembaga', chandelier: 'Lampu Chandelier', relief: 'Relief Dinding', dome: 'Kubah Masjid', vase: 'Wastafel / Decor' };
        const waMsg = encodeURIComponent(`Halo Admin Aura Copper, saya berminat custom order:\n- Produk: ${nameMap[prod]}\n- Ukuran: ${lM*100}x${wM*100}x${hM*100} cm (${thick}mm)\n- Material: ${mat === 'copper' ? 'Tembaga Murni 99.9%' : 'Kuningan Gold'}\n- Estimasi: ${area.toFixed(2)} m² / ${weight.toFixed(1)} kg (${fmt(minP)} - ${fmt(maxP)})`);

        const btnWa = document.getElementById('btn-whatsapp-quote');
        if (btnWa) btnWa.href = `https://wa.me/6281332804773?text=${waMsg}`;
    }

    calculate();


    // --- 6. PRODUCTS CATALOG & FILTER SYSTEM ---
    const products = [
        { id: '1',  title: 'Set Prasmanan Tembaga Ukir Tradisional', category: 'decor',      price: 'Rp 8.500.000',  desc: 'Set prasmanan tembaga ukir lengkap dengan frame oval artistik dan motif flora klasik Boyolali.', material: 'Tembaga Murni 99.9%', finish: 'Rose Copper Polished', dims: 'Set 6 pcs', img: 'assets/products/prod-01.jpg' },
        { id: '2',  title: 'Set Kendil Ukir Tembaga Antik',         category: 'decor',      price: 'Rp 6.200.000',  desc: 'Kendil tembaga ukir khas Jawa dengan tutup berpegangan dan kaki ornamen berlubang tembus.', material: 'Tembaga Murni 99.9%', finish: 'Antique Copper Patina', dims: 'Set 4 pcs', img: 'assets/products/prod-02.jpg' },
        { id: '3',  title: 'Chafing Dish Prasmanan Persegi Ukir',   category: 'decor',      price: 'Rp 9.800.000',  desc: 'Chafing dish persegi tembaga ukir motif bunga premium, cocok untuk hotel dan catering mewah.', material: 'Tembaga Murni', finish: 'Polished Copper', dims: '45 x 35 x 40 cm', img: 'assets/products/prod-03.jpg' },
        { id: '4',  title: 'Set Mangkuk Hammered Copper Polished',  category: 'decor',      price: 'Rp 4.500.000',  desc: 'Satu set mangkuk tembaga hammered finish mengkilap dengan tutup kubah elegan, kualitas ekspor.', material: 'Tembaga Murni 99.9%', finish: 'Mirror Polished', dims: 'Set 8 pcs', img: 'assets/products/prod-04.jpg' },
        { id: '5',  title: 'Kendil Tembaga Hammered Outdoor Grill', category: 'decor',      price: 'Rp 5.200.000',  desc: 'Kendil tembaga hammered besar untuk outdoor barbecue, kolam dan dekorasi taman.', material: 'Tembaga Murni 1.2mm', finish: 'Hammered Natural', dims: 'Ø 50 x 80 cm', img: 'assets/products/prod-05.jpg' },
        { id: '6',  title: 'Set Prasmanan Brass Gold Premium',      category: 'decor',      price: 'Rp 12.000.000', desc: 'Set prasmanan kuningan emas berkilau dengan ukiran kaligrafi, ideal untuk acara pernikahan mewah.', material: 'Kuningan Impor Class A', finish: 'Gold Polished', dims: 'Set 6 pcs', img: 'assets/products/prod-06.jpg' },
        { id: '7',  title: 'Set Prasmanan Brass 3-Burner Premium',  category: 'decor',      price: 'Rp 15.000.000', desc: 'Set prasmanan kuningan 3 burner lengkap dengan rangka dan tutup kubah mewah, untuk ballroom hotel.', material: 'Kuningan Impor Class A', finish: 'High Gloss Gold', dims: 'Set lengkap', img: 'assets/products/prod-07.jpg' },
        { id: '8',  title: 'Lampu Chandelier Masjid Tembaga Ukir', category: 'chandelier', price: 'Rp 45.000.000', desc: 'Chandelier masjid tembaga ukir motif sulur dengan sembilan lengan dan rosette tengah mewah.', material: 'Tembaga Murni', finish: 'Antique Rose Copper', dims: 'Ø 180 cm', img: 'assets/products/prod-08.jpg' },
        { id: '9',  title: 'Lampu Chandelier Kuningan Klasik Mewah', category: 'chandelier', price: 'Rp 65.000.000', desc: 'Lampu chandelier kuningan 16-cabang dengan arm spiral elegan untuk ballroom, restoran fine-dining.', material: 'Kuningan Impor Class A', finish: 'Antique Burnished Gold', dims: 'Ø 250 cm, 16-arm', img: 'assets/products/prod-09.jpg' },
        { id: '10', title: 'Cermin Tembaga Ukir Oval Antique',     category: 'relief',     price: 'Rp 9.500.000',  desc: 'Bingkai cermin oval tembaga ukir motif floral klasik dengan patina hitam antik berkesan mewah.', material: 'Tembaga Red-Copper', finish: 'Burnished Black Antique', dims: '80 x 110 cm', img: 'assets/products/prod-13.jpg' },
        { id: '11', title: 'Relief Pintu Kabah Kuningan Framed',   category: 'relief',     price: 'Rp 18.000.000', desc: 'Replika relief Pintu Kabah dalam bingkai mewah dari kuningan emas, dilengkapi kaligrafi detail.', material: 'Kuningan Impor', finish: 'Gold Polish', dims: '60 x 85 cm', img: 'assets/products/prod-14.jpg' },
        { id: '12', title: 'Jam Dinding Kuningan Dekoratif',        category: 'decor',      price: 'Rp 4.200.000',  desc: 'Jam dinding kuningan artistik dengan ornamen bunga timbul dan ring lingkar ganda, cocok untuk foyer.', material: 'Kuningan Impor', finish: 'Gold Polished', dims: '70 x 130 cm', img: 'assets/products/prod-15.jpg' }
    ];

    const catalogGrid = document.getElementById('products-grid');

    function renderCatalog(filter = 'all') {
        if (!catalogGrid) return;
        const list = filter === 'all' ? products : products.filter(p => p.category === filter);
        catalogGrid.innerHTML = list.map(p => `
            <div class="product-card glass-card" data-tilt data-tilt-max="6" data-tilt-speed="400" data-tilt-glare data-tilt-max-glare="0.1">
                <div class="product-thumb">
                    <img src="${p.img}" alt="${p.title} - Kerajinan Tembaga Boyolali" loading="lazy" decoding="async" class="product-img">
                    <span class="product-badge-tag">${p.material}</span>
                    <div class="product-img-overlay"><i class="fa-solid fa-magnifying-glass"></i> Lihat Detail</div>
                </div>
                <div class="product-info">
                    <div>
                        <h3 class="product-title">${p.title}</h3>
                        <p class="product-desc">${p.desc}</p>
                    </div>
                    <div class="product-meta">
                        <span class="product-price-est">${p.price}</span>
                        <button class="btn btn-secondary btn-sm btn-detail" data-id="${p.id}">Detail <i class="fa-solid fa-arrow-right"></i></button>
                    </div>
                </div>
            </div>`).join('');

        // Re-init VanillaTilt for new cards
        initTilt(document.querySelectorAll('.product-card[data-tilt]'), {
            max: 6, speed: 400, glare: true, 'max-glare': 0.1, perspective: 1200, scale: 1.02,
        });
    }

    renderCatalog();

    // Filter Buttons Delegation
    const filterContainer = document.querySelector('.catalog-filters');
    if (filterContainer) {
        filterContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('btn-filter')) {
                document.querySelectorAll('.btn-filter').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                renderCatalog(e.target.dataset.filter);
            }
        });
    }

    // Modal & Catalog Detail Delegation
    const modal = document.getElementById('product-modal');
    const modalContent = document.getElementById('modal-content');

    if (catalogGrid) {
        catalogGrid.addEventListener('click', (e) => {
            const btn = e.target.closest('.btn-detail');
            if (btn) {
                const prod = products.find(p => p.id === btn.dataset.id);
                if (prod && modal && modalContent) {
                    modalContent.innerHTML = `
                        <div class="modal-img-col">
                            <img src="${prod.img}" alt="${prod.title} - Kerajinan Tembaga Boyolali Asli" loading="eager" decoding="async" class="modal-product-img">
                        </div>
                        <div class="modal-info-col">
                            <span class="badge-pill mb-2"><i class="fa-solid fa-certificate"></i> Handcrafted Boyolali</span>
                            <h2 style="font-size:1.6rem; margin:0.8rem 0;">${prod.title}</h2>
                            <p style="color:var(--text-muted); margin-bottom:1.2rem; font-size:0.95rem;">${prod.desc}</p>
                            <div style="background:rgba(255,255,255,0.05); padding:1rem; border-radius:8px; margin-bottom:1.2rem; font-size:0.92rem;">
                                <div style="margin-bottom:0.4rem;"><strong style="color:var(--color-copper);">Bahan:</strong> ${prod.material}</div>
                                <div style="margin-bottom:0.4rem;"><strong style="color:var(--color-copper);">Finishing:</strong> ${prod.finish}</div>
                                <div><strong style="color:var(--color-copper);">Dimensi:</strong> ${prod.dims}</div>
                            </div>
                            <div style="font-size:1.5rem; font-weight:700; color:var(--brass-gold); margin-bottom:1.5rem;">${prod.price}</div>
                            <a href="https://wa.me/6281332804773?text=${encodeURIComponent('Halo Admin Aura Copper, saya berminat order:\n- Produk: ' + prod.title + '\n- Material: ' + prod.material + '\n- Tolong info lebih lanjut ya')}" target="_blank" rel="noopener" class="btn btn-primary btn-block btn-lg btn-wa">
                                <i class="fa-brands fa-whatsapp"></i> Order via WhatsApp
                            </a>
                        </div>`;
                    modal.classList.add('open');
                }
            }
        });
    }

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal || e.target.classList.contains('modal-close')) {
                modal.classList.remove('open');
            }
        });
    }


    // --- 7. FAQ ACCORDION DELEGATION ---
    const faqWrapper = document.querySelector('.faq-accordion-wrapper');
    if (faqWrapper) {
        faqWrapper.addEventListener('click', (e) => {
            const qBtn = e.target.closest('.faq-question');
            if (qBtn) {
                const faqItem = qBtn.parentElement;
                const active = faqItem.classList.contains('active');
                document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
                if (!active) faqItem.classList.add('active');
            }
        });
    }

    // --- 8. LENIS - ULTRA SMOOTH SCROLL ---
    if (typeof Lenis !== 'undefined') {
        const lenis = new Lenis({
            duration: 1.1,
            easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });

        if (typeof gsap !== 'undefined') {
            // Let GSAP ticker be the single RAF driver — avoids double-loop
            gsap.ticker.add(time => lenis.raf(time * 1000));
            gsap.ticker.lagSmoothing(0);
            if (typeof ScrollTrigger !== 'undefined') {
                lenis.on('scroll', ScrollTrigger.update);
            }
        } else {
            // Fallback: own RAF only if GSAP isn't loaded
            (function rafFallback(time) {
                lenis.raf(time);
                requestAnimationFrame(rafFallback);
            })(0);
        }
    }

    // --- 9. AOS - ANIMATE ON SCROLL ---
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 400,
            easing: 'ease-out-cubic',
            once: true,
            offset: 60,
            delay: 0,
        });
    }

    // --- 9b. SWIPER - GALLERY CAROUSEL ---
    if (typeof Swiper !== 'undefined') {
        new Swiper('.gallery-swiper', {
            loop: true,
            speed: 400,
            autoplay: { delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true },
            slidesPerView: 1,
            centeredSlides: true,
            keyboard: { enabled: true },
            pagination: { el: '.gallery-pagination', clickable: true },
            navigation: { prevEl: '.gallery-prev', nextEl: '.gallery-next' },
            effect: 'slide',
            breakpoints: {
                768: { slidesPerView: 1 },
            },
        });
    }

    // --- 10. GSAP SCROLLTRIGGER - PREMIUM REVEAL ANIMATIONS ---
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger, TextPlugin);

        // Section headings fade-in on enter
        gsap.utils.toArray('.section-header').forEach(el => {
            gsap.from(el, {
                opacity: 0, y: 20, duration: 0.45, ease: 'power2.out',
                scrollTrigger: { trigger: el, start: 'top 90%', once: true },
            });
        });

        // Stat & process cards stagger (capped delay so it doesn't feel slow)
        gsap.utils.toArray('.stat-card, .process-step-item').forEach((card, i) => {
            gsap.from(card, {
                opacity: 0, y: 20, duration: 0.35,
                delay: Math.min(i * 0.04, 0.2),
                ease: 'power2.out',
                scrollTrigger: { trigger: card, start: 'top 90%', once: true },
            });
        });

        // Hero title SplitType character animation
        if (typeof SplitType !== 'undefined') {
            const heroTitle = document.querySelector('.hero-title');
            if (heroTitle) {
                const split = new SplitType(heroTitle, { types: 'words,chars' });
                gsap.from(split.chars, {
                    opacity: 0,
                    y: 20,
                    stagger: 0.02,
                    duration: 0.5,
                    ease: 'power3.out',
                    delay: 0.2,
                });
            }
        }
    }

    function initTilt(elements, options) {
        if (typeof VanillaTilt === 'undefined') return;
        const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (canHover && !reduceMotion) {
            VanillaTilt.init(elements, options);
        }
    }

    // --- 11. VANILLA TILT - 3D CARD EFFECT ---
    initTilt(document.querySelectorAll('.katalog-card, .stat-card, .process-step'), {
        max: 8,
        speed: 400,
        glare: true,
        'max-glare': 0.15,
        perspective: 1200,
        scale: 1.03,
    });

    // --- 12. TIPPY.JS - SMART TOOLTIPS ---
    if (typeof tippy !== 'undefined') {
        // Tooltip pada tombol WhatsApp
        tippy('.btn-wa', {
            content: 'Chat langsung via WhatsApp!',
            theme: 'translucent',
            placement: 'top',
            animation: 'scale',
        });

        // Tooltip pada material finish buttons
        tippy('[data-material]', {
            content(ref) {
                const labels = {
                    polished: '✨ Kilap cermin premium, tahan lama',
                    antique: '🟫 Patina gelap antik, kesan klasik',
                    oxidized: '🟢 Oksidasi hijau alami, unik',
                    raw: '🪙 Tekstur mentah asli tembaga',
                };
                return labels[ref.dataset.material] || ref.dataset.material;
            },
            theme: 'translucent',
            placement: 'bottom',
            animation: 'shift-away',
        });

        // Tooltip pada texture buttons
        tippy('[data-texture]', {
            content(ref) {
                const labels = {
                    hammered: '🔨 Tempa manual bintik khas pengrajin',
                    engraved: '🖊️ Ukir garis motif dekoratif',
                    smooth: '🪞 Permukaan halus mirror finish',
                };
                return labels[ref.dataset.texture] || ref.dataset.texture;
            },
            theme: 'translucent',
            placement: 'bottom',
            animation: 'shift-away',
        });
    }

    // --- 13. COUNTUP.JS - ANIMATED NUMBER COUNTERS ---
    if (typeof CountUp !== 'undefined') {
        const counterOptions = { duration: 2.5, useEasing: true, useGrouping: true };

        const observeCounters = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const target = parseInt(el.dataset.target, 10);
                    if (!isNaN(target)) {
                        const cu = new CountUp.CountUp(el, target, counterOptions);
                        if (!cu.error) cu.start();
                        observeCounters.unobserve(el);
                    }
                }
            });
        }, { threshold: 0.5 });

        document.querySelectorAll('[data-target]').forEach(el => observeCounters.observe(el));
    }

});
