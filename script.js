(() => {
  'use strict';

  /* =========================================================
     0. MISC UI: year, nav burger, hero letter split
  ========================================================= */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const burger = document.getElementById('burgerBtn');
  const navLinks = document.getElementById('navLinks');
  if (burger && navLinks) {
    burger.addEventListener('click', () => {
      const open = navLinks.classList.toggle('is-open');
      burger.classList.toggle('is-open', open);
      burger.setAttribute('aria-expanded', String(open));
    });
    navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      navLinks.classList.remove('is-open');
      burger.classList.remove('is-open');
      burger.setAttribute('aria-expanded', 'false');
    }));
  }

  // split hero name into animated letters
  const heroName = document.querySelector('[data-split]');
  if (heroName) {
    const text = heroName.textContent;
    heroName.innerHTML = '';
    let delay = 0;
    [...text].forEach(ch => {
      const span = document.createElement('span');
      span.className = 'char';
      span.textContent = ch === ' ' ? '\u00A0' : ch;
      span.style.animationDelay = `${delay}s`;
      delay += 0.028;
      heroName.appendChild(span);
    });
  }

  /* =========================================================
     1. SCROLL REVEAL (IntersectionObserver)
  ========================================================= */
  const revealItems = document.querySelectorAll('[data-reveal], [data-stagger]');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
  revealItems.forEach(el => revealObserver.observe(el));

  /* =========================================================
     2. GROWTH THREAD — scroll progress
  ========================================================= */
  const threadFill = document.querySelector('.thread__fill');
  function updateThread() {
    if (!threadFill) return;
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
    const dash = 1000 - Math.min(1, Math.max(0, progress)) * 1000;
    threadFill.style.strokeDashoffset = String(dash);
  }
  window.addEventListener('scroll', updateThread, { passive: true });
  updateThread();

  /* =========================================================
     3. ACCORDION — "Обо мне"
  ========================================================= */
  const aboutToggle = document.getElementById('aboutToggle');
  const aboutBody = document.getElementById('aboutBody');
  if (aboutToggle && aboutBody) {
    aboutToggle.addEventListener('click', () => {
      const open = aboutBody.classList.toggle('is-open');
      aboutToggle.setAttribute('aria-expanded', String(open));
    });
  }

  /* =========================================================
     4. DATA MODEL + PERSISTENCE
  ========================================================= */
  const STORAGE_KEY = 'gulzat-portfolio-data-v1';

  const defaultData = {
    internships: [
      {
        id: 'int-1',
        title: 'Санкт-Петербургский государственный экономический университет (СПбГЭУ)',
        subtitle: '12–22 мая 2026 года',
        text: 'Прошла международную программу повышения квалификации объёмом 72 академических часа по направлению «BI-решения для бизнес-аналитики и принятия решений».\n\nИзучены современные инструменты: PIX BI, 1С Аналитика, Yandex DataLens, анализ данных, построение дашбордов, бизнес-аналитика.\n\nПо итогам обучения получено удостоверение о повышении квалификации.',
        link: { label: 'Смотреть материалы', url: 'https://sites.google.com/view/gulzat-com?usp=sharing' },
        photo: null
      }
    ],
    conferences: [
      {
        id: 'conf-1',
        title: 'Международный научно-методический семинар (Беларусь)',
        subtitle: '11 декабря 2024',
        text: 'Выступила с докладом «Применение искусственного интеллекта в образовании и экономических дисциплинах».',
        link: null,
        photo: null
      },
      {
        id: 'conf-2',
        title: 'International Faculty Development Program — IILM University (Индия)',
        subtitle: '2 июня 2026 · приглашённый международный спикер',
        text: 'Доклад «Practical Applications of Google AI Tools in Education: Gemini and NotebookLM» — о практическом использовании инструментов Google AI в образовательном процессе.',
        link: null,
        photo: null
      }
    ],
    development: [
      {
        id: 'dev-1',
        title: 'BI-решения и цифровые технологии',
        subtitle: '',
        text: 'Прошла обучение по направлениям: BI-решения, бизнес-аналитика, анализ данных, интерактивные дашборды, современные цифровые технологии.',
        link: null,
        photo: null
      },
      {
        id: 'dev-2',
        title: 'Дополнительные мероприятия',
        subtitle: '',
        text: 'Экскурсия в Парк высоких технологий (HTP), посещение компании EPAM, круглый стол по искусственному интеллекту, участие в международных образовательных мероприятиях.',
        link: { label: 'Смотреть материалы', url: 'https://sites.google.com/view/gulzat-com?usp=sharing' },
        photo: null
      }
    ],
    articles: [
      { id: 'art-1', title: '«Университеттин билим берүү чөйрөсүнүн санариптик мүмкүнчүлүктөрү»', subtitle: '26.09.2024', text: '', link: null, photo: null },
      { id: 'art-2', title: '«Использование искусственного интеллекта в процессе обучения»', subtitle: '29.10.2024', text: '', link: null, photo: null },
      { id: 'art-3', title: '«Применение искусственного интеллекта в образовании: технологии, инновации и перспективы»', subtitle: '21.11.2024', text: '', link: null, photo: null },
      { id: 'art-4', title: '«Применение ИИ в образовании: технологии, инновации и перспективы»', subtitle: 'Вестник Науки · Elibrary', text: '', link: null, photo: null },
      { id: 'art-5', title: '«Роль цифровых платформ в экономике совместного потребления»', subtitle: 'Вестник Науки · Elibrary', text: '', link: null, photo: null },
      { id: 'art-6', title: '«Перспективы и развития искусственного интеллекта на рынке труда»', subtitle: 'Alatoo Academic Studies, №2, 2025 · ISSN 1694-5263', text: '', link: null, photo: null },
      { id: 'art-7', title: '«Применение ИИ в образовании: технологии, инновации и перспективы»', subtitle: 'Вестник Науки · ISSN 2712-8849 · 23 февраля 2025', text: '', link: null, photo: null }
    ],
    hackathons: [
      {
        id: 'hack-1',
        title: 'AiTech',
        subtitle: 'Участник хакатона',
        text: 'Разработаны: сайт проекта, презентация, научная документация. Получен сертификат финалиста.',
        link: null,
        photo: null
      },
      {
        id: 'hack-2',
        title: 'HackUni — «Умный университет»',
        subtitle: 'Организатор и модератор',
        text: 'Организация мероприятия, сопровождение участников, проведение защиты проектов, модерация финального этапа. Получено благодарственное письмо.',
        link: { label: 'Смотреть материалы', url: 'https://sites.google.com/view/gulzat-com?usp=sharing' },
        photo: null
      }
    ],
    certificates: []
  };

  function loadData() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) { /* ignore corrupt storage */ }
    saveData(defaultData);
    return JSON.parse(JSON.stringify(defaultData));
  }
  function saveData(data) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); }
    catch (e) { console.warn('Не удалось сохранить данные локально:', e); }
  }

  let data = loadData();
  const uid = (p) => `${p}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

  /* =========================================================
     5. IMAGE RESIZE HELPER (keeps localStorage light)
  ========================================================= */
  function resizeImageFile(file, maxDim = 1100, quality = 0.82) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = () => reject(new Error('Не удалось прочитать файл'));
      reader.onload = () => {
        const img = new Image();
        img.onerror = () => reject(new Error('Не удалось загрузить изображение'));
        img.onload = () => {
          let { width, height } = img;
          if (width > maxDim || height > maxDim) {
            if (width > height) { height = Math.round(height * maxDim / width); width = maxDim; }
            else { width = Math.round(width * maxDim / height); height = maxDim; }
          }
          const canvas = document.createElement('canvas');
          canvas.width = width; canvas.height = height;
          canvas.getContext('2d').drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL('image/jpeg', quality));
        };
        img.src = reader.result;
      };
      reader.readAsDataURL(file);
    });
  }

  /* =========================================================
     6. ICONS (small inline SVG factory)
  ========================================================= */
  const icon = {
    edit: '<svg viewBox="0 0 24 24"><path d="M4 20h4L18.5 9.5a2.1 2.1 0 0 0-3-3L5 17v3Z"/><path d="M13 6.5l4 4"/></svg>',
    trash: '<svg viewBox="0 0 24 24"><path d="M4 7h16M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2m-9 0 1 13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1l1-13"/></svg>',
    photo: '<svg viewBox="0 0 24 24"><path d="M4 7h3l1.5-2h7L17 7h3a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1Z"/><circle cx="12" cy="13" r="3.2"/></svg>'
  };

  /* =========================================================
     7. GENERIC CARD RENDERING (internships/conferences/development/hackathons/articles)
  ========================================================= */
  const listConfig = {
    internships: document.getElementById('internshipsList'),
    conferences: document.getElementById('conferencesList'),
    development: document.getElementById('developmentList'),
    articles: document.getElementById('articlesList'),
    hackathons: document.getElementById('hackathonsList')
  };

  function renderCard(sectionKey, item) {
    const card = document.createElement('article');
    card.className = 'entry-card';
    card.dataset.id = item.id;

    const linkHtml = item.link && item.link.url
      ? `<a class="entry-card__link" href="${escapeAttr(item.link.url)}" target="_blank" rel="noopener">${escapeHtml(item.link.label || 'Подробнее')}</a>`
      : '';
    const photoHtml = item.photo
      ? `<div class="entry-card__photo"><img src="${item.photo}" alt="${escapeAttr(item.title)}"></div>`
      : '';
    const subtitleHtml = item.subtitle
      ? `<p class="entry-card__subtitle">${escapeHtml(item.subtitle)}</p>` : '';

    card.innerHTML = `
      <div class="entry-card__tools">
        <button class="icon-btn" data-action="edit" title="Редактировать">${icon.edit}</button>
        <button class="icon-btn" data-action="photo" title="Добавить / заменить фото">${icon.photo}</button>
        <button class="icon-btn icon-btn--danger" data-action="delete" title="Удалить">${icon.trash}</button>
      </div>
      <div class="entry-card__top">
        <div>
          <h3 class="entry-card__title">${escapeHtml(item.title)}</h3>
          ${subtitleHtml}
        </div>
      </div>
      ${item.text ? `<p class="entry-card__text">${escapeHtml(item.text)}</p>` : ''}
      ${linkHtml}
      ${photoHtml}
      <input type="file" accept="image/*" hidden class="entry-card__file-input">
    `;

    card.querySelector('[data-action="edit"]').addEventListener('click', () => openModal(sectionKey, item.id));
    card.querySelector('[data-action="delete"]').addEventListener('click', () => {
      if (confirm('Удалить эту запись?')) {
        data[sectionKey] = data[sectionKey].filter(i => i.id !== item.id);
        saveData(data);
        renderList(sectionKey);
      }
    });
    const fileInput = card.querySelector('.entry-card__file-input');
    card.querySelector('[data-action="photo"]').addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      try {
        const dataUrl = await resizeImageFile(file);
        const target = data[sectionKey].find(i => i.id === item.id);
        target.photo = dataUrl;
        saveData(data);
        renderList(sectionKey);
      } catch (err) {
        alert('Не получилось загрузить фото. Попробуйте другой файл.');
      }
    });

    return card;
  }

  function renderList(sectionKey) {
    const container = listConfig[sectionKey];
    if (!container) return;
    container.innerHTML = '';
    data[sectionKey].forEach(item => container.appendChild(renderCard(sectionKey, item)));
  }

  Object.keys(listConfig).forEach(renderList);

  /* =========================================================
     8. CERTIFICATE GALLERY
  ========================================================= */
  const certGallery = document.getElementById('certGallery');
  const certPhotoInput = document.getElementById('certPhotoInput');
  const addCertPhotoBtn = document.getElementById('addCertPhotoBtn');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');

  function renderCertGallery() {
    if (!certGallery) return;
    certGallery.innerHTML = '';
    if (!data.certificates.length) {
      const empty = document.createElement('p');
      empty.className = 'cert-empty';
      empty.textContent = 'Пока нет загруженных фото сертификатов — добавьте первое.';
      certGallery.appendChild(empty);
      return;
    }
    data.certificates.forEach(cert => {
      const el = document.createElement('div');
      el.className = 'cert-item';
      el.innerHTML = `
        <img src="${cert.src}" alt="Сертификат">
        <button class="cert-item__remove" aria-label="Удалить фото">&times;</button>
      `;
      el.querySelector('img').addEventListener('click', () => {
        lightboxImg.src = cert.src;
        lightbox.classList.add('is-open');
        lightbox.setAttribute('aria-hidden', 'false');
      });
      el.querySelector('.cert-item__remove').addEventListener('click', (ev) => {
        ev.stopPropagation();
        if (confirm('Удалить это фото?')) {
          data.certificates = data.certificates.filter(c => c.id !== cert.id);
          saveData(data);
          renderCertGallery();
        }
      });
      certGallery.appendChild(el);
    });
  }
  renderCertGallery();

  if (addCertPhotoBtn && certPhotoInput) {
    addCertPhotoBtn.addEventListener('click', () => certPhotoInput.click());
    certPhotoInput.addEventListener('change', async (e) => {
      const files = [...e.target.files];
      for (const file of files) {
        try {
          const dataUrl = await resizeImageFile(file, 1000, 0.8);
          data.certificates.push({ id: uid('cert'), src: dataUrl });
        } catch (err) { /* skip broken file */ }
      }
      saveData(data);
      renderCertGallery();
      certPhotoInput.value = '';
    });
  }

  document.querySelectorAll('[data-close-lightbox]').forEach(el => {
    el.addEventListener('click', () => {
      lightbox.classList.remove('is-open');
      lightbox.setAttribute('aria-hidden', 'true');
      lightboxImg.src = '';
    });
  });

  /* =========================================================
     9. MODAL (add / edit entry)
  ========================================================= */
  const modal = document.getElementById('modal');
  const modalForm = document.getElementById('modalForm');
  const modalTitle = document.getElementById('modalTitle');
  const fTitle = document.getElementById('fTitle');
  const fSubtitle = document.getElementById('fSubtitle');
  const fText = document.getElementById('fText');
  const fLink = document.getElementById('fLink');

  const sectionNames = {
    internships: 'стажировку',
    conferences: 'конференцию',
    development: 'запись',
    articles: 'статью',
    hackathons: 'хакатон'
  };

  let modalContext = { sectionKey: null, itemId: null };

  function openModal(sectionKey, itemId = null) {
    modalContext = { sectionKey, itemId };
    const isEdit = !!itemId;
    modalTitle.textContent = isEdit ? 'Редактировать запись' : `Добавить ${sectionNames[sectionKey] || 'запись'}`;

    if (isEdit) {
      const item = data[sectionKey].find(i => i.id === itemId);
      fTitle.value = item.title || '';
      fSubtitle.value = item.subtitle || '';
      fText.value = item.text || '';
      fLink.value = (item.link && item.link.url) || '';
    } else {
      modalForm.reset();
    }
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    setTimeout(() => fTitle.focus(), 50);
  }
  function closeModal() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
  }
  document.querySelectorAll('[data-close]').forEach(el => el.addEventListener('click', closeModal));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

  document.querySelectorAll('[data-add]').forEach(btn => {
    btn.addEventListener('click', () => openModal(btn.dataset.add, null));
  });

  modalForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const { sectionKey, itemId } = modalContext;
    const payload = {
      title: fTitle.value.trim(),
      subtitle: fSubtitle.value.trim(),
      text: fText.value.trim(),
      link: fLink.value.trim() ? { label: 'Подробнее', url: fLink.value.trim() } : null
    };
    if (!payload.title) return;

    if (itemId) {
      const item = data[sectionKey].find(i => i.id === itemId);
      Object.assign(item, payload);
    } else {
      data[sectionKey].push({ id: uid(sectionKey), photo: null, ...payload });
    }
    saveData(data);
    renderList(sectionKey);
    closeModal();
  });

  /* =========================================================
     10. UTILS
  ========================================================= */
  function escapeHtml(str) {
    return String(str || '').replace(/[&<>"']/g, m => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[m]));
  }
  function escapeAttr(str) { return escapeHtml(str); }

})();
