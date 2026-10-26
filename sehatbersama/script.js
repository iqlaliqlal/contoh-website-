/* =========================================================
   SehatBersama — script.js
   Daftar fitur:
   1. Data artikel (isi modal)
   2. Navbar: menu mobile, tautan aktif, bayangan saat scroll
   3. Animasi muncul saat halaman digulir
   4. Animasi angka statistik
   5. Modal artikel
   6. Checklist tips sehat + penghitung progres
   7. Kalkulator IMT
   8. Tombol kembali ke atas
   9. Tahun berjalan di footer
   ========================================================= */
'use strict';

/* Cek apakah pengguna meminta animasi dikurangi (aksesibilitas). */
const PREFERS_REDUCED_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- 1. Data artikel ----------
   Isi artikel disimpan sebagai data, lalu ditampilkan ke modal
   memakai textContent (bukan innerHTML) agar aman dari XSS. */
const ARTICLES = {
  kebersihan: {
    title: 'Pentingnya Menjaga Kebersihan Lingkungan',
    category: 'Lingkungan',
    badge: 'badge-mint',
    readTime: '4 menit baca',
    intro: 'Lingkungan yang kotor menjadi tempat berkembang biaknya kuman, lalat, tikus, dan nyamuk yang dapat menularkan penyakit seperti diare, tifus, leptospirosis, dan demam berdarah. Menjaga kebersihan lingkungan merupakan bagian dari Perilaku Hidup Bersih dan Sehat (PHBS) yang dapat dimulai dari rumah.',
    sections: [
      {
        heading: 'Mengapa kebersihan lingkungan penting?',
        items: [
          'Memutus rantai penularan penyakit yang dibawa oleh air, makanan, dan hewan pembawa penyakit.',
          'Menjaga kualitas udara dan air bersih di sekitar tempat tinggal.',
          'Menciptakan lingkungan yang nyaman untuk belajar, bekerja, dan beristirahat.'
        ]
      },
      {
        heading: 'Langkah sederhana yang dapat dilakukan',
        items: [
          'Membuang sampah pada tempatnya dan memilah sampah organik serta anorganik.',
          'Membersihkan saluran air agar tidak tersumbat dan menimbulkan genangan.',
          'Menggunakan jamban sehat dan menjaga kebersihannya.',
          'Membuka jendela setiap hari agar sirkulasi udara dan cahaya matahari masuk ke rumah.',
          'Mencuci tangan dengan sabun dan air mengalir minimal 20 detik.',
          'Ikut serta dalam kegiatan gotong royong membersihkan lingkungan.'
        ]
      },
      {
        heading: 'Peran bersama',
        text: 'Kebersihan lingkungan bukan hanya tanggung jawab petugas kebersihan. Setiap anggota keluarga, warga, dan pelajar dapat berkontribusi melalui kebiasaan kecil yang dilakukan secara konsisten.'
      }
    ],
    source: 'Rujukan umum: Kementerian Kesehatan RI (Perilaku Hidup Bersih dan Sehat; Sanitasi Total Berbasis Masyarakat) dan World Health Organization (WHO).'
  },

  dbd: {
    title: 'Cara Mencegah Penyakit Demam Berdarah',
    category: 'Pencegahan',
    badge: 'badge-blue',
    readTime: '5 menit baca',
    intro: 'Demam Berdarah Dengue (DBD) disebabkan oleh virus dengue yang ditularkan melalui gigitan nyamuk Aedes aegypti. Nyamuk ini umumnya aktif menggigit pada pagi hingga sore hari dan berkembang biak di air jernih yang tergenang, baik di dalam maupun di luar rumah.',
    sections: [
      {
        heading: 'Gerakan 3M Plus',
        items: [
          'Menguras dan menyikat tempat penampungan air seperti bak mandi dan tempayan secara berkala.',
          'Menutup rapat tempat penampungan air agar nyamuk tidak dapat bertelur.',
          'Mendaur ulang atau memanfaatkan kembali barang bekas yang berpotensi menampung air hujan.'
        ]
      },
      {
        heading: 'Langkah "Plus" yang dapat ditambahkan',
        items: [
          'Menaburkan bubuk larvasida pada tempat penampungan air yang sulit dikuras.',
          'Memelihara ikan pemakan jentik di kolam atau bak penampungan.',
          'Menggunakan kelambu, kawat kasa, atau losion antinyamuk.',
          'Tidak menggantung pakaian bekas pakai di dalam rumah.',
          'Memeriksa jentik nyamuk di rumah secara rutin.'
        ]
      },
      {
        heading: 'Kapan harus ke fasilitas kesehatan?',
        text: 'Segera periksakan diri ke puskesmas atau fasilitas pelayanan kesehatan terdekat apabila mengalami demam tinggi mendadak, terutama jika disertai nyeri kepala, nyeri otot, bintik merah pada kulit, mimisan, atau badan terasa sangat lemas.'
      }
    ],
    source: 'Rujukan umum: Kementerian Kesehatan RI (Pemberantasan Sarang Nyamuk 3M Plus) dan World Health Organization (WHO).'
  },

  gizi: {
    title: 'Pola Makan Seimbang untuk Keluarga',
    category: 'Gizi',
    badge: 'badge-mint',
    readTime: '4 menit baca',
    intro: 'Pola makan seimbang berarti mengonsumsi beragam jenis makanan dalam jumlah yang sesuai dengan kebutuhan tubuh. Kementerian Kesehatan RI memperkenalkan panduan "Isi Piringku" sebagai acuan sederhana untuk mengatur porsi makan setiap kali makan.',
    sections: [
      {
        heading: 'Panduan "Isi Piringku"',
        items: [
          'Setengah piring diisi sayur dan buah, dengan porsi sayur lebih banyak daripada buah.',
          'Setengah piring lainnya diisi makanan pokok dan lauk pauk, dengan porsi makanan pokok lebih banyak daripada lauk pauk.',
          'Pilih lauk pauk yang beragam, baik hewani maupun nabati.'
        ]
      },
      {
        heading: 'Batasi gula, garam, dan lemak',
        items: [
          'Gula: tidak lebih dari 4 sendok makan per orang per hari.',
          'Garam: tidak lebih dari 1 sendok teh per orang per hari.',
          'Lemak atau minyak: tidak lebih dari 5 sendok makan per orang per hari.'
        ]
      },
      {
        heading: 'Kebiasaan pendukung',
        items: [
          'Minum air putih yang cukup dan kurangi minuman manis.',
          'Mencuci tangan sebelum makan.',
          'Melakukan aktivitas fisik dan memantau berat badan secara berkala.',
          'Membiasakan sarapan dan makan bersama keluarga.'
        ]
      }
    ],
    source: 'Rujukan umum: Kementerian Kesehatan RI (Pedoman Gizi Seimbang dan "Isi Piringku"; anjuran konsumsi gula, garam, dan lemak).'
  },

  olahraga: {
    title: 'Pentingnya Aktivitas Fisik dan Olahraga',
    category: 'Aktivitas Fisik',
    badge: 'badge-blue',
    readTime: '4 menit baca',
    intro: 'Aktivitas fisik adalah setiap gerakan tubuh yang menggunakan energi, termasuk berjalan kaki, bersepeda, membersihkan rumah, dan berolahraga. Aktivitas fisik yang teratur membantu menjaga kesehatan jantung, menguatkan otot dan tulang, menjaga berat badan, serta mendukung kesehatan mental.',
    sections: [
      {
        heading: 'Rekomendasi umum aktivitas fisik',
        items: [
          'Dewasa: 150–300 menit aktivitas intensitas sedang per minggu, atau 75–150 menit intensitas berat.',
          'Anak dan remaja (5–17 tahun): rata-rata 60 menit aktivitas fisik intensitas sedang hingga berat setiap hari.',
          'Latihan penguatan otot minimal 2 hari dalam seminggu untuk orang dewasa.',
          'Kurangi waktu duduk terlalu lama dan selingi dengan bergerak.'
        ]
      },
      {
        heading: 'Contoh aktivitas yang mudah dilakukan',
        items: [
          'Berjalan kaki atau bersepeda untuk jarak dekat.',
          'Senam pagi bersama keluarga atau tetangga.',
          'Naik tangga daripada menggunakan lift.',
          'Melakukan peregangan setiap 1–2 jam ketika bekerja atau belajar.'
        ]
      },
      {
        heading: 'Tips aman berolahraga',
        text: 'Lakukan pemanasan dan pendinginan, mulai dari intensitas ringan, dan tingkatkan secara bertahap. Bagi yang memiliki kondisi kesehatan tertentu, konsultasikan jenis aktivitas yang sesuai dengan tenaga kesehatan.'
      }
    ],
    source: 'Rujukan umum: WHO Guidelines on Physical Activity and Sedentary Behaviour (2020) dan Kementerian Kesehatan RI.'
  }
};

/* ---------- 2. Navbar ---------- */
function initNavbar() {
  const header = document.getElementById('siteHeader');
  const toggle = document.getElementById('navToggle');
  const menu = document.getElementById('navMenu');
  if (!header || !toggle || !menu) return;

  const links = Array.from(menu.querySelectorAll('.nav-link'));
  const icon = toggle.querySelector('i');

  function setMenuOpen(isOpen) {
    menu.classList.toggle('is-open', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.setAttribute('aria-label', isOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi');
    icon.className = isOpen ? 'bi bi-x-lg' : 'bi bi-list';
  }

  toggle.addEventListener('click', () => setMenuOpen(!menu.classList.contains('is-open')));

  // Tutup menu setelah salah satu tautan dipilih (mobile)
  links.forEach((link) => link.addEventListener('click', () => setMenuOpen(false)));

  // Tutup menu dengan tombol Escape
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menu.classList.contains('is-open')) {
      setMenuOpen(false);
      toggle.focus();
    }
  });

  // Tutup menu bila pengguna mengklik di luar navbar
  document.addEventListener('click', (event) => {
    if (menu.classList.contains('is-open') && !header.contains(event.target)) {
      setMenuOpen(false);
    }
  });

  // Reset menu saat layar diperbesar ke ukuran desktop
  window.matchMedia('(min-width: 901px)').addEventListener('change', (event) => {
    if (event.matches) setMenuOpen(false);
  });

  // Bayangan navbar saat halaman digulir
  const updateHeaderShadow = () => header.classList.toggle('is-scrolled', window.scrollY > 10);
  window.addEventListener('scroll', updateHeaderShadow, { passive: true });
  updateHeaderShadow();

  // Menandai tautan sesuai bagian yang sedang dilihat
  if (!('IntersectionObserver' in window)) return;
  const sections = links
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      links.forEach((link) => {
        const isActive = link.getAttribute('href') === '#' + entry.target.id;
        link.classList.toggle('is-active', isActive);
        if (isActive) {
          link.setAttribute('aria-current', 'true');
        } else {
          link.removeAttribute('aria-current');
        }
      });
    });
  }, { rootMargin: '-45% 0px -50% 0px' });

  sections.forEach((section) => sectionObserver.observe(section));
}

/* ---------- 3. Animasi muncul saat digulir ---------- */
function initRevealAnimation() {
  const items = document.querySelectorAll('.reveal');

  // Tanpa dukungan IntersectionObserver atau bila animasi dikurangi: tampilkan langsung
  if (PREFERS_REDUCED_MOTION || !('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  items.forEach((el) => {
    if (el.dataset.delay) el.style.setProperty('--delay', el.dataset.delay + 'ms');
  });

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target); // animasi cukup sekali
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  items.forEach((el) => revealObserver.observe(el));
}

/* ---------- 4. Animasi angka statistik ---------- */
function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  function animateCounter(el) {
    const target = parseInt(el.dataset.count, 10) || 0;
    if (PREFERS_REDUCED_MOTION) {
      el.textContent = target;
      return;
    }
    const duration = 1400;
    const start = performance.now();

    function step(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out
      el.textContent = Math.round(target * eased);
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  if (!('IntersectionObserver' in window)) return; // angka asli di HTML tetap tampil

  counters.forEach((el) => { el.textContent = '0'; });

  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach((el) => counterObserver.observe(el));
}

/* ---------- 5. Modal artikel ---------- */
function initArticleModal() {
  const modal = document.getElementById('articleModal');
  if (!modal || typeof modal.showModal !== 'function') return;

  const titleEl = document.getElementById('modalTitle');
  const categoryEl = document.getElementById('modalCategory');
  const metaEl = document.getElementById('modalMeta');
  const bodyEl = document.getElementById('modalBody');
  const closeBtn = document.getElementById('modalClose');
  const scrollArea = modal.querySelector('.modal-scroll');
  let lastTrigger = null;

  // Membuat isi artikel dengan DOM API (aman dari XSS)
  function renderArticle(article) {
    titleEl.textContent = article.title;
    categoryEl.textContent = article.category;
    categoryEl.className = 'badge ' + article.badge;
    metaEl.textContent = article.readTime + ' · Edukasi kesehatan masyarakat';

    bodyEl.replaceChildren();

    const intro = document.createElement('p');
    intro.textContent = article.intro;
    bodyEl.appendChild(intro);

    article.sections.forEach((section) => {
      const heading = document.createElement('h3');
      heading.textContent = section.heading;
      bodyEl.appendChild(heading);

      if (Array.isArray(section.items)) {
        const list = document.createElement('ul');
        section.items.forEach((item) => {
          const li = document.createElement('li');
          li.textContent = item;
          list.appendChild(li);
        });
        bodyEl.appendChild(list);
      }

      if (section.text) {
        const paragraph = document.createElement('p');
        paragraph.textContent = section.text;
        bodyEl.appendChild(paragraph);
      }
    });

    const source = document.createElement('p');
    source.className = 'modal-source';
    source.textContent = article.source + ' Informasi bersifat umum dan tidak menggantikan saran tenaga kesehatan.';
    bodyEl.appendChild(source);
  }

  document.querySelectorAll('[data-article]').forEach((button) => {
    button.addEventListener('click', () => {
      const article = ARTICLES[button.dataset.article];
      if (!article) return;
      renderArticle(article);
      lastTrigger = button;
      modal.showModal();
      scrollArea.scrollTop = 0;
      document.body.classList.add('modal-open');
    });
  });

  closeBtn.addEventListener('click', () => modal.close());

  // Klik di area gelap (backdrop) menutup modal
  modal.addEventListener('click', (event) => {
    if (event.target === modal) modal.close();
  });

  // Saat modal tertutup (tombol X, Escape, atau backdrop)
  modal.addEventListener('close', () => {
    document.body.classList.remove('modal-open');
    if (lastTrigger) lastTrigger.focus();
  });
}

/* ---------- 6. Checklist tips sehat ---------- */
function initChecklist() {
  const STORAGE_KEY = 'sehatbersama-checklist';
  const checkboxes = Array.from(document.querySelectorAll('#checklist input[type="checkbox"]'));
  if (!checkboxes.length) return;

  const doneEl = document.getElementById('tipsDone');
  const totalEl = document.getElementById('tipsTotal');
  const percentEl = document.getElementById('tipsPercent');
  const barEl = document.getElementById('tipsBar');
  const progressEl = document.getElementById('tipsProgress');
  const messageEl = document.getElementById('tipsMessage');
  const resetBtn = document.getElementById('tipsReset');

  // Kunci tanggal lokal, agar checklist dimulai ulang setiap hari
  function getTodayKey() {
    const now = new Date();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return now.getFullYear() + '-' + month + '-' + day;
  }

  // localStorage dibungkus try/catch karena bisa diblokir browser (mode privat)
  function loadProgress() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (saved && saved.date === getTodayKey() && Array.isArray(saved.items)) {
        checkboxes.forEach((box) => { box.checked = saved.items.includes(box.value); });
      }
    } catch (error) {
      /* Abaikan: checklist tetap berfungsi tanpa penyimpanan */
    }
  }

  function saveProgress() {
    try {
      const items = checkboxes.filter((box) => box.checked).map((box) => box.value);
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ date: getTodayKey(), items }));
    } catch (error) {
      /* Abaikan */
    }
  }

  function getMessage(done, total) {
    if (done === 0) return 'Yuk, mulai dari satu kebiasaan kecil hari ini.';
    if (done === total) return 'Luar biasa! Semua tips sehat hari ini sudah Anda lakukan.';
    if (done >= Math.ceil(total / 2)) return 'Hebat! Sedikit lagi semua tips terpenuhi.';
    return 'Awal yang baik! Lanjutkan kebiasaan sehat Anda.';
  }

  function updateProgress() {
    const total = checkboxes.length;
    const done = checkboxes.filter((box) => box.checked).length;
    const percent = Math.round((done / total) * 100);

    doneEl.textContent = done;
    totalEl.textContent = total;
    percentEl.textContent = percent;
    barEl.style.width = percent + '%';
    progressEl.setAttribute('aria-valuenow', String(percent));
    messageEl.textContent = getMessage(done, total);
  }

  checkboxes.forEach((box) => {
    box.addEventListener('change', () => {
      updateProgress();
      saveProgress();
    });
  });

  resetBtn.addEventListener('click', () => {
    checkboxes.forEach((box) => { box.checked = false; });
    updateProgress();
    saveProgress();
  });

  loadProgress();
  updateProgress();
}

/* ---------- 7. Kalkulator IMT ---------- */
function initBmiCalculator() {
  const form = document.getElementById('bmiForm');
  if (!form) return;

  const weightInput = document.getElementById('berat');
  const heightInput = document.getElementById('tinggi');
  const emptyState = document.getElementById('bmiEmpty');
  const output = document.getElementById('bmiOutput');
  const valueEl = document.getElementById('bmiValue');
  const categoryEl = document.getElementById('bmiCategory');
  const descEl = document.getElementById('bmiDesc');
  const markerEl = document.getElementById('bmiMarker');

  // Batas nilai yang masuk akal untuk orang dewasa
  const RULES = {
    berat: { label: 'Berat badan', min: 20, max: 300, unit: 'kg' },
    tinggi: { label: 'Tinggi badan', min: 100, max: 250, unit: 'cm' }
  };

  // Klasifikasi IMT dewasa menurut Kementerian Kesehatan RI
  function classify(bmi) {
    if (bmi < 17.0) {
      return {
        label: 'Kurus (tingkat berat)', level: 'lvl-under',
        desc: 'Berat badan Anda tergolong sangat kurang. Disarankan berkonsultasi dengan tenaga kesehatan untuk mengetahui penyebab dan cara memperbaiki asupan gizi.'
      };
    }
    if (bmi < 18.5) {
      return {
        label: 'Kurus (tingkat ringan)', level: 'lvl-under',
        desc: 'Berat badan Anda sedikit di bawah rentang normal. Perhatikan asupan makanan bergizi seimbang dan pola makan yang teratur.'
      };
    }
    if (bmi <= 25.0) {
      return {
        label: 'Normal', level: 'lvl-normal',
        desc: 'Berat badan Anda berada pada rentang normal. Pertahankan dengan pola makan seimbang, aktivitas fisik teratur, dan istirahat yang cukup.'
      };
    }
    if (bmi <= 27.0) {
      return {
        label: 'Gemuk (tingkat ringan)', level: 'lvl-over',
        desc: 'Berat badan Anda sedikit di atas rentang normal. Kurangi konsumsi gula, garam, dan lemak serta tingkatkan aktivitas fisik secara bertahap.'
      };
    }
    return {
      label: 'Gemuk (tingkat berat)', level: 'lvl-obese',
      desc: 'Berat badan Anda tergolong berlebih dan dapat meningkatkan risiko penyakit seperti hipertensi dan diabetes. Disarankan berkonsultasi dengan tenaga kesehatan.'
    };
  }

  // Validasi satu input; mengembalikan angka bila valid, null bila tidak
  function validateField(input, rule) {
    const errorEl = document.getElementById(input.id + 'Error');
    const field = input.closest('.form-field');
    const raw = input.value.trim();
    let message = '';

    if (input.validity.badInput) {
      message = rule.label + ' harus berupa angka.';
    } else if (raw === '') {
      message = rule.label + ' wajib diisi.';
    } else {
      const value = Number(raw);
      if (!Number.isFinite(value)) {
        message = rule.label + ' harus berupa angka.';
      } else if (value < rule.min || value > rule.max) {
        message = rule.label + ' harus antara ' + rule.min + '–' + rule.max + ' ' + rule.unit + '.';
      }
    }

    errorEl.textContent = message;
    input.setAttribute('aria-invalid', message ? 'true' : 'false');
    field.classList.toggle('has-error', Boolean(message));
    return message ? null : Number(raw);
  }

  function showResult(bmi) {
    const result = classify(bmi);
    valueEl.textContent = bmi.toFixed(1).replace('.', ',');
    categoryEl.textContent = result.label;
    categoryEl.className = 'bmi-category ' + result.level;
    descEl.textContent = result.desc;

    // Posisi penanda pada skala 15–35
    const position = Math.min(Math.max(((bmi - 15) / 20) * 100, 0), 100);
    markerEl.style.left = position + '%';

    emptyState.hidden = true;
    output.hidden = false;

    // Efek animasi kecil setiap kali hasil diperbarui
    output.classList.remove('is-updated');
    void output.offsetWidth;
    output.classList.add('is-updated');
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const weight = validateField(weightInput, RULES.berat);
    const heightCm = validateField(heightInput, RULES.tinggi);

    if (weight === null || heightCm === null) {
      (weight === null ? weightInput : heightInput).focus();
      return;
    }

    const heightM = heightCm / 100;
    const bmi = Math.round((weight / (heightM * heightM)) * 10) / 10; // dibulatkan 1 desimal
    showResult(bmi);
  });

  // Hapus pesan error ketika pengguna mulai mengetik ulang
  [weightInput, heightInput].forEach((input) => {
    input.addEventListener('input', () => {
      const errorEl = document.getElementById(input.id + 'Error');
      errorEl.textContent = '';
      input.setAttribute('aria-invalid', 'false');
      input.closest('.form-field').classList.remove('has-error');
    });
  });

  // Tombol "Hapus" mengembalikan tampilan awal
  form.addEventListener('reset', () => {
    [weightInput, heightInput].forEach((input) => {
      document.getElementById(input.id + 'Error').textContent = '';
      input.setAttribute('aria-invalid', 'false');
      input.closest('.form-field').classList.remove('has-error');
    });
    output.hidden = true;
    emptyState.hidden = false;
  });
}

/* ---------- 8. Tombol kembali ke atas ---------- */
function initBackToTop() {
  const button = document.getElementById('backToTop');
  if (!button) return;

  const toggleButton = () => button.classList.toggle('is-visible', window.scrollY > 600);
  window.addEventListener('scroll', toggleButton, { passive: true });
  toggleButton();

  button.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: PREFERS_REDUCED_MOTION ? 'auto' : 'smooth' });
    // Pindahkan fokus ke awal halaman untuk pengguna keyboard
    const brand = document.querySelector('.site-header .brand');
    if (brand) brand.focus({ preventScroll: true });
  });
}

/* ---------- 9. Tahun berjalan di footer ---------- */
function setFooterYear() {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

/* ---------- Jalankan semua fitur ---------- */
initNavbar();
initRevealAnimation();
initCounters();
initArticleModal();
initChecklist();
initBmiCalculator();
initBackToTop();
setFooterYear();
