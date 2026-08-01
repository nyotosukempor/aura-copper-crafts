/* ==========================================================================
   AURA COPPER & BRASS CRAFTS - INTERACTIVE ENGINE & ANIMATION LOGIC
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* --------------------------------------------------------------------------
       1. NAVBAR SCROLL SPY & MOBILE TOGGLE
       -------------------------------------------------------------------------- */
    const header = document.getElementById('main-header');
    const mainNav = document.getElementById('main-nav');
    const mobileToggle = document.getElementById('mobile-toggle');

    let scrollTicking = false;
    window.addEventListener('scroll', () => {
        if (!scrollTicking) {
            requestAnimationFrame(() => {
                if (header) header.classList.toggle('scrolled', window.scrollY > 40);
                
                const sections = document.querySelectorAll('section[id]');
                const scrollY = window.scrollY;
                let currentId = '';
                sections.forEach(s => {
                    if (scrollY >= s.offsetTop - 140) currentId = s.id;
                });
                
                document.querySelectorAll('.nav-link').forEach(l => {
                    l.classList.toggle('active', l.getAttribute('href') === `#${currentId}`);
                });
                scrollTicking = false;
            });
            scrollTicking = true;
        }
    }, { passive: true });

    if (mobileToggle && mainNav) {
        mobileToggle.addEventListener('click', () => {
            const isOpen = mainNav.classList.toggle('open');
            const icon = mobileToggle.querySelector('i');
            if (icon) icon.className = `fa-solid ${isOpen ? 'fa-xmark' : 'fa-bars'}`;
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                mainNav.classList.remove('open');
                const icon = mobileToggle.querySelector('i');
                if (icon) icon.className = 'fa-solid fa-bars';
            });
        });
    }

    /* --------------------------------------------------------------------------
       2. HERO SPARK PARTICLES CANVAS
       -------------------------------------------------------------------------- */
    const canvas = document.getElementById('particle-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let w = canvas.width = window.innerWidth;
        let h = canvas.height = window.innerHeight;

        window.addEventListener('resize', () => {
            w = canvas.width = window.innerWidth;
            h = canvas.height = window.innerHeight;
        }, { passive: true });

        const particles = Array.from({ length: 26 }, () => ({
            x: Math.random() * w,
            y: Math.random() * h,
            r: Math.random() * 2.2 + 0.5,
            color: Math.random() > 0.5 ? '#f59e0b' : '#d97736',
            vx: (Math.random() - 0.5) * 0.35,
            vy: -Math.random() * 0.65 - 0.2
        }));

        const heroEl = document.getElementById('hero');
        let heroVisible = true;
        if (typeof IntersectionObserver !== 'undefined' && heroEl) {
            new IntersectionObserver(([e]) => { heroVisible = e.isIntersecting; }, { threshold: 0 }).observe(heroEl);
        }

        ctx.shadowBlur = 8;
        (function renderSparks() {
            if (heroVisible) {
                ctx.clearRect(0, 0, w, h);
                particles.forEach(p => {
                    p.x += p.vx;
                    p.y += p.vy;
                    if (p.y < 0) {
                        p.y = h;
                        p.x = Math.random() * w;
                    }
                    ctx.shadowColor = p.color;
                    ctx.fillStyle = p.color;
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                    ctx.fill();
                });
            }
            requestAnimationFrame(renderSparks);
        })();
    }

    /* --------------------------------------------------------------------------
       3. STUDIO CUSTOMIZER ENGINE (AI PRODUCT PHOTO & DYNAMIC FILTER OVERLAYS)
       -------------------------------------------------------------------------- */
    const state = {
        product: 'bathtub',
        material: 'copper',
        finish: 'polished',
        texture: 'hammered'
    };

    // Category default fallbacks
    const categoryDefaults = {
        bathtub: 'assets/products/bathtub_copper_antique.png',
        chandelier: 'assets/products/chandelier_brass_shiny.png',
        sink: 'assets/products/sink_copper_green.png',
        relief: 'assets/products/relief_copper_etched.png',
        dome: 'assets/products/dome_brass_polished.png',
        table: 'assets/products/prod-03.jpg',
        vase: 'assets/products/prod-05.jpg'
    };

    // Photo matrix lookup table for real AI product assets
    const photoMatrix = {
        bathtub: {
            copper: { polished: 'assets/products/prod-04.jpg', antique: 'assets/products/bathtub_copper_antique.png', green: 'assets/products/sink_copper_green.png', satin: 'assets/products/prod-01.jpg', raw: 'assets/products/bathtub_copper_antique.png' },
            brass: { polished: 'assets/products/prod-06.jpg', antique: 'assets/products/prod-07.jpg', green: 'assets/products/prod-07.jpg', satin: 'assets/products/prod-06.jpg', raw: 'assets/products/prod-06.jpg' },
            bronze: { polished: 'assets/products/bathtub_copper_antique.png', antique: 'assets/products/bathtub_copper_antique.png', green: 'assets/products/sink_copper_green.png', satin: 'assets/products/prod-05.jpg', raw: 'assets/products/prod-05.jpg' },
            dual: { polished: 'assets/products/prod-06.jpg', antique: 'assets/products/bathtub_copper_antique.png', green: 'assets/products/sink_copper_green.png', satin: 'assets/products/prod-03.jpg', raw: 'assets/products/prod-05.jpg' }
        },
        chandelier: {
            copper: { polished: 'assets/products/prod-08.jpg', antique: 'assets/products/prod-08.jpg', green: 'assets/products/prod-08.jpg', satin: 'assets/products/prod-08.jpg', raw: 'assets/products/prod-08.jpg' },
            brass: { polished: 'assets/products/chandelier_brass_shiny.png', antique: 'assets/products/prod-09.jpg', green: 'assets/products/prod-09.jpg', satin: 'assets/products/chandelier_brass_shiny.png', raw: 'assets/products/prod-09.jpg' },
            bronze: { polished: 'assets/products/chandelier_brass_shiny.png', antique: 'assets/products/prod-08.jpg', green: 'assets/products/prod-08.jpg', satin: 'assets/products/chandelier_brass_shiny.png', raw: 'assets/products/prod-08.jpg' },
            dual: { polished: 'assets/products/chandelier_brass_shiny.png', antique: 'assets/products/prod-08.jpg', green: 'assets/products/prod-08.jpg', satin: 'assets/products/chandelier_brass_shiny.png', raw: 'assets/products/prod-08.jpg' }
        },
        sink: {
            copper: { polished: 'assets/products/prod-04.jpg', antique: 'assets/products/prod-02.jpg', green: 'assets/products/sink_copper_green.png', satin: 'assets/products/prod-04.jpg', raw: 'assets/products/sink_copper_green.png' },
            brass: { polished: 'assets/products/prod-06.jpg', antique: 'assets/products/prod-07.jpg', green: 'assets/products/sink_copper_green.png', satin: 'assets/products/prod-06.jpg', raw: 'assets/products/prod-06.jpg' },
            bronze: { polished: 'assets/products/prod-02.jpg', antique: 'assets/products/prod-02.jpg', green: 'assets/products/sink_copper_green.png', satin: 'assets/products/prod-05.jpg', raw: 'assets/products/prod-05.jpg' },
            dual: { polished: 'assets/products/prod-06.jpg', antique: 'assets/products/prod-02.jpg', green: 'assets/products/sink_copper_green.png', satin: 'assets/products/prod-04.jpg', raw: 'assets/products/prod-05.jpg' }
        },
        relief: {
            copper: { polished: 'assets/products/relief_copper_etched.png', antique: 'assets/products/prod-13.jpg', green: 'assets/products/prod-13.jpg', satin: 'assets/products/relief_copper_etched.png', raw: 'assets/products/relief_copper_etched.png' },
            brass: { polished: 'assets/products/prod-14.jpg', antique: 'assets/products/prod-14.jpg', green: 'assets/products/prod-14.jpg', satin: 'assets/products/prod-14.jpg', raw: 'assets/products/prod-14.jpg' },
            bronze: { polished: 'assets/products/relief_copper_etched.png', antique: 'assets/products/prod-13.jpg', green: 'assets/products/prod-13.jpg', satin: 'assets/products/relief_copper_etched.png', raw: 'assets/products/relief_copper_etched.png' },
            dual: { polished: 'assets/products/prod-14.jpg', antique: 'assets/products/prod-13.jpg', green: 'assets/products/prod-13.jpg', satin: 'assets/products/prod-14.jpg', raw: 'assets/products/prod-13.jpg' }
        },
        dome: {
            copper: { polished: 'assets/products/dome_brass_polished.png', antique: 'assets/products/prod-08.jpg', green: 'assets/products/prod-08.jpg', satin: 'assets/products/dome_brass_polished.png', raw: 'assets/products/prod-08.jpg' },
            brass: { polished: 'assets/products/dome_brass_polished.png', antique: 'assets/products/prod-09.jpg', green: 'assets/products/prod-09.jpg', satin: 'assets/products/dome_brass_polished.png', raw: 'assets/products/prod-09.jpg' },
            bronze: { polished: 'assets/products/dome_brass_polished.png', antique: 'assets/products/prod-08.jpg', green: 'assets/products/prod-08.jpg', satin: 'assets/products/dome_brass_polished.png', raw: 'assets/products/prod-08.jpg' },
            dual: { polished: 'assets/products/dome_brass_polished.png', antique: 'assets/products/prod-08.jpg', green: 'assets/products/prod-08.jpg', satin: 'assets/products/dome_brass_polished.png', raw: 'assets/products/prod-08.jpg' }
        },
        table: {
            copper: { polished: 'assets/products/prod-03.jpg', antique: 'assets/products/prod-05.jpg', green: 'assets/products/prod-02.jpg', satin: 'assets/products/prod-03.jpg', raw: 'assets/products/prod-05.jpg' },
            brass: { polished: 'assets/products/prod-07.jpg', antique: 'assets/products/prod-07.jpg', green: 'assets/products/prod-07.jpg', satin: 'assets/products/prod-07.jpg', raw: 'assets/products/prod-07.jpg' },
            bronze: { polished: 'assets/products/prod-05.jpg', antique: 'assets/products/prod-05.jpg', green: 'assets/products/prod-05.jpg', satin: 'assets/products/prod-05.jpg', raw: 'assets/products/prod-05.jpg' },
            dual: { polished: 'assets/products/prod-07.jpg', antique: 'assets/products/prod-03.jpg', green: 'assets/products/prod-05.jpg', satin: 'assets/products/prod-07.jpg', raw: 'assets/products/prod-03.jpg' }
        },
        vase: {
            copper: { polished: 'assets/products/prod-04.jpg', antique: 'assets/products/prod-02.jpg', green: 'assets/products/sink_copper_green.png', satin: 'assets/products/prod-01.jpg', raw: 'assets/products/prod-05.jpg' },
            brass: { polished: 'assets/products/prod-15.jpg', antique: 'assets/products/prod-06.jpg', green: 'assets/products/prod-06.jpg', satin: 'assets/products/prod-15.jpg', raw: 'assets/products/prod-06.jpg' },
            bronze: { polished: 'assets/products/prod-02.jpg', antique: 'assets/products/prod-02.jpg', green: 'assets/products/prod-02.jpg', satin: 'assets/products/prod-02.jpg', raw: 'assets/products/prod-05.jpg' },
            dual: { polished: 'assets/products/prod-15.jpg', antique: 'assets/products/prod-02.jpg', green: 'assets/products/prod-02.jpg', satin: 'assets/products/prod-01.jpg', raw: 'assets/products/prod-05.jpg' }
        }
    };

    function getPhotoForState(p, m, f, t) {
        if (photoMatrix[p] && photoMatrix[p][m] && photoMatrix[p][m][f]) {
            return photoMatrix[p][m][f];
        }
        if (categoryDefaults[p]) {
            return categoryDefaults[p];
        }
        return 'assets/products/prod-01.jpg';
    }

    // Comprehensive Event Listeners for All Control Elements
    const customizerPanel = document.querySelector('.customizer-panel');
    if (customizerPanel) {
        // Product Selector Buttons
        customizerPanel.querySelectorAll('.btn-select-product').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                customizerPanel.querySelectorAll('.btn-select-product').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                state.product = btn.dataset.product;
                updateCustomizerPreview();
            });
        });

        // Material Radio Cards
        customizerPanel.querySelectorAll('.radio-card').forEach(card => {
            const input = card.querySelector('input[name="material"]');
            if (input) {
                const handleMaterialChange = () => {
                    customizerPanel.querySelectorAll('.radio-card').forEach(c => c.classList.remove('active'));
                    card.classList.add('active');
                    input.checked = true;
                    state.material = input.value;
                    updateCustomizerPreview();
                };
                card.addEventListener('click', handleMaterialChange);
                input.addEventListener('change', handleMaterialChange);
            }
        });

        // Finish Swatch Buttons
        customizerPanel.querySelectorAll('.swatch-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                customizerPanel.querySelectorAll('.swatch-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                state.finish = btn.dataset.finish;
                updateCustomizerPreview();
            });
        });

        // Texture Buttons
        customizerPanel.querySelectorAll('.btn-texture').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                customizerPanel.querySelectorAll('.btn-texture').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                state.texture = btn.dataset.texture;
                updateCustomizerPreview();
            });
        });
    }

    // Reset Studio Button
    const resetBtn = document.getElementById('reset-customizer');
    if (resetBtn) {
        resetBtn.addEventListener('click', (e) => {
            e.preventDefault();
            state.product = 'bathtub';
            state.material = 'copper';
            state.finish = 'polished';
            state.texture = 'hammered';

            if (customizerPanel) {
                customizerPanel.querySelectorAll('.btn-select-product').forEach(b => b.classList.toggle('active', b.dataset.product === 'bathtub'));
                customizerPanel.querySelectorAll('.swatch-btn').forEach(b => b.classList.toggle('active', b.dataset.finish === 'polished'));
                customizerPanel.querySelectorAll('.btn-texture').forEach(b => b.classList.toggle('active', b.dataset.texture === 'hammered'));
                customizerPanel.querySelectorAll('.radio-card').forEach(c => {
                    const radio = c.querySelector('input');
                    if (radio) {
                        radio.checked = radio.value === 'copper';
                        c.classList.toggle('active', radio.value === 'copper');
                    }
                });
            }

            updateCustomizerPreview();
        });
    }

    // Main Dynamic Preview Update Engine
    function updateCustomizerPreview() {
        const realImg = document.getElementById('customizer-real-img') || document.querySelector('.real-photo-img');
        const viewerContainer = document.getElementById('real-photo-viewer') || document.querySelector('.real-photo-viewer');

        const labels = {
            product: { bathtub: 'Bak Mandi Tembaga', chandelier: 'Lampu & Chandelier Kuningan', sink: 'Wastafel Tembaga & Kuningan', relief: 'Relief & Dinding Tembaga', dome: 'Kubah Masjid Tembaga', table: 'Meja Furniture Logam', vase: 'Vas & Ornamen Decor' },
            material: { copper: 'Tembaga Murni 99.9%', brass: 'Kuningan Impor Grade A', bronze: 'Perunggu (Bronze)', dual: 'Dual-Tone (Copper + Brass)' },
            finish: { polished: 'Polished Shiny Mirror', antique: 'Antique Patina Black', green: 'Green Oxidation Patina', satin: 'Brushed Satin Matt', raw: 'Raw Natural Untreated' },
            texture: { hammered: 'Hammered Dot (Tempa Bintik)', smooth: 'Smooth Mirror (Polos)', etched: 'Etched Pattern (Ukir)', chiseled: 'Chiseled Lines (Pahat)' }
        };

        const tagProduct = document.getElementById('spec-tag-product');
        const tagMaterial = document.getElementById('spec-tag-material');
        const tagFinish = document.getElementById('spec-tag-finish');
        const tagTexture = document.getElementById('spec-tag-texture');

        if (tagProduct) tagProduct.textContent = `Visualisasi: ${labels.product[state.product] || state.product}`;
        if (tagMaterial) tagMaterial.textContent = `Material: ${labels.material[state.material] || state.material}`;
        if (tagFinish) tagFinish.textContent = `Finishing: ${labels.finish[state.finish] || state.finish}`;
        if (tagTexture) tagTexture.textContent = `Tekstur: ${labels.texture[state.texture] || state.texture}`;

        // Apply Dynamic Metallic Filter Overlay
        if (realImg) {
            realImg.className = `real-photo-img filter-${state.finish}`;
        }
        if (viewerContainer) {
            viewerContainer.className = `real-photo-viewer texture-${state.texture}`;
        }

        if (realImg) {
            const targetSrc = getPhotoForState(state.product, state.material, state.finish, state.texture);

            // Broken image fallback handler to prevent 404
            realImg.onerror = () => {
                realImg.src = 'assets/products/prod-01.jpg';
            };

            // Smooth crossfade animation via GSAP if available, or opacity class
            if (typeof gsap !== 'undefined') {
                gsap.to(realImg, {
                    opacity: 0.2, scale: 0.98, duration: 0.18, onComplete: () => {
                        realImg.src = targetSrc;
                        realImg.alt = `${labels.product[state.product]} - ${labels.material[state.material]} (${labels.finish[state.finish]})`;
                        gsap.to(realImg, { opacity: 1, scale: 1, duration: 0.35, ease: 'power2.out' });
                    }
                });
            } else {
                realImg.classList.add('fade-out');
                setTimeout(() => {
                    realImg.src = targetSrc;
                    realImg.alt = `${labels.product[state.product]} - ${labels.material[state.material]} (${labels.finish[state.finish]})`;
                    realImg.classList.remove('fade-out');
                }, 200);
            }
        }

        // Update WhatsApp Order Link dynamically
        const btnApply = document.getElementById('btn-apply-customizer');
        if (btnApply) {
            const waText = encodeURIComponent(
                `Halo Admin Aura Copper, saya tertarik memesan / meminta penawaran harga resmi untuk spesifikasi produk kustom berikut:\n` +
                `- Produk: ${labels.product[state.product] || state.product}\n` +
                `- Jenis Logam: ${labels.material[state.material] || state.material}\n` +
                `- Finishing Warna: ${labels.finish[state.finish] || state.finish}\n` +
                `- Tekstur Permukaan: ${labels.texture[state.texture] || state.texture}\n\n` +
                `Mohon diinfokan ketersediaan, waktu pengerjaan, dan estimasi biayanya. Terima kasih.`
            );
            btnApply.setAttribute('href', `https://wa.me/6281332804773?text=${waText}`);
            btnApply.setAttribute('target', '_blank');
            btnApply.setAttribute('rel', 'noopener');
        }
    }

    // Initial Trigger on Load
    updateCustomizerPreview();

    // Direct WhatsApp Button click handler
    const btnApply = document.getElementById('btn-apply-customizer');
    if (btnApply) {
        btnApply.addEventListener('click', (e) => {
            const labels = {
                product: { bathtub: 'Bak Mandi Tembaga', chandelier: 'Lampu & Chandelier Kuningan', sink: 'Wastafel Tembaga', relief: 'Relief Dinding Tembaga', dome: 'Kubah Masjid Tembaga', table: 'Meja Furniture Logam', vase: 'Vas Dekorasi Logam' },
                material: { copper: 'Tembaga Murni 99.9%', brass: 'Kuningan Grade A', bronze: 'Perunggu Bronze', dual: 'Dual-Tone (Copper + Brass)' },
                finish: { polished: 'Polished Shiny Mirror', antique: 'Antique Patina', green: 'Green Oxidation Patina', satin: 'Brushed Satin', raw: 'Raw Natural' },
                texture: { hammered: 'Hammered Dot (Tempa Bintik)', smooth: 'Smooth Mirror', etched: 'Etched Pattern', chiseled: 'Chiseled Lines' }
            };

            const waText = encodeURIComponent(
                `Halo Admin Aura Copper, saya tertarik memesan / meminta penawaran harga resmi untuk spesifikasi produk kustom berikut:\n` +
                `- Produk: ${labels.product[state.product] || state.product}\n` +
                `- Jenis Logam: ${labels.material[state.material] || state.material}\n` +
                `- Finishing Warna: ${labels.finish[state.finish] || state.finish}\n` +
                `- Tekstur Permukaan: ${labels.texture[state.texture] || state.texture}\n\n` +
                `Mohon diinfokan ketersediaan, waktu pengerjaan, dan estimasi biayanya. Terima kasih.`
            );

            btnApply.href = `https://wa.me/6281332804773?text=${waText}`;
        });
    }

    /* --------------------------------------------------------------------------
       4. FORM CUSTOM ORDER & TECHNICAL SPECIFICATIONS LOGIC
       -------------------------------------------------------------------------- */
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
        else if (prod === 'table') area = (lM * wM) + 4 * (wM * 0.05);
        else area = (2 * Math.PI * (wM / 2) * hM) + (Math.PI * Math.pow(wM / 2, 2));

        const density = mat === 'copper' ? 8.96 : (mat === 'bronze' ? 8.8 : (mat === 'dual' ? 8.7 : 8.5));
        const weight = area * thick * density;

        const resArea = document.getElementById('res-surface-area');
        const resWeight = document.getElementById('res-weight');

        if (resArea) resArea.textContent = `${area.toFixed(2)} m²`;
        if (resWeight) resWeight.textContent = `${weight.toFixed(1)} kg`;

        const nameMap = { bathtub: 'Bak Mandi Tembaga', chandelier: 'Lampu Chandelier', sink: 'Wastafel Logam', relief: 'Relief Dinding', dome: 'Kubah Masjid', table: 'Meja Logam', vase: 'Vas / Decor' };
        const matMap = { copper: 'Tembaga Murni 99.9%', brass: 'Kuningan Gold Class A', bronze: 'Perunggu Bronze', dual: 'Dual-Tone (Tembaga+Kuningan)' };
        
        // WhatsApp Message Format - Official Quotation Request
        const waMsg = encodeURIComponent(
            `Halo Admin Aura Copper, saya ingin meminta penawaran harga resmi untuk custom order berikut:\n` +
            `- Tipe Produk: ${nameMap[prod] || prod}\n` +
            `- Ukuran: ${lM*100} x ${wM*100} x ${hM*100} cm (${thick}mm)\n` +
            `- Jenis Material: ${matMap[mat] || mat}\n` +
            `- Estimasi Kebutuhan Plat: ${area.toFixed(2)} m²\n` +
            `- Estimasi Berat: ${weight.toFixed(1)} kg\n\n` +
            `Mohon diinfokan penawaran harga resmi dan estimasi pengerjaannya. Terima kasih.`
        );

        const btnWa = document.getElementById('btn-whatsapp-quote');
        if (btnWa) btnWa.href = `https://wa.me/6281332804773?text=${waMsg}`;
    }

    calculate();

    /* --------------------------------------------------------------------------
       5. PRODUCTS CATALOG SYSTEM & FILTERS
       -------------------------------------------------------------------------- */
    const products = [
        { id: '1',  title: 'Set Prasmanan Tembaga Ukir Tradisional', category: 'decor',      desc: 'Set prasmanan tembaga ukir lengkap dengan frame oval artistik dan motif flora klasik Boyolali.', material: 'Tembaga Murni 99.9%', finish: 'Rose Copper Polished', dims: 'Set 6 pcs', img: 'assets/products/prod-01.jpg' },
        { id: '2',  title: 'Set Kendil Ukir Tembaga Antik',         category: 'decor',      desc: 'Kendil tembaga ukir khas Jawa dengan tutup berpegangan dan kaki ornamen berlubang tembus.', material: 'Tembaga Murni 99.9%', finish: 'Antique Copper Patina', dims: 'Set 4 pcs', img: 'assets/products/prod-02.jpg' },
        { id: '3',  title: 'Chafing Dish Prasmanan Persegi Ukir',   category: 'decor',      desc: 'Chafing dish persegi tembaga ukir motif bunga premium, cocok untuk hotel dan catering mewah.', material: 'Tembaga Murni', finish: 'Polished Copper', dims: '45 x 35 x 40 cm', img: 'assets/products/prod-03.jpg' },
        { id: '4',  title: 'Set Mangkuk Hammered Copper Polished',  category: 'decor',      desc: 'Satu set mangkuk tembaga hammered finish mengkilap dengan tutup kubah elegan, kualitas ekspor.', material: 'Tembaga Murni 99.9%', finish: 'Mirror Polished', dims: 'Set 8 pcs', img: 'assets/products/prod-04.jpg' },
        { id: '5',  title: 'Kendil Tembaga Hammered Outdoor Grill', category: 'decor',      desc: 'Kendil tembaga hammered besar untuk outdoor barbecue, kolam dan dekorasi taman.', material: 'Tembaga Murni 1.2mm', finish: 'Hammered Natural', dims: 'Ø 50 x 80 cm', img: 'assets/products/prod-05.jpg' },
        { id: '6',  title: 'Set Prasmanan Brass Gold Premium',      category: 'decor',      desc: 'Set prasmanan kuningan emas berkilau dengan ukiran kaligrafi, ideal untuk acara pernikahan mewah.', material: 'Kuningan Impor Class A', finish: 'Gold Polished', dims: 'Set 6 pcs', img: 'assets/products/prod-06.jpg' },
        { id: '7',  title: 'Set Prasmanan Brass 3-Burner Premium',  category: 'decor',      desc: 'Set prasmanan kuningan 3 burner lengkap dengan rangka dan tutup kubah mewah, untuk ballroom hotel.', material: 'Kuningan Impor Class A', finish: 'High Gloss Gold', dims: 'Set lengkap', img: 'assets/products/prod-07.jpg' },
        { id: '8',  title: 'Lampu Chandelier Masjid Tembaga Ukir', category: 'chandelier', desc: 'Chandelier masjid tembaga ukir motif sulur dengan sembilan lengan dan rosette tengah mewah.', material: 'Tembaga Murni', finish: 'Antique Rose Copper', dims: 'Ø 180 cm', img: 'assets/products/prod-08.jpg' },
        { id: '9',  title: 'Lampu Chandelier Kuningan Klasik Mewah', category: 'chandelier', desc: 'Lampu chandelier kuningan 16-cabang dengan arm spiral elegan untuk ballroom, restoran fine-dining.', material: 'Kuningan Impor Class A', finish: 'Antique Burnished Gold', dims: 'Ø 250 cm, 16-arm', img: 'assets/products/prod-09.jpg' },
        { id: '10', title: 'Cermin Tembaga Ukir Oval Antique',     category: 'relief',     desc: 'Bingkai cermin oval tembaga ukir motif floral klasik dengan patina hitam antik berkesan mewah.', material: 'Tembaga Red-Copper', finish: 'Burnished Black Antique', dims: '80 x 110 cm', img: 'assets/products/prod-13.jpg' },
        { id: '11', title: 'Relief Pintu Kabah Kuningan Framed',   category: 'relief',     desc: 'Replika relief Pintu Kabah dalam bingkai mewah dari kuningan emas, dilengkapi kaligrafi detail.', material: 'Kuningan Impor', finish: 'Gold Polish', dims: '60 x 85 cm', img: 'assets/products/prod-14.jpg' },
        { id: '12', title: 'Jam Dinding Kuningan Dekoratif',        category: 'decor',      desc: 'Jam dinding kuningan artistik dengan ornamen bunga timbul dan ring lingkar ganda, cocok untuk foyer.', material: 'Kuningan Impor', finish: 'Gold Polished', dims: '70 x 130 cm', img: 'assets/products/prod-15.jpg' }
    ];

    const catalogGrid = document.getElementById('products-grid');

    function renderCatalog(filter = 'all') {
        if (!catalogGrid) return;
        const list = filter === 'all' ? products : products.filter(p => p.category === filter);
        catalogGrid.innerHTML = list.map(p => `
            <article class="product-card glass-card" data-tilt data-tilt-max="6" data-tilt-speed="400" data-tilt-glare data-tilt-max-glare="0.1">
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
                        <span class="product-spec-tag"><i class="fa-solid fa-ruler-combined"></i> ${p.dims}</span>
                        <button class="btn btn-secondary btn-sm btn-detail" data-id="${p.id}" aria-label="Detail ${p.title}">Detail <i class="fa-solid fa-arrow-right"></i></button>
                    </div>
                </div>
            </article>`).join('');

        initTilt(document.querySelectorAll('.product-card[data-tilt]'), {
            max: 6, speed: 400, glare: true, 'max-glare': 0.1, perspective: 1200, scale: 1.02
        });
    }

    renderCatalog();

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

    /* Modal Handler */
    const modal = document.getElementById('product-modal');
    const modalContent = document.getElementById('modal-content');

    if (catalogGrid) {
        catalogGrid.addEventListener('click', (e) => {
            const btn = e.target.closest('.btn-detail') || e.target.closest('.product-card');
            if (btn) {
                const id = btn.dataset.id || (btn.querySelector('.btn-detail') ? btn.querySelector('.btn-detail').dataset.id : null);
                const prod = products.find(p => p.id === id);
                if (prod && modal && modalContent) {
                    modalContent.innerHTML = `
                        <div class="modal-img-col">
                            <img src="${prod.img}" alt="${prod.title} - Kerajinan Tembaga Boyolali Asli" loading="eager" decoding="async" class="modal-product-img">
                        </div>
                        <div class="modal-info-col">
                            <span class="badge-pill mb-2"><i class="fa-solid fa-certificate"></i> Handcrafted Boyolali</span>
                            <h2 style="font-size:1.6rem; margin:0.8rem 0; font-family:var(--font-heading); color:var(--text-bright);">${prod.title}</h2>
                            <p style="color:var(--text-muted); margin-bottom:1.2rem; font-size:0.95rem; line-height:1.65;">${prod.desc}</p>
                            <div style="background:rgba(255,255,255,0.05); padding:1.2rem; border-radius:var(--radius-md); margin-bottom:1.6rem; border:1px solid var(--border-color); font-size:0.92rem;">
                                <div style="margin-bottom:0.4rem;"><strong style="color:var(--copper-light);">Bahan:</strong> ${prod.material}</div>
                                <div style="margin-bottom:0.4rem;"><strong style="color:var(--copper-light);">Finishing:</strong> ${prod.finish}</div>
                                <div><strong style="color:var(--copper-light);">Dimensi:</strong> ${prod.dims}</div>
                            </div>
                            <a href="https://wa.me/6281332804773?text=${encodeURIComponent('Halo Admin Aura Copper, saya ingin meminta penawaran harga resmi untuk produk:\n- Nama Produk: ' + prod.title + '\n- Material: ' + prod.material + '\n- Finishing: ' + prod.finish + '\n- Dimensi: ' + prod.dims + '\n\nMohon informasi penawaran harga resmi dan ketersediaannya. Terima kasih.')}" target="_blank" rel="noopener" class="btn btn-primary btn-block btn-lg btn-wa">
                                <i class="fa-brands fa-whatsapp"></i> Minta Penawaran Harga via WhatsApp
                            </a>
                        </div>`;
                    modal.classList.add('open');
                    document.body.style.overflow = 'hidden';
                }
            }
        });
    }

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal || e.target.classList.contains('modal-close')) {
                modal.classList.remove('open');
                document.body.style.overflow = '';
            }
        });
    }

    /* --------------------------------------------------------------------------
       6. FAQ ACCORDION DELEGATION
       -------------------------------------------------------------------------- */
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

    /* --------------------------------------------------------------------------
       7. LENIS SMOOTH SCROLL INTEGRATION
       -------------------------------------------------------------------------- */
    if (typeof Lenis !== 'undefined') {
        const lenis = new Lenis({
            duration: 1.1,
            easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });

        if (typeof gsap !== 'undefined') {
            gsap.ticker.add(time => lenis.raf(time * 1000));
            gsap.ticker.lagSmoothing(0);
            if (typeof ScrollTrigger !== 'undefined') {
                lenis.on('scroll', ScrollTrigger.update);
            }
        }
    }

    /* --------------------------------------------------------------------------
       8. AOS & SWIPER CAROUSEL INITIALIZATION
       -------------------------------------------------------------------------- */
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 400,
            easing: 'ease-out-cubic',
            once: true,
            offset: 60,
        });
    }

    if (typeof Swiper !== 'undefined') {
        new Swiper('.gallery-swiper', {
            loop: true,
            speed: 500,
            autoplay: { delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true },
            slidesPerView: 1,
            spaceBetween: 24,
            keyboard: { enabled: true },
            pagination: { el: '.gallery-pagination', clickable: true },
            navigation: { prevEl: '.gallery-prev', nextEl: '.gallery-next' },
            breakpoints: {
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 }
            }
        });
    }

    /* --------------------------------------------------------------------------
       9. GSAP SCROLLTRIGGER ANIMATIONS
       -------------------------------------------------------------------------- */
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger, TextPlugin);

        gsap.utils.toArray('.section-header').forEach(el => {
            gsap.from(el, {
                opacity: 0, y: 25, duration: 0.5, ease: 'power2.out',
                scrollTrigger: { trigger: el, start: 'top 88%', once: true }
            });
        });

        gsap.utils.toArray('.process-step-item, .testimonial-card').forEach((card, i) => {
            gsap.from(card, {
                opacity: 0, y: 30, duration: 0.4,
                delay: Math.min(i * 0.05, 0.25),
                ease: 'power2.out',
                scrollTrigger: { trigger: card, start: 'top 90%', once: true }
            });
        });

        if (typeof SplitType !== 'undefined') {
            const heroTitle = document.querySelector('.hero-title');
            if (heroTitle) {
                const split = new SplitType(heroTitle, { types: 'words,chars' });
                gsap.from(split.chars, {
                    opacity: 0, y: 20, stagger: 0.02, duration: 0.5, ease: 'power3.out', delay: 0.2
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

    initTilt(document.querySelectorAll('.stat-card, .process-step-item'), {
        max: 6, speed: 400, glare: true, 'max-glare': 0.12, perspective: 1200, scale: 1.02
    });

    /* --------------------------------------------------------------------------
       10. TIPPY.JS TOOLTIPS & COUNTUP.JS COUNTERS
       -------------------------------------------------------------------------- */
    if (typeof tippy !== 'undefined') {
        tippy('.btn-wa', {
            content: 'Chat langsung via WhatsApp!',
            theme: 'translucent',
            placement: 'top',
            animation: 'scale'
        });

        tippy('[data-material]', {
            content(ref) {
                const labels = {
                    polished: '✨ Kilap cermin premium, tahan lama',
                    antique: '🟫 Patina gelap antik, kesan klasik',
                    green: '🟢 Oksidasi verdigris hijau, artistik',
                    satin: '🔘 Brushed satin matt, serat halus',
                    raw: '🧱 Raw natural untreated, tembaga murni'
                };
                return labels[ref.dataset.material] || ref.dataset.material;
            },
            theme: 'translucent',
            placement: 'bottom'
        });
    }

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
